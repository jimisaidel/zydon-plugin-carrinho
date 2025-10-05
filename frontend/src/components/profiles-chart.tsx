import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PersonAdd } from '@mui/icons-material';
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

import { getShoppingCartsRaw } from '../services/api';

interface ProfilesChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export const ProfilesChart = ({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: ProfilesChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadChartData = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      try {
        // Buscar todos os carrinhos independente do status
        const response = await getShoppingCartsRaw('0', '1000'); // Buscar todos os carrinhos

        if (!response || !response.items || !Array.isArray(response.items)) {
          console.log('Dados inválidos para gráfico de perfis');
          setData([]);
          return;
        }

        let carts = response.items || [];

        // Filtrar carrinhos com total > 0
        carts = carts.filter((cart: any) => cart.total > 0);

        // Aplicar filtros se fornecidos
        if (startDate || endDate) {
          carts = carts.filter((cart: any) => {
            const cartDate = new Date(cart.created_at);

            // Normalizar datas para comparação (ignorar hora) - usar apenas a parte da data
            const cartDateStr = cartDate.toISOString().split('T')[0];

            if (startDate) {
              if (cartDateStr < startDate) return false;
            }

            if (endDate) {
              if (cartDateStr > endDate) return false;
            }

            return true;
          });
        }

        if (clientFilter) {
          carts = carts.filter((cart: any) =>
            cart.partner_name?.toLowerCase().includes(clientFilter.toLowerCase())
          );
        }

        if (sellerFilter) {
          carts = carts.filter((cart: any) =>
            cart.seller_name?.toLowerCase().includes(sellerFilter.toLowerCase())
          );
        }

        // Agrupar carrinhos por perfil de usuário
        const profileCounts = carts.reduce((acc: Record<string, number>, cart: any) => {
          const userProfile = cart.user_profile || 'Perfil não informado';
          acc[userProfile] = (acc[userProfile] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Converter para formato do gráfico e ordenar por quantidade
        const formattedData = Object.entries(profileCounts)
          .map(([profileName, count]: [string, any]) => ({
            perfil: profileName.length > 20 ? `${profileName.substring(0, 20)}...` : profileName,
            carrinhos: count,
          }))
          .sort((a: any, b: any) => b.carrinhos - a.carrinhos)
          .slice(0, 10); // Mostrar apenas os top 10 perfis

        if (isMounted) {
          setData(formattedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados dos perfis:', error);
        if (isMounted) {
          setData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadChartData();
    
    return () => {
      isMounted = false;
    };
  }, [timeRange, startDate, endDate, clientFilter, sellerFilter, abandonmentHours]);

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }));

  return (
    <StyledCard>
      <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Carrinhos por Perfil
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantidade de carrinhos por perfil de usuário (todos os status)
            </Typography>
          </Box>
          <PersonAdd sx={{ color: '#666' }} />
        </Box>
        {isLoading ? (
          <Box sx={{ height: { xs: 250, sm: 280, md: 300 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ height: { xs: 250, sm: 280, md: 300 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Nenhum dado disponível para o período selecionado
            </Typography>
          </Box>
        ) : (
          <Box sx={{ height: 300 }}>
            <Bar
              data={{
                labels: data.map(item => item.perfil),
                datasets: [
                  {
                    label: 'Carrinhos',
                    data: data.map(item => item.carrinhos),
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
                    ticks: { color: '#666', font: { size: 12 }, maxRotation: 45 },
                    grid: { display: false },
                  },
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};
