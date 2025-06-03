import { Container, Paper, Skeleton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import Logo from "../../Logo";

const General = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Container maxWidth="md">
        <Stack gap={3} mb={3}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              width: 1,
              mx: "auto",
              borderRadius: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Logo />

            <Skeleton width={120} height={30} variant="rectangular" />
            <Skeleton width={100} height={30} variant="rectangular" />
            <Skeleton width={140} height={30} variant="rectangular" />
            <Skeleton width={80} height={30} variant="rectangular" />
          </Paper>
        </Stack>

        {children}
      </Container>
    </>
  );
};

export default General;
