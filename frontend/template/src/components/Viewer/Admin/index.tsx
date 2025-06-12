import Stack from "@mui/material/Stack";
import { PropsWithChildren } from "react";

import Logo from "../../Logo";
import { Container, MenuItem, Sidebar } from "./styles";

const Admin = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Sidebar>
        <Logo variant="mini" />

        <MenuItem />
        <MenuItem />
        <MenuItem />
      </Sidebar>

      <Stack flex={1} bgcolor="grey.100">
        {children}
      </Stack>
    </Container>
  );
};

export default Admin;
