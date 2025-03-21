from django.contrib import admin
from logIn.models import(
    SubscriberPersonalData,
    Tariff,
    Services,
    TariffServices,
    phoneNumbers,
    ActivateServices
)


# Register your models here.

admin.site.register(SubscriberPersonalData)
admin.site.register(Tariff)
admin.site.register(Services)
admin.site.register(TariffServices)
admin.site.register(phoneNumbers)
admin.site.register(ActivateServices)

