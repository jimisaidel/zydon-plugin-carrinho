import { useEffect,useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { fetchShoppingCarts } from 'services/api';

interface ShoppingCart {
  id: string
  portal_id: string
  user_id: string
  user_name: string
  user_profile: 'PARTNER' | 'SELLER'
  partner_id: string
  partner_name: string
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
        const response = await fetchShoppingCarts(0, 1000);

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
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="text"
            size="small"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Carrinho não encontrado.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="text"
          size="small"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Button>
        <h1 className="text-2xl font-bold">Detalhes do Carrinho</h1>
      </div>

      <div className="space-y-6">
        {/* Informações do Carrinho */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuário</p>
                <p className="text-sm font-semibold">{cart.user_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Perfil</p>
                <Badge variant="outline" className="text-xs" label={cart.user_profile} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Parceiro</p>
                <p className="text-sm">{cart.partner_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendedor</p>
                <p className="text-sm">{cart.seller_name || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total do Carrinho</p>
                <p className="text-sm font-semibold">
                  R$ {(cart.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Itens</p>
                <p className="text-sm">{cart.items?.length || 0} {(cart.items?.length || 0) === 1 ? 'item' : 'itens'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Criado em</p>
                <p className="text-sm">{cart.created_at ? new Date(cart.created_at).toLocaleString('pt-BR') : '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Atualizado em</p>
                <p className="text-sm">{cart.updated_at ? new Date(cart.updated_at).toLocaleString('pt-BR') : '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Itens */}
        <Card>
          <CardHeader>
            <CardTitle>Itens do Carrinho</CardTitle>
            <CardDescription>
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'itens'} no carrinho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID do Produto</TableHead>
                    <TableHead>Nome do Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Variação</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço Unitário</TableHead>
                    <TableHead>Preço do Vendedor</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Atualizado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(cart.items || []).map((item: any, index: number) => (
                    <TableRow key={item.id || index}>
                      <TableCell className="font-mono text-xs">
                        {item.product_id || '-'}
                      </TableCell>
                      <TableCell className="font-medium">{item.product_name || '-'}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.product_sku || '-'}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                          {item.unit_id || '-'}
                        </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.product_variation_id || '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {item.quantity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        R$ {(item.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-sm">
                        R$ {(item.seller_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-sm">
                        {(item.discount || 0) > 0 ? (
                          <span className="text-green-600">
                            R$ {(item.discount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        R$ {(item.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {item.created_at ? new Date(item.created_at).toLocaleString('pt-BR') : '-'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {item.updated_at ? new Date(item.updated_at).toLocaleString('pt-BR') : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
