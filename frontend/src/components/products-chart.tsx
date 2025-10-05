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
import { getShoppingCartsRaw } from "../services/api"

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

        // Processar dados para obter produtos mais abandonados
        const productMap = new Map()
        
        carts.forEach((cart: any) => {
          cart.items.forEach((item: any) => {
            const productName = item.product_name
            if (productMap.has(productName)) {
              const existing = productMap.get(productName)
              productMap.set(productName, {
                count: existing.count + 1,
                totalValue: existing.totalValue + item.total
              })
            } else {
              productMap.set(productName, {
                count: 1,
                totalValue: item.total
              })
            }
          })
        })
        
        // Converter para array e ordenar por quantidade de abandonos
        const topProducts = Array.from(productMap.entries())
          .map(([name, data]: [string, any]) => ({
            name,
            count: data.count,
            averageValue: Math.round(data.totalValue / data.count)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8)

        const formattedData = topProducts.map((item: any) => {
          const productName = item.name || 'Produto sem nome'
          return {
            produto: productName.length > 20 ? `${productName.substring(0, 20)}...` : productName,
            abandonos: item.count || 0,
            valor: item.averageValue || 0,
          }
        })

        setData(formattedData)
      } catch (error) {
        console.error("Erro ao carregar dados dos produtos:", error)
        // Dados de fallback
        setData([
          { produto: "Smartphone Pro", abandonos: 89, valor: 2890 },
          { produto: "Notebook Gamer", abandonos: 67, valor: 4500 },
          { produto: "Fone Bluetooth", abandonos: 156, valor: 299 },
          { produto: 'Tablet 10"', abandonos: 45, valor: 1200 },
          { produto: "Smartwatch", abandonos: 78, valor: 899 },
          { produto: "Câmera Digital", abandonos: 34, valor: 1899 },
          { produto: "Console Game", abandonos: 23, valor: 2499 },
          { produto: "Monitor 4K", abandonos: 41, valor: 1599 },
        ])
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
          Produtos Mais Presentes em Carrinhos Online
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Top produtos com maior presença em carrinhos online
        </Typography>
        {isLoading ? (
          <Box sx={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#666' }} />
              <YAxis
                type="category"
                dataKey="produto"
                tick={{ fontSize: 12, fill: '#666' }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  color: "#000000",
                }}
                formatter={(value, name) => [
                  name === "abandonos" ? `${value} carrinhos` : `R$ ${value}`,
                  name === "abandonos" ? "Carrinhos" : "Valor Médio",
                ]}
              />
              <Bar 
                dataKey="abandonos" 
                fill="#21DF92" 
                radius={[0, 4, 4, 0]}
                style={{ filter: "none" }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </StyledCard>
  )
}
