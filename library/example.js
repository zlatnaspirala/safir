(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyButton {
    constructor() {
        this.id = 'my-button';
        this.slogan = 'welcome here';
        this.onClick = () => {
            console.info('CLick');
        };
        this.render = () => `
    <button onClick="${this.onClick}">
      ${this.slogan}
    </button>
  `;
    }
}
exports.default = MyButton;

},{}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = __importDefault(require("./button"));
class MyHeder {
    constructor() {
        this.id = 'my-new-heder';
        this.slogan = 'welcome here';
        this.onClick = () => {
            console.info("CLick");
        };
        this.render = () => `
    <div>
       ${(new button_1.default()).render()}
    </div>
  `;
    }
}
exports.default = MyHeder;

},{"./button":1}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const heder_1 = __importDefault(require("./components/heder"));
let app = new index_1.PopularDestroyer();
window.app = app;
// app.regComponent({ id: 'heder'});
app.loadComponent((new heder_1.default));

},{"../../index":4,"./components/heder":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopularDestroyer = void 0;
const root_1 = require("./src/core/root");
Object.defineProperty(exports, "PopularDestroyer", { enumerable: true, get: function () { return root_1.PopularDestroyer; } });

},{"./src/core/root":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBase = exports.Base = void 0;
class Base extends HTMLElement {
    constructor(...args) {
        super(...args);
        // super();
        console.log('changed 1style');
        const shadowRoot = this.attachShadow({ mode: 'open' });
        let inputElement = document.createElement('template');
        inputElement.setAttribute('id', this.getAttribute('id'));
        inputElement.innerHTML = this.innerHTML;
        // inputElement.setAttribute('type', this.getAttribute('type')!);
        // inputElement.setAttribute('value', this.getAttribute('value')!);
        // inputElement.setAttribute('max', this.getAttribute('max')!);
        // inputElement.setAttribute('min', this.getAttribute('min')!);
        // need trick
        // inputElement.setAttribute('class', this.getAttribute('class'));
        // predefined
        let standardStyle = `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
      background-color:black;
      color:white;
    `;
        inputElement.setAttribute('style', standardStyle);
        console.log('changed style');
        // if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style')!);
        inputElement.addEventListener('mousemove', () => {
            console.log('hover on element.');
        });
        // inputElement.addEventListener('change', (e) => {
        //   console.log('changed', (e as any).path[0].value);
        //   this.setAttribute('value', (e as any).path[0].value)
        // });
        // if (typeof args[0] === 'function') inputElement.addEventListener('change', args[0])
        shadowRoot.appendChild(inputElement);
    }
}
exports.Base = Base;
class myBase extends Base {
    constructor(...args) {
        super(...args);
    }
}
exports.myBase = myBase;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopularDestroyer = void 0;
/**
 * @description
 * Test project structure
 */
const custom_com_1 = require("./custom-com");
//import "@webcomponents/webcomponentsjs/webcomponents-bundle";
//import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
class PopularDestroyer {
    constructor() {
        this.info = () => {
            console.log("Test popular killer.");
        };
        this.construct = () => {
            console.log("Test popular killer component.");
            console.log("register popular killer component. ");
            window.customElements.define('my-box', custom_com_1.myBase);
            // let tag = "div";
            // let html = `<${tag}> BLA BLA </${tag}>`;
            // this.appRoot!.innerHTML = html;
        };
        this.regComponent = (arg) => {
            var _a;
            let x = document.createElement("my-box");
            x.setAttribute("id", arg.id);
            (_a = this.appRoot) === null || _a === void 0 ? void 0 : _a.appendChild(x);
        };
        this.loadComponent = (arg) => {
            var _a;
            let x = document.createElement("div");
            x.setAttribute("id", arg.id);
            x.innerHTML = arg.render();
            (_a = this.appRoot) === null || _a === void 0 ? void 0 : _a.appendChild(x);
        };
        this.subComponents = [];
        this.appRoot = document.getElementById("app");
        this.construct();
    }
}
exports.PopularDestroyer = PopularDestroyer;
// App instance
console.info("popularDestroyer instance");

},{"./custom-com":5}]},{},[3]);
