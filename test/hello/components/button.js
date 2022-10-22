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

  // You can extends with more args.
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  // Bind special func clickBind for every click.
  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button class="fill" onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.counter}
    </button>
  `;
}
