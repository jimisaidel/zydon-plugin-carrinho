import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const NewOrder = () => {
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Lista de produtos</Typography>
        <Button component={Link} href="/novo-pedido/checkout" variant="soft">
          Fechar pedido
        </Button>
      </Stack>

      <Stack
        direction="row"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr"
        gap={2}
      >
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </Stack>
    </Stack>
  );
};

export default NewOrder;
