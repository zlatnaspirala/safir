(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../index");
class MyButton extends _index.BaseComponent {
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
exports.default = MyButton;

},{"../../index":5}],2:[function(require,module,exports){
"use strict";

var _index = require("../index");
var _heder = _interopRequireDefault(require("./layouts/heder"));
var _body = _interopRequireDefault(require("./layouts/body"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _index.Smaragd();
app.loadVanillaComp("vanilla-components/footer.html");
(0, _index.On)("app.ready", () => {
  let myHeader = app.loadComponent(new _heder.default('my-header'));
  let myLayout = app.loadComponent(new _body.default('my-layout'));
  console.info("Application running [ready]...", Date.now());
});
console.info("Application running [sync]...", Date.now());

},{"../index":5,"./layouts/body":3,"./layouts/heder":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../index");
class Layout extends _index.BaseComponent {
  id = 'my-body';
  statusOfCounter = '';
  ready = () => {
    console.log('layout ready');
  };
  constructor(arg) {
    super(arg);
    (0, _index.On)('on-counter', data => {
      console.info('[on-counter] Trigger Btn Yes [from body] ', data.detail);
      let t = data.detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      if (t.emitter === "yes") {
        this.set('statusOfCounter', t.newValue);
      }
      // no is the ignored!
      // local tbn (no-emit) never emitted!
    });

    (0, _index.On)('no', data => {
      console.info('[no] Trigger Btn no [from body]', data.detail);
    });
    (0, _index.On)('no-emit', data => {
      console.info('Trigger Btn no-emit: ', data);
    });
  }
  change = e => {
    alert(e);
  };
  render = () => `
    <div id="${this.id}" class="middle h95 column">
       <h3>Status of counter YES = ${this.statusOfCounter} </h3>
       <div onclick="(${this.change})(this)">
         Test Modal
       </div>
    </div>
  `;
}
exports.default = Layout;

},{"../../index":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _button = _interopRequireDefault(require("../components/button"));
var _index = require("../index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MyHeader extends _index.BaseComponent {
  id = 'my-heder';
  slogan = 'My header.';
  mySybCompBtnYes = new _button.default({
    text: _index.T.yes,
    id: 'yes'
  });
  mySybCompBtnNo = new _button.default({
    text: _index.T.no,
    id: 'no'
  });
  mySybCompBtnNoEmit = new _button.default({
    text: _index.T.textAlert,
    id: 'local'
  });
  ready = () => {
    console.log('header ready. what is ml ', _index.T);
  };
  constructor(arg) {
    super(arg);
    this.initial(arg);
    (0, _index.On)('yes', () => {
      console.info('Trigger Btn Yes', this);
      let newValue = this.mySybCompBtnYes.getCounter + 1;
      this.mySybCompBtnYes.set('counter', newValue);
    });
    (0, _index.On)('no', () => {
      console.info('Trigger Btn no', this);
      let newValue = this.mySybCompBtnNo.getCounter - 1;
      this.mySybCompBtnNo.set('counter', newValue);
    });
    (0, _index.On)('local', () => {
      console.info('Trigger Btn no', this);
      this.mySybCompBtnNoEmit.set('counter', 100, {
        emit: false
      });
    });
    (0, _index.On)('change-theme', () => {
      console.info('Trigger CHANGE THEME', this.changeTheme());
    });
  }
  change = this.clickBind;
  render = () => `
    <div id="${this.id}" class="middle h5">
       ${this.mySybCompBtnYes.render()}
       ${this.mySybCompBtnNo.render()}
       ${this.mySybCompBtnNoEmit.render()}
       <div onclick="(${this.change})('change-theme')">
         Change Theme
       </div>
    </div>
  `;
}
exports.default = MyHeader;

},{"../../index":5,"../components/button":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseComponent", {
  enumerable: true,
  get: function () {
    return _comp.BaseComponent;
  }
});
Object.defineProperty(exports, "On", {
  enumerable: true,
  get: function () {
    return _modifier.On;
  }
});
Object.defineProperty(exports, "Smaragd", {
  enumerable: true,
  get: function () {
    return _root.Smaragd;
  }
});
Object.defineProperty(exports, "T", {
  enumerable: true,
  get: function () {
    return _root.T;
  }
});
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _root.getComp;
  }
});
var _root = require("./src/core/root");
var _comp = require("./src/core/comp");
var _modifier = require("./src/core/modifier");

},{"./src/core/comp":6,"./src/core/modifier":8,"./src/core/root":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = void 0;
var _modifier = require("./modifier");
var _utils = require("./utils");
class BaseComponent {
  id = 'none';
  dom = null;
  text = '';
  rootStyle = {};
  constructor(arg) {}
  ready() {
    console.log('ready comp');
  }
  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      console.warn('Arg text is used for id!');
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
      this.text = arg.text;
      this.id = arg.id;
    }
    if (rootStyle && typeof rootStyle.height !== 'undefined') {
      this.rootStyle = rootStyle;
    }
  }
  set(arg, newValue, extraData) {
    const local = 'data-' + arg;
    const localRoot = (0, _utils.getComp)(this.id);
    // Double care!
    localRoot.setAttribute(local, newValue);
    let root = this;
    root[arg] = newValue;
    this.update(root, arg, extraData);
  }
  render = () => ``;
  update = (root, arg, extraData) => {
    (0, _utils.getComp)(root.id).innerHTML = this.render();
    if (extraData?.emit === false) {
      console.info("Update Comp:", this.id);
      return;
    }
    // Emiter
    dispatchEvent(new CustomEvent('on-' + arg, {
      bubbles: true,
      detail: {
        emitter: root.id,
        arg: arg,
        newValue: root[arg]
      }
    }));
    console.info("Update/Emited Comp:", this.id);
  };
  changeTheme = newTheme => {
    if (newTheme) {
      if ((0, _utils.getComp)('app')?.classList.contains(newTheme)) {
        console.info('already containe theme!');
      } else {
        (0, _utils.getComp)('app')?.classList.remove('theme-light');
        (0, _utils.getComp)('app')?.classList.remove('theme-dark');
        (0, _utils.getComp)('app')?.classList.add(newTheme);
      }
    } else {
      if ((0, _utils.getComp)('app')?.classList.contains('theme-light')) {
        console.info('Change theme !');
        (0, _utils.getComp)('app')?.classList.remove('theme-light');
        (0, _utils.getComp)('app')?.classList.add('theme-dark');
      } else if ((0, _utils.getComp)('app')?.classList.contains('theme-dark')) {
        console.info('Change theme !');
        (0, _utils.getComp)('app')?.classList.remove('theme-dark');
        (0, _utils.getComp)('app')?.classList.add('theme-light');
      }
    }
  };
  clickBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'clickBind',
        for: a,
        target: a
      }
    });
    dispatchEvent(onClickEvent);
  };
}
exports.BaseComponent = BaseComponent;

},{"./modifier":8,"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myBase = exports.Base = void 0;
var _base = require("../style/base");
class Base extends HTMLElement {
  constructor(...args) {
    super(...args);
    console.log('Base class init...');
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
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

    inputElement.setAttribute('style', _base.middleBox);
    console.log('changed style');
    // if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style')!);

    inputElement.addEventListener('mousemove', () => {
      console.log('hover on element.', this.getAttribute('id'));
    });

    // inputElement.addEventListener('change', (e) => {
    //   console.log('changed', (e ).path[0].value);
    //   this.setAttribute('value', (e ).path[0].value)
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

},{"../style/base":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.On = void 0;
window.On = window.addEventListener;
// (window ).T = {};
// export let T = (window ).T;
const On = window.On;
exports.On = On;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T = exports.Smaragd = void 0;
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _utils.getComp;
  }
});
var _customCom = require("./custom-com");
var _utils = require("./utils");
var _modifier = require("./modifier");
/**
 * @description
 * Test project structure
 */

let T = {};
exports.T = T;
class BaseDestroyer {
  emitML = async function (r) {
    const x = await r.loadMultilang();
    exports.T = T = x;
    // internal exspose to the global obj
    // Better then injecting intro every sub comp!
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    console.info("Multilang integrated component... ");
    // Predefined path ../assets
    const r = await fetch(path, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await r.json();
  };
}
class Smaragd extends BaseDestroyer {
  subComponents;
  appRoot;
  constructor() {
    super();
    // On('app.ready', (data) => {
    //   if (data.detail.info == "app.ready") {
    //     // Integrated multilang app.ready
    //     T = data.detail.labels;
    //     console.log("Test global T :", T);
    //   }
    // });
    this.subComponents = [];
    this.appRoot = (0, _utils.getComp)("app");
    this.construct();
  }
  ready = () => {
    // console.info("App root component is ready.");
  };
  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    // console.info("Multilang integrated component.ROOT. ", this.l);
    window.customElements.define('my-box', _customCom.myBase);
    this.ready();
  };
  loadComponent = arg => {
    let x = document.createElement('div');
    // x.setAttribute("id", arg.id);
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    arg.ready();
    return arg;
  };
  loadVanillaComp(arg) {
    fetch(arg, {}).then(res => {
      return res.text();
    }).then(html => {
      // console.warn(">>>HTML>>>>>>>" + html);
      let test2 = html.split('<script>')[1];
      let htmlContent = html.split('<script>')[0];
      let myScriptContent = test2.split('</script>')[0];
      let myScript = document.createElement('script');
      myScript.innerHTML = myScriptContent;
      // document.body.innerHTML += htmlContent;
      this.appRoot.innerHTML += htmlContent;
      document.body.appendChild(myScript);
      return true;
    });
  }
}
exports.Smaragd = Smaragd;

},{"./custom-com":7,"./modifier":8,"./utils":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComp = exports.degToRad = exports.Manager = void 0;
exports.isMobile = isMobile;
exports.loadImage = void 0;
exports.radToDeg = radToDeg;
/**
 * @description
 * Load script in runtime.
 */
let Manager = {
  load: (src, id, type, parent, callback) => {
    var s = document.createElement("script");
    s.onload = function (e) {
      if (callback) callback(e);
      console.info("Script id loaded: " + src);
    };
    if (typeof type !== "undefined") {
      s.setAttribute("type", type);
      s.innerHTML = src;
    } else {
      s.setAttribute("src", src);
    }
    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }
    if (typeof parent !== "undefined") {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  },
  loadModule: (src, id, type, parent, callback) => {
    console.info("Async loader -> ", src);
    var s = document.createElement("script");
    s.onload = function (e) {
      if (callback) callback(e);
    };
    if (typeof type === "undefined") {
      s.setAttribute("type", "module");
      s.setAttribute("src", src);
    } else {
      s.setAttribute("type", type);
      s.innerHTML = src;
    }
    s.setAttribute("src", src);
    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }
    if (typeof parent !== "undefined") {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  }
};
exports.Manager = Manager;
const getComp = function (id) {
  return document.getElementById(id);
};
exports.getComp = getComp;
const degToRad = function (degrees) {
  return degrees * Math.PI / 180;
};
exports.degToRad = degToRad;
function radToDeg(r) {
  var pi = Math.PI;
  return r * (180 / pi);
}
function isMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}
const loadImage = function (url, onload) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function (e) {
    onload();
  };
  return img;
};
exports.loadImage = loadImage;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleBox = void 0;
let middleBox = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color:black;
    color:white;
`;
exports.middleBox = middleBox;

},{}]},{},[2]);
