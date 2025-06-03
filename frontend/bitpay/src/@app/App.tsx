import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Common from "@zydon/common/components/Common";
import Icon from "@zydon/common/components/Icon";
import Modal from "@zydon/common/components/Modal";
import useToggle from "@zydon/common/hooks/useToggle";
import QRCode from "react-qr-code";

const App = (_: any) => {
  const [modalOpen, toggleModalOpen] = useToggle();

  return (
    <Common primaryColor="#00ad57">
      <Stack gap={1.75}>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Button
          variant="soft"
          color="warning"
          size="large"
          startIcon={<Icon icon="BLOCKCHAIN" />}
          onClick={toggleModalOpen}
        >
          Pagar agora com Bitcoin
        </Button>
        <Divider sx={{ borderStyle: "dashed" }} />
      </Stack>

      <Modal
        open={modalOpen}
        onClose={toggleModalOpen}
        fullWidth
        maxWidth="xs"
        dialogTitle="Scaneie o QR Code"
      >
        <Stack alignItems="center">
          <QRCode value="YOUR_PUBLIC_KEY_HERE" />
        </Stack>
      </Modal>
    </Common>
  );
};

export default App;
