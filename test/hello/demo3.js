
import { Safir, On } from "safir";
import TestInputBody from "./layouts/body-input";

let app  = new Safir();

On("app.ready", () => {
  let p = app.loadComponent(new TestInputBody(), 'myScroll');
  console.info("Application running demo3 [npm service]...", Date.now());
});
