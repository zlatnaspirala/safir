import { IDestroyerComponent, IOnEventDetail } from "../types/global";
import { On } from "./modifier";
import { Manager, getComp } from "./utils";

export class BaseComponent implements IDestroyerComponent{

  public id: string = 'none';
  public dom: HTMLElement | null = null;
  public text: string = '';
  public rootStyle: object = {};
  constructor(arg: any) {}

  ready() {
    console.log('ready comp');
  }

  initial(arg: any, rootStyle?: any) {
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

  set(arg: string, newValue: any, extraData?: object | any) {
    const local = 'data-' + arg;
    const localRoot = getComp(this.id) as HTMLElement;
    // Double care!
    localRoot.setAttribute(local, newValue);
    let root = this;
    (root as any)[arg] = newValue;
    this.update(root, arg, extraData);
  }

  render = () => ``;

  update = (root: any, arg: string, extraData?: any) => {
    getComp(root.id)!.innerHTML = this.render();
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
        newValue: (root as any)[arg]
      } as IOnEventDetail
    }));
    console.info("Update/Emited Comp:", this.id);
  }

  changeTheme = (newTheme?: string | any) => {
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

  clickBind = (a?: any) => {
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

