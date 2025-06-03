import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Common from "@zydon/common/components/Common";
import Icon from "@zydon/common/components/Icon";
import Modal from "@zydon/common/components/Modal";
import useToggle from "@zydon/common/hooks/useToggle";

import { Container } from "./styles";

const App = (_: any) => {
  const [modalOpen, toggleModalOpen] = useToggle();
  return (
    <Common primaryColor="#00ad57">
      <Container>
        <Button
          endIcon={<Icon icon="WHATSAPP" />}
          size="large"
          color="success"
          variant="contained"
          onClick={toggleModalOpen}
        >
          Whatsapp
        </Button>
      </Container>

      <Modal
        open={modalOpen}
        onClose={toggleModalOpen}
        dialogTitle="Nossos Zaps"
        fullWidth
        maxWidth="xs"
        dialogContentProps={{
          sx: {
            p: "0 !important",
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="WHATSAPP" color="success.main" />
            </ListItemIcon>
            <ListItemText
              primary="SAC"
              secondary="Clique para falar com a gente"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="WHATSAPP" color="success.main" />
            </ListItemIcon>
            <ListItemText
              primary="Financeiro"
              secondary="Clique para falar com a gente"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="WHATSAPP" color="success.main" />
            </ListItemIcon>
            <ListItemText
              primary="Suporte"
              secondary="Clique para falar com a gente"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="WHATSAPP" color="success.main" />
            </ListItemIcon>
            <ListItemText
              primary="Sugestões"
              secondary="Clique para falar com a gente"
            />
          </ListItemButton>
        </List>
      </Modal>
    </Common>
  );
};

export default App;
