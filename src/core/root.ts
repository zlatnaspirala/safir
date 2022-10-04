/**
 * @description
 * Test project structure
 */

import {myBase} from "./custom-com";
import {Manager, getComp} from "./utils";
export {IDestroyerComponent} from "../types/global";

export class PopularDestroyer {
  private subComponents: Array<any>;
  private appRoot: HTMLElement | null;

  constructor() {
    this.subComponents = [];
    this.appRoot = getComp("app");
    this.construct();
  }

  ready: () => void = () => {
    console.log("App root component is ready.");
  };

  construct = () => {
    console.log("Register component... ");
    window.customElements.define("my-box", myBase);
    this.ready();
  };

  loadComponent = (arg: any) => {
    let x = document.createElement("div");
    // x.setAttribute("id", arg.id);
    // this.appRoot?.appendChild(x);
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    arg.ready();
    this.subComponents.push(arg);
    return arg;
  };

  loadVanillaComp(arg: any) {
    fetch(arg, {})
      .then(res => {
        return res.text();
      })
      .then(html => {
        // console.warn(">>>HTML>>>>>>>" + html);
        let test2 = html.split('<script>')[1];
        let htmlContent = html.split('<script>')[0];
        let myScriptContent = test2.split('</script>')[0];
        let myScript = document.createElement('script');
        myScript.innerHTML = myScriptContent;
        // document.body.innerHTML += htmlContent;
        this.appRoot!.innerHTML += htmlContent;
        document.body.appendChild(myScript);
        return "RETURN !";
      });
  }

  changeTheme (newTheme: string | undefined) {
    if (newTheme) {
      if (getComp('app')?.classList.contains(newTheme)) {
        console.info('already containe theme!')
      } else {
        getComp('app')?.classList.remove('theme-light');
        getComp('app')?.classList.remove('theme-dark');
        getComp('app')?.classList.add(newTheme);
      }
    } else {
      if (getComp('app')?.classList.contains('theme-light')) {
        console.info("Change theme !");
        getComp('app')?.classList.remove('theme-light');
        getComp('app')?.classList.add('theme-dark');
      } else if (getComp('app')?.classList.contains('theme-dark')) {
        console.info("Change theme !");
        getComp('app')?.classList.remove('theme-dark');
        getComp('app')?.classList.add('theme-light');
      }
    }

  }

}
