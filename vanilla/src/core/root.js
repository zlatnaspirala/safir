/**
 * @description
 * Test project structure
 */

import {myBase} from "./custom-com";
import {Manager, getComp} from "./utils";
import {On} from "./modifier";
export {getComp} from "./utils";
export let T = {};

class BaseDestroyer {

  emitML = async function (r) {
    const x = await r.loadMultilang();
    T = x;
    // internal exspose to the global obj
    // Better then injecting intro every sub comp!
    dispatchEvent(new CustomEvent('app.ready', { detail: {
      info: 'app.ready'
    }}));
  }

  loadMultilang = async function(path = 'assets/multilang/en.json') {
    console.info("Multilang integrated component... ");
    // Predefined path ../assets
    const r = await fetch(path, { headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }});
    return await r.json();
  };

}

export class Smaragd extends BaseDestroyer {
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
    this.appRoot = getComp("app");
    this.construct();
  }

  ready = () => {
    // console.info("App root component is ready.");
  };

  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    // console.info("Multilang integrated component.ROOT. ", this.l);
    window.customElements.define('my-box', myBase);
    this.ready();
  };

  loadComponent = (arg) => {
    let x = document.createElement('div');
    // x.setAttribute("id", arg.id);
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    arg.ready();
    return arg;
  };

  loadVanillaComp(arg) {
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
        this.appRoot.innerHTML += htmlContent;
        document.body.appendChild(myScript);
        return true;
      });
  }



}
