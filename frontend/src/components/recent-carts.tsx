import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getShoppingCartsRaw } from "../services/api"
import { Schedule, Visibility, FileDownload } from '@mui/icons-material';

interface ShoppingCart {
  id: string
  user_name: string
  user_profile: string
  partner_name: string
  seller_name: string
  total: number
  created_at: string
  updated_at: string
  status?: string
  items: Array<{
    id: string
    product_name: string
    quantity: number
    total: number
  }>
}

interface RecentCartsProps {
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

export function RecentCarts({
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: RecentCartsProps) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [recentCarts, setRecentCarts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(20)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let isMounted = true;
    
    const loadRecentCarts = async () => {
      if (!isMounted) return;
      
      setLoading(true)
      try {
        const response = await getShoppingCartsRaw()
        let filteredCarts = response.items
        
        // Filtrar carrinhos com total > 0
        filteredCarts = filteredCarts.filter((cart: any) => cart.total > 0)

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
        }

        if (clientFilter) {
          filteredCarts = filteredCarts.filter(
            (cart: any) =>
              cart.partner_name?.toLowerCase().includes(clientFilter.toLowerCase())
          )
        }

        if (sellerFilter) {
          filteredCarts = filteredCarts.filter((cart: any) =>
            cart.seller_name?.toLowerCase().includes(sellerFilter.toLowerCase())
          )
        }

        // Ordenar por data de atualização (mais recentes primeiro)
        const sortedCarts = filteredCarts.sort((a: any, b: any) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )

        if (isMounted) {
          setRecentCarts(sortedCarts)
        }
      } catch (error) {
        console.error("Erro ao carregar carrinhos recentes:", error)
        if (isMounted) {
          setRecentCarts([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadRecentCarts()
    
    return () => {
      isMounted = false;
    };
  }, [startDate, endDate, clientFilter, sellerFilter, abandonmentHours])

  useEffect(() => {
    setPage(0)
  }, [startDate, endDate, clientFilter, sellerFilter])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const paginatedCarts = useMemo(() => {
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return recentCarts.slice(startIndex, endIndex)
  }, [recentCarts, page, rowsPerPage])

  const handleExportToExcel = () => {
    // Preparar dados para exportação
    const exportData = recentCarts.map((cart: ShoppingCart) => {
      const now = new Date()
      const updatedAt = new Date(cart.updated_at)
      const hoursSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60)
      const isAbandoned = hoursSinceUpdate >= abandonmentHours
      const qtdSku = cart.items.length
      const qtdItens = cart.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0

      return {
        'Nome do Usuário': cart.user_name || 'Usuário',
        'Perfil': cart.user_profile || 'PARTNER',
        'Nome do Parceiro': cart.partner_name || '-',
        'Nome do Vendedor': cart.seller_name || '-',
        'Qtd SKU': qtdSku,
        'Qtd Itens': qtdItens,
        'Total': cart.total.toFixed(2),
        'Status': isAbandoned ? 'Abandonado' : 'Em Andamento',
        'Criado em': new Date(cart.created_at).toLocaleDateString("pt-BR"),
        'Atualizado em': new Date(cart.updated_at).toLocaleDateString("pt-BR")
      }
    })

    // Criar HTML table para Excel
    const headers = Object.keys(exportData[0] || {})
    
    let htmlContent = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
    htmlContent += '<head>'
    htmlContent += '<meta charset="UTF-8">'
    htmlContent += '<style>table { border-collapse: collapse; } td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }</style>'
    htmlContent += '</head>'
    htmlContent += '<body>'
    htmlContent += '<table>'
    
    // Cabeçalhos
    htmlContent += '<thead><tr>'
    headers.forEach(header => {
      htmlContent += `<th>${header}</th>`
    })
    htmlContent += '</tr></thead>'
    
    // Dados
    htmlContent += '<tbody>'
    exportData.forEach(row => {
      htmlContent += '<tr>'
      headers.forEach(header => {
        const value = row[header as keyof typeof row]
        htmlContent += `<td>${value}</td>`
      })
      htmlContent += '</tr>'
    })
    htmlContent += '</tbody>'
    htmlContent += '</table>'
    htmlContent += '</body>'
    htmlContent += '</html>'

    // Criar BOM para UTF-8
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `carrinhos_${new Date().toISOString().split('T')[0]}.xls`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTimeAgo = useMemo(() => {
    if (!mounted) return () => "Carregando..."
    
    return (dateString: string) => {
      const now = new Date()
      const date = new Date(dateString)
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 60) {
        return `${diffInMinutes} min atrás`
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60)
        return `${hours}h atrás`
      } else {
        const days = Math.floor(diffInMinutes / 1440)
        return `${days}d atrás`
      }
    }
  }, [mounted])

  const getStatusBadge = (cart: ShoppingCart) => {
    const now = new Date()
    const updatedAt = new Date(cart.updated_at)
    const hoursSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60)
    const isAbandoned = hoursSinceUpdate >= abandonmentHours
    
    return (
      <Chip 
        label={isAbandoned ? "Abandonado" : "Em Andamento"}
        size="small"
        color={isAbandoned ? "error" : "primary"}
        variant="outlined"
      />
    )
  }

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  }))

  if (loading) {
    return (
      <StyledCard>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Carrinhos Recentes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Últimos carrinhos online
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(5)].map((_: any, i: number) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Box>
                    <Skeleton variant="text" width={96} height={16} />
                    <Skeleton variant="text" width={128} height={12} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    )
  }

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="h6">
              Carrinhos Recentes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Últimos carrinhos online
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExportToExcel}
            disabled={recentCarts.length === 0}
            size="small"
          >
            Exportar XLS
          </Button>
        </Box>
        <Box sx={{ mb: 2 }} />
        {isMobile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentCarts.map((cart: ShoppingCart) => {
              const timeAgo = getTimeAgo(cart.updated_at)
              return (
                <Card key={cart.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <Typography variant="caption">
                          {cart.user_name
                            ?.split(" ")
                            .map((n: any) => n[0])
                            .join("") || "U"}
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {cart.user_name || "Usuário"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {cart.user_profile || "PARTNER"}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/cart/${cart.id}`)}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">Parceiro:</Typography>
                      <Typography variant="body2">{cart.partner_name || "-"}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">Vendedor:</Typography>
                      <Typography variant="body2">{cart.seller_name || "-"}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">Total:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        R$ {cart.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Status:</Typography>
                      {getStatusBadge(cart)}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Atualizado:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule fontSize="small" />
                        <Typography variant="caption">{timeAgo}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              )
            })}
          </Box>
        ) : (
        <>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome do Usuário</TableCell>
                <TableCell>Perfil</TableCell>
                <TableCell>Nome do Parceiro</TableCell>
                <TableCell>Nome do Vendedor</TableCell>
                <TableCell>Qtd SKU</TableCell>
                <TableCell>Qtd Itens</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Criado em</TableCell>
                <TableCell>Atualizado em</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCarts.map((cart: ShoppingCart) => {
                const timeAgo = getTimeAgo(cart.updated_at)
                return (
                  <TableRow key={cart.id}>
                    <TableCell>
                      <Tooltip title="Abrir Detalhes do Carrinho">
                        <IconButton 
                          size="small"
                          onClick={() => navigate(`/cart-details/${cart.id}`)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <Typography variant="caption">
                            {cart.user_name
                              ?.split(" ")
                              .map((n: any) => n[0])
                              .join("") || "U"}
                          </Typography>
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {cart.user_name || "Usuário"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{cart.user_profile || "PARTNER"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{cart.partner_name || "-"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{cart.seller_name || "-"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${cart.items.length} SKU${cart.items.length !== 1 ? "s" : ""}`}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${cart.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0} ${(cart.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0) === 1 ? "item" : "itens"}`}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        R$ {cart.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusBadge(cart)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(cart.created_at).toLocaleDateString("pt-BR")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {timeAgo}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={recentCarts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[20]}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
        </>
        )}
      </CardContent>
    </StyledCard>
  )
}
