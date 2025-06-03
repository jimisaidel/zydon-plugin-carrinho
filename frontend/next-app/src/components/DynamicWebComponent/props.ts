export interface DynamicWebComponentProps {
  url: string;
  cssUrl?: string;
  tagName: string;
  props?: { [key: string]: any };
}
