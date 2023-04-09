import { BaseComponent, On } from "../../index";
import MyInput from '../components/my-input';

export default class TestInputBody extends BaseComponent {

  id = 'testInputBody';
  memoryValue = 0;
  myInput = new MyInput({ value: '123', id: 'myInput', type: 'number'}, 'fill');
  ready = () => { console.log('layout ready') }

  constructor(arg) {
    super(arg);
    On("myInput", (r) => {
      console.info('My input field value: ' + r.detail.value);
      this.setPropById('memoryValue', r.detail.value);
    });
  }

  render = () => `
    <div class="middle h95 column">
       <h3>Test input field <span id="memoryValue">${this.memoryValue}</span></h3>
       <div> ${(this.myInput).renderId()} </div>
    </div>
  `
}