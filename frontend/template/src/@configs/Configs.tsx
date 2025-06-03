import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Common from "@zydon/common/components/Common";
import Icon from "@zydon/common/components/Icon";

const Configs = () => {
  return (
    <Common primaryColor="#000000">
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Icon icon="SETTINGS" width={32} color="primary.main" />

        <Stack>
          <Typography variant="h6" lineHeight={1.15}>
            Configuração do seu App
          </Typography>
          <Typography variant="caption">Vamos configurar seu App?</Typography>
        </Stack>
      </Stack>
    </Common>
  );
};

export default Configs;
