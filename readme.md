# SAFIR 1.0.4

### Tech: Based on ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
### Alternative software - High Performace

![](https://github.com/zlatnaspirala/safir/blob/main/hello/assets/icons/192.png)

## Objective:
Must be simple and usefull.
Performace must be 100%with full PWA support.
For any platform adapted.


### There are two way for creating web components:
### - From code
### - Vanilla component

## Example

#### Main
```js
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

## From code ECMA6
It is very similar to the reactjs and vue but it is not. There is no jsx support.
This software use already exist feature Template Literal ECMA6 vs CustomEvents.
This is the best way to organize web app in easy and progressive way.
Performance and simplity are main objective in this project.

Next level will be improvements in custom tag field.

How works app updates?
When you create Safir Component use `class MyList extends BaseComponent`.
BaseComponent will handle situation. Safir have only function `set`
for updating class props.

```bash
  set(arg, newValue, extraData)
    - arg -> name of prop eg. counter
    - newValue -> New value / what ever
    - extraData -> it is object with only { emit: false }

  Usage
  mySybCompBtnNoEmit.set('counter', newValue, { emit: false });
```

Safir use `scss` with themed integrated but don't include dev tools for it. You need to use Visual Code Exstension
`Live Sass`. Because we need css in final dist folder we need to run `build-assets.sh` for any changes intro assets or css
folder. This will be fixed with `live sass` settings in future.

Role:
```json
 Any changes in assets/ folder need run `build-assets.sh`
```

#### My Header
```js
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

#### My Button
```js
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

#### Simple list render with click catch
```js
import {BaseComponent} from "../../index";

export default class MyList extends BaseComponent {
  id = '';
  // This is props
  tableData = [
    '👽 Modern tech',
    '👌 Performance',
    '🤑 Free soft',
    '😜 Easy use',
    '💔 Breaking',
    '💥 Star project',
    '👁️‍🗨️ Event oriented',
    '🖖 No single unnecessary element',
    '🤘 Safir rocks',
    '👨‍🔬 Use npm service',
    '👨‍💻 Open source',
    '🐈 https://github.com/zlatnaspirala/safir'
  ];
  constructor(arg) {
    super(arg);
    this.initial(arg);
  }
  onClick = this.clickBind;
  render = () => `
    <div class="verCenter">
      ${this.tableData.map((item, index) =>
          `<h1 onclick="(${this.onClick})('${this.id}')"
               class="middle">` + index + item + `</h1>`
      ).join('')}
    </div>
  `;
}
```

From demo2.js:
`// myBoxComp.set('tableData', ['wao', 'woow'])`

## VANILLA COMPONENT
WEB/HTML/JS/CSS (ecma6)

 - Perfect for async app flow.
 - Css is local scoped (loaded only when the vanilla component is loaded).
 
```json
  - Only role is `put tag <script> after <style> and <html>`
```

```html
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
  console.info('Write here javascript only, it is dynamic (async loaded script).');
  console.info('I recommended nersted object structure!');

  let footer = {
    root: document.getElementById('footer'),
    callMe: function(e) {
      console.log('Call trigger on footer.', this);
      this.root.innerHTML = 'what ever';
    }
  };
</script>
```

## Hosting/build

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
npm run dev
```

For production (https) web server:
Run command:
```
npm run build
```

## Links

Basic example:
 https://codepen.io/zlatnaspirala/pen/mdLzxoy
