import { BaseComponent, On } from "safir";

export default class Layout extends BaseComponent {

  id = 'my-body';
  statusCounterYes = '0';
  statusCounterNo = '0';

  ready = () => { console.log('layout ready') }

  constructor(arg) {
    super(arg);

    On('on-counter', (data) => {
      console.info('[on-counter] Trigger Btn Yes [catched from body] ', data.detail);
      let t = data.detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      if (t.emitter === "yes") {
        this.set('statusCounterYes', t.newValue);
      } else if (t.emitter === "no") {
        this.set('statusCounterNo', t.newValue);
      }
      // local tbn (no-emit) never emitted!
    });

    On('no', (data) => {
      console.info('[no] Trigger Btn no [from body]', (data).detail);
    });

  }

  change = (e) => {
    alert(e)
  }

  render = () => `
    <div class="middle h95 column">
       <h3>Status of counter Yes = ${this.statusCounterYes} </h3>
       <h3>Status of counter No = ${this.statusCounterNo} </h3>
    </div>
  `
}