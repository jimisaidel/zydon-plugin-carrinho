import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Configs = () => {
  return (
    <Stack p={3}>
      <Stack>
        <Typography variant="h4">Configuração do seu App</Typography>

        <Typography variant="body2" color="text.secondary">
          Vamos configurar seu App agora mesmo?
        </Typography>

        <Button variant="contained">Configurar</Button>
      </Stack>
    </Stack>
  );
};

export default Configs;
