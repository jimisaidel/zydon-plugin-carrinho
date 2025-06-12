import { Control, Layout, AppType, View } from "../types/viewer";

export interface ViewerContextValue {
  control: Control;
  view: View;
  appType: AppType;
  layout: Layout;
  setControl: (c: Control) => void;
  hideControl: () => void;
  changeView: (v: View) => void;
  changeAppType: (t: AppType) => void;
  changeLayout: (l: Layout) => void;
}
