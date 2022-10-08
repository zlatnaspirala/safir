import {BaseComponent, IDestroyerComponent} from "../../../index";

export default class MyButton
  extends BaseComponent
  implements IDestroyerComponent
{
  id: string = '';
  text: string = '';
  counter: number = 0;

  get getCounter() {
    return this.counter;
  }

  ready = () => {
    // console.log('ready comp');
  };

  constructor(arg: string | any) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  render = () => `
    <div id="${this.id}">
      <button data-counter="${this.getCounter}" onclick="(${this.onClick})('${this.id}')">
        ${this.text} class MyButton prop counter = ${this.getCounter}
      </button>
    </div>
  `;
}
