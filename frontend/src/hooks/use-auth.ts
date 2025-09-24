import { useAuth as useAuthentication } from '@zydon/auth';

import { MODE } from 'configs/config-global';

const useAuth = () => {
  const authData = useAuthentication(MODE);

  return authData;
};

export default useAuth;
