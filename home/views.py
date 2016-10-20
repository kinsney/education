from django.shortcuts import render,get_object_or_404

# Create your views here.

def home(request):
    return render(request,'home.html',locals())
