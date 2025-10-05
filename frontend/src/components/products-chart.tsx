import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
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

interface ProductsChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export function ProductsChart({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: ProductsChartProps) {
  const [data] = useState([
    { produto: "Smartphone Pro", abandonos: 89 },
    { produto: "Notebook Gamer", abandonos: 67 },
    { produto: "Fone Bluetooth", abandonos: 156 },
    { produto: 'Tablet 10"', abandonos: 45 },
    { produto: "Smartwatch", abandonos: 78 },
    { produto: "Câmera Digital", abandonos: 34 },
    { produto: "Console Game", abandonos: 23 },
    { produto: "Monitor 4K", abandonos: 41 },
  ]);

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  }))

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Produtos Mais Presentes em Carrinhos Online
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Top produtos com maior presença em carrinhos online
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar
            data={{
              labels: data.map(item => item.produto),
              datasets: [
                {
                  label: 'Carrinhos',
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
              indexAxis: 'y',
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: { color: '#666', font: { size: 12 } },
                  grid: { color: '#e0e0e0' },
                },
                y: {
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
