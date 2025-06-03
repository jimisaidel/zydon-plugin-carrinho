import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Common from "@zydon/common/components/Common";
import Field from "@zydon/common/components/form/Field";
import Form from "@zydon/common/components/form/Form";
import Password from "@zydon/common/components/form/Password";
import Icon from "@zydon/common/components/Icon";
import { useForm } from "react-hook-form";

const Configs = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Common primaryColor="#000000">
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Icon icon="SETTINGS" width={32} color="primary.main" />
        <Stack>
          <Typography variant="h6" lineHeight={1.15}>
            Configuração Rede
          </Typography>
          <Typography variant="caption">Vamos configurar seu App?</Typography>
        </Stack>
      </Stack>

      <Form
        methods={methods}
        onSubmit={handleSubmit((v) => console.log({ v }))}
        gap={2}
        mt={3}
      >
        <Field name="merchantID" label="Merchant ID" />

        <Password
          name="merchantKey"
          label="Merchant Key"
          passwordSize={[6, 20]}
        />

        <Button type="submit" variant="contained" color="error" size="large">
          Salvar
        </Button>
      </Form>
    </Common>
  );
};

export default Configs;
