from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Transaction, TransactionPreferences
from .serializers import TransactionSerializer, TransactionPreferencesSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
import calendar
from datetime import date


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def get_stats(self, request):
        total = self.get_queryset().aggregate(Sum('value'))
        positive = self.get_queryset().filter(value__gte=0).aggregate(Sum('value'))
        negative = self.get_queryset().filter(value__lt=0).aggregate(Sum('value'))
        return Response({
            'total': total['value__sum'] or 0,
            'positive': positive['value__sum'] or 0,
            'negative': negative['value__sum'] or 0
        })
    
    @action(detail=False, methods=['get'])
    def get_monthly_balance(self, request):
        # current_month = self.get_queryset().first().date.month
        # current_year = self.get_queryset().first().date.year
        current_month = date.today().month
        current_year = date.today().year

        months = []
        for i in range(12):
            month = current_month - i
            year = current_year
            if month <= 0:
                month += 12
                year -= 1
            months.append((month, year))
        
        balances = []
        for month, year in months:
            balance = self.get_queryset().filter(date__month=month, date__year=year).aggregate(Sum('value'))
            balances.append({
                'month': calendar.month_name[month][:3],
                'year': year,
                'balance': balance['value__sum']
            })
        return Response(reversed(balances))
    
    @action(detail=False, methods=['get'])
    def get_limit_percent(self, request):
        try:
            preferences = TransactionPreferences.objects.get(user=request.user)
            total = self.get_queryset().filter(value__lt=0).aggregate(Sum('value'))
            total_value = abs(total['value__sum'] or 0)
            spending_limit = preferences.spending_limit or 0
            spending_goal = preferences.spending_goal or 0
            return Response({
                'spendings': total_value,
                'limit': preferences.spending_limit,
                'goal': preferences.spending_goal,
                'percent_limit': total_value / spending_limit if spending_limit > 0 else None,
                'percent_goal': total_value / spending_goal if spending_goal > 0 else None
            })
        except TransactionPreferences.DoesNotExist:
            return Response({
                'total': 0,
                'limit': 0,
                'percent': None
            })

class TransactionPreferencesViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, pk=None):
        try:
            preferences = TransactionPreferences.objects.get(user=request.user)
            serializer = TransactionPreferencesSerializer(preferences)
            return Response(serializer.data)
        except TransactionPreferences.DoesNotExist:
            return Response({
                'spending_limit': 0,
                'spending_goal': 0
            })
    
    def update(self, request, pk=None):
        try:
            preferences = TransactionPreferences.objects.get(user=request.user)
            serializer = TransactionPreferencesSerializer(preferences, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except TransactionPreferences.DoesNotExist:
            serializer = TransactionPreferencesSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
            return Response(serializer.data)