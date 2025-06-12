import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const Container = styled(Stack)({
  minHeight: "100vh",
});

export const HeaderTop = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: "0 40px",
  height: 64,
  borderBottom: `1px dashed ${theme.palette.grey[200]}`,
}));

export const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 48,
  width: 240,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
}));

export const HeaderMenus = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  padding: "0 40px",
  height: 64,
  gap: 8,
});

export const Menu = styled("div")(({ theme }) => ({
  height: 32,
  width: 120,
  backgroundColor: theme.palette.grey[100],
  borderRadius: 4,
}));

export const Content = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  flex: 1,
  padding: "24px 40px",
}));
