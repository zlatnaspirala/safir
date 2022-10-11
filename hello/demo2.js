
import { Safir, On } from "../index";
import VerBox from "./components/ver-box";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myBoxComp = app.loadComponent(new VerBox('my-box-custom'));
  console.info("Application running demo2 [ready]...", Date.now());
});

On("mybox-button1", (r) => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
});
