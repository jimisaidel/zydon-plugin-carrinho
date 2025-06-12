import { PropsWithChildren } from "react";
import {
  Container,
  Content,
  Header,
  Logo,
  Menu,
  Search,
  Sidebar,
} from "./styles";

const Vertical = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Sidebar>
        <Logo>Logo</Logo>

        <Menu />
        <Menu />
        <Menu />
      </Sidebar>

      <Content>
        <Header>
          <Search />
        </Header>
        {children}
      </Content>
    </Container>
  );
};

export default Vertical;
