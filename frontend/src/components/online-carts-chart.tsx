import { useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AbandonmentChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export function AbandonmentChart({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: AbandonmentChartProps) {
  const [data] = useState([
    { date: "01/01", online: 45, emAndamento: 30, abandonados: 15, recuperados: 5 },
    { date: "02/01", online: 52, emAndamento: 35, abandonados: 17, recuperados: 6 },
    { date: "03/01", online: 48, emAndamento: 32, abandonados: 16, recuperados: 4 },
    { date: "04/01", online: 61, emAndamento: 40, abandonados: 21, recuperados: 8 },
    { date: "05/01", online: 55, emAndamento: 37, abandonados: 18, recuperados: 7 },
    { date: "06/01", online: 67, emAndamento: 45, abandonados: 22, recuperados: 9 },
    { date: "07/01", online: 59, emAndamento: 39, abandonados: 20, recuperados: 6 },
  ]);

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  }))

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Tendência de Carrinhos Online
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Carrinhos online, em andamento e abandonados ao longo do tempo
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line
            data={{
              labels: data.map(item => item.date),
              datasets: [
                {
                  label: 'Online',
                  data: data.map(item => item.online),
                  borderColor: '#21DF92',
                  backgroundColor: 'rgba(33, 223, 146, 0.1)',
                  borderWidth: 2,
                  tension: 0.1,
                },
                {
                  label: 'Em Andamento',
                  data: data.map(item => item.emAndamento),
                  borderColor: '#2196F3',
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  borderWidth: 2,
                  tension: 0.1,
                },
                {
                  label: 'Abandonados',
                  data: data.map(item => item.abandonados),
                  borderColor: '#FF9800',
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  borderWidth: 2,
                  tension: 0.1,
                },
                {
                  label: 'Recuperados',
                  data: data.map(item => item.recuperados),
                  borderColor: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderWidth: 2,
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#666',
                    font: { size: 12 },
                  },
                },
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
  )
}
