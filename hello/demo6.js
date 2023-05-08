
import { Safir, On, byID } from "../index";
import { SafirSlot } from "./layouts/safir-slot";
import SlotLayout from "./layouts/slot-body";

/**
 * @note Exspose vars on window only for dev stage.
 */
let app = new Safir();
window.App = app;

window.slotLayout = app.loadComponent(
  new SlotLayout({id : 'SlotExamples' }),
'middleScroll');


On("app.ready", () => {

  App.translate.update();
  App.subComponents[0].safirSlot1.setSlotClass('funnyBg2');
  App.subComponents[0].safirSlot1.setSum(123,45);

  // Make it fancy!
  setTimeout(()=> {
    App.subComponents[0].safirSlot2.setSlotClass('funnyBg2');
  },1000);

  document.body.classList.add('funnyBg2');

});
