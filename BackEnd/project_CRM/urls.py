"""
URL configuration for project_CRM project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from logIn.views import first_page
from logIn.views import lk_page
from logIn.views import getFinanceHistrory
from logIn.views import topUpBalance
from logIn.views import lk_exit
from logIn.views import admin_lk
from logIn.views import admin_filterApplication
from logIn.views import admin_findUser
from logIn.views import application
from logIn.views import createApplication






urlpatterns = [
    path('mainAdmin/', admin.site.urls),
    path('', first_page),
    path('lk/', lk_page), 
    path('lk/exit', lk_exit),
    path('lk/getDetalis/', getFinanceHistrory), 
    path('lk/topUpBalance', topUpBalance),
    path('admin/lk', admin_lk),
    path('admin/lk/application_filter', admin_filterApplication),
    path('admin/lk/find_user', admin_findUser),
    path('application', application),
    path('application/create', createApplication)


]
