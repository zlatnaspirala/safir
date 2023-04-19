import {BaseComponent} from "safir";

export default class TicTacToeField extends BaseComponent {

  id = '';
  text = '';

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
    <button id="${this.id}-field" class="tttField" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
