from django.contrib import admin
from .models import Voter, Election, Vote

class ElectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date')  
    list_filter = ('start_date', 'end_date')           
    search_fields = ('title',)    

class VoteInline(admin.TabularInline):
    model = Vote
    extra = 1  # Number of extra forms to display

class VoterAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    inlines = [VoteInline]


admin.site.register(Voter)
admin.site.register(Election)
admin.site.register(Vote)