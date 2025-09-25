import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '@zydon/common/components/Icon';
import Modal from '@zydon/common/components/Modal';
import useToggle from '@zydon/common/hooks/useToggle';

import usePluginEvents from 'hooks/use-plugin-events';

import { Props } from './props';
import { Container } from './styles';

const Plugin = ({ pathname, authData }: Props) => {
  const [modalOpen, toggleModalOpen] = useToggle();
  const { logout, navigate } = usePluginEvents();

  return (
    <>
      <Container>
        <Button
          variant="contained"
          size="large"
          onClick={toggleModalOpen}
          startIcon={<Icon icon="IDEA" />}
        >
          Botão do seu plugin
        </Button>
      </Container>

      <Modal
        open={modalOpen}
        onClose={toggleModalOpen}
        fullWidth
        maxWidth="sm"
        dialogTitle="Modal"
      >
        <Stack gap={1}>
          <Typography variant="subtitle1" component="div">
            Qualquer conteúdo que vc seja no seu plugin...
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Typography variant="overline" component="div" fontSize={14}>
            Informações
          </Typography>

          <Typography variant="body1" component="div">
            Rota atual:{' '}
            <Typography component="strong" fontWeight={700}>
              {pathname}
            </Typography>
          </Typography>

          <Typography variant="body1" component="div">
            Nome do usuário:{' '}
            <Typography component="strong" fontWeight={700}>
              {authData?.name || '-'}
            </Typography>
          </Typography>

          <Typography variant="body1" component="div">
            Email do usuário:{' '}
            <Typography component="strong" fontWeight={700}>
              {authData?.email || '-'}
            </Typography>
          </Typography>

          <Typography variant="body1" component="div">
            Perfil:{' '}
            <Typography component="strong" fontWeight={700}>
              {authData?.profile || '-'}
            </Typography>
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" gap={1} pt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{ flex: 1 }}
              onClick={() => navigate('/checkout')}
              disabled={!authData}
            >
              Navegar para checkout
            </Button>

            <Button
              variant="soft"
              size="large"
              color="error"
              sx={{ flex: 1 }}
              onClick={logout}
              disabled={!authData}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Plugin;
