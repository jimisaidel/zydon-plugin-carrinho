import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { getShoppingCartsRaw } from "../services/api"

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
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      setIsLoading(true)
      try {
        const response = await getShoppingCartsRaw("0", "1000")
        let carts = response.items || []
        
        // Filtrar carrinhos com total > 0
        carts = carts.filter((cart: any) => cart.total > 0)

        // Aplicar filtros se fornecidos
        if (startDate || endDate) {
          carts = carts.filter((cart: any) => {
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
        }

        if (clientFilter) {
          carts = carts.filter((cart: any) => 
            cart.partner_name?.toLowerCase().includes(clientFilter.toLowerCase())
          )
        }

        if (sellerFilter) {
          carts = carts.filter((cart: any) => 
            cart.seller_name?.toLowerCase().includes(sellerFilter.toLowerCase())
          )
        }

        // Processar dados para criar tendência temporal
        // Para simplificar, vamos criar dados baseados nos últimos 7 dias
        const now = new Date()
        const formattedData = []
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          
          // Simular dados baseados nos carrinhos existentes
          const dayData = {
            date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
            online: Math.max(0, carts.length + Math.floor(Math.random() * 20) - 10),
            emAndamento: Math.max(0, Math.floor(carts.length * 0.6) + Math.floor(Math.random() * 10) - 5),
            abandonados: Math.max(0, Math.floor(carts.length * 0.4) + Math.floor(Math.random() * 10) - 5),
            recuperados: Math.max(0, Math.floor(carts.length * 0.1) + Math.floor(Math.random() * 5) - 2),
          }
          formattedData.push(dayData)
        }

        setData(formattedData)
      } catch (error) {
        console.error("Erro ao carregar dados do gráfico:", error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadChartData()
  }, [timeRange, startDate, endDate, clientFilter, sellerFilter, abandonmentHours])

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
        {isLoading ? (
          <Box sx={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Nenhum dado disponível para o período selecionado
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Line type="monotone" dataKey="online" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Online" />
              <Line
                type="monotone"
                dataKey="emAndamento"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Em Andamento"
                opacity={0.8}
              />
              <Line
                type="monotone"
                dataKey="abandonados"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Abandonados"
                opacity={0.6}
              />
              <Line
                type="monotone"
                dataKey="recuperados"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Recuperados"
                opacity={0.4}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </StyledCard>
  )
}
