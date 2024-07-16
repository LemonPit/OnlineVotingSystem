import random
from django.core.management.base import BaseCommand
from api.models import Voter, Election, Ballot, Choice, Vote  # Ensure this import matches your actual app name

class Command(BaseCommand):
    help = 'Create random votes for each user in each ballot of each election'

    def handle(self, *args, **kwargs):
        users = Voter.objects.all()
        elections = Election.objects.filter(status__in=['active', 'completed'])

        for user in users:
            for election in elections:
                ballots = Ballot.objects.filter(election=election)
                for ballot in ballots:
                    choices = Choice.objects.filter(ballot=ballot)
                    if choices.exists():
                        choice = random.choice(choices)
                        if not Vote.objects.filter(voter=user, choice=choice).exists():
                            Vote.objects.create(voter=user, choice=choice)
                            self.stdout.write(self.style.SUCCESS(f"{user.username} voted for {choice.choice_text} in {ballot.title} of {election.title}"))
                        else:
                            self.stdout.write(self.style.WARNING(f"{user.username} has already voted in {ballot.title} of {election.title}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"No choices available for {ballot.title} in {election.title}"))

        self.stdout.write(self.style.SUCCESS('Successfully created votes for all users in all ballots for all elections'))
