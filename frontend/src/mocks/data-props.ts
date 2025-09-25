import { Profile } from 'types/auth';
import { AccessRequestStatus } from 'types/auth';

export const authData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  fiscalRegistrationNumber: '123456789',
  profile: Profile.SELLER,
  accessToken: '123456789',
  refreshToken: '123456789',
  expiration: new Date(),
  organizationId: '123456789',
  sellerId: '123456789',
  emailConfirmed: true,
  accessRequestStatus: AccessRequestStatus.APPROVED,
  isAccessRequest: false,
  userId: '123456789',
  userActive: true,
  changePasswordNextAccess: true,
  context: {
    partnerId: '123456789',
    newOrderId: '123456789',
    paymentMethodId: '123456789',
  },
};

export const primaryColor = '#2e2b2b';

export const mockData = {
  app: {
    pathname: '/app',
    primaryColor,
    authData,
  },
};
