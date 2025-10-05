// Definições de tipos
interface CartItem {
  id: string
  product_id: string
  product_name: string
  product_sku: string
  unit_id: string
  unit_name: string
  product_variation_id: string
  price: number
  seller_price: number
  quantity: number
  discount: number
  total: number
  created_at: string
  updated_at: string
}

interface ShoppingCart {
  id: string
  portal_id: string
  user_id: string
  user_name: string
  user_profile: string | null
  partner_id: string | null
  partner_name: string | null
  seller_id: string | null
  seller_name: string | null
  total: number
  created_at: string
  updated_at: string
  items: CartItem[]
}

import { getToken } from '@zydon/auth';

// Base URL da API do Plugin Carrinho
const API_BASE_URL = 'https://api.zydon.com.br/api';

const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Zydon-Plugin-Carrinho/1.0'
  };
  
  // Só adiciona Authorization se o token existir
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
} 

// Dados mockados no formato da API Zydon
export const mockData = {
  currentPage: 0,
  perPage: 20,
  total: 6,
  items: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      user_name: "João Silva",
      user_profile: "PARTNER",
      partner_id: "partner_001",
      partner_name: "Partner Tech Solutions",
      seller_id: "seller_001",
      seller_name: "Ana Costa",
      total: 1199.99,
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_001",
          product_id: "prod_001",
          product_name: "Smartphone Samsung Galaxy",
          product_sku: "SAM-GAL-001",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_001",
          price: 1299.99,
          seller_price: 1199.99,
          quantity: 1,
          discount: 100.00,
          total: 1199.99,
          created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb0",
      user_name: "Maria Santos",
      user_profile: "PARTNER",
      partner_id: "partner_002",
      partner_name: "Digital Commerce Ltd",
      seller_id: "seller_002",
      seller_name: "Carlos Silva",
      total: 2299.99,
      created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_002",
          product_id: "prod_002",
          product_name: "Notebook Dell Inspiron",
          product_sku: "DELL-INS-002",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_002",
          price: 2499.99,
          seller_price: 2299.99,
          quantity: 1,
          discount: 200.00,
          total: 2299.99,
          created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afb1",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb2",
      user_name: "Pedro Costa",
      user_profile: "PARTNER",
      partner_id: "partner_001",
      partner_name: "Partner Tech Solutions",
      seller_id: "seller_001",
      seller_name: "Ana Costa",
      total: 839.97,
      created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_003",
          product_id: "prod_003",
          product_name: "Tênis Nike Air Max",
          product_sku: "NIKE-AIR-003",
          unit_id: "unit_002",
          unit_name: "Par",
          product_variation_id: "var_003",
          price: 399.99,
          seller_price: 379.99,
          quantity: 2,
          discount: 40.00,
          total: 759.98,
          created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        },
        {
          id: "item_004",
          product_id: "prod_004",
          product_name: "Camiseta Adidas",
          product_sku: "ADI-CAM-004",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_004",
          price: 89.99,
          seller_price: 79.99,
          quantity: 1,
          discount: 10.00,
          total: 79.99,
          created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afb3",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb4",
      user_name: "Ana Oliveira",
      user_profile: "PARTNER",
      partner_id: "partner_003",
      partner_name: "Electronics Hub",
      seller_id: "seller_003",
      seller_name: "Roberto Lima",
      total: 549.99,
      created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_005",
          product_id: "prod_005",
          product_name: "Fone de Ouvido Sony",
          product_sku: "SONY-FON-005",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_005",
          price: 599.99,
          seller_price: 549.99,
          quantity: 1,
          discount: 50.00,
          total: 549.99,
          created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afb5",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb6",
      user_name: "Carlos Lima",
      user_profile: "PARTNER",
      partner_id: "partner_002",
      partner_name: "Digital Commerce Ltd",
      seller_id: "seller_002",
      seller_name: "Carlos Silva",
      total: 1699.99,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_006",
          product_id: "prod_006",
          product_name: 'Smart TV LG 55"',
          product_sku: "LG-TV-006",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_006",
          price: 1799.99,
          seller_price: 1699.99,
          quantity: 1,
          discount: 100.00,
          total: 1699.99,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "2ad98213-c0f0-4120-825d-d299fc4298ab",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb7",
      user_name: "Teste Usuario",
      user_profile: "PARTNER",
      partner_id: "partner_004",
      partner_name: "Test Partner",
      seller_id: "seller_004",
      seller_name: "Vendedor Teste",
      total: 299.99,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_007",
          product_id: "prod_007",
          product_name: "Produto Teste",
          product_sku: "TESTE-SKU-007",
          unit_id: "unit_003",
          unit_name: "Peça",
          product_variation_id: "var_007",
          price: 299.99,
          seller_price: 299.99,
          quantity: 1,
          discount: 0.00,
          total: 299.99,
          created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-no-seller-001",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb8",
      user_name: "Cliente Sem Vendedor",
      user_profile: "PARTNER",
      partner_id: "partner_005",
      partner_name: "Partner Sem Vendedor",
      seller_id: null,
      seller_name: null,
      total: 199.99,
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_008",
          product_id: "prod_008",
          product_name: "Produto Sem Vendedor",
          product_sku: "NO-SELLER-008",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_008",
          price: 199.99,
          seller_price: 199.99,
          quantity: 1,
          discount: 0.00,
          total: 199.99,
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-admin-001",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afb9",
      user_name: "Admin Usuario",
      user_profile: "ADMIN",
      partner_id: "partner_006",
      partner_name: "Admin Partner",
      seller_id: "seller_005",
      seller_name: "Admin Vendedor",
      total: 899.99,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_009",
          product_id: "prod_009",
          product_name: "Produto Admin",
          product_sku: "ADMIN-PROD-009",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_009",
          price: 899.99,
          seller_price: 899.99,
          quantity: 1,
          discount: 0.00,
          total: 899.99,
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-client-001",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc0",
      user_name: "Cliente Final",
      user_profile: "CLIENT",
      partner_id: null,
      partner_name: null,
      seller_id: "seller_006",
      seller_name: "Vendedor Cliente",
      total: 149.99,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_010",
          product_id: "prod_010",
          product_name: "Produto Cliente",
          product_sku: "CLIENT-PROD-010",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_010",
          price: 149.99,
          seller_price: 149.99,
          quantity: 1,
          discount: 0.00,
          total: 149.99,
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-no-profile-001",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc1",
      user_name: "Usuario Sem Perfil",
      user_profile: null,
      partner_id: "partner_007",
      partner_name: "Partner Sem Perfil",
      seller_id: "seller_007",
      seller_name: "Vendedor Sem Perfil",
      total: 79.99,
      created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_011",
          product_id: "prod_011",
          product_name: "Produto Sem Perfil",
          product_sku: "NO-PROFILE-011",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_011",
          price: 79.99,
          seller_price: 79.99,
          quantity: 1,
          discount: 0.00,
          total: 79.99,
          created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-darth-001",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc2",
      user_name: "DARTH VADER",
      user_profile: "PARTNER",
      partner_id: "partner_008",
      partner_name: "DARTH VADER ENTERPRISES",
      seller_id: "seller_008",
      seller_name: "Vendedor Darth",
      total: 999.99,
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: "item_012",
          product_id: "prod_012",
          product_name: "Lightsaber",
          product_sku: "DARTH-SABER-012",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_012",
          price: 999.99,
          seller_price: 999.99,
          quantity: 1,
          discount: 0.00,
          total: 999.99,
          created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "test-date-16-09-2025",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc3",
      user_name: "Usuario Data Teste",
      user_profile: "PARTNER",
      partner_id: "partner_009",
      partner_name: "Partner Data Teste",
      seller_id: "seller_009",
      seller_name: "Vendedor Data Teste",
      total: 599.99,
      created_at: "2025-09-16T10:30:00.000Z",
      updated_at: "2025-09-16T10:30:00.000Z",
      items: [
        {
          id: "item_013",
          product_id: "prod_013",
          product_name: "Produto Data Teste",
          product_sku: "DATE-TEST-013",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_013",
          price: 599.99,
          seller_price: 599.99,
          quantity: 1,
          discount: 0.00,
          total: 599.99,
          created_at: "2025-09-16T10:30:00.000Z",
          updated_at: "2025-09-16T10:30:00.000Z",
        },
      ],
    },
    {
      id: "test-date-15-09-2025-1",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc4",
      user_name: "Teste Zoe Samuel",
      user_profile: "PARTNER",
      partner_id: "partner_010",
      partner_name: "ZYDON TECNOLOGIA LTDA",
      seller_id: null,
      seller_name: null,
      total: 995.67,
      created_at: "2025-09-15T08:15:00.000Z",
      updated_at: "2025-09-15T08:15:00.000Z",
      items: [
        {
          id: "item_014",
          product_id: "prod_014",
          product_name: "Produto Teste 1",
          product_sku: "TEST-SKU-014",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_014",
          price: 995.67,
          seller_price: 995.67,
          quantity: 14,
          discount: 0.00,
          total: 995.67,
          created_at: "2025-09-15T08:15:00.000Z",
          updated_at: "2025-09-15T08:15:00.000Z",
        },
      ],
    },
    {
      id: "test-date-15-09-2025-2",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc5",
      user_name: "Cliente [Exemplo]",
      user_profile: "PARTNER",
      partner_id: "partner_011",
      partner_name: "VICTOR DE ALMEIDA LIMA ALCIDES",
      seller_id: null,
      seller_name: null,
      total: 1053.28,
      created_at: "2025-09-15T14:22:00.000Z",
      updated_at: "2025-09-15T14:22:00.000Z",
      items: [
        {
          id: "item_015",
          product_id: "prod_015",
          product_name: "Produto Teste 2",
          product_sku: "TEST-SKU-015",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_015",
          price: 1053.28,
          seller_price: 1053.28,
          quantity: 29,
          discount: 0.00,
          total: 1053.28,
          created_at: "2025-09-15T14:22:00.000Z",
          updated_at: "2025-09-15T14:22:00.000Z",
        },
      ],
    },
    {
      id: "test-date-15-09-2025-3",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc6",
      user_name: "Vendedor [Exemplo]",
      user_profile: "SELLER",
      partner_id: "partner_012",
      partner_name: "RENATO ALEXANDRE DE LACERDA",
      seller_id: "seller_010",
      seller_name: "LUCAS.CURCINO",
      total: 3430.00,
      created_at: "2025-09-15T16:45:00.000Z",
      updated_at: "2025-09-15T16:45:00.000Z",
      items: [
        {
          id: "item_016",
          product_id: "prod_016",
          product_name: "Produto Teste 3",
          product_sku: "TEST-SKU-016",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_016",
          price: 3430.00,
          seller_price: 3430.00,
          quantity: 35,
          discount: 0.00,
          total: 3430.00,
          created_at: "2025-09-15T16:45:00.000Z",
          updated_at: "2025-09-15T16:45:00.000Z",
        },
      ],
    },
    {
      id: "test-date-15-09-2025-4",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc7",
      user_name: "Luz",
      user_profile: "PARTNER",
      partner_id: "partner_013",
      partner_name: "DARTH INDUSTRIA DE COSMÉTICOS LTDA EPP",
      seller_id: null,
      seller_name: null,
      total: 1715.00,
      created_at: "2025-09-15T18:30:00.000Z",
      updated_at: "2025-09-15T18:30:00.000Z",
      items: [
        {
          id: "item_017",
          product_id: "prod_017",
          product_name: "Produto Teste 4",
          product_sku: "TEST-SKU-017",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_017",
          price: 1715.00,
          seller_price: 1715.00,
          quantity: 35,
          discount: 0.00,
          total: 1715.00,
          created_at: "2025-09-15T18:30:00.000Z",
          updated_at: "2025-09-15T18:30:00.000Z",
        },
      ],
    },
    {
      id: "b0189b8e-7bb1-4352-9c50-25a479a79d49",
      portal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afc8",
      user_name: "Cliente Especial",
      user_profile: "PARTNER",
      partner_id: "partner_014",
      partner_name: "Empresa Especial LTDA",
      seller_id: "seller_011",
      seller_name: "Vendedor Especial",
      total: 4567.89,
      created_at: "2025-01-15T10:00:00.000Z",
      updated_at: "2025-01-15T10:00:00.000Z",
      items: [
        {
          id: "item_018",
          product_id: "prod_018",
          product_name: "Smartphone Premium",
          product_sku: "SMART-PREM-018",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_018",
          price: 1299.99,
          seller_price: 1199.99,
          quantity: 1,
          discount: 100.00,
          total: 1199.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_019",
          product_id: "prod_019",
          product_name: "Notebook Gamer",
          product_sku: "NOTE-GAME-019",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_019",
          price: 2999.99,
          seller_price: 2799.99,
          quantity: 1,
          discount: 200.00,
          total: 2799.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_020",
          product_id: "prod_020",
          product_name: "Mouse Gamer RGB",
          product_sku: "MOUSE-RGB-020",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_020",
          price: 199.99,
          seller_price: 179.99,
          quantity: 1,
          discount: 20.00,
          total: 179.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_021",
          product_id: "prod_021",
          product_name: "Teclado Mecânico",
          product_sku: "TECL-MEC-021",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_021",
          price: 299.99,
          seller_price: 269.99,
          quantity: 1,
          discount: 30.00,
          total: 269.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_022",
          product_id: "prod_022",
          product_name: "Monitor 4K 27 polegadas",
          product_sku: "MON-4K-022",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_022",
          price: 899.99,
          seller_price: 799.99,
          quantity: 1,
          discount: 100.00,
          total: 799.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_023",
          product_id: "prod_023",
          product_name: "Headset Gamer",
          product_sku: "HEAD-GAME-023",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_023",
          price: 399.99,
          seller_price: 349.99,
          quantity: 1,
          discount: 50.00,
          total: 349.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_024",
          product_id: "prod_024",
          product_name: "Webcam Full HD",
          product_sku: "WEB-HD-024",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_024",
          price: 249.99,
          seller_price: 219.99,
          quantity: 1,
          discount: 30.00,
          total: 219.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_025",
          product_id: "prod_025",
          product_name: "SSD 1TB NVMe",
          product_sku: "SSD-1TB-025",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_025",
          price: 599.99,
          seller_price: 549.99,
          quantity: 1,
          discount: 50.00,
          total: 549.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_026",
          product_id: "prod_026",
          product_name: "Memória RAM 16GB DDR4",
          product_sku: "RAM-16GB-026",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_026",
          price: 399.99,
          seller_price: 369.99,
          quantity: 1,
          discount: 30.00,
          total: 369.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_027",
          product_id: "prod_027",
          product_name: "Placa de Vídeo RTX 4060",
          product_sku: "GPU-RTX-027",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_027",
          price: 1999.99,
          seller_price: 1899.99,
          quantity: 1,
          discount: 100.00,
          total: 1899.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_028",
          product_id: "prod_028",
          product_name: "Fonte 650W 80+ Gold",
          product_sku: "PSU-650W-028",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_028",
          price: 449.99,
          seller_price: 399.99,
          quantity: 1,
          discount: 50.00,
          total: 399.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_029",
          product_id: "prod_029",
          product_name: "Gabinete Gamer RGB",
          product_sku: "CASE-RGB-029",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_029",
          price: 299.99,
          seller_price: 269.99,
          quantity: 1,
          discount: 30.00,
          total: 269.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_030",
          product_id: "prod_030",
          product_name: "Cooler CPU Líquido",
          product_sku: "COOL-LIQ-030",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_030",
          price: 399.99,
          seller_price: 359.99,
          quantity: 1,
          discount: 40.00,
          total: 359.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
        {
          id: "item_031",
          product_id: "prod_031",
          product_name: "Cabo HDMI 2.1 Premium",
          product_sku: "HDMI-PREM-031",
          unit_id: "unit_001",
          unit_name: "Unidade",
          product_variation_id: "var_031",
          price: 89.99,
          seller_price: 79.99,
          quantity: 1,
          discount: 10.00,
          total: 79.99,
          created_at: "2025-01-15T10:00:00.000Z",
          updated_at: "2025-01-15T10:00:00.000Z",
        },
      ],
    },
  ],
  pagination: {
    page: 0,
    perPage: 20,
    total: 17,
    totalPages: 1,
  },
}

// Função para buscar dados brutos da API
export async function getShoppingCartsRaw(page: string = "0", perPage: string = "20") {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/portaladmin/v2/shopping-carts?page=${page}&perPage=${perPage}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API retornou status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    console.error("Erro ao conectar com API Zydon:", error.message);
    // Retornando dados mockados temporariamente
    return mockData
  }
}

// Função para processar dados e retornar métricas
export async function getShoppingCarts(params: {
  timeRange?: string
  startDate?: string
  endDate?: string
  clientFilter?: string
  sellerFilter?: string
  abandonmentHours?: number
}) {
  const { abandonmentHours = 24, clientFilter, sellerFilter, startDate, endDate } = params
  
  // Buscar dados brutos - usar 1000 para pegar todos os carrinhos disponíveis
  const rawData = await getShoppingCartsRaw("0", "1000")
  let carts = rawData.items || []
  
  // Filtrar carrinhos com total > 0
  carts = carts.filter((cart: ShoppingCart) => cart.total > 0)
  
  // Aplicar filtros se fornecidos
  if (startDate || endDate) {
    carts = carts.filter((cart: ShoppingCart) => {
      const cartDate = new Date(cart.created_at)
      
      // Normalizar datas para comparação (ignorar hora) - usar apenas a parte da data
      const cartDateStr = cartDate.toISOString().split('T')[0]
      
      if (startDate) {
        if (cartDateStr < startDate) return false
      }
      
      if (endDate) {
        if (cartDateStr > endDate) return false
      }
      
      return true
    })
  }

  if (clientFilter) {
    carts = carts.filter((cart: ShoppingCart) => 
      cart.partner_name?.toLowerCase().includes(clientFilter.toLowerCase())
    )
  }

  if (sellerFilter) {
    carts = carts.filter((cart: ShoppingCart) => 
      cart.seller_name?.toLowerCase().includes(sellerFilter.toLowerCase())
    )
  }
  
  // Calcular métricas baseadas nos dados filtrados
  const now = new Date()
  const abandonmentThreshold = abandonmentHours * 60 * 60 * 1000 // em milliseconds
  
  const inProgressCarts = carts.filter((cart: ShoppingCart) => {
    const updatedAt = new Date(cart.updated_at)
    return (now.getTime() - updatedAt.getTime()) < abandonmentThreshold
  })
  
  const abandonedCarts = carts.filter((cart: ShoppingCart) => {
    const updatedAt = new Date(cart.updated_at)
    return (now.getTime() - updatedAt.getTime()) >= abandonmentThreshold
  })
  
  const totalValue = carts.reduce((sum: number, cart: ShoppingCart) => sum + cart.total, 0)
  const totalValueInProgress = inProgressCarts.reduce((sum: number, cart: ShoppingCart) => sum + cart.total, 0)
  const totalValueAbandoned = abandonedCarts.reduce((sum: number, cart: ShoppingCart) => sum + cart.total, 0)
  
  const totalItems = carts.reduce((sum: number, cart: ShoppingCart) => sum + cart.items.length, 0)
  const totalItemsInProgress = inProgressCarts.reduce((sum: number, cart: ShoppingCart) => sum + cart.items.length, 0)
  const totalItemsAbandoned = abandonedCarts.reduce((sum: number, cart: ShoppingCart) => sum + cart.items.length, 0)
  
  const uniqueCustomers = new Set(carts.map((cart: ShoppingCart) => cart.user_id)).size
  const abandonmentRate = carts.length > 0 ? (abandonedCarts.length / carts.length) * 100 : 0
  
  return {
    totalOnlineCarts: carts.length,
    totalInProgressCarts: inProgressCarts.length,
    totalAbandonedCarts: abandonedCarts.length,
    totalValue,
    totalValueInProgress,
    totalValueAbandoned,
    totalItems,
    totalItemsInProgress,
    totalItemsAbandoned,
    abandonmentRate,
    uniqueCustomers,
    averageTime: "2h 30m", // Placeholder - pode ser calculado baseado nos dados
    recoveryRate: 15.2, // Placeholder - pode ser calculado baseado nos dados
  }
}

// Alias para compatibilidade
export async function fetchShoppingCarts(page: number = 0, perPage: number = 20) {
  const response = await getShoppingCartsRaw(page.toString(), perPage.toString())
  return response
}