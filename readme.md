# SAFIR [1.1.7]

### Tech: Based on ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
### Alternative software - High Performace

![](https://github.com/zlatnaspirala/safir/blob/main/hello/assets/icons/192.png)

Safir use `browserify` for building final pack script.

## Objective:
- Must be simple and usefull. Performace must be 100% with full PWA support.For any platform adapted.
- Integrate account system using RocketCraftingServer [REST API].


### There are two way for creating web components:
 - Safir Component
 - Vanilla component

## NPM users
 There is no profesional documentation about safir so best way is to see examples from:
 - https://github.com/zlatnaspirala/safir
 - https://github.com/RocketCraftingServer/kickstart


## Basic Example

#### Main instance script

In main file use `app.loadComponent` to load your layout/component. After that use you imagination.

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

After in program you no need to use always `app.loadComponent` just use `this.mySubCom = new MYCOMP()` and put in render `${MYCOMP.renderById()}`.

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

SIMPLE BUTTON COMPONENT:
```js
import {BaseComponent} from "../../index";

export default class SimpleBtn extends BaseComponent {

  id = '';
  text = '';
  ready = () => {};

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }
  onClick = this.clickBind;

  render = () => `
    <button class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}

```

How works app updates?

[Recommended for end point components]
When you create Safir Component use `class MyNewClass extends BaseComponent`.
BaseComponent will handle situation. Safir have only function `set`
for updating class props. Calling the `set` function will cause a rerender
and dispach event with `on-<name_of_prop>`.

To create props just add it normally intro class eg. `counter = 0'.

```js
  set(arg, newValue, extraData?)
    - arg -> name of prop eg. counter
    - newValue -> New value / what ever
    - extraData -> it is object with only `{ emit: true }`
                   it is optimal arg.
    [rerender]

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

```json
Best way is to use this function only for end component.
```

#### @Note About direct update [no rerender] Recommented

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

## VANILLA COMPONENT
WEB/HTML/JS/CSS (ecma6)

It is not focus on vanilla component but it is good to use any js code.

 - Perfect for async app flow.
 - Css is local scoped (loaded only when the vanilla component is loaded).
 
```json
  - Only role is `put tag <script> after <style> and <html>`
```

#### Style

Style can be used with props [from code].
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

### Help for ./test [using safir direct from npm service]

If you are using this git repo and you wanna use `Safir` from npm not from source then you need to change 
scss settings:
```js
{
  "liveSassCompile.settings.formats": [{
    "format": "expanded",
    "extensionName": ".css",
    "savePath": "/safir/dist/css/"
  }],
  "liveSassCompile.settings.excludeList": [
    "**/node_modules/**",
    ".vscode/**",
    "./dist/**"
  ]
}
```


### Role:
```json
 Any other (except scss) changes in assets/ folder need run `build-assets.sh`
```

## Hosting/build

For localhost (http) web server:
```js
  npm run host
```

For localhost watch:
Run watch:
```js
  npm run demo1
```

For production (https) web server:
Run command:
```js
  npm run build.demo1
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
 - demo5.js [How to use? Fetch for login (rocketCraftingServer)]
 - demo6.js - Slots mashine counter animator


## Where is used

   Kickstart is full standalone web app platform based on
   Safir vs RocketCraftingServer.
  - https://github.com/RocketCraftingServer/kickstart


## Credits

 Used for css animation:
 -> https://webcode.tools/generators/css/keyframe-animation
