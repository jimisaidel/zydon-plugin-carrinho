import { PropsWithChildren } from "react";

import { PortalProps } from "./props";
import General from "./General";
import { AppType } from "../props";
import Checkout from "./Checkout";

const Portal = ({ children, mode }: PropsWithChildren<PortalProps>) => {
  const Container = mode === AppType.global ? General : Checkout;

  return <Container>{children}</Container>;
};

export default Portal;
