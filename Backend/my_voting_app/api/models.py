from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser


class Voter(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

class Election(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=50)  # e.g., 'upcoming', 'active', 'completed'

class Candidate(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

class Ballot(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

class Choice(models.Model):
    ballot = models.ForeignKey(Ballot, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)  # Linking choice to a candidate
    choice_text = models.CharField(max_length=200)

class Vote(models.Model):
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
