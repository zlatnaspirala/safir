import { On } from "./modifier";
import { Manager, getComp } from "./utils";

export class BaseComponent {

  id= 'none';
  dom= null;
  text= '';
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
    const localRoot = getComp(this.id);
    // Double care!
    localRoot.setAttribute(local, newValue);
    let root = this;
    (root )[arg] = newValue;
    this.update(root, arg, extraData);
  }

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
        target: a
      },
    });
    dispatchEvent(onClickEvent);
  };

}

