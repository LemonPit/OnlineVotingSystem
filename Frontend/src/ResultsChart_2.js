import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { MdBarChart } from 'react-icons/md';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FullResultsChart = ({ ballot }) => {
  const labels = ballot.choices.map(choice => choice.choice_text);
  const data = ballot.choices.map(choice => choice.vote_count);

  const totalVotes = data.reduce((sum, votes) => sum + votes, 0);
  const averageVotes = (totalVotes / data.length).toFixed(2);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Votes',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Results for ${ballot.ballot_title}`,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((sum, current) => sum + current, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <MdBarChart size={30} color="#4CAF50" />
        <Typography variant="h6" component="h2" style={{ marginLeft: '10px' }}>
          {ballot.ballot_title} Results
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">Total Votes: {totalVotes}</Typography>
          <Typography variant="body1">Average Votes per Choice: {averageVotes}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Bar data={chartData} options={options} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FullResultsChart;
