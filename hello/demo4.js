
import { Safir, On } from "../index";
import TicTacToe from "./layouts/body-tictactoe";

let app = new Safir();

On("app.ready", () => {
  let p = app.loadComponent(new TicTacToe(), '');
  console.info("Application running demo4 [ready] => ", p);
});
