import { IDestroyerComponent } from "../types/global";
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
    }
    if (typeof arg === 'object') {
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
    // console.info("props " + (root as any)[arg] + " test 'on-' + arg " + 'on-' + arg);
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
      }
    }));
    console.info("Update/Emited Comp:", this.id);
  }

}

