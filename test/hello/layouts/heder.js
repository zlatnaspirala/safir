import MyButton from "../components/button";
import {
  On, T,
  BaseComponent } from "safir";

export default class MyHeader extends BaseComponent {

  id = 'my-heder';
  slogan = 'My header.';
  mySybCompBtnYes = new MyButton({ text: T.yes, id: 'yes'}, 'fill');
  mySybCompBtnNo = new MyButton({ text: T.no, id: 'no'}, 'fill');
  mySybCompBtnNoEmit = new MyButton({ text: T.textAlert, id: 'local'}, 'fill');

  constructor(arg) {
    super(arg);
    this.initial(arg);

    On('yes', () => {
      console.info('Trigger Btn Yes', (this));
      let newValue = this.mySybCompBtnYes.counter + 1;
      this.mySybCompBtnYes.set('counter', newValue);
    });

    On('no', () => {
      console.info('Trigger Btn no', (this));
      let newValue = this.mySybCompBtnNo.counter - 1;
      this.mySybCompBtnNo.set('counter', newValue);
    });

    On('local', () => {
      let newValue = this.mySybCompBtnNoEmit.counter - 1;
      console.info('You can always get trigger detect by id !', (this));
      console.info('But no trigger for props setter with { emit: false } !', (this));
      this.mySybCompBtnNoEmit.set('counter', newValue, { emit: false });
    });

    On('change-theme', () => {
      (this).changeTheme();
      console.info('Trigger ChangeTheme integrated.');
    })

  }

  change = this.clickBind;

  render = () => `
    <div class="middle h5">
       ${(this.mySybCompBtnYes).renderId()}
       ${(this.mySybCompBtnNo).renderId()}
       ${(this.mySybCompBtnNoEmit).renderId()}
       <div class="fill">
        <button class="fill" onclick="(${this.change})('change-theme')">
          Change Theme
        </button>
       </div>
    </div>
  `
}
