
import { Safir, On, byID } from "../index";
import { SafirSlot } from "./layouts/safir-slot";

/**
 * @note Exspose vars on window only for dev stage.
 */
let app = new Safir();
window.App = app;

On("app.ready", () => {

  window.safirSlot1 = app.loadComponent(
    new SafirSlot({id : 'SafirSlot1', rootDom: 'SafirSlot1'}),
  'middle mySlot');

  window.safirSlot2 = app.loadComponent(
    new SafirSlot({id : 'SafirSlot2', rootDom: 'SafirSlot2', editBtns: true }),
  'middle mySlot')

  // Make it fancy!
  safirSlot1.setSlotClass('funnyBg2');
  // Make smooth effect with delay
  setTimeout(()=> {
    safirSlot2.setSlotClass('funnyBg2');
  },1500);

  document.body.classList.add('funnyBg2');

});
