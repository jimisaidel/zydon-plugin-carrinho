import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";
import General from "./General";

const Checkout = ({ children }: PropsWithChildren) => {
  return (
    <General>
      <Stack gap={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Checkout</Typography>
          <Button variant="soft">Continuar comprando</Button>
        </Stack>

        <Stack direction="row" gap={3}>
          <Stack gap={2} flex={1}>
            <Typography variant="h5">Itens do pedido</Typography>

            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </Stack>

          <Stack width={300} gap={2}>
            <Typography variant="h5">Resumo</Typography>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Button color="primary" size="large" variant="contained">
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {children}
    </General>
  );
};

export default Checkout;
