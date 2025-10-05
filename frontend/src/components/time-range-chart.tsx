import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TimeRangeChartProps {
  timeRange: string;
}

export const TimeRangeChart = ({}: TimeRangeChartProps) => {
  const data = [
    { hora: '00-02', abandonos: 12 },
    { hora: '02-04', abandonos: 8 },
    { hora: '04-06', abandonos: 5 },
    { hora: '06-08', abandonos: 15 },
    { hora: '08-10', abandonos: 32 },
    { hora: '10-12', abandonos: 45 },
    { hora: '12-14', abandonos: 38 },
    { hora: '14-16', abandonos: 52 },
    { hora: '16-18', abandonos: 67 },
    { hora: '18-20', abandonos: 89 },
    { hora: '20-22', abandonos: 76 },
    { hora: '22-00', abandonos: 43 },
  ];

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }));

  return (
    <StyledCard>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Abandono por Horário
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Distribuição de carrinhos abandonados por horário do dia
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hora"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: '#000000',
              }}
            />
            <Bar
              dataKey="abandonos"
              fill="#21DF92"
              radius={[4, 4, 0, 0]}
              style={{ filter: 'none' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </StyledCard>
  );
};
