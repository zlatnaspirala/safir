import MyButton from "../components/button";
import {
  On, T,
  BaseComponent,
  IDestroyerComponent } from "../../index";

export default class MyHeader extends BaseComponent {

  id = 'my-heder';
  slogan = 'My header.';

  mySybCompBtnYes = new MyButton({ text: T.yes, id: 'yes'});
  mySybCompBtnNo = new MyButton({ text: T.no, id: 'no'});
  mySybCompBtnNoEmit = new MyButton({ text: T.textAlert, id: 'local'});

  ready = () =>  {
    console.log('header ready. what is ml ', T);
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);

    On('yes', () => {
      console.info('Trigger Btn Yes', (this));
      let newValue = this.mySybCompBtnYes.getCounter + 1;
      this.mySybCompBtnYes.set('counter', newValue);
    });

    On('no', () => {
      console.info('Trigger Btn no', (this));
      let newValue = this.mySybCompBtnNo.getCounter - 1;
      this.mySybCompBtnNo.set('counter', newValue);
    });

    On('local', () => {
      console.info('Trigger Btn no', (this));
      this.mySybCompBtnNoEmit.set('counter', 100, { emit: false });
    });

    On('change-theme', () => {
      console.info('Trigger CHANGE THEME', (this).changeTheme());
    })

  }

  change = this.clickBind;

  render = () => `
    <div id="${this.id}" class="middle h5">
       ${(this.mySybCompBtnYes).render()}
       ${(this.mySybCompBtnNo).render()}
       ${(this.mySybCompBtnNoEmit).render()}
       <div onclick="(${this.change})('change-theme')">
         Change Theme
       </div>
    </div>
  `
}
