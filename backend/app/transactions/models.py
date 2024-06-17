from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Transaction(models.Model):
    name = models.CharField(max_length=255)
    value = models.FloatField()
    person = models.CharField(max_length=255)
    payment = models.CharField(max_length=255)
    date = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class TransactionPreferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spending_limit = models.FloatField(default=0)
    spending_goal = models.FloatField(default=0)

    def __str__(self):
        return self.user.username