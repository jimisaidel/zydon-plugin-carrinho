"use client";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Common from "@zydon/common/components/Common";
import Icon from "@zydon/common/components/Icon";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

import Logo from "../Logo";
import { NavSectionHorizontal } from "../nav";

const LoadApps = dynamic(() => import("../LoadApps"), {
  loading: () => <></>,
  ssr: false,
});

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Common primaryColor="#00ad57">
      <Container maxWidth="md">
        <Stack py="2%" gap={3}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              width: 1,
              mx: "auto",
              borderRadius: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Logo />

            <NavSectionHorizontal
              data={[
                {
                  subheader: "Admin",
                  items: [
                    {
                      title: "Home",
                      path: "/",
                      icon: <Icon icon="HOME_START_04" />,
                    },
                    {
                      title: "Meus pedidos",
                      path: "/meus-pedidos",
                      icon: <Icon icon="ORDERS" />,
                    },
                    {
                      title: "Financeiro",
                      path: "/financeiro",
                      icon: <Icon icon="DOLLAR_CIRCLE" />,
                    },
                    {
                      title: "Novo pedido",
                      path: "/novo-pedido",
                      icon: <Icon icon="CART_SHOPPING" />,
                    },
                  ],
                },
              ]}
            />
          </Paper>
          {children}
        </Stack>
      </Container>

      <LoadApps type="global" />
    </Common>
  );
};

export default Layout;
