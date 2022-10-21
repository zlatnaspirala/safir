import {BaseComponent} from "../../index";

export default class MyButton extends BaseComponent {

  id = '';
  text = '';

  // Safir Prop
  counter = 0;

  // Also fancy ECMA6
  // get getCounter() {
  //   return this.counter;
  // }

  ready = () => {};

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  // Every click event must be bind with clickBind func !
  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button class="fill" onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.counter}
    </button>
  `;
}
