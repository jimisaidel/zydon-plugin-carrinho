import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Clock,RefreshCw, User, UserCheck, X } from 'lucide-react';

import { ClientsChart } from './clients-chart';
import { MetricsCards } from './metrics-cards';
import { ProfilesChart } from './profiles-chart';
import { RecentCarts } from './recent-carts';
import { SellersChart } from './sellers-chart';
import { TopProductsChart } from './top-products-chart';
import { UsersChart } from './users-chart';

export const AbandonedCartsOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [sellerFilter, setSellerFilter] = useState('');
  const [abandonmentHours, setAbandonmentHours] = useState(24);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise((resolve: any) => setTimeout(resolve, 1000));
    setIsLoading(false);

    window.location.reload();
  };

  const clearAllFilters = () => {
    setStartDate('');
    setEndDate('');
    setClientFilter('');
    setSellerFilter('');
    setAbandonmentHours(24);
  };

  const getTimeRangeFromDates = () => {
    if (!startDate && !endDate) {
      return 'all';
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return `custom-${diffDays}d-${startDate}-${endDate}`;
    }

    return '7d';
  };

  const timeRange = getTimeRangeFromDates();

  const hasActiveFilters = startDate || endDate || clientFilter || sellerFilter || abandonmentHours !== 24;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', height: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' } }}>
            Carrinhos Online
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Análise completa dos carrinhos que estão ativo no momento
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', lg: 'flex-start' },
        gap: { xs: 2, lg: 3 },
        mb: 2,
      }}>
        {/* Barra de Filtros */}
        <Box sx={{
          flex: 1,
          maxWidth: { xs: '100%', lg: '70%' },
        }}>
          <Grid container spacing={2} alignItems="end">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Horas para Abandono"
                type="number"
                size="small"
                fullWidth
                value={abandonmentHours}
                onChange={(e) => setAbandonmentHours(Number(e.target.value) || 24)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Clock size={16} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1, max: 168 },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Data Inicial"
                type="date"
                size="small"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Data Final"
                type="date"
                size="small"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Cliente"
                placeholder="Buscar cliente..."
                size="small"
                fullWidth
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={16} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Vendedor"
                placeholder="Buscar vendedor..."
                size="small"
                fullWidth
                value={sellerFilter}
                onChange={(e) => setSellerFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserCheck size={16} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {hasActiveFilters && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button
                  onClick={clearAllFilters}
                  variant="outlined"
                  size="small"
                  fullWidth
                  startIcon={<X size={16} />}
                >
                  Limpar Filtros
                </Button>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                onClick={handleRefresh}
                disabled={isLoading}
                variant="contained"
                size="small"
                fullWidth
                startIcon={<RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />}
              >
                Atualizar
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Informações de Status */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minWidth: { lg: '280px' },
          alignItems: { xs: 'flex-start', lg: 'flex-end' },
        }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ flexWrap: 'wrap' }}>
            {(startDate || endDate) && (
              <Chip
                label={`Período: ${startDate || 'início'} até ${endDate || 'hoje'}`}
                variant="outlined"
                size="small"
              />
            )}
            {clientFilter && (
              <Chip
                label={`Cliente: ${clientFilter}`}
                variant="outlined"
                size="small"
                color="primary"
              />
            )}
            {sellerFilter && (
              <Chip
                label={`Vendedor: ${sellerFilter}`}
                variant="outlined"
                size="small"
                color="primary"
              />
            )}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip
              label={`Última atualização: ${mounted ? new Date().toLocaleTimeString('pt-BR') : '--:--:--'}`}
              variant="outlined"
              size="small"
            />
            <Chip
              label={`Abandono após: ${abandonmentHours}h`}
              variant="outlined"
              size="small"
            />
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <MetricsCards
          timeRange={timeRange}
          startDate={startDate}
          endDate={endDate}
          clientFilter={clientFilter}
          sellerFilter={sellerFilter}
          abandonmentHours={abandonmentHours}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <UsersChart
            timeRange={timeRange}
            startDate={startDate}
            endDate={endDate}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
            abandonmentHours={abandonmentHours}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ClientsChart
            timeRange={timeRange}
            startDate={startDate}
            endDate={endDate}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
            abandonmentHours={abandonmentHours}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ProfilesChart
            timeRange={timeRange}
            startDate={startDate}
            endDate={endDate}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
            abandonmentHours={abandonmentHours}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SellersChart
            timeRange={timeRange}
            startDate={startDate}
            endDate={endDate}
            abandonmentHours={abandonmentHours}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TopProductsChart
            timeRange={timeRange}
            startDate={startDate}
            endDate={endDate}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
            abandonmentHours={abandonmentHours}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RecentCarts
            startDate={startDate}
            endDate={endDate}
            clientFilter={clientFilter}
            sellerFilter={sellerFilter}
            abandonmentHours={abandonmentHours}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
