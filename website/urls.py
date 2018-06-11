from django.urls import path, re_path
from .views import SimpleContactManager

urlpatterns = [
    path('', SimpleContactManager.as_view()),
    # hack routes angular
    re_path('(?!.*(api)).*', SimpleContactManager.as_view()),
]