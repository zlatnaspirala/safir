Tech: Based on Typescript/ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
Alternative software - High Performace
Objective:
Must be simple and usefull.
Performace must be 100%with full PWA support.
For any platform adapted.
Basics
There are two way for creating web components:

From code
Vanilla component
From code ECMA6

It is very similar to the reactjs and vue.


```
import { Safir, On } from "safir";
import MyHeader from "./layouts/heder";
import Layout from "./layouts/body";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myHeader = app.loadComponent(new MyHeader('my-header'));
  let myLayout = app.loadComponent(new Layout('my-layout'));
  console.info("App running [ready]...", Date.now());
});

console.info("App running [sync]...", Date.now());
```


Header
```
import MyButton from "../components/button";
import {
  On, T,
  BaseComponent } from "safir";

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

```

Button
```
import {BaseComponent} from "safir";

export default class MyButton extends BaseComponent {
  id = '';
  text = '';
  counter = 0;

  get getCounter() {
    return this.counter;
  }

  ready = () => {
    // console.log('ready comp');
  };

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  render = () => `
    <div id="${this.id}">
      <button data-counter="${this.getCounter}" onclick="(${this.onClick})('${this.id}')">
        ${this.text} class MyButton prop counter = ${this.getCounter}
      </button>
    </div>
  `;
}

```


VANILLA COMPONENT
WEB/HTML/JS/CSS (ecma6)

<style>
.myFooter {
  font-family: Accuratist;
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

<div id="footer" class="theme-dark myFooter" onclick="footer.callMe()">
  <p>maximumroulette.com</p>
  <p>2023</p>
</div>

<script>
  console.info('Footer load. Vanilla component is extreme html/css/js orientend.');
  console.info('Write here javascript only');
  console.info('I recommended nersted object structure!');

  let footer = {
    root: document.getElementById('footer'),
    callMe: function(e) {
      console.log('Call trigger on footer.', this);
      this.root.innerHTML = 'what ever';
    }
  };
</script>
Hosting
For localhost (http) web server:
```
http-server ./dist -p 80
```
or
```
npm run host
```

For localhost watch:
Run watch:
```
npm run demo1
```

For production (https) web server:
Run command:
```
npm run build.example
```