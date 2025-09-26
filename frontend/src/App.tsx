import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import { mockData, primaryColor } from 'mocks/data-props';

import AppPlugin from './@app/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor={primaryColor}>
    <Viewer
      configView={<Configs />}
      appView={<AppPlugin {...mockData.app} />}
      newOrderView={<>New Order View</>}
      checkoutView={<>Checkout View</>}
      productDetailView={<>Product Detail View</>}
      productDetailActionsView={<>Product Detail Actions View</>}
      productsListView={<>Products List View</>}
      productsListItemView={<>Products List Item View</>}
      screenView={<>Screen View</>}
    />
  </Common>
);

export default App;
