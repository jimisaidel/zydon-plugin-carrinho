import * as ZydonAuth from '@zydon/auth';

import { MODE } from 'configs/config-global';

const useAuth = () => {
  const authData = ZydonAuth.useAuth(MODE);

  return authData;
};

export default useAuth;
