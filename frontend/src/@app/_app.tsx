import ReactDOM from 'react-dom/client';

import packageJson from '../../package.json';

import AppReact from './App';

class App extends HTMLElement {
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
    this.root?.render(<AppReact {...this.props} />);
  }
}

customElements.define(packageJson.name, App);
