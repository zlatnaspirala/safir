import {BaseComponent} from "safir";

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
  }

  render = () => `
    <input
      type=${this.type}
      class=""
      onclick="(${this.onClick})('${this.id}')"
      onkeyup="(${this.onChange})('${this.id}')"
      value="${this.value}"
      ></input>
  `;
}
