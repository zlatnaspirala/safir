import { getComp } from "./utils";

export class BaseComponent {

  id= 'none';
  domRoot= null;
  text= '';
  rootStyle = {};
  subComponents = [];

  constructor(arg) {}

  ready() { console.log(`${this.id} is ready.`) }

  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      console.warn('Arg is string!');
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
       // console.warn('Arg is object! this.id  ', arg.id );
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

    this.ready();
  }

  set(arg, newValue, extraData) {
    // const local = 'data-' + arg;
    // console.log('test id ', this.id);
    // const localRoot = getComp(this.id);
    // // Double care!
    // localRoot.setAttribute(local, newValue);
    // localStorage.setItem(arg, newValue);
    let root = this;
    (root)[arg] = newValue;
    this.update(root, arg, extraData);
  }

  setPropById (id, nv, level) {
    // console.log('TEST getComp(id) ', getComp(id))
    if (typeof level == 'undefined') { let level = 0; }

    if (level == 0) {
      //
    } else if (level == 1 || level == 'session') {
      // save it in session storage
      sessionStorage.setItem(id, nv);
    } else if (level == 2 || level == 'local') {

    }

    getComp(id).innerText = nv;
  }

  renderId = () => `
    <div id="${this.id}" class="${this.rootStyle}">
      ${this.render()}
    </div>
  `;

  render = () => ``;

  update = (root, arg, extraData) => {
    getComp(root.id).innerHTML = this.render();
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
        newValue: (root )[arg]
      }
    }));
    console.info("Update/Emited Comp:", this.id);
  }

  changeTheme = (newTheme) => {
    if (newTheme) {
      if (getComp('app')?.classList.contains(newTheme)) {
        console.info('already containe theme!');
      } else {
        getComp('app')?.classList.remove('theme-light');
        getComp('app')?.classList.remove('theme-dark');
        getComp('app')?.classList.add(newTheme);
      }
    } else {
      if (getComp('app')?.classList.contains('theme-light')) {
        console.info('Change theme !');
        getComp('app')?.classList.remove('theme-light');
        getComp('app')?.classList.add('theme-dark');
      } else if (getComp('app')?.classList.contains('theme-dark')) {
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
