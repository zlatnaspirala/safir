
import { Safir, On } from "../index";
import MyHeader from "./layouts/heder";
import Layout from "./layouts/body";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myHeader = app.loadComponent(new MyHeader('my-header'));
  let myLayout = app.loadComponent(new Layout('my-layout'));
  console.info("Application running [ready]...", Date.now());

  app.translate.update()
});

console.info("Application running [sync]...", Date.now());
window.app = app;