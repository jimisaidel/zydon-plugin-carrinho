import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const Actions = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  borderRadius: 16,
  width: "max-content",
  margin: "16px auto 24px",
  padding: "4px 16px",

  "> svg": {
    width: 24,
    height: 24,
  },
});
