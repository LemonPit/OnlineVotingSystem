from django.contrib import admin
from .models import Voter, Election, Ballot, Candidate, Choice, Vote
class ElectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('title',)

class BallotAdmin(admin.ModelAdmin):
    list_display = ('title', 'election')
    list_filter = ('election',)
    search_fields = ('title', 'election__title')

class CandidateAdmin(admin.ModelAdmin):
    list_display = ('name', 'election', 'ballot')
    list_filter = ('election', 'ballot')
    search_fields = ('name', 'election__title', 'ballot__title')

class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('choice_text', 'ballot', 'candidate')
    list_filter = ('ballot', 'candidate')
    search_fields = ('choice_text', 'ballot__title', 'candidate__name')

class VoteInline(admin.TabularInline):
    model = Vote
    extra = 1

class VoterAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')
    inlines = [VoteInline]

class VoteAdmin(admin.ModelAdmin):
    list_display = ('voter', 'choice')
    list_filter = ('voter', 'choice')
    search_fields = ('voter__username', 'choice__choice_text')

admin.site.register(Voter, VoterAdmin)
admin.site.register(Election, ElectionAdmin)
admin.site.register(Ballot, BallotAdmin)
admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Vote, VoteAdmin)