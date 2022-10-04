import MyButton from "./button";
import { IDestroyerComponent } from "../../../index";
import { BaseComponent } from "../../../index";

export default class Layout extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-body';
  slogan: string = 'My body.';

  constructor(arg: any) {
    super(arg)
  }

  change = () => {
    (window as any).app.changeTheme();
  }

  render = () => `
    <div class="middle h95">
       <div onclick="(${this.change})()">
         Change Theme
       </div>
    </div>
  `
}