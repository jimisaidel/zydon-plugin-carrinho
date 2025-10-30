import { useEffect, useState } from "react"
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { PersonAdd } from '@mui/icons-material';
import { getShoppingCartsRaw } from "../services/api"

interface SellersChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  abandonmentHours: number
  clientFilter?: string
  sellerFilter?: string
}

interface SellerData {
  sellerName: string
  count: number
}

export function SellersChart({ timeRange, startDate, endDate, abandonmentHours, clientFilter, sellerFilter }: SellersChartProps) {
  const [data, setData] = useState<SellerData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await getShoppingCartsRaw()
        let carts = response.items || []
        
        // Filtrar carrinhos com total > 0
        carts = carts.filter((cart: any) => cart.total > 0)
        
        let filteredCarts = carts

        // Aplicar filtros de data se fornecidos
        if (startDate || endDate) {
          filteredCarts = filteredCarts.filter((cart: any) => {
            const cartDate = new Date(cart.created_at)
            
            // Normalizar datas para comparação (ignorar hora) - usar apenas a parte da data
            const cartDateStr = cartDate.toISOString().split('T')[0]
            
            if (startDate) {
              if (cartDateStr < startDate) return false
            }
            
            if (endDate) {
              if (cartDateStr > endDate) return false
            }
            
            return true
          })
        } else {
          // Filter carts based on time range apenas se não houver filtro de data específico
          const now = new Date()
          filteredCarts = filteredCarts.filter((cart: any) => {
            const cartDate = new Date(cart.created_at)
            const diffInHours = (now.getTime() - cartDate.getTime()) / (1000 * 60 * 60)

            switch (timeRange) {
              case "24h":
                return diffInHours <= 24
              case "7d":
                return diffInHours <= 24 * 7
              case "30d":
                return diffInHours <= 24 * 30
              case "90d":
                return diffInHours <= 24 * 90
              default:
                return true
            }
          })
        }

        // Apply client filter
        if (clientFilter) {
          filteredCarts = filteredCarts.filter((cart: any) => 
            cart.partner_name?.toLowerCase().includes(clientFilter.toLowerCase())
          )
        }

        // Apply seller filter
        if (sellerFilter) {
          filteredCarts = filteredCarts.filter((cart: any) => 
            cart.seller_name?.toLowerCase().includes(sellerFilter.toLowerCase())
          )
        }

        // Group by seller name
        const sellerGroups = filteredCarts.reduce((acc: Record<string, number>, cart: any) => {
          const sellerName = cart.seller_name || "SEM VENDEDOR"
          acc[sellerName] = (acc[sellerName] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        // Convert to array and sort by count
        const sellerData = Object.entries(sellerGroups)
          .map(([sellerName, count]: [string, any]) => ({
            sellerName,
            count,
          }))
          .sort((a: SellerData, b: SellerData) => b.count - a.count)
          .slice(0, 10) // Show top 10 sellers

        setData(sellerData)
      } catch (error) {
        console.error("Error loading sellers data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [timeRange, startDate, endDate, abandonmentHours, clientFilter, sellerFilter])





  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  }))

  return (
    <StyledCard>
      <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Carrinhos por Vendedor
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantidade de carrinhos por vendedor (todos os status)
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
                labels: data.map(item => item.sellerName),
                datasets: [
                  {
                    label: 'Carrinhos',
                    data: data.map(item => item.count),
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
  )
}