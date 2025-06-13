import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@zydon/common/components/Modal';
import useToggle from '@zydon/common/hooks/useToggle';

const Plugin = () => {
  const [modalOpen, toggleModalOpen] = useToggle();

  return (
    <>
      <Button variant="contained" size="large" onClick={toggleModalOpen}>
        Botão do seu plugin
      </Button>

      <Modal
        open={modalOpen}
        onClose={toggleModalOpen}
        fullWidth
        maxWidth="xs"
        dialogTitle="Modal"
      >
        <Typography variant="subtitle1" component="div">
          Qualquer conteúdo que vc seja no seu plugin
        </Typography>
      </Modal>
    </>
  );
};

export default Plugin;
