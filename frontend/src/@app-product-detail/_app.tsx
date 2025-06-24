/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import ReactDOM from 'react-dom';

import packageJson from '../../package.json';

import Plugin from './App';

class App extends HTMLElement {
  private mountPoint: HTMLDivElement;

  constructor() {
    super();
    this.mountPoint = document.createElement('div');
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.render();
  }

  disconnectedCallback() {
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  static get observedAttributes() {
    return ['primaryColor']; // Liste os atributos que você quer observar
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    console.log({ name, oldValue, newValue });

    this.render();
  }

  render() {
    const props = {
      primaryColor: this.getAttribute('primaryColor') || '#000000',
    };
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(<Plugin {...props} />, this.mountPoint);
  }
}

customElements.define(`${packageJson.name}-product-detail`, App);

// <my-web-component prop1="value1" prop2="value2"></my-web-component>
