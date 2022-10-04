import MyButton from "./button";
import { IDestroyerComponent } from "../../../index";
import { BaseComponent } from "../../../index";

export default class MyHeader extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-heder';
  slogan: string = 'My header.';

  mySybCompBtnYes = new MyButton({ text: 'Yes', id: 'Y'});
  mySybCompBtnNo = new MyButton('No');

  constructor(arg: any) {
    super(arg);
    this.initial(arg);
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