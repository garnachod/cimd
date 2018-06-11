from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
import requests
from collections import namedtuple
from django.conf import settings
from .serializers import ContactSerializer, AutocompletePlaceSerializer, PlaceInfoSerializer
from .models import Contact
from .consts import Const

CONST = Const()


class ContactView(ModelViewSet):
    queryset = Contact.objects.all().order_by('id')
    serializer_class = ContactSerializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter,)
    search_fields = ('name', 'last_name', 'email', 'postal_code', 'locality', 'country')


class AutocompletePlaceView(ListAPIView):
    serializer_class = AutocompletePlaceSerializer

    def get_queryset(self):
        input_place = self.request.query_params.get('input', None)
        if input_place is None:
            raise ValidationError
        try:
            response = requests.get(CONST.GOOGLE_MAPS_API_URL + 'place/autocomplete/json',
                                    params={'key': settings.GOOGLE_API_KEY,
                                            'input': input_place,
                                            'language': 'es',
                                            'types': 'address'}).json()
        except Exception:
            raise NotFound

        nt = namedtuple('place', 'description, place_id')
        return [nt(x['description'], x['place_id']) for x in response['predictions']]


class PlaceInfoView(RetrieveAPIView):
    serializer_class = PlaceInfoSerializer

    def get_object(self):
        place_id = self.kwargs['place_id']

        try:
            response = requests.get(CONST.GOOGLE_MAPS_API_URL + 'place/details/json',
                                    params={'key': settings.GOOGLE_API_KEY,
                                            'place_id': place_id}).json()
        except Exception:
            raise NotFound

        if response['status'] == 'INVALID_REQUEST':
            raise ValidationError

        nt = namedtuple('place', 'street, locality, postal_code, country')

        address_components_condensed = {x['types'][0]: x['long_name'] for x in response['result']['address_components']}
        return nt(address_components_condensed.get('route', ''),
                  address_components_condensed.get('locality', ''),
                  address_components_condensed.get('postal_code', ''),
                  address_components_condensed.get('country', ''))
