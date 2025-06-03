import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { NavSectionProps } from "../types";
import NavList from "./NavList";
import { StyledSubheader } from "./styles";

const NavSectionVertical = ({
  data,
  sx,
  loading,
  ...other
}: NavSectionProps) => {
  if (loading)
    return (
      <Stack sx={sx} {...other} px={2} gap={1}>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} height={40} />
        ))}
      </Stack>
    );

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0]?.title || "";

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
};

export default NavSectionVertical;
