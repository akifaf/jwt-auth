from rest_framework.serializers import ModelSerializer
from base.models import Notes

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'