import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ActionButton from "@zydon/common/components/ActionButton";
import Common from "@zydon/common/components/Common";
import Field from "@zydon/common/components/form/Field";
import Form from "@zydon/common/components/form/Form";
import Icon from "@zydon/common/components/Icon";
import { useForm } from "react-hook-form";

const Configs = () => {
  const methods = useForm({
    defaultValues: {
      privateKey: "",
      publicKey: "",
    },
  });
  const { handleSubmit } = methods;
  return (
    <Common primaryColor="#951159">
      <Stack alignItems="center" gap={3}>
        <Stack
          alignItems="center"
          justifyContent="center"
          width={80}
          height={80}
          border="1px solid"
          borderColor="divider"
          sx={{
            borderStyle: "dashed",
            borderRadius: "50%",
          }}
        >
          <Icon icon="BLOCKCHAIN" width={40} color="warning.main" />
        </Stack>

        <Stack mb={2}>
          <Typography variant="h4" lineHeight={1.15} align="center">
            Bitpay
          </Typography>
          <Typography variant="body2" lineHeight={1.15} align="center">
            Transações com Bitcoin, rápidas, seguras e com taxas imbatíveis
          </Typography>
        </Stack>

        <Form
          methods={methods}
          onSubmit={handleSubmit((v) => console.log(v))}
          maxWidth={440}
          gap={2}
        >
          <Field
            name="publicKey"
            label="Chave pública"
            rules={{
              required: {
                value: true,
                message: "Informe sua chave pública",
              },
            }}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="DOT" color="primary.main" />
                </InputAdornment>
              ),
            }}
            type="password"
          />
          <Field
            name="privateKey"
            label="Chave privada"
            rules={{
              required: {
                value: true,
                message: "Informe sua chave privada",
              },
            }}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="DOT" color="primary.main" />
                </InputAdornment>
              ),
            }}
            helperText="Usaremos sua chave privada para fazer reembolsos automáticos para você"
            type="password"
          />

          <ActionButton
            actionType="SAVE"
            type="submit"
            size="large"
            color="warning"
          >
            Salvar configurações
          </ActionButton>
        </Form>
      </Stack>
    </Common>
  );
};

export default Configs;
