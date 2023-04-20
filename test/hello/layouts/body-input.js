import { BaseComponent, On, getComp } from "safir";
import {LocalSessionMemory, LocalStorageMemory} from "safir";

import MyInput from '../components/my-input';

export default class TestInputBody extends BaseComponent {

  id = 'testInputBody';

  memoryValue = 0;
  memoryValue2 = 0;

  myInputLevel0 = new MyInput({
    value: '1',
    id: 'myInputLevel0',
    type: 'number',
    min: 0,
    max: 9999
  }, 'middle');

  myInput = new MyInput({
    value: '123',
    id: 'myInput',
    type: 'number',
    min: 0,
    max: 9999
  }, 'middle');

  myInput2 = new MyInput({ value: '321', id: 'myInput2', type: 'number'}, 'middle');

  ready = () => {}

  constructor(arg) {
    super(arg);

    On("myInput", (r) => {
      console.info('My input field value: ' + r.detail.value);
      this.setPropById('memoryValue', r.detail.value, 1);
      // need to be input inself updated - NO RE RENDER METHOD!!!
      this.myInput.setPropById('value', r.detail.value, 1);
    });
    On("myInput2", (r) => {
      console.info('My input field2 value: ' + r.detail.value);
      this.setPropById('memoryValue2', r.detail.value, 2);
      this.myInput2.setPropById('value', r.detail.value, 2);
    });
  }

  render = () => `
    <div class="middle h95 column">
    <div>
        <h3>Input field <span id="blabla"> Simple prop </span></h3>
        ${(this.myInputLevel0).renderId()}
      </div>
      <div>
        <h3>Input field [session-level] <span id="memoryValue">${this.memoryValue}</span></h3>
        ${(this.myInput).renderId()}
      </div>
      <div>
        <h3>Input field2 [storage-level] <span id="memoryValue2">${this.memoryValue2}</span></h3>
        ${(this.myInput2).renderId()}
      </div>
    </div>
  `
}