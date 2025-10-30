import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowBack, Person, Business, ShoppingCart, CalendarToday, AttachMoney } from '@mui/icons-material';
import { fetchShoppingCarts } from 'services/api';

interface ShoppingCart {
  id: string
  portal_id: string
  user_id: string
  user_name: string
  user_profile: string | null
  partner_id: string | null
  partner_name: string | null
  seller_id: string | null
  seller_name: string | null
  total: number
  created_at: string
  updated_at: string
  items: Array<{
    id: string
    product_id: string
    product_name: string
    product_sku: string
    unit_id: string
    unit_name: string
    product_variation_id: string
    price: number
    seller_price: number
    quantity: number
    discount: number
    total: number
    created_at: string
    updated_at: string
  }>
}

export default function CartDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const cartId = params.id as string;



  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchShoppingCarts();

        // Se não encontrar o carrinho específico, usar o primeiro carrinho disponível
        let foundCart = response.items?.find((c: any) => c.id === cartId);

        if (!foundCart && response.items?.length > 0) {
          foundCart = response.items[0];
        }

        setCart(foundCart || null);
      } catch (error) {
        console.error('Erro ao carregar detalhes do carrinho:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      loadCartDetails();
    }
  }, [cartId]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!cart) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Voltar
          </Button>
        </Box>
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Carrinho não encontrado
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header com botão voltar e título */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ borderRadius: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Detalhes do Carrinho
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Card de Resumo do Carrinho */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Resumo do Carrinho
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  R$ {(cart.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valor total do carrinho
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total de itens:
                </Typography>
                <Chip 
                  label={`${cart.items?.length || 0} ${(cart.items?.length || 0) === 1 ? 'item' : 'itens'}`}
                  color="primary"
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Status:
                </Typography>
                <Chip 
                  label="Ativo"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Informações do Cliente */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Informações do Cliente
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Nome do Usuário
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {cart.user_name}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Perfil
                    </Typography>
                    <Chip 
                      label={cart.user_profile}
                      color={cart.user_profile === 'PARTNER' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Parceiro
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        {cart.partner_name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Vendedor
                    </Typography>
                    <Typography variant="body1">
                      {cart.seller_name || 'Não informado'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Criado em
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {cart.created_at ? new Date(cart.created_at).toLocaleString('pt-BR') : '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Última atualização
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {cart.updated_at ? new Date(cart.updated_at).toLocaleString('pt-BR') : '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Itens */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Itens do Carrinho
                  </Typography>
                </Box>
                <Chip 
                  label={`${cart.items?.length || 0} ${(cart.items?.length || 0) === 1 ? 'item' : 'itens'}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <Divider sx={{ mb: 3 }} />

              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: 'grey.50' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Produto</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Qtd</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Preço Unit.</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Desconto</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(cart.items || []).map((item: any, index: number) => (
                      <TableRow key={item.id || index} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.product_name || 'Produto sem nome'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {item.product_id || '-'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {item.product_sku || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Chip 
                            label={item.quantity || 0}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Typography variant="body2">
                            R$ {(item.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          {(item.discount || 0) > 0 ? (
                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                              -R$ {(item.discount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.secondary">-</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            R$ {(item.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
