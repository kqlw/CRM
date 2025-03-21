from django.shortcuts import render
from django.shortcuts import redirect

from logIn.models import(
    SubscriberPersonalData,
    Tariff,
    Services,
    TariffServices,
    phoneNumbers,
    ActivateServices
)
# Create your views here.

def first_page(request):
    if (request.method == 'POST'):
        postPhoneNumber = request.POST.get("phoneNumber")

        
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

    

    
    

       