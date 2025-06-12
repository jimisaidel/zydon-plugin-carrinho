import { PropsWithChildren } from "react";
import {
  Container,
  Content,
  HeaderMenus,
  HeaderTop,
  Logo,
  Menu,
} from "./styles";
import { Stack } from "@mui/material";

const Horizontal = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Stack>
        <HeaderTop>
          <Logo>Logo</Logo>
        </HeaderTop>

        <HeaderMenus>
          <Menu />
          <Menu />
          <Menu />
          <Menu />
        </HeaderMenus>
      </Stack>
      <Content>{children}</Content>
    </Container>
  );
};

export default Horizontal;
