import { Icon } from "@zydon/common/types/icon";

interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: keyof typeof Icon;

  caption?: string;
}

export const APPS: App[] = [
  {
    id: "zydon-plugin-name",
    name: "Botão zapzap",
    description: "Botão flutuante com link para WhatsApp",
    url: "http://localhost:4177/apps/zydon-plugin-name/assets/remoteEntry.js",
    icon: "WHATSAPP",
  },
  {
    id: "2",
    name: "Cielo",
    description: "Pagamento usando api da Cielo",
    url: "http://localhost:4178/assets/remoteEntry.js",
    icon: "DOLLAR_CIRCLE",
  },
  {
    id: "3",
    name: "Bitpay",
    description: "Pagamentos com Bitcoin",
    caption: "Viva la libertad, carajo!",
    url: "http://localhost:4179/assets/remoteEntry.js",
    icon: "BLOCKCHAIN",
  },
  {
    id: "4",
    name: "Marcelinho",
    description: "Marcelinho",
    url: "http://localhost:4172/assets/remoteEntry.js",
    icon: "CALENDAR_MINUS_02",
  },
];
