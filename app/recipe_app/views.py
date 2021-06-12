from django.shortcuts import render
from django.http import HttpResponse
from .models import SampleTable

# Create your views here.

def homepage(request):
    """
    Lets do a random select query from a sample db
    """

    results = SampleTable.objects.raw("SELECT * FROM sample_table")
    for row in results:
        print(row.id, row.name)
    return HttpResponse("test!")

