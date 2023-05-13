import { BaseComponent, On } from "../../index";
import { SafirSlot } from "./safir-slot";

export default class SlotLayout extends BaseComponent {

  id = 'slot-body';
  safirSlot1 = new SafirSlot({id : 'SafirSlot1', rootDom: 'SafirSlot1'},'middle mySlot');
  safirSlot2 = new SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2', editBtns: true }, 'middle mySlot');
  safirSlot3 = new SafirSlot({id : 'SafirSlot3', rootDom: 'SafirSlot3' }, 'middle mySlot');
  safirSlot4 = new SafirSlot({
    id : 'SafirSlot4',
    rootDom: 'SafirSlot4',
    content: [
      // `<object data='https://maximumroulette.com/apps/nidza/nidza/examples/single.html?u=star-effect-1.js'></object>`,
      `<img src="./assets/images/numbers/0.png"/>`,
      `<img src="./assets/images/numbers/1.png"/>`,
      `<img src="./assets/images/numbers/2.png"/>`,
      `<img src="./assets/images/numbers/3.png"/>`,
      `<img src="./assets/images/numbers/4.png"/>`,
      `<img src="./assets/images/numbers/5.png"/>`,
      `<img src="./assets/images/numbers/6.png"/>`,
      `<img src="./assets/images/numbers/7.png"/>`,
      `<img src="./assets/images/numbers/8.png"/>`,
      `<img src="./assets/images/numbers/8.png"/>`
    ]
   }, 'middle fill');

  ready = () => { 
    setTimeout(()=> {
      this.safirSlot3.setByTime(1234.54)
    }, 2000)
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  change = (e) => {
    alert(e)
  }

  render = () => `
    <div class="middle column bg-transparent">
       <h3 class="textColorWhite" >Use default value. Safir slot use data-trans for title.</h3>
       ${this.safirSlot1.renderId()}
       <h3 class="textColorWhite">Use buttons [no negative for now]</h3>
       ${this.safirSlot2.renderId()}
       <h3 class="textColorWhite">setByTime</h3>
       ${this.safirSlot3.renderId()}
       <h3 class="textColorWhite">Object</h3>
       ${this.safirSlot4.renderId()}
    </div>
  `
}