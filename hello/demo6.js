
import { Safir, On } from "../index";
import { SafirSlot } from "./layouts/safir-slot";

let app = new Safir();


On("app.ready", () => {
  window.NIK1 = app.loadComponent(new SafirSlot({id : 'SafirSlot', rootDom: 'numAnimHolder'}), 'middle mySlot');

  window.NIK2 = app.loadComponent(new SafirSlot({id : 'SafirSlot2', rootDom: 'numAnimHolder2'}), 'middle mySlot');

  document.body.classList.add('funnyBg2')
});
