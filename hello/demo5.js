
import { Safir, On } from "../index";
import RocketCraftingLayout from "./layouts/rocket-crafting-account";

let app = new Safir();

On("app.ready", () => {
  let p = app.loadComponent(new RocketCraftingLayout(), 'bg-transparent');
  console.info("Application running demo4 [ready] => ", p);

  document.body.classList.add('funnyBg1')
});
