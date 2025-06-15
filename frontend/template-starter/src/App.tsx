import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import Plugin from './@app/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor="#000000">
    <Viewer configView={<Configs />} appView={<Plugin />} />
  </Common>
);

export default App;
