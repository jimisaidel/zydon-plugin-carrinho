import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import { mockData, primaryColor } from 'mocks/data-props';

import AppPlugin from './@app/App';
import AppNewOrderPlugin from './@app-new-order/App';
import AppProductsListView from './@app-products-list/App';
import AppScreen from './@app-screen/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor={primaryColor}>
    <Viewer
      configView={<Configs />}
      appView={<AppPlugin {...mockData.app} />}
      newOrderView={<AppNewOrderPlugin {...mockData.newOrder} />}
      checkoutView={<>Checkout View</>}
      productDetailView={<>Product Detail View</>}
      productDetailActionsView={<>Product Detail Actions View</>}
      productsListView={<AppProductsListView {...mockData.productsList} />}
      productsListItemView={<>Products List Item View</>}
      screenView={<AppScreen {...mockData.appScreen} />}
    />
  </Common>
);

export default App;
