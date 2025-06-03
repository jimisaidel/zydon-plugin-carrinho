// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import ReactDOM from "react-dom";
import Plugin from "./App";

import packageJson from "../../package.json";

class App extends HTMLElement {
  private mountPoint: HTMLDivElement;

  constructor() {
    super();
    this.mountPoint = document.createElement("div");
  }

  connectedCallback() {
    this.appendChild(this.mountPoint);
    this.render();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  static get observedAttributes() {
    return ["prop1", "prop2"]; // Liste os atributos que você quer observar
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    console.log({ name, oldValue, newValue });

    this.render();
  }

  render() {
    const props = {
      prop1: this.getAttribute("prop1"),
      prop2: this.getAttribute("prop2"),
    };
    ReactDOM.render(<Plugin {...props} />, this.mountPoint);
  }
}

customElements.define(packageJson.name, App);

// <my-web-component prop1="value1" prop2="value2"></my-web-component>
