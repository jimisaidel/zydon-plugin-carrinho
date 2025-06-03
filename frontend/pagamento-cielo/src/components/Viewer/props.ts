import { ReactNode } from "react";

export type Control = "on" | "off";
export type View = "app" | "config";
export enum AppType {
  "global" = "global",
  "checkout" = "checkout",
}

export interface ViewerProps {
  configView: ReactNode;
  appView: ReactNode;
}
