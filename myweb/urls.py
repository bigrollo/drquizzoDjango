
from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name="home"),
	path('quizzes', views.quizzes, name="quizzes"),
	path('quizview/<Quiz_id>', views.quizview, name="quizview"),	
	path('surveys', views.surveys, name="surveys"),
	path('getquestions/', views.get_questions, name="get_questions"),
	path('getanswers/', views.get_answers, name="get_answers"),
]
