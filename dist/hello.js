(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
class MyButton extends _index.BaseComponent {
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
  }
  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.getCounter}
    </button>
  `;
}
exports.default = MyButton;

},{"../../index":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
class MyList extends _index.BaseComponent {
  id = '';

  // This is props
  tableData = ['👽 Modern tech', '👌 Performance', '🤑 Free soft', '😜 Easy use', '💔 Breaking', '💥 Star project', '👁️‍🗨️ Event oriented', '🖖 No single unnecessary element', '🤘 Safir rocks', '👨‍🔬 Use npm service', '👨‍💻 Open source', '🐈 https://github.com/zlatnaspirala/safir'];
  constructor(arg) {
    super(arg);
    this.initial(arg);
  }
  onClick = this.clickBind;

  /**
   * @description
   * Index Key is not required but 
   * it is nice to have.
   */
  render = () => `
    <div class="verCenter">
      ${this.tableData.map((item, index) => `<h2 data-key="${index}" onclick="(${this.onClick})('${this.id}')"
               class="middle">` + index + item + `</h2>`).join('')}
    </div>
  `;
}
exports.default = MyList;

},{"../../index":5}],3:[function(require,module,exports){
"use strict";

var _index = require("../index");
var _myList = _interopRequireDefault(require("./components/my-list"));
var _heder = _interopRequireDefault(require("./layouts/heder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _index.Safir();
app.loadVanillaComp("vanilla-components/footer.html");

// window.app = app;
let myBoxComp, myHeader;
(0, _index.On)("app.ready", () => {
  myHeader = app.loadComponent(new _heder.default('my-header'));
  myBoxComp = app.loadComponent(new _myList.default('my-box-custom'), 'myScroll');
  console.info("Application running demo2 [ready]...", Date.now());
  // Exsposed to the global scope for testing in console!
  window.myBoxComp = myBoxComp;
  // myBoxComp.set('tableData', ['wao', 'woow'])
});

(0, _index.On)("my-box-custom", r => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
  // alert(" List item clicked => " + r.path[0].innerHTML);
  console.log('>>>>>>>>>>' + myBoxComp.tableData);
  // myBoxComp.tableData.slice();
  let getIndex = r.path[0].getAttribute('data-key');
  myBoxComp.tableData.splice(getIndex, 1);
  setTimeout(function () {
    myBoxComp.set('tableData', myBoxComp.tableData);
  }, 600);
  r.path[0].classList.add('animate-destroy');
});

},{"../index":5,"./components/my-list":2,"./layouts/heder":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _button = _interopRequireDefault(require("../components/button"));
var _index = require("../../index");
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
      let newValue = this.mySybCompBtnNoEmit.getCounter - 1;
      console.info('You can always get trigger detect by id !', this);
      console.info('But no trigger for props setter with { emit: false } !', this);
      this.mySybCompBtnNoEmit.set('counter', newValue, {
        emit: false
      });
    });
    (0, _index.On)('change-theme', () => {
      this.changeTheme();
      console.info('Trigger ChangeTheme integrated.');
    });
  }
  change = this.clickBind;
  render = () => `
    <div class="middle h5">
       ${this.mySybCompBtnYes.renderId()}
       ${this.mySybCompBtnNo.renderId()}
       ${this.mySybCompBtnNoEmit.renderId()}
       <button onclick="(${this.change})('change-theme')">
         Change Theme
       </button>
    </div>
  `;
}
exports.default = MyHeader;

},{"../../index":5,"../components/button":1}],5:[function(require,module,exports){
'use strict';

/**
 * @description
 * Main export file for Safir.
 */
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
Object.defineProperty(exports, "Safir", {
  enumerable: true,
  get: function () {
    return _root.Safir;
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
var _utils = require("./utils");
class BaseComponent {
  id = 'none';
  domRoot = null;
  text = '';
  rootStyle = {};
  subComponents = [];
  constructor(arg) {}
  ready() {
    console.log('ready comp');
  }
  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
      // console.warn('Arg is object!');
      this.text = arg.text;
      this.id = arg.id;
    }
    if (rootStyle) {
      this.rootStyle = rootStyle;
    } else {
      this.rootStyle = "";
    }
  }
  set(arg, newValue, extraData) {
    const local = 'data-' + arg;
    console.log('test id ', this.id);
    const localRoot = (0, _utils.getComp)(this.id);
    // Double care!
    localRoot.setAttribute(local, newValue);
    let root = this;
    root[arg] = newValue;
    this.update(root, arg, extraData);
  }
  renderId = () => `
    <div id="${this.id}" style="${this.rootStyle}">
      ${this.render()}
    </div>
  `;
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
        target: this
      }
    });
    dispatchEvent(onClickEvent);
  };
}
exports.BaseComponent = BaseComponent;

},{"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vertical = exports.Horizontal = exports.Base = void 0;
var _base = require("../style/base");
class Base extends HTMLElement {
  constructor(...args) {
    super(...args);
    console.log('Base class init... arg => ', args);
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    let inputElement = document.createElement('div');
    inputElement.setAttribute('id', this.getAttribute('id'));
    inputElement.innerHTML = this.innerHTML;
    // inputElement.setAttribute('type', this.getAttribute('type')!);
    // inputElement.setAttribute('value', this.getAttribute('value')!);
    // inputElement.setAttribute('max', this.getAttribute('max')!);
    // inputElement.setAttribute('min', this.getAttribute('min')!);
    // need trick
    // inputElement.setAttribute('class', this.getAttribute('class'));
    // predefined
    inputElement.setAttribute('style', args[0]);
    // inputElement.classList.add(args[0]);

    console.log('inputElement.classList =? ', inputElement.classList);
    // if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style')!);

    inputElement.addEventListener('mousemove', () => {
      // console.log('hover on element.', this.getAttribute('id'));
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
class Vertical extends Base {
  constructor(...args) {
    // console.log('C Ver class init... arg => ', args);
    args.push(_base.verCenter);
    super(...args);
  }
}
exports.Vertical = Vertical;
class Horizontal extends Base {
  constructor(...args) {
    // console.log('C Hor class init... arg => ', args);
    args.push(_base.horCenter);
    super(...args);
  }
}
exports.Horizontal = Horizontal;

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
exports.T = exports.Safir = void 0;
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
 * Main safir classes.
 * Test project structure.
 */

let T = {};

/**
 * @description
 * Main Base Safir class.
 */
exports.T = T;
class BaseSafir {
  /**
   * @description
   * Multi language system is already deep integrated like common feature
   * in developing apps proccess.
   */
  emitML = async function (r) {
    const x = await r.loadMultilang();
    // Internal exspose to the global obj
    exports.T = T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    // console.info("Multilang integrated component... ");
    // Predefined path ../assets
    // Need fix for online services eg. codepen
    try {
      const r = await fetch(path, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await r.json();
    } catch (err) {
      console.warn('Not possible to access multilang json asset! Err => ', err);
      return {};
    }
    // finally {
    //  return await r.json();
    // }
  };
}

class Safir extends BaseSafir {
  subComponents;
  appRoot;
  constructor() {
    super();
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
    // console.info("Multilang integrated component.ROOT. Still not resolved (pass arg) for services eg. codepen etc.");
    window.customElements.define('ver-box', _customCom.Vertical);
    window.customElements.define('hor-box', _customCom.Horizontal);
    // console.info("Custom Base Dom elements integrated => [Vertical, Horizontal].");
    this.ready();
  };
  regTag(tagName, classRef) {
    window.customElements.define(tagName, classRef);
    console.info("Custom dom element loaded in runtime => " + tagName);
  }
  loadComponent = (arg, rootStyle) => {
    let x = document.createElement('div');
    x.setAttribute("id", arg.id);
    // if (rootStyle) x.setAttribute("style", rootStyle);
    if (rootStyle) x.classList.add(rootStyle);
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
exports.Safir = Safir;

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
exports.verCenter = exports.horCenter = void 0;
let verCenter = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100%);
`;
exports.verCenter = verCenter;
let horCenter = `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100%);
`;
exports.horCenter = horCenter;

},{}]},{},[3]);
