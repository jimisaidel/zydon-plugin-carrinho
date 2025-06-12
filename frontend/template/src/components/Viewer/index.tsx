import { ViewerProvider } from "../../contexts/ViewerContext";
import Content from "./content";
import { ViewerProps } from "./props";

const Viewer = ({
  appView,
  configView,
  portalColor = "#000000",
}: ViewerProps) => {
  return (
    <ViewerProvider>
      <Content
        configView={configView}
        appView={appView}
        portalColor={portalColor}
      />
    </ViewerProvider>
  );
};

export default Viewer;
