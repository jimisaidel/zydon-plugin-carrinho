import { memo } from "react";
import Skeleton from "@mui/material/Skeleton";

import { NavListProps, NavSectionProps } from "../types";

import NavList from "./NavList";
import { Container } from "./styles";

type ItemsProps = {
  items: NavListProps[];
};

const Items = ({ items }: ItemsProps) => {
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
    </>
  );
};

const NavSectionHorizontal = ({
  data,
  sx,
  loading,
  ...other
}: NavSectionProps) => {
  if (loading) {
    return (
      <Container
        sx={{
          ...sx,
        }}
        {...other}
      >
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} width={100} height={30} />
        ))}
      </Container>
    );
  }

  return (
    <Container
      sx={{
        ...sx,
      }}
      {...other}
    >
      {data.map((group) => (
        <Items key={group.subheader} items={group.items} />
      ))}
    </Container>
  );
};

export default memo(NavSectionHorizontal);
