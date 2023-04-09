import {BaseComponent} from "safir";

export default class MyButton extends BaseComponent {

  id = '';
  text = '';

  // props of safir class
  counter = 0;

  // Fancy ecma6 also can be used.
  // get getCounter() {
  //   return this.counter;
  // }

  ready = () => {};

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  onClick = this.clickBind;

  render = () => `
    <button class="fill" onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.counter}
    </button>
  `;
}
