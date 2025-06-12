import { ComponentBlockProps } from "./props";
import { Container, Title } from "./styles";

const ComponentBlock = ({ title, children }: ComponentBlockProps) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}

      {children}
    </Container>
  );
};

export default ComponentBlock;
