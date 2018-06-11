from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=128)
    telephone = PhoneNumberField()
    email = models.EmailField(unique=True)
    website = models.URLField()
    street = models.CharField(max_length=128)
    locality = models.CharField(max_length=64)
    postal_code = models.CharField(max_length=10)
    country = models.CharField(max_length=64)