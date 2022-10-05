
import { IDestroyerComponent, On } from "../../../index";
import { BaseComponent } from "../../../index";

export default class Layout extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-body';

  statusOfCounter: string = '';

  ready = () =>  {
    console.log('layout ready');
  }

  constructor(arg: any) {
    super(arg);

    On('on-counter', (data: any) => {
      console.info('Trigger Btn Yes 2 ', (data as any).detail);
      let t = (data as any).detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      // if (t.emitter === "yes") {  ONLY FOR BTN YES  }
      this.set('statusOfCounter', t.newValue);
    });

    On('no', () => {
      console.info('Trigger Btn no', (this as any));
    });

  }

  change = () => {
    (window as any).app.changeTheme();
  }

  render = () => `
    <div id="${this.id}" class="middle h95">
       <h3>Status of counter YES = ${this.statusOfCounter} </h3>
       <div onclick="(${this.change})()">
         Change Theme
       </div>
    </div>
  `
}