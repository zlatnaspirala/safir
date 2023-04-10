import { BaseComponent, On } from "../../index";
import MyInput from '../components/my-input';

export default class TestInputBody extends BaseComponent {

  id = 'testInputBody';

  memoryValue = 0;
  memoryValue2 = 0;

  myInput = new MyInput({ value: '123', id: 'myInput', type: 'number'}, 'middle');
  myInput2 = new MyInput({ value: '321', id: 'myInput2', type: 'number'}, 'middle');

  ready = () => { console.log('layout ready') }

  constructor(arg) {
    super(arg);
    On("myInput", (r) => {
      console.info('My input field value: ' + r.detail.value);
      this.setPropById('memoryValue', r.detail.value);
    });

    On("myInput2", (r) => {
      console.info('My input field2 value: ' + r.detail.value);
      this.setPropById('memoryValue2', r.detail.value);
    });

  }

  render = () => `
    <div class="middle h95 column">
      <div>
        <h3>Test input field <span id="memoryValue">${this.memoryValue}</span></h3>
        ${(this.myInput).renderId()}
      </div>
      <div>
        <h3>Test input field2 <span id="memoryValue2">${this.memoryValue2}</span></h3>
        ${(this.myInput2).renderId()}
      </div>
    </div>
  `
}