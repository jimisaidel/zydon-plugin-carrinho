import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { NavSectionVertical } from "@zydon/common-csr/components/nav-section";
import Icon from "@zydon/common/components/Icon";
import Label from "@zydon/common/components/Label";
import { Icon as IconEnum } from "@zydon/common/types/icon";
import { Outlet } from "react-router-dom";

import { APPS } from "../../mock";
import Logo from "./Logo";

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Stack direction="row" gap={3} py="4%">
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            width: 1,
            mx: "auto",
            maxWidth: 320,
            borderRadius: 2,
          }}
        >
          <Stack alignItems="center" py={2}>
            <Logo />
          </Stack>
          <NavSectionVertical
            data={[
              {
                subheader: "Admin",
                items: [
                  {
                    title: "Home",
                    path: "/",
                    icon: <Icon icon="HOME_START_04" />,
                    info: <Label color="secondary">NEW</Label>,
                    caption: "Acessar página unicial",
                  },
                  {
                    title: "Dúvidas e Suporte",
                    path: "/support",
                    icon: <Icon icon="USER_QUESTION_MARK" />,
                  },
                  {
                    title: "Sobre nós",
                    path: "/about",
                    icon: <Icon icon="INFO_CIRCLE" />,
                  },
                ],
              },
              ...(APPS.length > 0
                ? [
                    {
                      subheader: "Apps",
                      items: APPS.map((app) => ({
                        title: app.name,
                        path: `/apps/${app.id}`,
                        icon: <Icon icon={app.icon as IconEnum} />,
                        caption: app.caption,
                      })),
                    },
                  ]
                : []),
            ]}
          />
        </Paper>

        <Stack flex={1}>
          <Outlet />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Dashboard;
