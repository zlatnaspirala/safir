# SAFIR [1.0.5]

### Tech: Based on ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
### Alternative software - High Performace

![](https://github.com/zlatnaspirala/safir/blob/main/hello/assets/icons/192.png)

Safir use `browserify` for building final pack script.

## Objective:
Must be simple and usefull.
Performace must be 100% with full PWA support.
For any platform adapted.

Test [demo4.js] tictactoe at https://maximumroulette.com/apps/safir/


### There are two way for creating web components:
### - From code
### - Vanilla component

## Basic Example

#### Main instance script
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

In index.html header add:
```html
  <link rel="stylesheet" href="./style.css">
```
If you wanna use themes.

Add main dom holder:
```html
  <div id="app" class="theme-light app fill"></div>
```

## Create component from code 
It is very similar to the reactjs and vue but it is not. There is no jsx support.
This software use already exist feature Template Literal ECMA6 vs CustomEvents.
This is the best way to organize web app in easy and progressive way.
Performance and simplity are main objective in this project.

Next level will be improvements in custom tag field.

How works app updates?
When you create Safir Component use `class MyNewClass extends BaseComponent`.
BaseComponent will handle situation. Safir have only function `set`
for updating class props. Calling the `set` function will cause a rerender
and dispach event with `on-<name_of_prop>` name.

To create props just add it normally intro class eg. `counter = 0'.

```js
  set(arg, newValue, extraData?)
    - arg -> name of prop eg. counter
    - newValue -> New value / what ever
    - extraData -> it is object with only `{ emit: true }`
                   it is optimal arg.

  Usage:
  mySybCompBtnNoEmit.set('counter', newValue, { emit: false });

  Catch it any where you want:
  On('on-counter', (data) => {
    console.info('[on-counter] Trigger Btn Yes [catched from body] ', data.detail);
    let t = data.detail;
    // Because we use multiply same component with also same prop name
    // you can use `detail.emitter` to determinate by id who made dispach.
    if (t.emitter === "yes") {
      this.set('statusCounterYes', t.newValue);
    } else if (t.emitter === "no") {
      this.set('statusCounterNo', t.newValue);
    }
    // local tbn (no-emit) never emitted!
  });

```

#### @Note About direct update

Rerender DOM method is ok for simple[pages] tasks. Safir need to handle massive or deep structure.
In that point rerendering is bad praticle.
I use very simple checking in component for props then looking for DOMs whos have the same id [equal with propName].

This is most recemmended function for calling `setPropById`.
Take a look at the demo3. 

```js
  // LEVEL 0 - no storage / simple props
  // After refresh default value will be used
  this.myInput2.setPropById('value', r.detail.value);

  // LEVEL 1 - sessionStorage level
  // After refresh value comes from session storage
  // but if you close browser tab or open in new one then default value will be used.
  this.myInput2.setPropById('value', r.detail.value, 1);

  // LEVEL 2 - localStorage level
  // Even if you close browser tab you will get value from localStorage.
  // YOU CAN DO RESET WITH CLEAR CACHE - ALSO IT IS A DOMAIN SHARED INFO
  this.myInput2.setPropById('value', r.detail.value, 2);
```


#### My Button
```js
import {BaseComponent} from "../../index";

export default class MyButton extends BaseComponent {
  id = '';
  text = '';
  counter = 0;

  get getCounter() {
    return this.counter;
  }

  ready = () => {};

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }c

  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.getCounter}
    </button>
  `;
}
```

#### My Header
```js
import MyButton from "../components/button";
import {
  On, T,
  BaseComponent } from "../../index";

export default class MyHeader extends BaseComponent {

  id = 'my-heder';
  slogan = 'My header.';
  mySybCompBtnYes = new MyButton({ text: T.yes, id: 'yes'});
  mySybCompBtnNo = (new MyButton({ text: T.no, id: 'no'}));
  mySybCompBtnNoEmit = (new MyButton({ text: T.textAlert, id: 'local'}));

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
      let newValue = this.mySybCompBtnNoEmit.getCounter - 1;
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

  /**
   * @description
   * Component in component case :
   * Use renderId.
   */
  render = () => `
    <div class="middle h5">
       ${(this.mySybCompBtnYes).renderId()}
       ${(this.mySybCompBtnNo).renderId()}
       ${(this.mySybCompBtnNoEmit).renderId()}
       <button onclick="(${this.change})('change-theme')">
         Change Theme
       </button>
    </div>
  `
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

For demo2.js try in console:
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

#### Style
Style can be used with props [from code]. Style comes with examples it is not real part safir core but it is
deeply integrated within. It is a part of this repo also.

Safir use `scss` with themed integrated but don't include dev tools for it. You need to use Visual Code Exstension `Live Sass`.

Add intro `.vscode\settings.json`
```json
{
  "liveSassCompile.settings.formats": [{
    "format": "expanded",
    "extensionName": ".css",
    "savePath": "/PREX_ROOT_FOLDER/dist"
  }],
  "liveSassCompile.settings.excludeList": [
    "PREX_ROOT_FOLDER/test/**",
    "**/node_modules/**",
    ".vscode/**"
  ]
}
```
If you use in VisualCode root folder of project no need for `PREX_ROOT_FOLDER`. If you put whole project intro prefix folder then add `PREX_ROOT_FOLDER/`. This folder must be intro root of visualCode workspace `.vscode\` also can be autogenerated from VisualCode.

Need to run `build-assets.sh` for any changes intro assets folder.

Role:
```json
 Any other (except scss) changes in assets/ folder need run `build-assets.sh`
```

## Hosting/build

For localhost (http) web server:
```js
  http-server ./dist -p 80
```
or
```js
  npm run host
```

For localhost watch:
Run watch:
```js
  npm run demo1
  npm run demo2
  npm run demo3
  ...
```

For production (https) web server:
Run command:
```js
  npm run build.demo1
  npm run build.demo2
  npm run build.all
```

## Build Library [option]

If you don't wanna use `npm service` or you dont wanna use `module type` and `compiling js` code
then you can build empty lib like javascript ES5 or ES6.
```
  "build.lib": "browserify lib.js -p esmify > dist/safir.lib.js",
```

Import intro HTML direct:
```html
  <script defer src="safir.lib.js"></script>
```

## Links

Basic examples:
 - Demo1.js [How to use? Create and update prop on click]
   https://codepen.io/zlatnaspirala/pen/mdLzxoy
 - Demo2.js [How to use? Table data remove item from list on click]
   https://codepen.io/zlatnaspirala/pen/eYrxgKz
 - Demo3.js [How to use? Use input tag with ]
 - demo4.js - TicTacToe game template :
   https://maximumroulette.com/apps/safir/


## Credits 

 Used for css animation:
 -> https://webcode.tools/generators/css/keyframe-animation
