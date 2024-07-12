from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import ElectionSerializer, BallotSerializer, CandidateSerializer, ChoiceSerializer, VoteSerializer, UserSerializer
from .models import Election, Ballot, Candidate, Choice, Vote


User = get_user_model()

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Login successful", "user_id": user.id}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)

class ElectionList(APIView):
    def get(self, request, format=None):
        """
        Return a list of all elections.
        """
        elections = Election.objects.all()
        serializer = ElectionSerializer(elections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BallotList(APIView):
    def get(self, request, election_id, format=None):
        ballots = Ballot.objects.filter(election_id=election_id)
        serializer = BallotSerializer(ballots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CandidatesByBallotView(APIView):
    def get(self, request, ballot_id):
        ballot = get_object_or_404(Ballot, pk=ballot_id)
        candidates = Candidate.objects.filter(election=ballot.election, ballot=ballot)
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ChoicesByBallotView(APIView):
    def get(self, request, ballot_id):
        ballot = get_object_or_404(Ballot, pk=ballot_id)
        choices = Choice.objects.filter(ballot=ballot)
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class VoteCreateView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        choice_id = request.data.get('choice_id')

        user = get_object_or_404(User, pk=user_id)
        choice = get_object_or_404(Choice, pk=choice_id)

        # Check if the user has already voted on this ballot
        if Vote.objects.filter(voter=user, choice__ballot=choice.ballot).exists():
            return Response({"message": "You have already voted in this ballot."}, status=status.HTTP_400_BAD_REQUEST)

        vote = Vote.objects.create(voter=user, choice=choice)
        serializer = VoteSerializer(vote)
        return Response(serializer.data, status=status.HTTP_201_CREATED)