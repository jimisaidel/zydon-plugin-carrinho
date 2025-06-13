interface App {
  id: string;
  tag: string;
  url: string;
  cssUrl?: string;
  type: "global" | "checkout";
}

export const APPS: App[] = [
  {
    id: "1",
    // tem que seguir esse padrão
    tag: "zydon-plugin-name",
    url: "http://localhost:4177/apps/zydon-plugin-name/app/app.js",
    type: "global",
  },
  {
    id: "2",
    tag: "cielo-pay",
    url: "http://localhost:4178/app/app.js",
    type: "checkout",
    cssUrl: "http://localhost:4178/app/app.css",
  },
  {
    id: "3",
    tag: "bit-pay",
    url: "http://localhost:4179/app/app.js",
    type: "checkout",
  },
  {
    id: "4",
    tag: "app-marcelin",
    url: "http://localhost:4172/app/app.js",
    type: "checkout",
  },
];
