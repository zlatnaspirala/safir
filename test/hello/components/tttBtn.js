import {BaseComponent} from "safir";

export default class TicTacToeBtn extends BaseComponent {

  id = '';
  text = '';
  ready = () => {};

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }
  onClick = this.clickBind;

  render = () => `
    <button class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
