import { RouterProvider } from 'react-router-dom';
import { Authed } from '@zydon/auth';

import router from './routes';

const Configs = () => {
  return (
    <Authed
      mode={import.meta.env.VITE_MODE}
      username={import.meta.env.VITE_USERNAME}
      password={import.meta.env.VITE_PASSWORD}
      fallback={<>Acesso negado</>}
    >
      <RouterProvider router={router} />
    </Authed>
  );
};

export default Configs;
