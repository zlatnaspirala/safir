
import { Safir, On } from "../index";
import { SafirSlot } from "./layouts/safir-slot";

let app = new Safir();


On("app.ready", () => {
  window.NIK = app.loadComponent(new SafirSlot({id : 'bla'}), 'bg-transparent');
  document.body.classList.add('funnyBg2')
});
