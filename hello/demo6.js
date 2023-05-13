
import { Safir, On, byID } from "../index";
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
  App.subComponents[0].safirSlot1.setSlotColor('orangered');
  App.subComponents[0].safirSlot3.setSlotClass('funnyBg2');
  App.subComponents[0].safirSlot1.setSum(123,45);

  // App.subComponents[0].safirSlot4.
  // byID('safirSlot1-holder').classList.remove('numAnimHolder')
  // byID('safirSlot1-holder').classList.add('numAnimHolderFit')
  document.body.classList.add('funnyBg1');

});
