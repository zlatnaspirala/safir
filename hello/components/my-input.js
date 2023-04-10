import {BaseComponent} from "../../index";

export default class MyInput extends BaseComponent {

  id = '';
  value = '';
  type = 'number';

  ready = () => {};

  onChange = this.keyUpBind;
  onClick = this.clickBind;

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.max = 1000;
    this.min = 1;
  }

  render = () => `
    <input
      max=${this.max}
      min=${this.min}
      type=${this.type}
      class="fill"
      onclick="(${this.onClick})('${this.id}')"
      onkeyup="(${this.onChange})('${this.id}')"
      value="${this.value}"
      ></input>
  `;
}
