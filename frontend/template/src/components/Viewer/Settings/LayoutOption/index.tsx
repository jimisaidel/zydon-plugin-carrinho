import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { LayoutOptionProps } from "./props";
import {
  Circle,
  Container,
  Content,
  Nav,
  PrimaryItem,
  SecondaryItem,
} from "./styles";

export function LayoutOption({ title, layout, selected, onClick }: LayoutOptionProps) {
  return (
    <Tooltip title={title}>
      <Container
        variant={selected ? "soft" : undefined}
        layout={layout}
        selected={selected}
        onClick={onClick}
      >
        <Nav layout={layout}>
          <Circle selected={selected} />
          <PrimaryItem layout={layout} selected={selected} />
          <SecondaryItem selected={selected} layout={layout} />
        </Nav>

        <Stack p={0.5} width={1} height={1} flexGrow={1}>
          <Content selected={selected} />
        </Stack>
      </Container>
    </Tooltip>
  );
}
