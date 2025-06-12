
import Viewer from '@zydon/plugin/components/Viewer';

import Plugin from './@app/App';
import Configs from './@configs/Configs';

const App = () => <Viewer configView={<Configs />} appView={<Plugin />} />;

export default App;
