import { styled } from "@mui/material/styles";
import IconButton from "@zydon/common/components/IconButton";

export const Trigger = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  position: "fixed",
  bottom: 32,
  right: 32,
}));
