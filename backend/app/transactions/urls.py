from django.urls import path

from .views import TransactionViewSet, TransactionPreferencesViewSet

from rest_framework.routers import DefaultRouter
from django.urls import include

router = DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transactions")


urlpatterns = [
    path("", include(router.urls)),
    path(
        "settings/",
        TransactionPreferencesViewSet.as_view({"get": "retrieve", "post": "update"}),
        name="preferences",
    ),
]
