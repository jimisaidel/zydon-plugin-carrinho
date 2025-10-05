import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { getToken } from '@zydon/auth';

export const DebugInfo = () => {
  const [debugData, setDebugData] = useState({
    token: null as string | null,
    error: null as string | null,
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    try {
      const token = getToken();
      setDebugData({
        token: token ? `${token.substring(0, 20)}...` : 'null',
        error: null,
        timestamp: new Date().toISOString()
      });
      
      console.log('🔍 Debug Info:', {
        hasToken: !!token,
        tokenLength: token?.length || 0,
        env: import.meta.env.VITE_MODE
      });
    } catch (error: any) {
      setDebugData({
        token: null,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Erro no debug:', error);
    }
  }, []);

  return (
    <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🔍 Debug Info
        </Typography>
        <Box>
          <Typography variant="body2">
            <strong>Token:</strong> {debugData.token || 'Não disponível'}
          </Typography>
          <Typography variant="body2">
            <strong>Erro:</strong> {debugData.error || 'Nenhum'}
          </Typography>
          <Typography variant="body2">
            <strong>Timestamp:</strong> {debugData.timestamp}
          </Typography>
          <Typography variant="body2">
            <strong>Modo:</strong> {import.meta.env.VITE_MODE || 'Não definido'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
