import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Inventory } from '@mui/icons-material';
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

interface TopProductsChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export const TopProductsChart = ({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: TopProductsChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      try {
        const response = await getShoppingCartsRaw();
        let carts = response.items || [];
        
        // Filtrar carrinhos com total > 0
        carts = carts.filter((cart: any) => cart.total > 0);

        // Aplicar filtros
        if (startDate || endDate) {
          carts = carts.filter((cart: any) => {
            const cartDate = new Date(cart.created_at);
            const cartDateStr = cartDate.toISOString().split('T')[0];
            
            if (startDate && cartDateStr < startDate) return false;
            if (endDate && cartDateStr > endDate) return false;
            
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

        // Processar produtos
        const productCounts = {} as Record<string, number>;
        
        carts.forEach((cart: any) => {
          if (cart.items && Array.isArray(cart.items)) {
            cart.items.forEach((item: any) => {
              const productName = item.product_name || 'Produto sem nome';
              productCounts[productName] = (productCounts[productName] || 0) + 1;
            });
          }
        });

        // Converter para formato do gráfico
        const formattedData = Object.entries(productCounts)
          .map(([name, count]) => ({
            produto: name.length > 20 ? `${name.substring(0, 20)}...` : name,
            quantidade: count,
          }))
          .sort((a, b) => b.quantidade - a.quantidade)
          .slice(0, 10);

        if (isMounted) {
          setData(formattedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados dos produtos:', error);
        if (isMounted) {
          setData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    
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
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Inventory />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Top 10 Produtos
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Produtos mais presentes nos carrinhos
        </Typography>
        
        {isLoading ? (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Nenhum dado disponível para o período selecionado
            </Typography>
          </Box>
        ) : (
          <Box sx={{ height: 400 }}>
            <Bar
              data={{
                labels: data.map(item => item.produto),
                datasets: [
                  {
                    label: 'Quantidade',
                    data: data.map(item => item.quantidade),
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
        )}
      </CardContent>
    </StyledCard>
  );
};
