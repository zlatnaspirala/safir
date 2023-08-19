/**
 * @description
 * Main safir classes.
 * Test project structure.
 */
import {Vertical, Horizontal} from "./custom-com";
import {Manager, colorLog1, colorLog2, getComp} from "./utils";
import {On} from "./modifier";
export {getComp} from "./utils";

export let T = {};

/**
 * @description
 * Main Base Safir class.
 */
class BaseSafir {

  /**
   * @description
   * Multi language system is already deep integrated like common feature
   * in developing apps proccess.
   */
  emitML = async function(r) {
    const x = await r.loadMultilang();
    // Internal exspose to the global obj
    T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  }

  translate = {
    update: function() {
      var allTranDoms = document.querySelectorAll('[data-label]');
      console.log(allTranDoms)
      allTranDoms.forEach((i) => {
      i.innerHTML = T[i.getAttribute('data-label')]
      })
    }
  };

  loadMultilang = async function(path = 'assets/multilang/en.json') {
    console.info("Multilang integrated component... ");
    try {
      const r = await fetch(path, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await r.json();
    } catch(err) {
      console.warn('Not possible to access multilang json asset! Err => ', err);
      return {};
    }
  };

}

export class Safir extends BaseSafir {

  subComponents;
  appRoot;

  constructor() {
    super();

    this.listeners = []
    const originalDoc = window.addEventListener
    window.addEventListener = function(type, listener, options) {
      this.listeners.push({
        element: this,
        type,
        listener,
        options
      })
      return originalDoc.call(this, type, listener, options)
    }

    this.subComponents = [];
    this.appRoot = getComp("app");
    this.construct();
    return this;
  }

  ready = () => {
    console.log(
      `%c App root component is ready ♻. %c 🤘 [safir rocks]`,
      colorLog1, colorLog2
    );
  };

  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    console.info("Multilang integrated wwith component root.");
    window.customElements.define('ver-box', Vertical);
    window.customElements.define('hor-box', Horizontal);
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
    if(rootStyle && rootStyle.indexOf(' ') !== -1) {
      let classes = rootStyle.split(' ');
      classes.forEach(c => {
        if(rootStyle) x.classList.add(c);
      });
    } else {
      if(rootStyle) x.classList.add(rootStyle);
    }
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    // arg.ready();
    return arg;
  };

  loadVanillaComp(arg) {
    fetch(arg, {})
      .then(res => {
        return res.text();
      })
      .then(html => {
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
