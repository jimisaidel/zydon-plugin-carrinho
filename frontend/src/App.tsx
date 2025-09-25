import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import { mockData, primaryColor } from 'mocks/data-props';

import AppPlugin from './@app/App';
import AppCheckout from './@app-checkout/App';
import AppProductDetail from './@app-product-detail/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor={primaryColor}>
    <Viewer
      configView={<Configs />}
      appView={<AppPlugin {...mockData.app} />}
      checkoutView={<AppCheckout />}
      productDetailView={<AppProductDetail />}
    />
  </Common>
);

export default App;
