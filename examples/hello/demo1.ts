
import { PopularDestroyer } from "../../index";
import myHeader from "./components/heder";
import Layout from "./components/layout";

let app  = new PopularDestroyer();
(window as any).app = app;

let myHeder = app.loadComponent(new myHeader('my-header'));

let myLayout = app.loadComponent(new Layout('my-layout'));

let myFooterVanilla = app.loadVanillaComp("/examples/hello/vanilla-components/footer.html");

console.log("Vanilla component : ", myFooterVanilla);
(window as any).app = app;
