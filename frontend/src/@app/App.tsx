import Common from '@zydon/common/components/Common';

import Plugin from './Plugin';
import { AppProps } from './props';

import './styles.css';

const App = ({ primaryColor = '#000000' }: AppProps) => {
  return (
    <Common primaryColor={primaryColor} cssVarPrefix="plugin">
      <Plugin />
    </Common>
  );
};

export default App;
