
import { IDestroyerComponent, On } from "safir";
import { BaseComponent } from "safir";

export default class Layout extends BaseComponent {

  id = 'my-body';

  statusOfCounter = '';

  ready = () =>  {
    console.log('layout ready');
  }

  constructor(arg) {
    super(arg);

    On('on-counter', (data) => {
      console.info('[on-counter] Trigger Btn Yes [from body] ', data.detail);
      let t = data.detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      if (t.emitter === "yes") {
        this.set('statusOfCounter', t.newValue);
      }
      // no is the ignored!
      // local tbn (no-emit) never emitted!
    });

    On('no', (data) => {
      console.info('[no] Trigger Btn no [from body]', (data).detail);
    });

    On('no-emit', (data) => {
      console.info('Trigger Btn no-emit: ', (data));
    });

  }

  change = (e) => {
    alert(e)
  }

  render = () => `
    <div id="${this.id}" class="middle h95 column">
       <h3>Status of counter YES = ${this.statusOfCounter} </h3>
       <div onclick="(${(this).change})(this)">
         Test Modal
       </div>
    </div>
  `
}