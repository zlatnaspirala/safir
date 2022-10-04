
import { BaseComponent, IDestroyerComponent } from "../../../index";

export default class MyButton  extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-button';
  text: string = 'welcome here';
  counter: number = 0;

  get getCounter () {
    return this.counter;
  }

  constructor(arg: string | any) {
    super(arg);
    this.initial(arg);
  }

  onClick = () => {
    console.info('Click trigger event. ->' + this);
    console.info('Click trigger event. access props ->' + (this as any).getAttribute('data-counter'));
    (this as any).setAttribute('data-counter', 2)
  }

  render = () => `
    <div id="${this.id}">
      <button data-counter="${this.getCounter}" onclick="(${ this.onClick })()">
        ${this.text} with ${this.getCounter}
      </button>
    </div>
  `;

}
