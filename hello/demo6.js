
import { Safir, On, byID } from "../index";
import { SafirSlot } from "./layouts/safir-slot";

let app = new Safir();
window.App = app;

On("app.ready", () => {

  window.safirSlot1 = app.loadComponent(
    new SafirSlot({id : 'SafirSlot1', rootDom: 'SafirSlot1'}),
  'middle mySlot');

  window.safirSlot2 = app.loadComponent(
    new SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2', editBtns: true }),
  'middle mySlot');

  document.body.classList.add('funnyBg2');

});
