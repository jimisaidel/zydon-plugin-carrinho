import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import loadable from '@zydon/common/utils/loadable';

import Main from '@configs/layouts/Main';
import { BASE_PATH } from 'configs/config-global';

const Home = loadable(lazy(() => import('@configs/views/Home')));
const CartDetails = loadable(lazy(() => import('@configs/views/CartDetails')));

const router = createBrowserRouter(
  [
    {
      element: <Main />,
      path: '/',
      children: [
        {
          path: '/',
          element: <Home />,
          index: true,
        },
        {
          path: '/cart-details/:id',
          element: <CartDetails />,
        },
        {
          path: '*',
          element: <>Página não encontrada</>,
        },
      ],
    },
  ],
  { basename: BASE_PATH },
);

export default router;
