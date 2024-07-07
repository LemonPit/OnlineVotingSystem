from django.core.management.base import BaseCommand
from api.models import Election, Ballot, Candidate, Choice

class Command(BaseCommand):
    help = 'Create choices for each candidate in each ballot'

    def handle(self, *args, **kwargs):
        # Fetch the election, ballots, and candidates
        election = Election.objects.get(pk=1)  # Adjust the election ID as needed
        ballots = Ballot.objects.filter(election=election)
        candidates = Candidate.objects.filter(election=election)

        # Create choices for each candidate in each ballot
        for ballot in ballots:
            for candidate in candidates.filter(ballot=ballot):
                Choice.objects.create(ballot=ballot, candidate=candidate, choice_text=f"Vote for {candidate.name}")
                self.stdout.write(self.style.SUCCESS(f'Created choice for {candidate.name} in ballot {ballot.title}'))

        self.stdout.write(self.style.SUCCESS('Successfully created choices for all candidates in all ballots'))
