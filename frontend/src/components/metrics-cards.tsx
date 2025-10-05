import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { 
  AttachMoney, 
  Inventory, 
  Pause, 
  ShoppingCart, 
  TrendingDown, 
  TrendingUp, 
  People,
  Timeline 
} from '@mui/icons-material';

import { getShoppingCarts } from '../services/api';
interface MetricsCardsProps {
  timeRange: string;
  startDate?: string;
  endDate?: string;
  clientFilter?: string;
  sellerFilter?: string;
  abandonmentHours?: number;
}

export const MetricsCards = ({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: MetricsCardsProps) => {
  const [metrics, setMetrics] = useState({
    totalOnlineCarts: 0,
    totalInProgressCarts: 0,
    totalAbandonedCarts: 0,
    totalValue: 0,
    totalValueInProgress: 0,
    totalValueAbandoned: 0,
    totalItems: 0,
    totalItemsInProgress: 0,
    totalItemsAbandoned: 0,
    abandonmentRate: 0,
    uniqueCustomers: 0,
    averageTime: '0h 0m',
    recoveryRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadMetrics = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      try {
        const data = await getShoppingCarts({
          timeRange,
          startDate,
          endDate,
          clientFilter,
          sellerFilter,
          abandonmentHours,
        });
        
        if (isMounted) {
          setMetrics(data);
        }
      } catch (error) {
        console.error('Erro ao carregar métricas:', error);
        // Manter os valores padrão em caso de erro
        if (isMounted) {
          setMetrics({
            totalOnlineCarts: 0,
            totalInProgressCarts: 0,
            totalAbandonedCarts: 0,
            totalValue: 0,
            totalValueInProgress: 0,
            totalValueAbandoned: 0,
            totalItems: 0,
            totalItemsInProgress: 0,
            totalItemsAbandoned: 0,
            abandonmentRate: 0,
            uniqueCustomers: 0,
            averageTime: '0h 0m',
            recoveryRate: 0,
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMetrics();
    
    return () => {
      isMounted = false;
    };
  }, [
    timeRange,
    startDate,
    endDate,
    clientFilter,
    sellerFilter,
    abandonmentHours,
  ]);

  const metricsDisplay = [
    {
      title: 'Carrinhos Online',
      value: isLoading ? '...' : metrics.totalOnlineCarts.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      description: 'todos os carrinhos ativos',
      additionalInfo: [
        {
          label: 'Valor Total',
          value: isLoading
            ? '...'
            : `R$ ${metrics.totalValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`,
          icon: AttachMoney,
        },
        {
          label: 'Qtd de Itens',
          value: isLoading ? '...' : metrics.totalItems.toLocaleString(),
          icon: Inventory,
        },
      ],
    },
    {
      title: 'Carrinhos Em Andamento',
      value: isLoading ? '...' : metrics.totalInProgressCarts.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Timeline,
      description: `ativos há menos de ${abandonmentHours}h`,
      additionalInfo: [
        {
          label: 'Valor Total',
          value: isLoading
            ? '...'
            : `R$ ${metrics.totalValueInProgress.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`,
          icon: AttachMoney,
        },
        {
          label: 'Qtd de Itens',
          value: isLoading
            ? '...'
            : metrics.totalItemsInProgress.toLocaleString(),
          icon: Inventory,
        },
      ],
    },
    {
      title: 'Carrinhos Abandonados',
      value: isLoading ? '...' : metrics.totalAbandonedCarts.toLocaleString(),
      change: '-2.1%',
      trend: 'down',
      icon: Pause,
      description: `inativos há mais de ${abandonmentHours}h`,
      additionalInfo: [
        {
          label: 'Valor Total',
          value: isLoading
            ? '...'
            : `R$ ${metrics.totalValueAbandoned.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`,
          icon: AttachMoney,
        },
        {
          label: 'Qtd de Itens',
          value: isLoading
            ? '...'
            : metrics.totalItemsAbandoned.toLocaleString(),
          icon: Inventory,
        },
      ],
    },
    {
      title: 'Valor Total Online',
      value: isLoading
        ? '...'
        : `R$ ${metrics.totalValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`,
      change: '+15.3%',
      trend: 'up',
      icon: AttachMoney,
      description: 'valor total dos carrinhos',
    },
    {
      title: 'Taxa de Abandono',
      value: isLoading ? '...' : `${metrics.abandonmentRate.toFixed(1)}%`,
      change: '-3.2%',
      trend: 'down',
      icon: TrendingDown,
      description: 'melhoria vs período anterior',
    },
    {
      title: 'Clientes Únicos',
      value: isLoading ? '...' : metrics.uniqueCustomers.toLocaleString(),
      change: '+5.8%',
      trend: 'up',
      icon: People,
      description: 'com carrinhos online',
    },
  ];

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  }));

  return (
    <Grid container spacing={2}>
      {metricsDisplay.slice(0, 3).map((metric: any, index: number) => (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={index}>
          <StyledCard>
            <CardContent sx={{ p: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {metric.title}
                </Typography>
                <metric.icon
                  size={16}
                  color="currentColor"
                  style={{ opacity: 0.7 }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                }}
              >
                {metric.value}
              </Typography>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color:
                      metric.trend === 'up' ? 'primary.main' : 'secondary.main',
                  }}
                >
                  {metric.trend === 'up' ? (
                    <TrendingUp sx={{ mr: 0.5 }} fontSize="small" />
                  ) : (
                    <TrendingDown sx={{ mr: 0.5 }} fontSize="small" />
                  )}
                  <Typography variant="caption">{metric.change}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {metric.description}
                </Typography>
              </Box>

              {metric.additionalInfo && (
                <Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {metric.additionalInfo.map(
                      (info: any, infoIndex: number) => (
                        <Box
                          key={infoIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <info.icon
                              size={12}
                              color="currentColor"
                              style={{ opacity: 0.7 }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {info.label}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {info.value}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};
