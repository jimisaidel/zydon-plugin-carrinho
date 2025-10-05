import * as ZydonAuth from '@zydon/auth';

// Configurações da API
export const API_CONFIG = {
  // URL base da API do plugin carrinho
  BASE_URL: 'https://zydon-plugin-carrinho-production.zydon.com.br/api',
  
  // Chave de acesso do plugin (será fornecida pela equipe Zydon)
  ACCESS_KEY_CODE: 'carrinho-plugin-access-key',
  
  // Endpoints disponíveis
  ENDPOINTS: {
    SHOPPING_CARTS: '/shopping-carts',
    CART_DETAILS: '/shopping-carts/:id',
    CART_METRICS: '/shopping-carts/metrics',
  }
};

// Função para obter headers de autenticação padrão
export const getDefaultHeaders = () => {
  const { organization_id } = ZydonAuth.getAuthData() ?? {};
  
  return {
    'Content-Type': 'application/json',
    'X-Zydon-Access-Key-Code': API_CONFIG.ACCESS_KEY_CODE,
    'X-Zydon-Access-Key-Token': organization_id ?? '',
    'User-Agent': 'Zydon-Plugin-Carrinho/1.0'
  };
};

// Função utilitária para construir URLs de endpoint
export const buildEndpointUrl = (endpoint: string, params?: Record<string, string>) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
  }
  
  return url;
};

// Configurações de timeout e retry
export const REQUEST_CONFIG = {
  TIMEOUT: 30000, // 30 segundos
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
};
