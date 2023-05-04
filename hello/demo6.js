
import { Safir, On } from "../index";
import { SafirSlot } from "./layouts/safir-slot";

let app = new Safir();

window.App = app;

On("app.ready", () => {
  window.NIK1 = app.loadComponent(new SafirSlot({id : 'SafirSlot1', rootDom: 'SafirSlot1'}), 'middle mySlot');
  window.NIK2 = app.loadComponent(new SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2'}), 'middle mySlot');
  document.body.classList.add('funnyBg2');
});
