import Viewer from '@zydon/plugin/components/Viewer';

import Plugin from './@app/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

import '@zydon/common';

const App = () => (
  <Viewer configView={<Configs />} appView={<Plugin />} portalColor="#000000" />
);

export default App;
