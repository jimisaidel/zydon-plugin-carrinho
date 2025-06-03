import { memo } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { NavSectionProps, NavListProps } from "../types";
import NavList from "./NavList";
import { Container } from "./styles";

type ItemsProps = {
  items: NavListProps[];
  isLastGroup: boolean;
};

const Items = ({ items, isLastGroup }: ItemsProps) => {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
        />
      ))}

      {!isLastGroup && (
        <Box
          sx={{
            width: 24,
            height: "1px",
            bgcolor: "divider",
            my: "8px !important",
          }}
        />
      )}
    </>
  );
};

const NavSectionMini = ({ data, sx, loading, ...other }: NavSectionProps) => {
  if (loading) {
    return (
      <Container sx={sx} {...other}>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} width={72} height={54} />
        ))}
      </Container>
    );
  }

  return (
    <Container sx={sx} {...other}>
      {data.map((group, index) => (
        <Items
          key={group.subheader}
          items={group.items}
          isLastGroup={index + 1 === data.length}
        />
      ))}
    </Container>
  );
};

export default memo(NavSectionMini);
