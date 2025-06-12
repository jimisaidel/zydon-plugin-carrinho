import { PropsWithChildren } from "react";

import Common from "@zydon/common/components/Common";

import Horizontal from "./layouts/Horizontal";
import Mini from "./layouts/Mini";
import Vertical from "./layouts/Vertical";
import { PortalProps } from "./props";

const Portal = ({ children, layout }: PropsWithChildren<PortalProps>) => {
  const layouts = {
    horizontal: Horizontal,
    full: Vertical,
    mini: Mini,
  };

  const Layout = layouts[layout];
  console.log({ Layout, layout });

  return <Layout>{children}</Layout>;
};

export default Portal;
