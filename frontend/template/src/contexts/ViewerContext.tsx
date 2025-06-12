import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { AppType, Control, Layout, View } from "../types/viewer";
import { ViewerContextValue } from "./type";

const SESSION_VIEW_KEY = "view";
const SESSION_CONTROL_KEY = "control";
const SESSION_APP_TYPE_KEY = "appType";
const SESSION_LAYOUT_KEY = "layout";

const ViewerContext = createContext<ViewerContextValue | null>(null);

export const ViewerProvider = ({ children }: { children: ReactNode }) => {
  const [control, setControlState] = useState<Control>(
    (sessionStorage.getItem(SESSION_CONTROL_KEY) || "on") as Control
  );
  const [view, setViewState] = useState<View>(
    (sessionStorage.getItem(SESSION_VIEW_KEY) || "config") as View
  );
  const [appType, setAppTypeState] = useState<AppType>(
    (sessionStorage.getItem(SESSION_APP_TYPE_KEY) || AppType.global) as AppType
  );
  const [layout, setLayoutState] = useState<Layout>(
    (sessionStorage.getItem(SESSION_LAYOUT_KEY) || "horizontal") as Layout
  );

  const setControl = useCallback((c: Control) => {
    setControlState(c);
    sessionStorage.setItem(SESSION_CONTROL_KEY, c);
  }, []);

  const hideControl = useCallback(() => {
    setControlState("off");
    sessionStorage.setItem(SESSION_CONTROL_KEY, "off");
  }, []);

  const changeView = useCallback((v: View) => {
    setViewState(v);
    sessionStorage.setItem(SESSION_VIEW_KEY, v);
  }, []);

  const changeAppType = useCallback((t: AppType) => {
    setAppTypeState(t);
    sessionStorage.setItem(SESSION_APP_TYPE_KEY, t);
  }, []);

  const changeLayout = useCallback((l: Layout) => {
    setLayoutState(l);
    sessionStorage.setItem(SESSION_LAYOUT_KEY, l);
  }, []);

  return (
    <ViewerContext.Provider
      value={{
        control,
        view,
        appType,
        layout,
        setControl,
        hideControl,
        changeView,
        changeAppType,
        changeLayout,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export function useViewer() {
  const ctx = useContext(ViewerContext);

  if (!ctx) throw new Error("useViewer must be used within a ViewerProvider");

  return ctx;
}
