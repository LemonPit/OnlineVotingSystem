from django.core.management.base import BaseCommand
from api.models import Election, Ballot, Candidate, Choice

class Command(BaseCommand):
    help = 'Create choices for each candidate in each ballot for all elections'

    def handle(self, *args, **kwargs):
        # Fetch all elections
        elections = Election.objects.all()

        for election in elections:
            ballots = Ballot.objects.filter(election=election)
            candidates = Candidate.objects.filter(election=election)

            # Create choices for each candidate in each ballot
            for ballot in ballots:
                for candidate in candidates.filter(ballot=ballot):
                    if not Choice.objects.filter(ballot=ballot, candidate=candidate).exists():
                        Choice.objects.create(ballot=ballot, candidate=candidate, choice_text=f"Vote for {candidate.name}")
                        self.stdout.write(self.style.SUCCESS(f'Created choice for {candidate.name} in ballot {ballot.title}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'Choice for {candidate.name} in ballot {ballot.title} already exists'))

        self.stdout.write(self.style.SUCCESS('Successfully created choices for all candidates in all ballots for all elections'))
