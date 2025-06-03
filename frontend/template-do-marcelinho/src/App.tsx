import Configs from "./@configs/Configs";
import Plugin from "./@app/App";
import Viewer from "./components/Viewer";

const App = () => <Viewer configView={<Configs />} appView={<Plugin />} />;

export default App;
