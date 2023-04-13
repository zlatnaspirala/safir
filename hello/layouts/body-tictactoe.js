import {BaseComponent, On, getComp} from "../../index";
import {LocalSessionMemory, LocalStorageMemory} from "../../src/core/utils";
import TTTHistory from "../components/ttt-history";
import TicTacToeField from "../components/tttField";

export default class TicTacToe extends BaseComponent {

  id = 'TicTacToe';
  ticTacToeField00 = new TicTacToeField({text: '-', id: 'F00'}, 'tttField');
  ticTacToeField10 = new TicTacToeField({text: '-', id: 'F10'}, 'tttField');
  ticTacToeField20 = new TicTacToeField({text: '-', id: 'F20'}, 'tttField');

  ticTacToeField01 = new TicTacToeField({text: '-', id: 'F01'}, 'tttField');
  ticTacToeField11 = new TicTacToeField({text: '-', id: 'F11'}, 'tttField');
  ticTacToeField21 = new TicTacToeField({text: '-', id: 'F21'}, 'tttField');

  ticTacToeField02 = new TicTacToeField({text: '-', id: 'F02'}, 'tttField');
  ticTacToeField12 = new TicTacToeField({text: '-', id: 'F12'}, 'tttField');
  ticTacToeField22 = new TicTacToeField({text: '-', id: 'F22'}, 'tttField');

  history = new TTTHistory('H');

  currentPlayer = 'X';

  gameStatus = 'open';

 

  ready = () => {};

  // Avoid literal/eval access, to avoid hardcode use array - for now it is ok.
  shema = [
    {name: 'F00', ref: this.ticTacToeField00}, {name: 'F01', ref: this.ticTacToeField01}, {name: 'F02', ref: this.ticTacToeField02},
    {name: 'F10', ref: this.ticTacToeField10}, {name: 'F11', ref: this.ticTacToeField11}, {name: 'F12', ref: this.ticTacToeField12},
    {name: 'F20', ref: this.ticTacToeField20}, {name: 'F21', ref: this.ticTacToeField21}, {name: 'F22', ref: this.ticTacToeField22}
  ];

  resetGame = function() {
    this.shema.forEach((field)=>{
      field.ref.setPropById(field.name + '-field', '-', 1);
      field.ref.text = '-';
    });
    this.setPropById('gameStatus', 'open', 1);
  }

  getPlayer = function() {
    if(this.currentPlayer == 'X') {
      this.currentPlayer = 'Y';
      return 'X';
    } else {
      this.currentPlayer = 'X';
      return 'Y';
    }
  }

  isPlayed = function(v) {
    return (v == 'X' || v == 'Y' ? true : false)
  };

  onEnd = function(winner){
    // this.gameStatus = 'closed';
    console.info("WINNER : " , this.history.tableData)
    this.history.tableData.push(winner);
    // this.setPropById('history', this.history.map((item, index) =>
    //   `<h2 data-key="${index}" onclick="(${this.onClick})('${this.id}')"
    //        class="middle">` + index + item + `</h2>`
    //   ).join(''), 1);

    this.history.set('tableData', this.history.tableData);


      this.setPropById('gameStatus', 'closed', 1);
    setTimeout( () => { this.resetGame(); } , 4000)
  }

  checkGameRole = function() {
    // hor
    if (this.isPlayed(this.shema[0].ref.text) && this.shema[0].ref.text == this.shema[1].ref.text && this.shema[1].ref.text == this.shema[2].ref.text) {
      console.log('Horizontal 0 winner is ', this.shema[0].ref.text)
      this.onEnd(this.shema[0].ref.text);
    } else if (this.isPlayed(this.shema[3].ref.text) && this.shema[3].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[5].ref.text ) {
      console.log('Horizontal 1 winner is ', this.shema[3].ref.text)
      this.onEnd(this.shema[3].ref.text);
    } else if (this.isPlayed(this.shema[6].ref.text) && this.shema[6].ref.text == this.shema[7].ref.text && this.shema[7].ref.text == this.shema[8].ref.text ) {
      console.log('Horizontal 2 winner is ', this.shema[6].ref.text)
      this.onEnd(this.shema[6].ref.text);
    }
    // Ver
    else if (this.isPlayed(this.shema[0].ref.text) && this.shema[0].ref.text == this.shema[3].ref.text && this.shema[3].ref.text == this.shema[6].ref.text ) {
      console.log('Vertical 0 winner is ', this.shema[0].ref.text)
      this.onEnd(this.shema[0].ref.text);
    }else if (this.isPlayed(this.shema[1].ref.text) && this.shema[1].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[7].ref.text ) {
      console.log('Vertical 1 winner is ', this.shema[1].ref.text)
      this.onEnd(this.shema[1].ref.text);
    }else if (this.isPlayed(this.shema[2].ref.text) && this.shema[2].ref.text == this.shema[5].ref.text && this.shema[5].ref.text == this.shema[8].ref.text ) {
      console.log('Vertical 2 winner is ', this.shema[0].ref.text)
      this.onEnd(this.shema[2].ref.text);
    }


    let isFilled = true;
    this.shema.forEach((field)=>{
      if (field.ref.text == '-') isFilled = false;
    });

    if (isFilled == true) {
      this.onEnd();
    }

  }

  constructor(arg) {
    super(arg);

    // attaching safir listener
    this.shema.forEach((item) => {
      On(item.name, (r) => {
        if (this.gameStatus != 'open') { return; }
        console.info(`My input ${item.name}  value: `, item.ref.text);
        if(item.ref.text != 'X' && item.ref.text != 'Y') {
          let player = this.getPlayer();
          item.ref.setPropById(item.name + '-field', player, 1);
          item.ref.text = player;
          this.checkGameRole();
        }
      });
    })
  }

  render = () => `
    <h1 class="middle">Safir AI - TicTacToe -</h1>
    <div class="horCenter">
      <span class="">Status:</span>
      <span class="" id="gameStatus">${this.gameStatus}</span>
      <span class="" id="history">
        ${ this.history.renderId() }
      </span>
    </div>
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