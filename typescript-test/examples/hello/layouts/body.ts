
import { IDestroyerComponent, On } from "../../../index";
import { BaseComponent } from "../../../index";
import { IOnClickDetail, IOnEventDetail } from "../../../src/types/global";

export default class Layout extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-body';

  statusOfCounter: string = '';

  ready = () =>  {
    console.log('layout ready');
  }

  constructor(arg: any) {
    super(arg);

    On('on-counter', (data: CustomEvent) => {
      console.info('[on-counter] Trigger Btn Yes [from body] ', data.detail);
      let t: IOnEventDetail = data.detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      if (t.emitter === "yes") {
        this.set('statusOfCounter', t.newValue);
      }
      // no is the ignored!
      // local tbn (no-emit) never emitted!
    });

    On('no', (data: any) => {
      console.info('[no] Trigger Btn no [from body]', (data as any).detail);
    });

    On('no-emit', (data: any) => {
      console.info('Trigger Btn no-emit: ', (data as any));
    });

  }

  change = (e: any) => {
    alert(e)
  }

  render = () => `
    <div id="${this.id}" class="middle h95 column">
       <h3>Status of counter YES = ${this.statusOfCounter} </h3>
       <div onclick="(${(this as any).change})(this)">
         Test Modal
       </div>
    </div>
  `
}