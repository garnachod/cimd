from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Contact


class ContactTests(APITestCase):

    def create_default_contact(self, **kwards):
        url = reverse('contacts-list')
        data = {
            "name": "safasf",
            "last_name": "sadasfasd",
            "telephone": "+34465544564",
            "email": "a@gmail.com",
            "website": "https://www.github.com/garnachod",
            "street": "alcala",
            "locality": "Madrid",
            "postal_code": "28033",
            "country": "España"
        }
        for element in kwards:
            data[element] = kwards[element]
        response = self.client.post(url, data, format='json')
        return response

    def edit_default_contact(self, **kwards):
        response = self.create_default_contact()
        data = response.data
        url = reverse('contacts-detail', args=[data['id']])
        for element in kwards:
            data[element] = kwards[element]
        response = self.client.patch(url, data, format='json')
        return response


    def test_create_contact(self):
        response = self.create_default_contact()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertEqual(Contact.objects.get().name, 'Daniel')

    def test_create_contact_duplicate_email(self):
        response = self.create_default_contact()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.create_default_contact()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 1)

    def test_create_two_contacts(self):
        response = self.create_default_contact()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.create_default_contact(email='other_email@gmail.com')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 2)

    def test_create_contact_error_email(self):
        response = self.create_default_contact(email='notAEmail')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)

    def test_create_contact_error_website(self):
        response = self.create_default_contact(website='notAWebsite')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)
        response = self.create_default_contact(website='http://notAWebsite')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)

    def test_create_contact_error_telephone(self):
        response = self.create_default_contact(telephone='notATelephone')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)
        response = self.create_default_contact(telephone='91')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)

    def test_create_contact_error_postal_code(self):
        response = self.create_default_contact(postal_code='')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)

    def test_edit_contact(self):
        response = self.edit_default_contact(email="garcia@gmail.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Contact.objects.get().email, "garcia@gmail.com")

    def test_edit_contact_error_email(self):
        response = self.edit_default_contact(email="garcia")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.get().email, "garnachod@gmail.com")


class AutocompletePlaceTests(APITestCase):

    def test_endpoint(self):
        url = reverse('autocomplete')
        data = {'input': 'alcala, madrid'}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
        self.assertContains(response, 'description')
        self.assertContains(response, 'place_id')
        self.assertNotContains(response, 'place_id_33')

    def test_error_endpoint(self):
        url = reverse('autocomplete')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class PlaceInfoTests(APITestCase):

    def test_endpoint(self):
        url = reverse('place-info', kwargs={"place_id":"EiFDYWxsZSBkZSBBbGNhbMOhLCBNYWRyaWQsIEVzcGHDsWE"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'street')
        self.assertContains(response, 'locality')
        self.assertContains(response, 'postal_code')
        self.assertContains(response, 'country')

    def test_error_endpoint(self):
        url = reverse('place-info', kwargs={"place_id":"notAValidId"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
