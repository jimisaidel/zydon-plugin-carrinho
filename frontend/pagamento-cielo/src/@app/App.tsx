import Stack from "@mui/material/Stack";
import Common from "@zydon/common/components/Common";
import Field from "@zydon/common/components/form/Field";
import Form from "@zydon/common/components/form/Form";
import { FocusEvent, useState } from "react";
import Cards, { ReactCreditCardsProps } from "react-credit-cards-2";

import "react-credit-cards-2/dist/es/styles-compiled.css";

import { useForm } from "react-hook-form";

const App = (_: any) => {
  const [focused, setFocused] =
    useState<ReactCreditCardsProps["focused"]>("name");
  const methods = useForm({
    defaultValues: {
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      focused: "name",
    },
  });
  const { handleSubmit, watch } = methods;
  const [name, number, expiry, cvc] = watch([
    "name",
    "number",
    "expiry",
    "cvc",
  ]);

  const handleInputFocus = (
    evt: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setFocused(evt.target.name as ReactCreditCardsProps["focused"]);
  };

  return (
    <Common primaryColor="#00ad57">
      <Stack direction="row" gap={3} maxWidth={800} m="auto">
        <Cards
          number={number}
          expiry={expiry}
          cvc={cvc}
          name={name}
          focused={focused}
        />

        <Form methods={methods} onSubmit={handleSubmit((v) => v)} gap={2}>
          <Field
            name="number"
            placeholder="Número do cartão"
            onFocus={handleInputFocus}
          />
          <Field
            name="name"
            placeholder="Nome impresso no cartão"
            onFocus={handleInputFocus}
          />
          <Field
            name="expiry"
            placeholder="Data expiração"
            onFocus={handleInputFocus}
          />
          <Field
            name="cvc"
            placeholder="03 ou 04 digitos atrás do cartão"
            onFocus={handleInputFocus}
          />
        </Form>
      </Stack>
    </Common>
  );
};

export default App;
