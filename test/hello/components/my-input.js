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
    this.max = arg.max || 90000;
    this.min = arg.min || -1;

    // this.checkProps();
  }

  render = () => `
    <input
      id='${this.id}-value'
      max=${this.max}
      min=${this.min}
      type=${this.type}
      class="middle"
      onclick="(${this.onClick})('${this.id}')"
      onkeyup="(${this.onChange})('${this.id}')"
      value="${this.value}"
      ></input>
  `;
}
