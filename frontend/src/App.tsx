import Common from '@zydon/common/components/Common';
import Viewer from '@zydon/plugin/components/Viewer';

import AppPlugin from './@app/App';
import AppCheckout from './@app-checkout/App';
import AppProductDetail from './@app-product-detail/App';
import Configs from './@configs/Configs';

import '@zydon/common/styles.css';

const App = () => (
  <Common primaryColor="#000000">
    <Viewer
      configView={<Configs />}
      appView={<AppPlugin />}
      checkoutView={<AppCheckout />}
      productDetailView={<AppProductDetail />}
      newOrderView={<div>New Order View</div>}
      productDetailActionsView={<div>Product Detail Actions</div>}
      productsListView={<div>Products List View</div>}
      productsListItemView={<div>Products List Item View</div>}
      screenView={<div>Screen View</div>}
    />
  </Common>
);

export default App;
