import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { ResponsiveContainer } from "recharts/lib/component/ResponsiveContainer";
import { BarChart } from "recharts/lib/chart/BarChart";
import { Bar } from "recharts/lib/cartesian/Bar";
import { XAxis } from "recharts/lib/cartesian/XAxis";
import { YAxis } from "recharts/lib/cartesian/YAxis";
import { CartesianGrid } from "recharts/lib/cartesian/CartesianGrid";
import { Tooltip } from "recharts/lib/component/Tooltip";
import { LabelList } from "recharts/lib/component/LabelList";
import { getShoppingCartsRaw } from "../services/api"
import { Business } from '@mui/icons-material';

interface ClientsChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export function ClientsChart({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: ClientsChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      setIsLoading(true)
      try {
        // Buscar todos os carrinhos independente do status
        const response = await getShoppingCartsRaw("0", "1000") // Buscar todos os carrinhos
        
        if (!response || !response.items || !Array.isArray(response.items)) {
          console.log("Dados inválidos para gráfico de clientes")
          setData([])
          return
        }

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

        // Agrupar carrinhos por cliente (partner_name)
        const clientCounts = carts.reduce((acc: Record<string, number>, cart: any) => {
          const partnerName = cart.partner_name || 'Cliente sem nome'
          acc[partnerName] = (acc[partnerName] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        // Converter para formato do gráfico e ordenar por quantidade
        const formattedData = Object.entries(clientCounts)
          .map(([clientName, count]: [string, any]) => ({
            cliente: clientName.length > 20 ? `${clientName.substring(0, 20)}...` : clientName,
            carrinhos: count,
          }))
          .sort((a: any, b: any) => b.carrinhos - a.carrinhos)
          .slice(0, 10) // Mostrar apenas os top 10 clientes

        setData(formattedData)
      } catch (error) {
        console.error("Erro ao carregar dados dos clientes:", error)
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
      <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Carrinhos por Parceiro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantidade de carrinhos por parceiro (todos os status)
            </Typography>
          </Box>
          <Building2 size={16} color="#666" />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="cliente"
                tick={{ fontSize: 12, fill: '#666' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                          padding: "8px 12px",
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        <p style={{ color: "hsl(var(--foreground))", margin: 0, marginBottom: "4px" }}>
                          {label}
                        </p>
                        <p style={{ color: "hsl(var(--foreground))", margin: 0 }}>
                          {`${payload[0].value} carrinhos`}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar 
                dataKey="carrinhos" 
                fill="#21DF92" 
                radius={[4, 4, 0, 0]}
                style={{ filter: "none" }}
              >
                <LabelList
                  dataKey="carrinhos"
                  position="top"
                  style={{
                    fill: "hsl(var(--foreground))",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </StyledCard>
  )
}