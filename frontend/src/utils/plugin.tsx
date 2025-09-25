import ReactDOM from 'react-dom/client';

function createApp<P>(Component: React.ComponentType<P>) {
  return class ReactElement extends HTMLElement {
    private mountPoint: HTMLDivElement;
    private root: ReactDOM.Root | null = null;
    private _props: Record<string, unknown> = {};

    constructor() {
      super();
      this.mountPoint = document.createElement('div');
    }

    set props(v: Record<string, unknown>) {
      this._props = v || {};
      this.render();
    }

    get props() {
      return this._props;
    }

    connectedCallback() {
      this.appendChild(this.mountPoint);
      this.upgradeProperty('props');

      if (!this.root) {
        this.root = ReactDOM.createRoot(this.mountPoint);
      }
      this.render();
    }

    disconnectedCallback() {
      this.root?.unmount();
    }

    private upgradeProperty(prop: string) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        const value = (this as Record<string, unknown>)[prop];
        delete (this as Record<string, unknown>)[prop];
        (this as Record<string, unknown>)[prop] = value;
      }
    }

    render() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.root?.render(<Component {...(this.props as any)} />);
    }
  };
}

export function buildPlugin<P>(
  Component: React.ComponentType<P>,
  tagName: string,
) {
  if (!customElements.get(tagName)) {
    const Element = createApp(Component);
    customElements.define(tagName, Element);
  }
}
