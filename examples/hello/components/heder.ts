import MyButton from "./button";
import { IDestroyerComponent } from "../../../index";
import { BaseComponent } from "../../../index";
import { getComp } from "../../../src/core/utils";

export default class MyHeader extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-heder';
  slogan: string = 'My header.';

  mySybCompBtnYes = new MyButton({ text: 'Yes incrase counter!', id: 'yes'});
  mySybCompBtnNo = new MyButton({ text: 'No decrase counter!', id: 'no'});

  ready = () =>  {
    // console.log('ready');
  }

  constructor(arg: any) {
    super(arg);
    this.initial(arg);

    addEventListener('yes', () => {
      console.info('Trigger Btn Yes', (this as any));
      let newValue = this.mySybCompBtnYes.getCounter + 1;
      this.mySybCompBtnYes.set('counter', newValue);
    });

    addEventListener('no', () => {
      console.info('Trigger Btn no', (this as any));
      let newValue = this.mySybCompBtnNo.getCounter - 1;
      this.mySybCompBtnNo.set('counter', newValue);
    });
  }

  change = () => {
    (window as any).app.changeTheme();
  }

  render = () => `
    <div id="${this.id}" class="middle h5">
       ${(this.mySybCompBtnYes).render()}
       ${(this.mySybCompBtnNo).render()}
       <div onclick="(${this.change})()">
         Change Theme
       </div>
    </div>
  `
}