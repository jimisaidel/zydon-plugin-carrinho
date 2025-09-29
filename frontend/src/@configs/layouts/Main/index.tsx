import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { Header } from 'components/header';
import { TooltipProvider } from 'components/ui/tooltip';

const Main = () => {
  return (
    <TooltipProvider>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 0.5, sm: 1 } }}>
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
            width: '100%',
            height: '100%',
            maxWidth: { xl: '1400px' },
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 2,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
          Powered By{' '}
          <Box
            component="a"
            href="https://www.sagessetec.com.br"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 'medium',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sagesse
          </Box>{' '}
          - www.sagessetec.com.br
        </Box>
      </Box>
    </TooltipProvider>
  );
};
export default Main;
