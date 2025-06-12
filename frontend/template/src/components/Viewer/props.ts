import { ReactNode } from "react";

type HEX = `#${string}`;

export interface ViewerProps {
  configView: ReactNode;
  appView: ReactNode;
  portalColor?: HEX;
}

export interface ContentProps {
  configView: ReactNode;
  appView: ReactNode;
  portalColor?: HEX;
}
