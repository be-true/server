const template = () => `
  <style>
    .btn {
    }
    :host {
      display: block;
      background-color: red;
    }
  </style>
  <button class="btn">Send</button>
`;

class ButtonSend extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = template();
  }
}
customElements.define("button-send", ButtonSend);
