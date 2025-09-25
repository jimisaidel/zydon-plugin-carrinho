import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@zydon/common/components/Modal';
import useDeepCompareEffect from '@zydon/common/hooks/useDeepCompareEffect';
import useMount from '@zydon/common/hooks/useMount';
import useToggle from '@zydon/common/hooks/useToggle';

const Plugin = (props: any) => {
  const [modalOpen, toggleModalOpen] = useToggle();

  useMount(() => {
    console.log('useMount', props);
  });

  useDeepCompareEffect(() => {
    console.log('useDeepCompareEffect', props);
  }, [props]);

  return (
    <>
      <Button variant="contained" size="large" onClick={toggleModalOpen}>
        Botão do seu plugin
      </Button>

      <button onClick={props.onClick}>Botão do seu plugin</button>

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
