from django.contrib import admin
from .models import Voter, Election, Ballot, Candidate, Choice, Vote
class ElectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('title',)

class VoteInline(admin.TabularInline):
    model = Vote
    extra = 1

class VoterAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')
    inlines = [VoteInline]

admin.site.register(Voter, VoterAdmin)
admin.site.register(Election, ElectionAdmin)
admin.site.register(Ballot)
admin.site.register(Candidate)
admin.site.register(Choice)
admin.site.register(Vote)