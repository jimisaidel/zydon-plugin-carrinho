import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Configs = () => {
  return (
    <Stack p={3}>
      <Stack>
        <Typography variant="h4">Configuração do seu App</Typography>

        <Typography variant="body2" color="text.secondary">
          Vamos configurar seu App?
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Configs;
