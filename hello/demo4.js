
import { Safir, On } from "../index";
import VerHorBox from "./components/ver-hor";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myBoxComp = app.loadComponent(new VerHorBox('ver-hor'));
  console.info("Application running demo2 [ready]...", Date.now());
});

On("mybox-button1", (r) => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
});
