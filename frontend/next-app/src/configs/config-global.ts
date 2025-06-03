import packageJson from '../../package.json';

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

export const INGRESS = process.env.NEXT_PUBLIC_ZDN_INGRESS;
export const REVALIDATE_TIME = +(process.env.REVALIDATE_TIME || 0);

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL_SALES = process.env.NEXT_PUBLIC_API_URL_SALES;

export const NO_IMAGE = '/no-image.svg';

export const DEFAULT_IMAGE = '/b2b-noimage-white.svg';

export const NEW_ORDER_CONTEXT_KEY = 'NEW_ORDER';

export const VERSION = packageJson.version;
