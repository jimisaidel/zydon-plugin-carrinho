import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import Plugin from './@app/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor="#4E5BEC">
    <Viewer configView={<Configs />} appView={<Plugin />} />
  </Common>
);

export default App;
