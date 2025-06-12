import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";

export const Container = styled(Stack)(({ theme }) => ({
  padding: "24px 16px 16px",
  gap: 16,
  width: "100%",
  flexWrap: "wrap",
  borderRadius: 12,
  position: "relative",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 0 0 1px ${alpha(theme.palette.grey["500"], 0.16)}`,
}));

export const Title = styled("span")(({ theme }) => ({
  padding: "2px 8px",
  top: 0,
  marginLeft: 20,
  left: 0,
  borderRadius: 8,
  position: "absolute",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.common.white,
  transform: "translateY(-50%)",
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightSemiBold,
  border: `solid 1px ${alpha(theme.palette.grey["500"], 0.24)}`,
}));
