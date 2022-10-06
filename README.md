
# Destroyer WIP

### Tech: Based on Typescript/ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
### Alternative software - High Performace
### Objective: 
 - Must be simple and usefull.
 - Performace must be `100%`with full PWA support.
 - For any platform adapted.

## Basics

There are two way for creating web components:
 - From code
 - Vanilla component

## From code
TYPESCRIPT/ECMA6

It is very similar to the reactjs and vue.

```typescript
import MyButton from "./button";
import { IDestroyerComponent } from "../../../index";
import { BaseComponent } from "../../../index";

export default class MyHeader extends BaseComponent implements IDestroyerComponent {

  id: string = 'my-heder';
  slogan: string = 'My header.';

  mySybCompBtnYes = new MyButton({ text: 'Yes', id: 'Y'});
  mySybCompBtnNo = new MyButton('No');

  constructor(arg: any) {
    super(arg);
    this.initial(arg);
  }

  change = () => {
    (window as any).app.changeTheme();
  }

  render = () => `
    <div id="${this.id}" class="middle h5">
       ${(this.mySybCompBtnYes).render()}
       ${(this.mySybCompBtnNo).render()}
       <div onclick="(${this.change})()">
         Change Theme
       </div>
    </div>
  `
}
```

## VANILLA COMPONENT
WEB/HTML/JS/CSS (ecma6)

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
```


## Hosting

### For localhost (http) web server:
```
http-server ./dist -p 80
or
npm run host
```

### For localhost watch:
Run watch:
```
npm run example
```

### For production (https) web server:
Run command:
```js
npm run build.example
```