import { APPS } from "@/mock";
import dynamic from "next/dynamic";

import { LoadAppsProps } from "./props";
import { useTheme } from "@mui/material/styles";

const DynamicWebComponent = dynamic(
  () => import("@/components/DynamicWebComponent"),
  {
    loading: () => <></>,
    ssr: false,
  }
);

const LoadApps = ({ type }: LoadAppsProps) => {
  const globalApps = APPS.filter((app) => app.type === type);
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();

  return globalApps.map((app) => (
    <DynamicWebComponent
      key={app.id}
      url={app.url}
      tagName={app.tag}
      cssUrl={app.cssUrl}
      props={{
        prop1: "prop1",
        prop2: JSON.stringify({
          key: "value",
          key2: "value2",
        }),
        primaryColor: main,
      }}
    />
  ));
};

export default LoadApps;
