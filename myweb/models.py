from django.db import models

# Create your models here.
class Quiz(models.Model):
	#quizId = models.AutoField(primary_key=True)
	quizName = models.CharField(max_length=125)
	quizType = models.CharField(max_length=50)
	completed = models.BooleanField(default=False)
	category = models.IntegerField()
	# models.IntegerField

	def __str__(self):
		return self.quizName + ' -- ID: ' + str(self.id) 


class Quizquestion(models.Model):
	quizId = models.IntegerField()
	quizQuestiontext = models.CharField(max_length=250)
	quizAnswer = models.CharField(max_length=250)
	quizResponses = models.CharField(max_length=50,default="None")

	def __str__(self):
		return self.quizQuestiontext + ' -- ID: ' + str(self.id)


class Quizanswer(models.Model):
	# Linked to Quiz question
	quizId = models.IntegerField()
	questionId = models.IntegerField()
	qAnswer = models.CharField(max_length=120)

	def __str__(self):
		return self.qAnswer + ' Quiz ID: ' + str(self.id)


class Quizcat(models.Model):
	category = models.CharField(max_length=120)

	def __str__(self):
		return self.category + ' : ' + str(self.id)


class Star(models.Model):
	starName = models.CharField(max_length=75)

	def __str__(self):
		return self.starName