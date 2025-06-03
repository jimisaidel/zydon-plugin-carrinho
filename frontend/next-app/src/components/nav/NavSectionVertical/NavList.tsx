import Collapse from "@mui/material/Collapse";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import useActiveLink from "@/hooks/useActiveLink";
import { NavListProps } from "../types";
import NavItem from "./NavItem";

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

const NavSubList = ({ data, depth }: NavListSubProps) => {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
        />
      ))}
    </>
  );
};

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
};

const NavList = ({ data, depth, hasChild }: NavListRootProps) => {
  const pathname = usePathname();
  const active = useActiveLink(data.path);
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        isExternalLink={false}
        onClick={handleToggle}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} />
        </Collapse>
      )}
    </>
  );
};

export default NavList;
