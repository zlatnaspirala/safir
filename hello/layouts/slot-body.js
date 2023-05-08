import { BaseComponent, On } from "../../index";
import { SafirSlot } from "./safir-slot";

export default class SlotLayout extends BaseComponent {

  id = 'slot-body';
  safirSlot1 = new SafirSlot({id : 'SafirSlot1', rootDom: 'SafirSlot1'},'middle mySlot');
  safirSlot2 = new SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2', editBtns: true }, 'middle mySlot');

  ready = () => { console.log('slot layout ready') }

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  change = (e) => {
    alert(e)
  }

  render = () => `
    <div class="middle column">
       <h3>Use default value. Safir slot use data-trans for title.</h3>
       ${this.safirSlot1.renderId()}
       <h3>Use buttons [no negative for now]</h3>
       ${this.safirSlot2.renderId()}
    </div>
  `
}