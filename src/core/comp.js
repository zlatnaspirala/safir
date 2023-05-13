import {LocalSessionMemory, LocalStorageMemory, colorLog1, colorLog2, getComp} from "./utils";

let testKeys =
  ['id', 'domRoot', 'text', 'rootStyle', 'subComponents', 'ready', 'onClick',
    'propsMemLevel', 'renderId', 'render', 'update', 'changeTheme', 'onChange',
    'clickBind', 'keyDownBind', 'keyUpBind'];

export class BaseComponent {

  id = 'none';
  domRoot = null;
  rootStyle = {};
  subComponents = [];

  constructor(arg) {
    setTimeout(() => {this.checkProps(arg)}, 1)
  }

  checkProps(arg) {
    for(let key in this) {
      if(testKeys.indexOf(key) === -1) {
        this.getPropById(key)
      }
    }
    this.ready();
  };

  ready() {console.log(`${this.id} is ready.`)}

  initial(arg, rootStyle) {
    if(typeof arg === 'string') {
      // console.info('Arg is string!');
      this.text = arg;
      this.id = arg;
    } else if(typeof arg === 'object') {
      this.id = arg.id;
      this.text = arg.text || '';
      this.type = arg.type;
      this.value = arg.value || '';
    }
    if(rootStyle) {
      this.rootStyle = rootStyle;
    } else {
      this.rootStyle = "";
    }
  }

  set(arg, newValue, extraData) {
    let root = this;
    (root)[arg] = newValue;
    this.update(root, arg, extraData);
  }

  setPropById(id, nv, level) {
    // id from parent and id is props key/name
    let name = this.id + '-' + id;
    if(typeof level == 'undefined') {let level = 0;}
    if(level == 0) {
      // Do nothing
    } else if(level == 1 || level == 'session') {
      // save it in session storage
      LocalSessionMemory.save(name, nv);
    } else if(level == 2 || level == 'local') {
      LocalStorageMemory.save(name, nv);
    }
    // No need to have DOM ID reference 
    if(getComp(id)) getComp(id).innerText = nv;
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

    let testSessionLevel = LocalSessionMemory.load(name);
    if(testSessionLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if(getComp(id)) {
        console.log(
          `%c Safir found dom element with id='${id}' innerText='${testSessionLevel}' > . %c ☑ [session-props]`,
          colorLog1, colorLog2
        );
        getComp(id).innerText = testSessionLevel;
      }
      if(getComp(this.id + '-' + id)) {
        if(getComp(name).localName == 'input' || getComp(name).nodeName == 'INPUT') {
          console.log(
            `%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`,
            colorLog1, colorLog2
          );
          getComp(this.id + '-' + id).value = testSessionLevel;
        } else {
          console.log(
            `%c Safir found tag <${getComp(name).localName} id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`,
            colorLog1, colorLog2
          );
          getComp(this.id + '-' + id).value = testSessionLevel;
        }

      }

      if(typeof this[id] !== 'undefined' && this[id] != testSessionLevel) {
        this[id] = testSessionLevel;
        console.log(
          `%c Safir set class prop ${id}  ${this[id]} vs ${testSessionLevel} %c ☑ [session-props]`,
          colorLog1, colorLog2
        );
      }
    }

    let testLocalLevel = LocalStorageMemory.load(name);
    if(testLocalLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if(getComp(id)) {
        console.log(
          `%c Safir found dom element with id='${id}' innerText='${testLocalLevel}' > . %c ✔ [storage-props]`,
          colorLog1, colorLog2
        );
        getComp(id).innerText = testLocalLevel;
      }

      if(getComp(this.id + '-' + id)) {
        if(getComp(name).localName == 'input' || getComp(name).nodeName == 'INPUT') {
          console.log(
            `%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`,
            colorLog1, colorLog2
          );
          getComp(this.id + '-' + id).value = testLocalLevel;
        } else {
          console.log(
            `%c Safir found tag <${getComp(name).localName} id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`,
            colorLog1, colorLog2
          );
          getComp(this.id + '-' + id).value = testLocalLevel;
        }
      }
     
      if(typeof this[id] !== 'undefined' && this[id] != testLocalLevel) {
        this[id] = testLocalLevel;
        console.log(
          `%c Safir set class prop this.${this[id]} vs ${testLocalLevel} %c ☑ [storage-props]`,
          colorLog1, colorLog2
        );
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
    getComp(root.id).innerHTML = this.render();
    if(extraData?.emit === false) {
      console.info("Update Comp:", this.id);
      return;
    }
    // Emiter
    dispatchEvent(new CustomEvent('on-' + arg, {
      bubbles: true,
      detail: {
        emitter: root.id,
        arg: arg,
        newValue: (root)[arg]
      }
    }));
    console.info("Update/Emited Comp:", this.id);
  }

  changeTheme = (newTheme) => {
    if(newTheme) {
      if(getComp('app')?.classList.contains(newTheme)) {
        console.info('already containe theme!');
      } else {
        console.info('already new theme!');
        getComp('app').classList = 'app fill';
        getComp('app')?.classList.add(newTheme);
      }
    } else {
      if(!getComp('app')?.classList.contains('theme-light') && !getComp('app')?.classList.contains('theme-dark')) { 
        getComp('app').classList = 'app fill';
        getComp('app')?.classList.add('theme-dark');
        return;
      }

      if(getComp('app')?.classList.contains('theme-light')) {
        console.info('Change theme !');
        getComp('app')?.classList.remove('theme-light');
        getComp('app')?.classList.add('theme-dark');
      } else if(getComp('app')?.classList.contains('theme-dark')) {
        console.info('Change theme !');
        getComp('app')?.classList.remove('theme-dark');
        getComp('app')?.classList.add('theme-light');
      }
    }
  };

  clickBind = (a) => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'clickBind',
        for: a,
        target: this,
        value: this.value
      },
    });
    dispatchEvent(onClickEvent);
  };

  keyDownBind = (a) => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      },
    });
    dispatchEvent(onClickEvent);
  };

  keyUpBind = (a) => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      },
    });
    dispatchEvent(onClickEvent);
  };

}
