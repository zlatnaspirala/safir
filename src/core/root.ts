/**
 * @description
 * Test project structure
 */
import { myBase } from "./custom-com";
//import "@webcomponents/webcomponentsjs/webcomponents-bundle";
//import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

export class PopularDestroyer {

  private subComponents: Array<any>;
  private appRoot: HTMLElement | null;

  constructor() {
    this.subComponents = [];
    this.appRoot = document.getElementById("app");
    this.construct();
  }

  info: () => void = () => {
    console.log("Test popular killer.");
  };

  construct = () => {
    console.log("Test popular killer component.");

    console.log("register popular killer component. ");
    window.customElements.define('my-box', myBase);

    // let tag = "div";
    // let html = `<${tag}> BLA BLA </${tag}>`;
    // this.appRoot!.innerHTML = html;
    
  };

  regComponent = (arg: any)=> {
    let x = document.createElement("my-box");
    x.setAttribute("id", arg.id)
    this.appRoot?.appendChild(x);
  }

  loadComponent = (arg: any) => {
    let x = document.createElement("div");
    x.setAttribute("id", arg.id)
    x.innerHTML = arg.render();
    this.appRoot?.appendChild(x)
  };

}

// App instance
console.info("popularDestroyer instance");
