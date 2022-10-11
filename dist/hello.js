(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
class MyHBox extends _index.BaseComponent {
  id = '';
  tableData = ['Crazzy easy', 'Super Performance', 'Data access'];
  get getSubId() {
    return 'hor-box-button';
  }
  constructor(arg) {
    super(arg);
    this.initial(arg);
  }
  onClick = this.clickBind;
  render = () => `
    <div id="${this.id}" style="width:100%">
      <hor-box onclick="(${this.onClick})('${this.getSubId}')">
          ${this.tableData.map(item => {
    return `<h2 style="width:100%;text-align: center;">` + item + `</h2>`;
  }).join('')}
      </hor-box>
    </div>
  `;
}
exports.default = MyHBox;

},{"../../index":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
var _horBox = _interopRequireDefault(require("./hor-box"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MyVHBox extends _index.BaseComponent {
  id = '';
  tableData = ['Crazzy easy1 ', 'Super Performance1 ', 'Data access1 '];
  get getSubId() {
    return 'mybox-button1';
  }
  constructor(arg) {
    super(arg);
    this.initial(arg);
    // this.myHorizontalComp = new MyHBox('hor-box-custom');
  }

  onClick = this.clickBind;
  render = () => `
    <div id="${this.id}">
      <ver-box onclick="(${this.onClick})('${this.getSubId}')">
        ${this.tableData.map((item, index) => new _horBox.default('hor-box-custom' + index).render()).join('')}
      </ver-box>
    </div>
  `;
}
exports.default = MyVHBox;

},{"../../index":4,"./hor-box":1}],3:[function(require,module,exports){
"use strict";

var _index = require("../index");
var _verHor = _interopRequireDefault(require("./components/ver-hor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _index.Safir();
app.loadVanillaComp("vanilla-components/footer.html");
(0, _index.On)("app.ready", () => {
  let myBoxComp = app.loadComponent(new _verHor.default('ver-hor'));
  console.info("Application running demo2 [ready]...", Date.now());
});
(0, _index.On)("mybox-button1", r => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
});

},{"../index":4,"./components/ver-hor":2}],4:[function(require,module,exports){
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

},{"./src/core/comp":5,"./src/core/modifier":7,"./src/core/root":8}],5:[function(require,module,exports){
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

},{"./modifier":7,"./utils":9}],6:[function(require,module,exports){
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
    console.log('C Ver class init... arg => ', args);
    args.push(_base.verCenter);
    super(...args);
  }
}
exports.Vertical = Vertical;
class Horizontal extends Base {
  constructor(...args) {
    console.log('C Hor class init... arg => ', args);
    args.push(_base.horCenter);
    super(...args);
  }
}
exports.Horizontal = Horizontal;

},{"../style/base":10}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
    // internal exspose to the global obj
    exports.T = T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    console.info("Multilang integrated component... ");
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
    } finally {
      return {};
    }
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
    console.info("Multilang integrated component.ROOT. Still not resolved (pass arg) for services eg. codepen etc.");
    window.customElements.define('ver-box', _customCom.Vertical);
    window.customElements.define('hor-box', _customCom.Horizontal);
    console.info("Custom Base Dom elements integrated => [Vertical, Horizontal].");
    this.ready();
  };
  regTag(tagName, classRef) {
    window.customElements.define(tagName, classRef);
    console.info("Custom dom element loaded in runtime => " + tagName);
  }
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

},{"./custom-com":6,"./modifier":7,"./utils":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
