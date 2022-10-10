import MyButton from "../components/button";
import {
  On, T,
  BaseComponent,
  IDestroyerComponent } from "../../../index";

export default class MyHeader extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-heder';
  slogan: string = 'My header.';

  mySybCompBtnYes = new MyButton({ text: T.yes, id: 'yes'});
  mySybCompBtnNo = new MyButton({ text: T.no, id: 'no'});
  mySybCompBtnNoEmit = new MyButton({ text: T.textAlert, id: 'local'});

  ready = () =>  {
    console.log('header ready. what is ml ', T);
  }

  constructor(arg: any) {
    super(arg);
    this.initial(arg);

    On('yes', () => {
      console.info('Trigger Btn Yes', (this as any));
      let newValue = this.mySybCompBtnYes.getCounter + 1;
      this.mySybCompBtnYes.set('counter', newValue);
    });

    On('no', () => {
      console.info('Trigger Btn no', (this as any));
      let newValue = this.mySybCompBtnNo.getCounter - 1;
      this.mySybCompBtnNo.set('counter', newValue);
    });

    On('local', () => {
      console.info('Trigger Btn no', (this as any));
      this.mySybCompBtnNoEmit.set('counter', 100, { emit: false });
    });

    On('change-theme', () => {
      console.info('Trigger CHANGE THEME', (this as any).changeTheme());
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
