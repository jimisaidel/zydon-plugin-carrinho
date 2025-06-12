import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const Container = styled(Stack)({
  minHeight: "100vh",
  flexDirection: "row",
});

export const Sidebar = styled(Stack)(({ theme }) => ({
  gap: 4,
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
  width: 300,
  padding: 16,
  borderRight: `1px solid ${theme.palette.grey[200]}`,
}));

export const Logo = styled(Stack)(({ theme }) => ({
  width: "80%",
  height: 56,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  borderRadius: 4,
  marginBottom: 12,
  marginRight: "auto",
}));

export const Menu = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: 40,
  backgroundColor: theme.palette.grey[200],
  borderRadius: 4,
}));

export const Header = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
  height: 72,
}));

export const Search = styled(Stack)(({ theme }) => ({
  width: 400,
  height: 40,
  backgroundColor: theme.palette.grey[200],
  borderRadius: 4,
}));

export const Content = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  flex: 1,
}));
