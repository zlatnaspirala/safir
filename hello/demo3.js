
import { Safir, On } from "../index";
import TestInputBody from "./layouts/body-input";

let app  = new Safir();

On("app.ready", () => {
  let p = app.loadComponent(new TestInputBody(), 'h95');
  console.info("Application running demo3 [ready]...", Date.now());
});
