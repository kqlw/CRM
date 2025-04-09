from django.shortcuts import render
from django.shortcuts import redirect
from django.db.models import Q
from django.http import JsonResponse
from decimal import Decimal
from django.utils import timezone
from django.contrib.auth import logout
from datetime import timedelta

import json

from logIn.models import(
    SubscriberPersonalData,
    Tariff,
    Services,
    TariffServices,
    phoneNumbers,
    ActivateServices,
    FinanceHistory,
    Application
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
        application = Application.objects.filter(Q(phoneNumber=findPhoneNumber))

        data = {
            "phoneNumber": findPhoneNumber.phoneNumber,
            "isActive" : findPhoneNumber.isActive,
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
            "tariffServices":tariffServices,

            "application" : application

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

        

    
    

def admin_lk(request):
    return render(request, 'admin_lk.html')
    
    

def admin_filterApplication(request):
    if (request.method == "GET"):
        dateFrom = request.GET.get("dateFrom")
        dateTo= request.GET.get("dateTo")
        status = request.GET.get("status")

        if(dateFrom != "" and dateTo!= ""):
            application = Application.objects.filter(~Q(status = status) & Q(date__range=[dateFrom, dateTo]))

        elif(dateFrom != ""):
            application = Application.objects.filter(~Q(status = status) & Q(dateStart__gte=dateFrom))
        elif(dateTo != ""):
            application = Application.objects.filter(~Q(status = status) & Q(dateStart__lte=dateTo))
        else:
            application = Application.objects.filter(~Q(status = status))
        
        data = [{
            "id" : el.id,
            "dateStart" : el.dateStart,
            "dateEnd" : el.dateEnd,
            "communicationMethod" : el.communicationMethod,
            "contact" : el.contact,
            "question" : el.question,
            "answer" : el.answer,
            "status" : el.status,
        }
        for el in application]


        return JsonResponse({"data": data})



def admin_findUser(request):
    if (request.method == "GET"):
        postPhoneNumber = request.GET.get("phoneNumber")
        

        findPhoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)
        allTariffs = Tariff.objects.filter(~Q(id=findPhoneNumber.idTariff.id))

        allTariffsJSON = [
            {
                "id": el.id,
                "name": el.name
            } for el in allTariffs
        ]

        current_tariff = {
            "id": findPhoneNumber.idTariff.id,
            "name": findPhoneNumber.idTariff.name
        }

        data = {
            "phoneNumber": findPhoneNumber.phoneNumber,
            "isActive" : findPhoneNumber.isActive,
            "surname": findPhoneNumber.idSubscriber.surname,
            "name": findPhoneNumber.idSubscriber.name,
            "patronymic": findPhoneNumber.idSubscriber.patronymic,
            "birthday": findPhoneNumber.idSubscriber.birthday,
            "passportSeries": findPhoneNumber.idSubscriber.passportSeries,
            "passportNumber": findPhoneNumber.idSubscriber.passportNumber,

            "current_tariff":current_tariff,
            "allTariffs": allTariffsJSON
        }


        return JsonResponse({"data": data})    
    
    elif (request.method == "POST"):
        postData = json.loads(request.body.decode('utf-8'))

        postPhoneNumber = postData.get("phoneNumber")
        isActive = postData.get("isActive")


        surname = postData.get("surname")
        name = postData.get("name")
        patronymic = postData.get("patronymic")
        birthday = postData.get("birthday")
        passportSeries = postData.get("passportSeries")
        passportNumber = postData.get("passportNumber")


        postTariff = postData.get("current_tariff")
        findTariff = Tariff.objects.get(id=postTariff)


        phoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)

        phoneNumber.isActive = isActive
        
        phoneNumber.idTariff = findTariff
        
        subscriber =  phoneNumber.idSubscriber
        
        subscriber.surname = surname
        subscriber.name = name
        subscriber.patronymic = patronymic
        
        subscriber.birthday = birthday

        subscriber.passportSeries = passportSeries
        subscriber.passportNumber = passportNumber


        subscriber.save()
        phoneNumber.save()

        return JsonResponse({'status':'success'})




def application(request):
    if (request.method == "GET"):
        applicationID = request.GET.get("id")
        
        application = Application.objects.get(id=applicationID)

        data = {
            "id" : application.id,
            "phoneNumber" : application.phoneNumber.phoneNumber,
    
            "dateStart" : application.dateStart,
            "dateEnd" : application.dateEnd,
            
            "communicationMethod" : application.communicationMethod,
            "contact" : application.contact,
            
            "question" : application.question,
            "answer" : application.answer,

            "status" : application.status
            }
        

        return JsonResponse({'data':data})
    

    elif (request.method == "POST"):
        postData = json.loads(request.body.decode('utf-8'))

        status = postData.get("status")
        answer = postData.get("answer")


        applicationID = postData.get("id")
        application = Application.objects.get(id=applicationID)

        application.answer = answer
        application.status = status

        if status == "close":
            application.dateEnd = timezone.now()
            

        application.save()
        return JsonResponse({'status': "sucsess"})


def createApplication(request):
    if(request.method == "POST"):

        postData = json.loads(request.body.decode('utf-8'))
        
        postPhoneNumber = postData.get("phoneNumber")
        question = postData.get("question")
        communicationMethod = postData.get("communicationMethod")
        contact = postData.get("contact")

        findPhoneNumber = phoneNumbers.objects.get(phoneNumber=postPhoneNumber)

        Application.objects.create(
            phoneNumber = findPhoneNumber,
            dateStart = timezone.now(),
            dateEnd = timezone.now() + timedelta(days=5),
            
            communicationMethod = communicationMethod,
            contact = contact,
            
            question = question,
            answer = "-",

            status = "open"
        )
        
        applications = Application.objects.filter(Q(phoneNumber=postPhoneNumber))

        data = [
            {
                "id" : el.id,
                "dateStart": el.dateStart,
                "dateEnd": el.dateEnd,
                "status":el.status
            }
            for el in applications
        ]
        
        return JsonResponse({"data": data})