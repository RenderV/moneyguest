from rest_framework import serializers
from .models import Transaction, TransactionPreferences

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = ["user"]

class TransactionPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionPreferences
        fields = "__all__"
        read_only_fields = ["user"]