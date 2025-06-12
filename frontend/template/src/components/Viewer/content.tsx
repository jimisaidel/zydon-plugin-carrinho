import Common from "@zydon/common/components/Common";
import { useViewer } from "../../contexts/ViewerContext";
import Admin from "./Admin";
import Portal from "./Portal";
import Settings from "./Settings";
import { ContentProps } from "./props";

const Content = ({
  configView,
  appView,
  portalColor = "#000000",
}: ContentProps) => {
  const { view, appType, layout } = useViewer();

  const Container =
    view === "config"
      ? (props: object) => <Admin {...props} />
      : (props: object) => <Portal {...props} mode={appType} layout={layout} />;

  return (
    <Common primaryColor={view === "config" ? "#4E5BEC" : portalColor}>
      <Container>{view === "config" ? configView : appView}</Container>

      <Settings />
    </Common>
  );
};

export default Content;
