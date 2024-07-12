from django.urls import path
from .views import register, login_view, ElectionList, BallotList, CandidatesByBallotView, ChoicesByBallotView, VoteCreateView, AllResultsView

urlpatterns = [
    path('register/', register, name='api-register'),
    path('login/', login_view, name='api-login'),
    path('elections/', ElectionList.as_view(), name='election-list'),
    path('ballots/<int:election_id>/', BallotList.as_view(), name='ballot-list'),
    path('candidates/by-ballot/<int:ballot_id>/', CandidatesByBallotView.as_view(), name='candidates-by-ballot'),
    path('choices/by-ballot/<int:ballot_id>/', ChoicesByBallotView.as_view(), name='choices-by-ballot'),
    path('vote/', VoteCreateView.as_view(), name='create-vote'),
    path('results/', AllResultsView.as_view(), name='all-results'),
]