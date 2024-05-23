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

  // Safir Prop
  counter = 0;

  // Also fancy ECMA6
  get getCounter() {
    return this.counter;
  }
  ready = () => {};
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  // Every click event must be bind with clickBind func !
  onClick = this.clickBind;

  // Attached on root dom element
  // data-counter="${this.getCounter}"
  render = () => `
    <button class="fill" onclick="(${this.onClick})('${this.id}')">
      ${this.text} counter => ${this.counter}
    </button>
  `;
}
exports.default = MyButton;

},{"../../index":5}],2:[function(require,module,exports){
"use strict";

var _index = require("../index");
var _heder = _interopRequireDefault(require("./layouts/heder"));
var _body = _interopRequireDefault(require("./layouts/body"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _index.Safir();
app.loadVanillaComp("vanilla-components/footer.html");
(0, _index.On)("app.ready", () => {
  let myHeader = app.loadComponent(new _heder.default('my-header'));
  let myLayout = app.loadComponent(new _body.default('my-layout'));
  console.info("Application running [ready]...", Date.now());
  app.translate.update();
});
console.info("Application running [sync]...", Date.now());
window.app = app;

},{"../index":5,"./layouts/body":3,"./layouts/heder":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
class Layout extends _index.BaseComponent {
  id = 'my-body';
  statusCounterYes = '0';
  statusCounterNo = '0';
  ready = () => {
    console.log('layout ready');
  };
  constructor(arg) {
    super(arg);
    (0, _index.On)('on-counter', data => {
      console.info('[on-counter] Trigger Btn Yes [catched from body] ', data.detail);
      let t = data.detail;
      // Because we use multiply same component with also same prop
      // Still if you need emit but to other place then you can use 
      // detail.emitter to determinate by id who is for real
      if (t.emitter === "yes") {
        this.set('statusCounterYes', t.newValue);
      } else if (t.emitter === "no") {
        this.set('statusCounterNo', t.newValue);
      }
      // local tbn (no-emit) never emitted!
    });

    (0, _index.On)('no', data => {
      console.info('[no] Trigger Btn no [from body]', data.detail);
    });
  }
  change = e => {
    alert(e);
  };
  render = () => `
    <div class="middle h95 column">
       <h3>Status of counter Yes = ${this.statusCounterYes} </h3>
       <h3>Status of counter No = ${this.statusCounterNo} </h3>
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
var _index = require("../../index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MyHeader extends _index.BaseComponent {
  id = 'my-heder';
  slogan = 'My header.';
  mySybCompBtnYes = new _button.default({
    text: _index.T.yes,
    id: 'yes'
  }, 'fill');
  mySybCompBtnNo = new _button.default({
    text: _index.T.no,
    id: 'no'
  }, 'fill');
  mySybCompBtnNoEmit = new _button.default({
    text: _index.T.textAlert,
    id: 'local'
  }, 'fill');
  // mm = new SafirBuildInPlugins.SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2'}, 'middle mySlot');

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
    (0, _index.On)('set-theme', e => {
      this.changeTheme('theme-' + e.detail.target.value);
      console.info('Trigger SetTheme integrated.', e.detail.target.value);
    });
  }
  change = this.clickBind;
  selectTheme = this.clickBind;
  render = () => `
    <div class="middle h5">
       ${this.mySybCompBtnYes.renderId()}
       ${this.mySybCompBtnNo.renderId()}
       ${this.mySybCompBtnNoEmit.renderId()}
       <div class="fill">
        <button data-label="changeTheme" class="fill" onclick="(${this.change})('change-theme')">
          Change Theme
        </button>
        </div>
        <div class="fill">
        <select class="fill" onchange="(${this.selectTheme})('set-theme')">
          <option>dark</option>
          <option>light</option>
          <option>orange</option>
          <option>blue</option>
        </select>
       </div>
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
Object.defineProperty(exports, "GetAllEvents", {
  enumerable: true,
  get: function () {
    return _modifier.GetAllEvents;
  }
});
Object.defineProperty(exports, "JSON_HEADER", {
  enumerable: true,
  get: function () {
    return _utils.JSON_HEADER;
  }
});
Object.defineProperty(exports, "LocalSessionMemory", {
  enumerable: true,
  get: function () {
    return _utils.LocalSessionMemory;
  }
});
Object.defineProperty(exports, "LocalStorageMemory", {
  enumerable: true,
  get: function () {
    return _utils.LocalStorageMemory;
  }
});
Object.defineProperty(exports, "Manager", {
  enumerable: true,
  get: function () {
    return _utils.Manager;
  }
});
Object.defineProperty(exports, "Off", {
  enumerable: true,
  get: function () {
    return _modifier.Off;
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
exports.SafirBuildInPlugins = void 0;
Object.defineProperty(exports, "T", {
  enumerable: true,
  get: function () {
    return _root.T;
  }
});
Object.defineProperty(exports, "byClass", {
  enumerable: true,
  get: function () {
    return _utils.byClass;
  }
});
Object.defineProperty(exports, "byID", {
  enumerable: true,
  get: function () {
    return _utils.byID;
  }
});
Object.defineProperty(exports, "byTag", {
  enumerable: true,
  get: function () {
    return _utils.byTag;
  }
});
Object.defineProperty(exports, "emit", {
  enumerable: true,
  get: function () {
    return _utils.emit;
  }
});
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _root.getComp;
  }
});
Object.defineProperty(exports, "urlVar", {
  enumerable: true,
  get: function () {
    return _utils.urlVar;
  }
});
var _root = require("./src/core/root");
var _comp = require("./src/core/comp");
var _modifier = require("./src/core/modifier");
var _utils = require("./src/core/utils");
var _safirSlot = require("./src/controls/safir-slot");
let SafirBuildInPlugins = {
  SafirSlot: _safirSlot.SafirSlot
};
exports.SafirBuildInPlugins = SafirBuildInPlugins;

},{"./src/controls/safir-slot":6,"./src/core/comp":7,"./src/core/modifier":9,"./src/core/root":10,"./src/core/utils":11}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleCounter = exports.SafirSlot = void 0;
var _index = require("../../index");
class SingleCounter extends _index.BaseComponent {
  refFunc = [];
  ready = () => {
    this.id = this.id;
    let slot = document.createElement('div');
    slot.id = `${this.rootDom}slot${this.id}`;
    slot.classList.add('slot');
    (0, _index.byID)(this.rootDom + '-holder').append(slot);
    if (this.id.indexOf('D') != -1) {
      slot.innerHTML = ',';
      slot.style.margin = '1px';
      slot.style.padding = '1px';
      slot.style.fontSize = 'xxx-large';
      slot.style.background = 'transparent';
      return;
    }
    slot.innerHTML = this.render(this.id);
    this.myAnim(this.id);
  };
  constructor(arg) {
    super(arg);
    this.content = arg.content;
    if (this.content.length == 0) {
      this.content = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    this.initial(arg);
    this.rootDom = arg.rootDom;
  }
  calcAnim(ring) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    nums.forEach((num, i) => {
      this.refFunc.push(() => {
        const numAngle = 36 * i;
        const currentAngle = ring.style.getPropertyValue("--deg").replace(/\D/g, "");
        let nextAngle = numAngle;
        while (nextAngle < currentAngle) {
          nextAngle += 360;
        }
        if (nextAngle > 360) nextAngle -= 360;
        // console.log('nextAngle', nextAngle);
        ring.style.setProperty("--deg", `-${nextAngle}deg`);
        ring.setAttribute('data-slot', i);
      });
    });
  }
  myAnim = function (id) {
    const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
    const panels = $(`[data-root-${this.rootDom}-${id}]`);
    panels.forEach((panel, i) => {
      panel.style.setProperty("--angle", `${360 / panels.length * i}deg`);
    });
    const ring0 = $(`.ring-${this.rootDom}-${id}`)[0];
    this.calcAnim(ring0);
  };
  setNumber = function (num) {
    this.refFunc[num]();
  };
  render = arg => {
    return `
    <div class="ring-${this.rootDom}-${arg} ring${arg}" data-slot="0" data-root="${this.rootDom}">
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[0]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[1]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[2]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[3]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[4]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[5]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[6]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[7]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[8]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[9]}</div>
    </div>
    `;
  };
}
exports.SingleCounter = SingleCounter;
class SafirSlot extends _index.BaseComponent {
  VALUE = 0;
  speed = 100;
  editBtns = false;
  myConstruct(arg) {
    if (typeof arg.editBtns !== 'undefined') {
      this.editBtns = arg.editBtns;
    }
    if (typeof arg.content !== 'undefined') {
      this.content = arg.content;
    } else {
      this.content = [];
    }
    this.field0 = new SingleCounter({
      id: '0',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field1 = new SingleCounter({
      id: '1',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field2 = new SingleCounter({
      id: '2',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field3 = new SingleCounter({
      id: '3',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field4 = new SingleCounter({
      id: '4',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field5 = new SingleCounter({
      id: '5',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field6 = new SingleCounter({
      id: '6',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field7 = new SingleCounter({
      id: '7',
      rootDom: this.rootDom,
      content: this.content
    });
    this.dot = new SingleCounter({
      id: 'D',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field8 = new SingleCounter({
      id: '8',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field9 = new SingleCounter({
      id: '9',
      rootDom: this.rootDom,
      content: this.content
    });
    (0, _index.On)(`${this.rootDom}-plus`, e => {
      this.setSum(this.getCurrentSum() + 1);
    });
    (0, _index.On)(`${this.rootDom}-minus`, e => {
      this.setSum(this.getCurrentSum() - 1);
    });

    // setTimeout(() => {
    //   dispatchEvent(new CustomEvent(`${this.rootDom}`, {
    //     bubbles: true,
    //     detail: {
    //       rootDom: this.rootDom,
    //     }
    //   }));
    // }, 1)
  }

  constructor(arg, classArg) {
    super();
    this.initial(arg, classArg);
    this.rootDom = arg.rootDom;
    this.myConstruct(arg);
  }
  setSlotClass(c) {
    let setByIndex = (i, c) => {
      let l0 = document.querySelectorAll(`[data-root-${this.rootDom.toLowerCase()}-${i}]`);
      for (var x = 0; x < l0.length; x++) {
        l0[x].classList.add(c);
      }
    };
    for (var x = 0; x < 10; x++) {
      setByIndex(x, c);
    }
    (0, _index.byID)(this.id).classList.add(c);
  }
  setSlotColor(c) {
    const setByIndex = (i, c) => {
      let l0 = document.querySelectorAll(`[data-root-${this.rootDom.toLowerCase()}-${i}]`);
      for (var x = 0; x < l0.length; x++) {
        l0[x].style.background = c;
      }
    };
    for (var x = 0; x < 10; x++) {
      setByIndex(x, c);
    }
    (0, _index.byID)(this.id).style.background = c;
  }
  setSum(num) {
    num = parseFloat(num.toFixed(2));
    var str = String(num);
    if (str.indexOf('.') == -1) {
      str = str + ".00";
    }
    if (str.indexOf('.') != -1) {
      // console.log('Theres decimals intro number str.length;', str.length);
      (0, _index.byID)(`${this.rootDom}slotD`).style.display = 'block';
      let delta = 0;
      if (str.length < 11) {
        let howMany = 11 - str.length;
        if (str.split('.')[1].length < 2) howMany--;
        for (var y = 0; y < howMany; y++) {
          str = "0" + str;
          if (str.split('.')[1].length < 2) {
            console.log('TEST STRRIGHT LINGTH = ', str.split('.')[1].length);
            str = str + "0";
            delta = -1;
          }
        }
      }
      var locHandler = false;
      for (var x = 10; x >= 0; x--) {
        if (str[x] != '.') {
          if (locHandler == true) {
            this[`field${x}`].setNumber(str[x]);
          } else {
            if (x == 11) {
              this[`field${x - 2}`].setNumber(str[x]);
            } else {
              this[`field${x - 1}`].setNumber(str[x]);
            }
          }
        } else {
          locHandler = true;
          // console.log('DECIMAL CHAR DETECTED ', str[x])
        }
      }
    }

    this.VALUE = str;
  }
  getCurrentSum() {
    return parseFloat(parseFloat(this.VALUE).toFixed(2));
  }
  getNumByPosition(n) {
    let C = (0, _index.byClass)(`ring-${this.rootDom}-${n}`);
    console.log('Get individual index value: ', C[x].getAttribute('data-slot'));
    return C[x].getAttribute('data-slot');
  }
  myX = 0;
  setByTime(newValue, speed) {
    if (typeof speed !== 'undefined') this.speed = speed;
    if (newValue.toString().indexOf('.') !== -1 && newValue.toString().split('.')[1].length < 2) {
      newValue = newValue + "0";
    }
    let test = parseFloat((newValue - this.getCurrentSum()).toFixed(2));
    let X = x => {
      var CO = 1;
      if (test < 0) {
        CO = -1;
      }
      if (CO == 1) {
        if (test < 0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO);
        } else if (test < 1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO);
        } else if (test < 100) {
          this.setSum(this.getCurrentSum() + 2.12 * CO);
        } else if (test < 500) {
          this.setSum(this.getCurrentSum() + 112.12 * CO);
        } else {
          this.setSum(this.getCurrentSum() + 212.12 * CO);
        }
      } else {
        if (test > -0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO);
        } else if (test > -1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO);
        } else if (test > -100) {
          this.setSum(this.getCurrentSum() + 2.12 * CO);
        } else if (test > -500) {
          this.setSum(this.getCurrentSum() + 112.12 * CO);
        } else {
          this.setSum(this.getCurrentSum() + 212.12 * CO);
        }
      }
    };
    if (this.getCurrentSum() < newValue && test > 0) {
      this.myX++;
      setTimeout(x => {
        X(x);
        this.setByTime(newValue);
      }, this.speed, this.myX);
    } else if (this.getCurrentSum() > newValue && test < 0) {
      this.myX++;
      setTimeout(x => {
        X(x);
        this.setByTime(newValue);
      }, this.speed, this.myX);
    }
  }
  inc = this.clickBind;
  render = () => {
    return `
      <h2 data-label="${this.rootDom}SlotTitle">Safir-Slot-UI-Component</h2>
      <div id="${this.rootDom}-holder" class="horCenter numAnimHolder" style="background-color:transparent"></div>
      ${this.editBtns == true ? `<button id="${this.rootDom}-minus" onclick="(${this.inc})('${this.rootDom + "-minus"}')" >-</button>
         <button id="${this.rootDom}-plus" onclick="(${this.inc})('${this.rootDom + "-plus"}')" >+</button>` : ""}
    `;
  };
}
exports.SafirSlot = SafirSlot;

},{"../../index":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = void 0;
var _utils = require("./utils");
let testKeys = ['id', 'domRoot', 'text', 'rootStyle', 'subComponents', 'ready', 'onClick', 'propsMemLevel', 'renderId', 'render', 'update', 'changeTheme', 'onChange', 'clickBind', 'keyDownBind', 'keyUpBind'];
class BaseComponent {
  id = 'none';
  domRoot = null;
  rootStyle = {};
  subComponents = [];
  constructor(arg) {
    setTimeout(() => {
      this.checkProps(arg);
    }, 1);
  }
  checkProps(arg) {
    for (let key in this) {
      if (testKeys.indexOf(key) === -1) {
        this.getPropById(key);
      }
    }
    this.ready();
  }
  ready() {
    console.log(`${this.id} is ready.`);
  }
  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      // console.info('Arg is string!');
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
      this.id = arg.id;
      this.text = arg.text || '';
      this.type = arg.type;
      this.value = arg.value || '';
    }
    if (rootStyle) {
      this.rootStyle = rootStyle;
    } else {
      this.rootStyle = "";
    }
  }
  set(arg, newValue, extraData) {
    let root = this;
    root[arg] = newValue;
    this.update(root, arg, extraData);
  }
  setPropById(id, nv, level) {
    // id from parent and id is props key/name
    let name = this.id + '-' + id;
    if (typeof level == 'undefined') {
      let level = 0;
    }
    if (level == 0) {
      // Do nothing
    } else if (level == 1 || level == 'session') {
      // save it in session storage
      _utils.LocalSessionMemory.save(name, nv);
    } else if (level == 2 || level == 'local') {
      _utils.LocalStorageMemory.save(name, nv);
    }
    // No need to have DOM ID reference 
    if ((0, _utils.getComp)(id)) (0, _utils.getComp)(id).innerText = nv;
    if (typeof this[id] !== 'undefined') {
      this[id] = nv;
    }
  }
  getPropById(id) {
    let name = this.id + '-' + id;
    // console.log(
    //   `%c Safir TEST id='${id}' '${name}' > . %c ☑ [any-props]`,
    //   colorLog1, colorLog2
    // );

    let testSessionLevel = _utils.LocalSessionMemory.load(name);
    if (testSessionLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if ((0, _utils.getComp)(id)) {
        console.log(`%c Safir found dom element with id='${id}' innerText='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
        (0, _utils.getComp)(id).innerText = testSessionLevel;
      }
      if ((0, _utils.getComp)(this.id + '-' + id)) {
        if ((0, _utils.getComp)(name).localName == 'input' || (0, _utils.getComp)(name).nodeName == 'INPUT') {
          console.log(`%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testSessionLevel;
        } else {
          console.log(`%c Safir found tag <${(0, _utils.getComp)(name).localName} id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testSessionLevel;
        }
      }
      if (typeof this[id] !== 'undefined' && this[id] != testSessionLevel) {
        this[id] = testSessionLevel;
        console.log(`%c Safir set class prop ${id}  ${this[id]} vs ${testSessionLevel} %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
      }
    }
    let testLocalLevel = _utils.LocalStorageMemory.load(name);
    if (testLocalLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if ((0, _utils.getComp)(id)) {
        console.log(`%c Safir found dom element with id='${id}' innerText='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
        (0, _utils.getComp)(id).innerText = testLocalLevel;
      }
      if ((0, _utils.getComp)(this.id + '-' + id)) {
        if ((0, _utils.getComp)(name).localName == 'input' || (0, _utils.getComp)(name).nodeName == 'INPUT') {
          console.log(`%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testLocalLevel;
        } else {
          console.log(`%c Safir found tag <${(0, _utils.getComp)(name).localName} id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testLocalLevel;
        }
      }
      if (typeof this[id] !== 'undefined' && this[id] != testLocalLevel) {
        this[id] = testLocalLevel;
        console.log(`%c Safir set class prop this.${this[id]} vs ${testLocalLevel} %c ☑ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
      }
    }
  }
  renderId = () => `
    <div id="${this.id}" class="${this.rootStyle}">
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
        console.info('already new theme!');
        (0, _utils.getComp)('app').classList = 'app fill';
        (0, _utils.getComp)('app')?.classList.add(newTheme);
      }
    } else {
      if (!(0, _utils.getComp)('app')?.classList.contains('theme-light') && !(0, _utils.getComp)('app')?.classList.contains('theme-dark')) {
        (0, _utils.getComp)('app').classList = 'app fill';
        (0, _utils.getComp)('app')?.classList.add('theme-dark');
        return;
      }
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
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
  keyDownBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
  keyUpBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
}
exports.BaseComponent = BaseComponent;

},{"./utils":11}],8:[function(require,module,exports){
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

},{"../style/base":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.On = exports.Off = exports.GetAllEvents = void 0;
window.On = window.addEventListener;
window.Off = window.removeEventListener;
window.GetAllEvents = [];
const On = window.On;
exports.On = On;
const Off = window.Off;
exports.Off = Off;
const GetAllEvents = window.GetAllEvents;
exports.GetAllEvents = GetAllEvents;

},{}],10:[function(require,module,exports){
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

  T = {};
  emitML = async (r, path) => {
    let x = null;
    if (path) {
      x = await r.loadMultilang(path);
    } else {
      x = await r.loadMultilang();
    }

    // Internal exspose to the global obj
    this.T = x;
    exports.T = T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  translate = {
    update: function () {
      var allTranDoms = document.querySelectorAll('[data-label]');
      console.log(allTranDoms);
      allTranDoms.forEach(i => {
        i.innerHTML = T[i.getAttribute('data-label')];
      });
    }
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    console.info("Multilang: ", path);
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
  };
}
class Safir extends BaseSafir {
  subComponents;
  appRoot;
  constructor() {
    super();
    this.listeners = [];
    this.subComponents = [];
    this.appRoot = (0, _utils.getComp)("app");
    this.construct();
    return this;
  }
  ready = () => {
    console.log(`%c App root component is ready ♻. %c 🤘 [safir rocks]`, _utils.colorLog1, _utils.colorLog2);
  };
  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    console.info("Multilang integrated wwith component root.");
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
    if (rootStyle && rootStyle.indexOf(' ') !== -1) {
      let classes = rootStyle.split(' ');
      classes.forEach(c => {
        if (rootStyle) x.classList.add(c);
      });
    } else {
      if (rootStyle) x.classList.add(rootStyle);
    }
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    // arg.ready();
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

},{"./custom-com":8,"./modifier":9,"./utils":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorLog2 = exports.colorLog1 = exports.byTag = exports.byID = exports.byClass = exports.Manager = exports.LocalStorageMemory = exports.LocalSessionMemory = exports.JSON_HEADER = void 0;
exports.degToRad = degToRad;
exports.getComp = exports.emit = void 0;
exports.isMobile = isMobile;
exports.loadImage = loadImage;
exports.radToDeg = radToDeg;
exports.urlVar = void 0;
/**
 * Top priory!
 */
let listeners = [];
const oDoc = window.addEventListener;
window.addEventListener = function (type, listener, options) {
  listeners.push({
    element: this,
    type,
    listener,
    options
  });
  if (typeof app.listeners !== 'undefined' && app.listeners.length == 0) {
    console.log('app.listeners once');
    app.listeners = listeners;
  }
  return oDoc.call(this, type, listener, options);
};

/**
 * @description
 * List of always usefull functions.
 * - Manager - Load script in runtime.
 * - degToRad/radToDeg
 * - getComp
 * - isMobile
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
let urlVar = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();
exports.urlVar = urlVar;
const getComp = function (id) {
  return document.getElementById(id);
};
exports.getComp = getComp;
const byClass = function (id) {
  return document.getElementsByClassName(id);
};
exports.byClass = byClass;
const byTag = function (id) {
  return document.getElementsByTagName(id);
};
exports.byTag = byTag;
const byID = function (id) {
  return document.getElementById(id);
};
exports.byID = byID;
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
;
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
function loadImage(url, onload) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function (e) {
    onload();
  };
  return img;
}
;

/**
 * LocalStorageMemory save and load js objects in localStorage.
 */
let LocalStorageMemory = {
  localStorage: window.localStorage,
  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of localstorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro localStorage.
   */
  save: function (name, obj) {
    try {
      return localStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalStorageMemory class , method save!");
      return false;
    }
  },
  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of localstorage key
   * @return {false | object} What ever we are stored intro localStorage.
   */
  load: function (name) {
    if (localStorage.getItem(name) === "undefined" || localStorage.getItem(name) == null || localStorage.getItem(name) === "") {
      // console.warn("LocalStorageMemory method load return's: ", localStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(localStorage.getItem(name));
    }
  }
};

/**
 * LocalSessionMemory save and load js objects in localStorage.
 */
exports.LocalStorageMemory = LocalStorageMemory;
let LocalSessionMemory = {
  sessionStorage: window.sessionStorage,
  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of sessionStorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  save: function (name, obj) {
    try {
      return sessionStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalSessionMemory class , method save!");
      return false;
    }
  },
  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of sessionStorage key
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  load: function (name) {
    if (sessionStorage.getItem(name) === "undefined" || sessionStorage.getItem(name) == null || sessionStorage.getItem(name) === "") {
      // console.warn("LocalSessionMemory method load return's: ", sessionStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(sessionStorage.getItem(name));
    }
  }
};
exports.LocalSessionMemory = LocalSessionMemory;
const colorLog1 = "color: #66ffff; font-size:14px;text-shadow: 0px 0px 51px #111222, 1px 1px 1px #aaa66a;";
exports.colorLog1 = colorLog1;
const colorLog2 = "color: #ffff66; font-size:12px;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;";
exports.colorLog2 = colorLog2;
const JSON_HEADER = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
exports.JSON_HEADER = JSON_HEADER;
const emit = (en, d) => {
  if (typeof d == 'undefined') d = {};
  let e = new CustomEvent(en, {
    detail: d
  });
  dispatchEvent(e);
};
exports.emit = emit;

},{}],12:[function(require,module,exports){
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

},{}]},{},[2]);
