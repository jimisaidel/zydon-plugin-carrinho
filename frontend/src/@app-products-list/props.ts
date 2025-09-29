/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserData } from 'types/auth';
import { PluginProps } from 'types/plugin';

export type Props = PluginProps<{
  authData: UserData;
  newOrder: Record<string, any>;
  preOrderFormData?: Record<string, any>;
  checkoutFormData?: Record<string, any>;
  partnerId: string; // Parceiro selecionado no pré-pedido
  partner:string; // Parceiro selecionado pelo usuário
  loadingCategories: boolean;
  categories: Record<string, any>[];
  loadingProducts: boolean;
  fetchingProducts: boolean;
  products: Record<string, any>[];
}>;
