
import { Safir, On } from "../index";
import HorBox from "./components/hor-box";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myBoxComp = app.loadComponent(new HorBox('hor-box-custom'));
  console.info("Application running demo2 [ready]...", Date.now());
});

On("mybox-button1", (r) => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
});
