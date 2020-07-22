from django.contrib import admin
from .models import Quiz
from .models import Star
from .models import Quizquestion
from .models import Quizanswer

# Register your models here.

admin.site.register(Quiz)
admin.site.register(Star)
admin.site.register(Quizquestion)
admin.site.register(Quizanswer)