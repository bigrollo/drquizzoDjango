from django.shortcuts import render
from .models import Quiz
from .models import Star
from .models import Quizquestion
from .models import Quizanswer
from django.http import JsonResponse
from django.core import serializers


# Create your views here.

def home(request):
	user_options  = ["Quizzes","Surveys","Games"]
	return render(request, 'home.html', {'user_options' : user_options})


def quizzes(request):
	myname = 'Marcs Quizzes'
	quiz_info  = Quiz.objects.all()

	return render(request, 'quizzes.html', {'quiz_info' : quiz_info})


def quizview(request, Quiz_id):
	curr_page = "Quiz View Yo!" + " " + Quiz_id
	quiz_questions = Quizquestion.objects.filter(quizId=Quiz_id)

	return render(request, 'quizview.html', {"quiz_questions" : quiz_questions})


def surveys(request):
	myname = 'Marcs Surveys'
	myData_yo = { 'id' : 22,'name' : 'Kylie Juretus', 'Role' : 'My Bad'}
	return render(request, 'surveys.html', {'sitename': 'Marcs Quizzes'})


def get_questions(request):
	my_data = serializers.serialize("json",Quizquestion.objects.filter(quizId=1))
	return JsonResponse(my_data, safe=False)


def get_answers(request):
	answer_data = serializers.serialize("json",Quizanswer.objects.filter(questionId=1))
	return JsonResponse(answer_data, safe=False)