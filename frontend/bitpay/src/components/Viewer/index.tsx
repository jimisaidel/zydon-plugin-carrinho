import {
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@zydon/common/components/Autocomplete";
import Common from "@zydon/common/components/Common";
import Icon from "@zydon/common/components/Icon";
import { useState } from "react";

import { AppType, Control, View, ViewerProps } from "./props";
import { Actions } from "./styles";
import Logo from "../Logo";
import Admin from "./Admin";
import Portal from "./Portal";

const SESSION_VIEW_KEY = "view";
const SESSION_CONTROL_KEY = "control";
const SESSION_APP_TYPE_KEY = "appType";

const Viewer = ({ appView, configView }: ViewerProps) => {
  const [control, setControl] = useState<Control>(
    (sessionStorage.getItem(SESSION_CONTROL_KEY) || "on") as Control
  );
  const [view, setView] = useState<View>(
    (sessionStorage.getItem(SESSION_VIEW_KEY) || "config") as View
  );
  const [appType, setAppType] = useState<AppType>(
    (sessionStorage.getItem(SESSION_APP_TYPE_KEY) || AppType.global) as AppType
  );

  const handleChangeView = (newView: View) => {
    setView(newView);
    sessionStorage.setItem(SESSION_VIEW_KEY, newView);
  };

  const hideControl = () => {
    setControl("off");
    sessionStorage.setItem(SESSION_CONTROL_KEY, "off");
  };

  const handleChangeAppType = (newType: AppType) => {
    setAppType(newType);
    sessionStorage.setItem(SESSION_APP_TYPE_KEY, newType);
  };

  const Container =
    view === "config"
      ? (props: object) => <Admin {...props} />
      : (props: object) => <Portal {...props} mode={appType} />;

  return (
    <Common primaryColor="#00ad57">
      {control === "on" && (
        <Actions variant="outlined">
          <Logo variant="mini" />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={(_, value: View) => handleChangeView(value)}
            size="small"
          >
            <ToggleButton value="config">
              <Icon icon="SETTINGS" mr={0.5} /> Config
            </ToggleButton>

            <ToggleButton value="app">
              <Icon icon="PLAY_EXECUTE" mr={0.5} />
              App
            </ToggleButton>
          </ToggleButtonGroup>

          <Autocomplete
            name="type"
            value={appType}
            options={[
              {
                label: "Global",
                value: AppType.global,
                icon: "LAYOUT_07",
              },
              {
                label: "Checkout",
                value: AppType.checkout,
                icon: "CART_SHOPPING",
              },
            ]}
            onChange={(e) => handleChangeAppType(e as AppType)}
            size="small"
            placeholder="Tipo da aplicação"
            sx={{
              width: 180,
            }}
            disabled={view !== "app"}
          />

          <Tooltip title="Fechar menu">
            <IconButton onClick={hideControl}>
              <Icon icon="CLOSE_MARK_BUTTON" />
            </IconButton>
          </Tooltip>
        </Actions>
      )}

      <Container>{view === "config" ? configView : appView}</Container>
    </Common>
  );
};

export default Viewer;
