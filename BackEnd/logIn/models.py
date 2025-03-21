from django.db import models

# Create your models here.



class SubscriberPersonalData(models.Model):

    def __str__(self):
        return f"{self.name}_{self.surname}_{self.patronymic}_{self.passportSeries}_{self.passportNumber}" 

    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30)

    birthday = models.DateField()

    passportSeries = models.CharField(max_length=4)
    passportNumber = models.CharField(max_length=10)


class Tariff(models.Model):
    def __str__(self):
        return self.name
    
    name = models.CharField(max_length=30)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    minutes = models.IntegerField()
    sms = models.IntegerField()
    internet = models.IntegerField()
    
class Services(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=50)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

class TariffServices(models.Model):
    def __str__(self):
        return f"{self.tariff} - {self.services}"  
    tariff = models.ForeignKey(Tariff, on_delete = models.SET_NULL, null=True)
    services = models.ForeignKey(Services, on_delete = models.SET_NULL, null=True)



#гланвая таблица
class phoneNumbers(models.Model):

    def __str__(self):
        return self.phoneNumber

    phoneNumber = models.CharField(
        max_length=12, 
        primary_key=True
    )

    idSubscriber = models.ForeignKey(SubscriberPersonalData, on_delete = models.SET_NULL, null=True)
    idTariff  = models.ForeignKey(Tariff, on_delete = models.PROTECT)

    balance = models.DecimalField(max_digits=10, decimal_places=2)



class ActivateServices(models.Model):
    phoneNumber = models.ForeignKey(phoneNumbers, on_delete = models.SET_NULL, null=True)
    idServices = models.ForeignKey(Services, on_delete = models.SET_NULL, null=True)
    activationDate = models.DateTimeField()
    deactivationDate = models.DateTimeField(blank=True, null=True)

 