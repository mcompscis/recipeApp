from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from setup_tables.query_manager import exec_query
from django.views.decorators.csrf import csrf_exempt
from users.models import User
import os

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.create_user(username=username, password=password)
        return HttpResponse(204)

def login(request):
   pass
