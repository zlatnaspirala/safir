
import { Safir, On } from "safir";
import TicTacToe from "./layouts/body-tictactoe";

let app = new Safir();

On("app.ready", () => {
  let p = app.loadComponent(new TicTacToe(), 'bg-transparent');
  console.info("Application running demo4 [ready] => ", p);

  document.body.classList.add('funnyBg1')
});
