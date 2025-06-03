import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ActionButton from "@zydon/common/components/ActionButton";
import Common from "@zydon/common/components/Common";
import Field from "@zydon/common/components/form/Field";
import Form from "@zydon/common/components/form/Form";
import MultiCheckbox from "@zydon/common/components/form/MultiCheckbox";
import Icon from "@zydon/common/components/Icon";
import { useForm } from "react-hook-form";

const Configs = () => {
  const methods = useForm({
    defaultValues: {
      accept: [],
      publicKey: "",
      privateKey: "",
    },
  });
  const { handleSubmit } = methods;

  return (
    <Common primaryColor="#951159">
      <Stack gap={2}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Tooltip title="Tooltip">
            <Icon icon="DOLLAR_CIRCLE" width={32} color="primary.main" />
          </Tooltip>

          <Stack>
            <Typography variant="h6" lineHeight={1.15}>
              Configuração de pagamento com Cielo
            </Typography>
            <Typography variant="caption">
              Pagamentos seguros e com as melhores taxas
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Form
          methods={methods}
          onSubmit={handleSubmit((v) => console.log(v))}
          gap={2}
          alignItems="flex-end"
        >
          <Stack flex={1} width={1}>
            <MultiCheckbox
              label="Quero receber pagamento com:"
              name="accept"
              options={[
                {
                  label: "Pix",
                  value: "PIX",
                },
                {
                  label: "Boleto bancário",
                  value: "BOLETO",
                },
                {
                  label: "Cartão de crédito",
                  value: "CARTAO",
                },
              ]}
              row
              rules={{
                validate: {
                  valid: (value: string[] = []) => {
                    if (value.length === 0) {
                      return "Selecione uma opção";
                    }

                    return true;
                  },
                },
              }}
              required
            />
          </Stack>
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
          />
          <ActionButton type="submit" variant="contained" actionType="SAVE">
            Salvar
          </ActionButton>
        </Form>
      </Stack>
    </Common>
  );
};

export default Configs;
