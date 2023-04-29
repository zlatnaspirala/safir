
import { Safir, On } from "safir";
import RocketCraftingLayout from "./layouts/rocket-crafting-account";

let app = new Safir();

On("app.ready", () => {

  /**
   * @description
   * If you put http://localhost then you 
   * need to run rocketCreftingServer on local mashine.
   * You can use also `http://maximumroulette.com`
   */
  let apiDomain = 'https://maximumroulette.com';
  // let apiDomain = 'http://localhost';
  app.loadComponent(new RocketCraftingLayout(apiDomain), 'bg-transparent');

  document.body.classList.add('funnyBg2');

});


window.app = app;
