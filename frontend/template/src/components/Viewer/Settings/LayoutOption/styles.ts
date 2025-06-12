import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Layout } from "../../../../types/viewer";

type CommonProps = {
  selected?: boolean;
};

type PrimaryItemProps = {
  layout: Layout;
} & CommonProps;

type SecondaryItemProps = {
  layout: Layout;
} & CommonProps;

type LayoutOptionProps = {
  layout: Layout;
};

type ContainerProps = {
  layout: Layout;
} & CommonProps;

export const Circle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<CommonProps>(({ theme, selected }) => ({
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[500],
  width: 10,
  height: 10,
  opacity: 0.8,

  ...(selected && {
    opacity: 1,
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  }),
}));

export const PrimaryItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected" && prop !== "layout",
})<PrimaryItemProps>(({ theme, layout, selected }) => ({
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[500],
  width: "100%",
  height: 4,
  opacity: 0.48,

  ...(layout === "horizontal" && { width: 16 }),
  ...(selected && {
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  }),
}));

export const SecondaryItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<SecondaryItemProps>(({ theme, selected, layout }) => ({
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[500],
  width: "100%",
  height: 4,
  maxWidth: 14,
  opacity: 0.24,

  ...(layout === "horizontal" && { maxWidth: 10 }),
  ...(selected && {
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  }),
}));

export const Nav = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "layout",
})<LayoutOptionProps>(({ theme, layout }) => ({
  gap: 4,
  flexShrink: 0,
  padding: 6,
  width: 32,
  height: "100%",
  borderRightWidth: 1,
  borderRightStyle: "solid",
  borderRightColor: alpha(theme.palette.grey[500], 0.08),

  ...(layout === "mini" && {
    width: 22,
  }),

  ...(layout === "horizontal" && {
    width: "100%",
    height: 22,
    borderRight: "none",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: alpha(theme.palette.grey[500], 0.08),
  }),
}));

export const Container = styled(Button, {
  shouldForwardProp: (prop) => prop !== "layout",
})<ContainerProps>(({ theme, layout, selected }) => ({
  width: "100%",
  height: 64,
  borderRadius: 12,
  borderWidth: 1,
  borderStyle: "solid",
  padding: 0,
  borderColor: alpha(theme.palette.grey[500], 0.08),
  ...(layout === "horizontal" && { flexDirection: "column" }),
  ...(selected && {
    boxShadow: `-8px 8px 20px -4px ${alpha(theme.palette.grey[500], 0.12)}`,
  }),
}));

export const Content = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "selected",
})<CommonProps>(({ theme, selected }) => ({
  width: "100%",
  height: "100%",
  opacity: 0.2,
  borderRadius: 6,
  backgroundColor: theme.palette.grey[500],
  ...(selected && {
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  }),
}));
