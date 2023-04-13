import { BaseComponent, On, getComp } from "../../index";
import {LocalSessionMemory, LocalStorageMemory} from "../../src/core/utils";
import TicTacToeField from "../components/tttField";

export default class TicTacToe extends BaseComponent {

  id = 'TicTacToe';
  ticTacToeField00 = new TicTacToeField({ text: 'F00', id: 'F00'}, 'tttField');
  ticTacToeField10 = new TicTacToeField({ text: 'F10', id: 'F10'}, 'tttField');
  ticTacToeField20 = new TicTacToeField({ text: 'F20', id: 'F20'}, 'tttField');

  ticTacToeField01 = new TicTacToeField({ text: 'F01', id: 'F01'}, 'tttField');
  ticTacToeField11 = new TicTacToeField({ text: 'F11', id: 'F11'}, 'tttField');
  ticTacToeField21 = new TicTacToeField({ text: 'F21', id: 'F21'}, 'tttField');

  ticTacToeField02 = new TicTacToeField({ text: 'F02', id: 'F02'}, 'tttField');
  ticTacToeField12 = new TicTacToeField({ text: 'F12', id: 'F12'}, 'tttField');
  ticTacToeField22 = new TicTacToeField({ text: 'F22', id: 'F22'}, 'tttField');

  currentPlayer = 'X';

  ready = () => {}

  shema = ['F00', 'F01', 'F02',
           'F10', 'F11', 'F12',
           'F20', 'F21', 'F22']

  getPlayer = function() {
    if (this.currentPlayer == 'X') {
      this.currentPlayer = 'Y';
      return 'X';
    } else {
      this.currentPlayer = 'X';
      return 'Y';
    }
  }

  checkGameRole = function() {
    console.log('TEST this.ticTacToeField00', this.ticTacToeField00.text);
  }

  constructor(arg) {
    super(arg);

    this.shema.forEach((item) => {
      On(item, (r) => {
        console.info('My input F00 value: ' , r.detail );
        let player = this.getPlayer();
        this.ticTacToeField00.setPropById(item + '-field', player, 1);
        this.ticTacToeField00.text = player;

        this.checkGameRole();
      });
    })
  }

  render = () => `
    <h1 class="middle">Safir AI - TicTacToe -</h1>
    <div class="horCenter column">
      <div class="tttField row" >
        ${this.ticTacToeField00.renderId()}
        ${this.ticTacToeField10.renderId()}
        ${this.ticTacToeField20.renderId()}
      </div>
      <div class="tttField row" >
        ${this.ticTacToeField01.renderId()}
        ${this.ticTacToeField11.renderId()}
        ${this.ticTacToeField21.renderId()}
      </div>
      <div class="tttField row" >
        ${this.ticTacToeField02.renderId()}
        ${this.ticTacToeField12.renderId()}
        ${this.ticTacToeField22.renderId()}
      </div>
    </div>
  `
}