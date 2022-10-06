
import { Destroyer, On } from "../../index";
import MyHeader from "./layouts/heder";
import Layout from "./layouts/body";

let app  = new Destroyer();
app.loadVanillaComp("vanilla-components/footer.html");
// (window as any).app = app;

On("app.ready", () => {
  let myHeader = app.loadComponent(new MyHeader('my-header'));
  let myLayout = app.loadComponent(new Layout('my-layout'));
  console.info("Application running [ready]...", Date.now());
});

console.info("Application running [sync]...", Date.now());