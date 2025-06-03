import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

import Logo from "../../Logo";

const Admin = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="md">
      <Stack direction="row" gap={3}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            width: 1,
            mx: "auto",
            maxWidth: 320,
            borderRadius: 2,
          }}
        >
          <Stack alignItems="center" py={2}>
            <Logo />
          </Stack>

          <Stack gap={1} mt={2}>
            <Typography variant="overline" color="grey.500" mb={1}>
              ADMIN
            </Typography>
            <Skeleton height={44} width="100%" variant="rounded" />
            <Skeleton height={44} width="100%" variant="rounded" />
            <Skeleton height={44} width="100%" variant="rounded" />

            <Typography variant="overline" color="grey.500" my={1}>
              APPs
            </Typography>
            <Skeleton height={44} width="100%" variant="rounded" />
            <Button size="large">Sua aplicação aqui</Button>
            <Skeleton height={44} width="100%" variant="rounded" />
          </Stack>
        </Paper>

        <Stack flex={1}>{children}</Stack>
      </Stack>
    </Container>
  );
};

export default Admin;
