import {BaseComponent} from "safir";

export default class MyButton extends BaseComponent {
  id = '';
  text = '';
  counter = 0;

  get getCounter() {
    return this.counter;
  }

  ready = () => {};

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.getCounter}
    </button>
  `;
}
