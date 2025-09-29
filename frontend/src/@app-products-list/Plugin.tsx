import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import usePluginEvents from 'hooks/use-plugin-events';

import { Props } from './props';

const Plugin = ({ products }: Props) => {
  const { navigate } = usePluginEvents();

  return (
    <Stack gap={2}>
      <Typography
        variant="h3"
        component="h1"
        fontWeight={900}
        letterSpacing={0.25}
        color="primary.main"
      >
        Lista de Produtos customizada
      </Typography>

      <Stack
        direction="row"
        gap={2}
        display="grid"
        gridTemplateColumns="repeat(auto-fill,minmax(140px,1fr))"
      >
        {products.map(product => (
          <Stack key={product.id}>
            <Stack
              component="img"
              src={product.main_image}
              alt={product.name}
              sx={{
                aspectRatio: '1/1',
                borderRadius: 1.5,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate(`/novo-pedido/produto/${product.id}`)}
            />

            <Stack
              bgcolor="primary.main"
              color="primary.contrastText"
              width="85%"
              m="-19px auto 0"
              p={1}
              borderRadius={1}
              zIndex={999}
              overflow="hidden"
            >
              <Typography
                variant="body2"
                noWrap
                align="center"
                fontWeight={700}
              >
                {product.name}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Plugin;
