from rest_framework.routers import SimpleRouter
from django.urls import path, re_path
from .views import ContactView, AutocompletePlaceView, PlaceInfoView


router = SimpleRouter()
router.register(r'contacts', ContactView, base_name='contacts')


urlpatterns = [
    path('place/autocomplete/', AutocompletePlaceView.as_view(), name="autocomplete"),
    re_path('place/info/(?P<place_id>[0-9a-zA-Z]+)/', PlaceInfoView.as_view(), name="place-info")
]

urlpatterns += router.urls