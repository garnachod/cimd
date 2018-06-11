from rest_framework.serializers import ModelSerializer, Serializer, CharField
from .models import Contact


class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'last_name', 'telephone', 'email', 'website',
                  'street', 'locality', 'postal_code', 'country')
        read_only_fields = ('id',)


class AutocompletePlaceSerializer(Serializer):
    description = CharField()
    place_id = CharField()


class PlaceInfoSerializer(Serializer):
    street = CharField()
    locality = CharField()
    postal_code = CharField()
    country = CharField()