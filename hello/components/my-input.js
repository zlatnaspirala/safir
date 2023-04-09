import {BaseComponent} from "../../index";

export default class MyInput extends BaseComponent {

  id = '';
  value = '1111';
  type = 'number';

  ready = () => {};

  onChange = this.keyUpBind;
  onClick = this.clickBind;

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.type = arg.type;
    console.log('TEST1111 ', arg)
    this.value = localStorage.getItem(arg.id);
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
