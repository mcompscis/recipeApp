from rest_framework import serializers
from .models import SampleTable

class SampleTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleTable
        fields = ('id', 'name')