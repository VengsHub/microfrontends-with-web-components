class DefaultWebComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<h1>Default Web Component</h1>`;
  }
}

customElements.define('default-web-component', DefaultWebComponent);
