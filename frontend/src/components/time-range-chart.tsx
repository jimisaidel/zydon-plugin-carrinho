import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimeRangeChartProps {
  timeRange: string;
}

export const TimeRangeChart = ({}: TimeRangeChartProps) => {
  const data = [
    { hora: '00-02', abandonos: 12 },
    { hora: '02-04', abandonos: 8 },
    { hora: '04-06', abandonos: 5 },
    { hora: '06-08', abandonos: 15 },
    { hora: '08-10', abandonos: 32 },
    { hora: '10-12', abandonos: 45 },
    { hora: '12-14', abandonos: 38 },
    { hora: '14-16', abandonos: 52 },
    { hora: '16-18', abandonos: 67 },
    { hora: '18-20', abandonos: 89 },
    { hora: '20-22', abandonos: 76 },
    { hora: '22-00', abandonos: 43 },
  ];

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }));

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Abandono por Horário
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Distribuição de carrinhos abandonados por horário do dia
        </Typography>
        <Box sx={{ height: 300 }}>
          <Bar
            data={{
              labels: data.map(item => item.hora),
              datasets: [
                {
                  label: 'Abandonos',
                  data: data.map(item => item.abandonos),
                  backgroundColor: '#21DF92',
                  borderColor: '#21DF92',
                  borderWidth: 1,
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: '#666', font: { size: 12 } },
                  grid: { color: '#e0e0e0' },
                },
                x: {
                  ticks: { color: '#666', font: { size: 12 } },
                  grid: { display: false },
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};
