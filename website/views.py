from django.views.generic import TemplateView


class SimpleContactManager(TemplateView):
    template_name = "index.html"
