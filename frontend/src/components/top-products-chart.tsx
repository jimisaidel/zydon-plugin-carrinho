import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowBack, Business, Inventory, Person, PersonAdd, People } from '@mui/icons-material';
import { ResponsiveContainer } from "recharts/lib/component/ResponsiveContainer";
import { BarChart } from "recharts/lib/chart/BarChart";
import { Bar } from "recharts/lib/cartesian/Bar";
import { XAxis } from "recharts/lib/cartesian/XAxis";
import { YAxis } from "recharts/lib/cartesian/YAxis";
import { CartesianGrid } from "recharts/lib/cartesian/CartesianGrid";
import { Tooltip } from "recharts/lib/component/Tooltip";
import { LabelList } from "recharts/lib/component/LabelList";

import { getShoppingCartsRaw } from '../services/api';

interface TopProductsChartProps {
  timeRange: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}

type DrillDownOption = 'product' | 'user' | 'partner' | 'seller' | 'profile'

interface DrillDownData {
  name: string
  value: number
  formattedValue: string
  originalName?: string
}

interface DrillDownState {
  type: DrillDownOption
  selectedItem?: string
  originalName?: string
}

export const TopProductsChart = ({
  timeRange,
  startDate,
  endDate,
  clientFilter,
  sellerFilter,
  abandonmentHours = 24,
}: TopProductsChartProps) => {
  const [data, setData] = useState<DrillDownData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDrillDown] = useState<DrillDownOption>('product');
  const [rawCarts, setRawCarts] = useState<any[]>([]);
  const [drillDownHistory, setDrillDownHistory] = useState<DrillDownState[]>([{ type: 'product' }]);
  const [selectedBarData, setSelectedBarData] = useState<any>(null);

  const processDataByDrillDown = (carts: any[], drillDownType: DrillDownOption, contextFilter?: { type: DrillDownOption, value: string }): DrillDownData[] => {
    const totals = {} as Record<string, { total: number, originalName: string }>;

    carts.forEach((cart: any) => {
      if (cart.items && Array.isArray(cart.items)) {
        cart.items.forEach((item: any) => {
          // Se há um filtro de contexto, aplicar primeiro
          if (contextFilter) {
            let shouldInclude = false;
            switch (contextFilter.type) {
              case 'product':
                shouldInclude = item.product_name === contextFilter.value;
                break;
              case 'user':
                shouldInclude = cart.user_name === contextFilter.value;
                break;
              case 'partner':
                shouldInclude = cart.partner_name === contextFilter.value;
                break;
              case 'seller':
                shouldInclude = cart.seller_name === contextFilter.value;
                break;
              case 'profile':
                shouldInclude = cart.user_profile === contextFilter.value;
                break;
            }
            if (!shouldInclude) return;
          }

          const itemTotal = parseFloat(item.total) || 0;
          let key = '';
          let originalName = '';

          switch (drillDownType) {
            case 'product':
              key = originalName = item.product_name || 'Produto sem nome';
              break;
            case 'user':
              key = originalName = cart.user_name || 'Usuário sem nome';
              break;
            case 'partner':
              key = originalName = cart.partner_name || 'Parceiro sem nome';
              break;
            case 'seller':
              key = originalName = cart.seller_name || 'Vendedor sem nome';
              break;
            case 'profile':
              key = originalName = cart.user_profile || 'Perfil sem nome';
              break;
          }

          if (totals[key]) {
            totals[key].total += itemTotal;
          } else {
            totals[key] = { total: itemTotal, originalName };
          }
        });
      }
    });

    return Object.entries(totals)
      .map(([name, data]: [string, any]) => ({
        name: name.length > 25 ? `${name.substring(0, 25)}...` : name,
        originalName: data.originalName,
        value: data.total,
        formattedValue: `R$ ${data.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 20);
  };

  useEffect(() => {
    const loadChartData = async () => {
      setIsLoading(true);
      try {
        const response = await getShoppingCartsRaw('0', '1000');

        if (!response || !response.items || !Array.isArray(response.items)) {
          console.log('Dados inválidos para gráfico');
          setData([]);
          setRawCarts([]);
          return;
        }

        let carts = response.items || [];

        // Filtrar carrinhos com total > 0
        carts = carts.filter((cart: any) => cart.total > 0);

        // Aplicar filtros se fornecidos
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

        setRawCarts(carts);
        const processedData = processDataByDrillDown(carts, currentDrillDown);
        setData(processedData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setData([]);
        setRawCarts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadChartData();
  }, [timeRange, startDate, endDate, clientFilter, sellerFilter, abandonmentHours]);

  // Reprocessar dados quando currentDrillDown, rawCarts ou drillDownHistory mudam
  useEffect(() => {
    if (rawCarts.length > 0) {
      const currentState = drillDownHistory[drillDownHistory.length - 1];
      const contextFilter = currentState.selectedItem ? {
        type: drillDownHistory[drillDownHistory.length - 2]?.type || 'product',
        value: currentState.selectedItem,
      } : undefined;

      const processedData = processDataByDrillDown(rawCarts, currentState.type, contextFilter);
      setData(processedData);
    }
  }, [rawCarts, drillDownHistory]);

  const getDrillDownTitle = () => {
    const currentState = drillDownHistory[drillDownHistory.length - 1];
    const baseTitle = (() => {
      switch (currentState.type) {
        case 'product': return 'Top 20 Produtos';
        case 'user': return 'Top 20 Usuários';
        case 'partner': return 'Top 20 Parceiros';
        case 'seller': return 'Top 20 Vendedores';
        case 'profile': return 'Top 20 Perfis';
        default: return 'Top 20 Produtos';
      }
    })();

    if (currentState.selectedItem) {
      const previousType = drillDownHistory[drillDownHistory.length - 2]?.type || 'product';
      const typeLabel = {
        'product': 'produto',
        'user': 'usuário',
        'partner': 'parceiro',
        'seller': 'vendedor',
        'profile': 'perfil',
      }[previousType];
      return `${baseTitle} - ${typeLabel}: ${currentState.originalName || currentState.selectedItem}`;
    }

    return baseTitle;
  };

  const getDrillDownDescription = () => {
    const currentState = drillDownHistory[drillDownHistory.length - 1];
    const baseDescription = (() => {
      switch (currentState.type) {
        case 'product': return 'Produtos com maior valor total em carrinhos';
        case 'user': return 'Usuários com maior valor total em carrinhos';
        case 'partner': return 'Parceiros com maior valor total em carrinhos';
        case 'seller': return 'Vendedores com maior valor total em carrinhos';
        case 'profile': return 'Perfis com maior valor total em carrinhos';
        default: return 'Produtos com maior valor total em carrinhos';
      }
    })();

    if (currentState.selectedItem) {
      return `${baseDescription} filtrados por contexto`;
    }

    return baseDescription;
  };

  const handleDrillDownChange = (option: DrillDownOption, barData?: any) => {
    const newState: DrillDownState = {
      type: option,
      selectedItem: barData?.originalName || barData?.name,
      originalName: barData?.originalName,
    };

    setDrillDownHistory(prev => [...prev, newState]);
    setSelectedBarData(null);
  };

  const handleGoBack = () => {
    if (drillDownHistory.length > 1) {
      setDrillDownHistory(prev => prev.slice(0, -1));
    }
  };

  const handleBarRightClick = (data: any, event: any) => {
    event.preventDefault();
    setSelectedBarData(data);
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }));

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Inventory />
              {getDrillDownTitle()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getDrillDownDescription()}
            </Typography>
          </Box>
          {drillDownHistory.length > 1 && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
            >
              Voltar
            </Button>
          )}
        </Box>
        {isLoading ? (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Nenhum dado disponível</Typography>
          </Box>
        ) : (
          <Box sx={{ height: 400 }} onContextMenu={handleContextMenu}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <YAxis
                  tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    'Valor Total',
                  ]}
                  labelStyle={{ color: '#000' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                />
                <Bar
                  dataKey="value"
                  fill="#21DF92"
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => handleBarRightClick(data, { preventDefault: () => {} })}
                >
                  <LabelList
                    dataKey="formattedValue"
                    position="top"
                    fontSize={10}
                    fill="#666"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              {selectedBarData ? `Filtrar por: ${selectedBarData.originalName || selectedBarData.name}` : 'Clique em uma barra para filtrar'}
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDrillDownChange('product', selectedBarData);
              handleClose();
            }}
            disabled={!selectedBarData}
          >
            <Inventory sx={{ mr: 1 }} />
            Produtos
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDrillDownChange('user', selectedBarData);
              handleClose();
            }}
            disabled={!selectedBarData}
          >
            <Person sx={{ mr: 1 }} />
            Usuários
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDrillDownChange('partner', selectedBarData);
              handleClose();
            }}
            disabled={!selectedBarData}
          >
            <Business sx={{ mr: 1 }} />
            Parceiros
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDrillDownChange('seller', selectedBarData);
              handleClose();
            }}
            disabled={!selectedBarData}
          >
            <PersonAdd sx={{ mr: 1 }} />
            Vendedores
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDrillDownChange('profile', selectedBarData);
              handleClose();
            }}
            disabled={!selectedBarData}
          >
            <People sx={{ mr: 1 }} />
            Perfis
          </MenuItem>
        </Menu>
      </CardContent>
    </StyledCard>
  );
};
