from django.db import models

# Create your models here.
class Voter(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

class Election(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

class Vote(models.Model):
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    choice = models.CharField(max_length=200)
