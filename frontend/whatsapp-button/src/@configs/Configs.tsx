import { Divider, FormControlLabel, InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import ActionButton from "@zydon/common/components/ActionButton";
import Common from "@zydon/common/components/Common";
import Field from "@zydon/common/components/form/Field";
import Form from "@zydon/common/components/form/Form";
import MaskedInput from "@zydon/common/components/form/MaskedInput";
import Icon from "@zydon/common/components/Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Configs = () => {
  const [active, setActive] = useState(false);
  const methods = useForm({
    defaultValues: {
      number: "",
      message: "",
    },
  });
  const { handleSubmit } = methods;
  return (
    <Common primaryColor="#951159">
      <Stack gap={2}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Icon icon="WHATSAPP" width={32} color="primary.main" />

          <Stack>
            <Typography variant="h6" lineHeight={1.15}>
              Botão zapzap
            </Typography>
            <Typography variant="caption">
              Vamos configurar seu botão Whatsapp no seu Portal?
            </Typography>
          </Stack>

          <FormControlLabel
            control={
              <Switch
                checked={active}
                onChange={(_, value) => setActive(value)}
              />
            }
            label="Ativo"
            sx={{ ml: "auto" }}
          />
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        {active ? (
          <Form
            methods={methods}
            onSubmit={handleSubmit((v) => console.log(v))}
            gap={2}
            alignItems="flex-end"
          >
            <MaskedInput
              mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
              name="number"
              label="Número do Whatsapp"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="WHATSAPP" color="primary.main" />
                  </InputAdornment>
                ),
              }}
              rules={{
                required: {
                  value: true,
                  message: "Informe o número",
                },
              }}
              required
            />

            <Field
              name="message"
              label="Texto da mensagem"
              multiline
              rows={2}
              rules={{
                required: {
                  value: true,
                  message: "Informe uma mensagem padrão",
                },
              }}
              required
            />

            <ActionButton type="submit" variant="contained" actionType="SAVE">
              Salvar
            </ActionButton>
          </Form>
        ) : (
          <Stack alignItems="center" justifyContent="center" gap={2}>
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
              <Icon icon="TOGGLE_OFF" width={40} color="text.disabled" />
            </Stack>
            <Typography variant="body1">
              O botão WhatsApp está desabilitado para seu portal
            </Typography>
          </Stack>
        )}
      </Stack>
    </Common>
  );
};

export default Configs;
