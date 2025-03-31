from django.shortcuts import render
from django.shortcuts import redirect
from django.db.models import Q
from django.http import JsonResponse
from decimal import Decimal
from django.utils import timezone
from django.contrib.auth import logout
import json

from logIn.models import(
    SubscriberPersonalData,
    Tariff,
    Services,
    TariffServices,
    phoneNumbers,
    ActivateServices,
    FinanceHistory
)
# Create your views here.

def first_page(request):
    if (request.method == 'POST'):

        postData = json.loads(request.body.decode('utf-8'))
        
        postPhoneNumber = postData.get("phoneNumber")

        
        try:
            findPhoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)
            
            print(postPhoneNumber)
            request.session['phoneNumber'] = postPhoneNumber

            return redirect('/lk')
        except ObjectDoesNotExist:
            print("Объект не сушествует")
        except MultipleObjectsReturned:
            print("Найдено более одного объекта")

    elif(request.method == 'GET'):
        return render(request, 'user_authorization.html')


def lk_page(request):

    if (request.method == 'GET'):
        postPhoneNumber = request.session.get('phoneNumber')

        findPhoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)
        tariffServices = TariffServices.objects.filter(tariff = findPhoneNumber.idTariff.id)

        data = {
            "phoneNumber": findPhoneNumber.phoneNumber,
            "surname": findPhoneNumber.idSubscriber.surname,
            "name": findPhoneNumber.idSubscriber.name,
            "patronymic": findPhoneNumber.idSubscriber.patronymic,
            "birthday": findPhoneNumber.idSubscriber.birthday,
            "passportSeries": findPhoneNumber.idSubscriber.passportSeries,
            "passportNumber": findPhoneNumber.idSubscriber.passportNumber,

            "tariff_name":findPhoneNumber.idTariff.name,
            "tariff_minutes":findPhoneNumber.idTariff.minutes,
            "tariff_sms":findPhoneNumber.idTariff.sms,
            "tariff_internet":findPhoneNumber.idTariff.internet,
            "tariff_cost" : findPhoneNumber.idTariff.cost,

            "balance":findPhoneNumber.balance,
            "tariffServices":tariffServices
            
        }


        return render(request, 'user_lk.html', context=data)
    
def lk_exit(request):
    if (request.method == "GET"):
        request.session.flush()  # Очищает всю сессию
        logout(request)
        
        data = request.session

        return JsonResponse({"data": data})

def getFinanceHistrory(request):
    
    if(request.method == "GET"):
        
        dateFrom = request.GET.get("dateFrom")
        dateTo = request.GET.get("dateTo")

        phoneNumber = request.GET.get('phoneNumber')

        financeHistory = FinanceHistory.objects.filter(Q(phoneNumber = phoneNumber) & Q(date__range=[dateFrom, dateTo]))

        data = [
            {
                "phone": phoneNumber,
                "date" : el.date,
                "name" : el.name,
                "cost" : el.cost
            }
            for el in financeHistory
        ]


        return JsonResponse({"data": data})


def topUpBalance(request):
    if(request.method == "POST"):

        postData = json.loads(request.body.decode('utf-8'))
        
        postPhoneNumber = postData.get("phoneNumber")

        value = postData.get("value")
        value = Decimal(str(value)).quantize(Decimal('0.00'))

        findPhoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)

        FinanceHistory.objects.create(
            phoneNumber = findPhoneNumber,
            date = timezone.now(),
            name = "Пополнение баланса",
            cost = value
        )

        findPhoneNumber.balance += value

        findPhoneNumber.save()

        data = {
            "phone": postPhoneNumber,
            "value" : findPhoneNumber.balance
            }
        
        return JsonResponse({"data": data})

        

    
    

    
    

       