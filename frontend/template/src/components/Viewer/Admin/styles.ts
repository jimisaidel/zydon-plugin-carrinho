import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";

export const Container = styled(Stack)({
  flexDirection: "row",
  minHeight: "100vh",
});

export const Sidebar = styled(Stack)(({ theme }) => ({
  maxWidth: 90,
  flex: 1,
  paddingTop: "1rem",
  paddingBottom: "2.5rem",
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
  gap: 16,
  alignItems: "center",

  "& > svg": {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
}));

export const MenuItem = styled("div")(({ theme }) => ({
  width: 52,
  height: 45,
  backgroundColor: theme.palette.grey[200],
  borderRadius: 8,
}));
