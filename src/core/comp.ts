/**
 * @description
 * Test project structure
 */


 export class Component {

  private subComponents: Array<any>;
  private domRoot: HTMLElement | null;

  constructor(name: string) {
    this.subComponents = [];
    this.domRoot = document.getElementById("app");
    this.construct();
  }

  info: () => void = () => {
    console.log("Test popular killer.");
  };

  construct = () => {

    // let tag = "div";
    // let html = `<${tag}> BLA BLA </${tag}>`;
    // this.domRoot!.innerHTML = html;
  };

  render = () => {

  }

}

// App instance
console.info("popularDestroyer instance");
