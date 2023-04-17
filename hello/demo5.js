
import { Safir, On } from "../index";
import RocketCraftingLayout from "./layouts/rocket-crafting-account";

let app = new Safir();

On("app.ready", () => {
  app.loadComponent(new RocketCraftingLayout(), 'bg-transparent');
  document.body.classList.add('funnyBg2')
});
