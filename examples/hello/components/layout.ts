import MyButton from "./button";
import { IDestroyerComponent } from "../../../index";
import { BaseComponent } from "../../../index";

export default class Layout extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-body';

  statusOfCounter: string = '';

  constructor(arg: any) {
    super(arg);

    addEventListener('yes', (data) => {
      console.info('Trigger Btn Yes 2 ', (data as any).detail.target.getAttribute('data-counter'));
      let test = (data as any).detail.target.getAttribute('data-counter');
      this.set('statusOfCounter', test)
    });

    addEventListener('no', () => {
      console.info('Trigger Btn no', (this as any));
      // let newValue = this.mySybCompBtnNo.getCounter - 1;
      // this.mySybCompBtnNo.set('counter', newValue);
    });

  }

  change = () => {
    (window as any).app.changeTheme();
  }

  render = () => `
    <div id="${this.id}" class="middle h95">
       <h3> STATUS OF COUNTER = ${this.statusOfCounter} </h3>
       <div onclick="(${this.change})()">
         Change Theme
       </div>
    </div>
  `
}