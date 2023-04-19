import {BaseComponent, On, getComp} from "safir";
import TTTHistory from "../components/ttt-history";
import TicTacToeBtn from "../components/tttBtn";
import TicTacToeField from "../components/tttField";

export default class TicTacToe extends BaseComponent {

  id = 'TicTacToe';

  symbols = {
    x: '❌',
    y: '⭕',
    unset: '💎💎'
  };

  ticTacToeField00 = new TicTacToeField({text: this.symbols.unset, id: 'F00'}, 'tttField');
  ticTacToeField10 = new TicTacToeField({text: this.symbols.unset, id: 'F10'}, 'tttField');
  ticTacToeField20 = new TicTacToeField({text: this.symbols.unset, id: 'F20'}, 'tttField');

  ticTacToeField01 = new TicTacToeField({text: this.symbols.unset, id: 'F01'}, 'tttField');
  ticTacToeField11 = new TicTacToeField({text: this.symbols.unset, id: 'F11'}, 'tttField');
  ticTacToeField21 = new TicTacToeField({text: this.symbols.unset, id: 'F21'}, 'tttField');

  ticTacToeField02 = new TicTacToeField({text: this.symbols.unset, id: 'F02'}, 'tttField');
  ticTacToeField12 = new TicTacToeField({text: this.symbols.unset, id: 'F12'}, 'tttField');
  ticTacToeField22 = new TicTacToeField({text: this.symbols.unset, id: 'F22'}, 'tttField');

  history = new TTTHistory('H', 'bg-transparent');

  currentPlayer = this.symbols.x;
  gameStatus = 'open';

  computer = {
    symbol: '⭕',
    enabled: false
  }

  switchSymbols = () => {}

  playWithAI = new TicTacToeBtn({text: 'Play with Computer', id: 'playWithComputer'}, 'bg-transparent');
  ready = () => {
    setTimeout(() => {
      if(this.gameStatus == 'closed') {
        console.log('gameStatus must be open!')
        this.setPropById('gameStatus', 'open', 1);
      }
    }, 1);
  };

  shema = [
    {name: 'F00', ref: this.ticTacToeField00}, {name: 'F01', ref: this.ticTacToeField01}, {name: 'F02', ref: this.ticTacToeField02},
    {name: 'F10', ref: this.ticTacToeField10}, {name: 'F11', ref: this.ticTacToeField11}, {name: 'F12', ref: this.ticTacToeField12},
    {name: 'F20', ref: this.ticTacToeField20}, {name: 'F21', ref: this.ticTacToeField21}, {name: 'F22', ref: this.ticTacToeField22}
  ];

  resetGame = function() {
    this.shema.forEach((field) => {
      field.ref.setPropById(field.name + '-field', this.symbols.unset, 1);
      field.ref.text = this.symbols.unset;
    });
    this.setPropById('gameStatus', 'open', 1);
    this.currentPlayer = this.symbols.x;
  }

  getPlayer = function() {
    if(this.currentPlayer == this.symbols.x) {
      this.currentPlayer = this.symbols.y;
      return this.symbols.x;
    } else {
      this.currentPlayer = this.symbols.x;
      return this.symbols.y;
    }
  }

  isPlayed = function(v) {
    return (v == this.symbols.x || v == this.symbols.y ? true : false)
  };

  isPlayedComputer = function(v) {
    return (v == this.computer.symbol && this.isPlayed(v) ? true : false)
  };


  onEnd = function(winner) {
    console.log('END OF GAME' , winner)
    this.history.tableData.push(winner);
    this.history.set('tableData', this.history.tableData);
    this.setPropById('gameStatus', 'closed', 1);
    setTimeout(() => {this.resetGame();}, 4000)
  }

  checkGameRole = function() {
    // hor
    if(this.isPlayed(this.shema[0].ref.text) && this.shema[0].ref.text == this.shema[1].ref.text && this.shema[1].ref.text == this.shema[2].ref.text) {
      this.onEnd(this.shema[0].ref.text);
      return;
    } else if(this.isPlayed(this.shema[3].ref.text) && this.shema[3].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[5].ref.text) {
      this.onEnd(this.shema[3].ref.text);
      return;
    } else if(this.isPlayed(this.shema[6].ref.text) && this.shema[6].ref.text == this.shema[7].ref.text && this.shema[7].ref.text == this.shema[8].ref.text) {
      this.onEnd(this.shema[6].ref.text);
      return;
    }
    // Ver
    else if(this.isPlayed(this.shema[0].ref.text) && this.shema[0].ref.text == this.shema[3].ref.text && this.shema[3].ref.text == this.shema[6].ref.text) {
      this.onEnd(this.shema[0].ref.text);
      return;
    } else if(this.isPlayed(this.shema[1].ref.text) && this.shema[1].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[7].ref.text) {
      this.onEnd(this.shema[1].ref.text);
      return;
    } else if(this.isPlayed(this.shema[2].ref.text) && this.shema[2].ref.text == this.shema[5].ref.text && this.shema[5].ref.text == this.shema[8].ref.text) {
      this.onEnd(this.shema[2].ref.text)
      return;
    }
    // diagonal
    else if(this.isPlayed(this.shema[0].ref.text) && this.shema[0].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[8].ref.text) {
      this.onEnd(this.shema[0].ref.text);
      return;
    } else if(this.isPlayed(this.shema[2].ref.text) && this.shema[2].ref.text == this.shema[4].ref.text && this.shema[4].ref.text == this.shema[6].ref.text) {
      this.onEnd(this.shema[1].ref.text);
      return;
    }

    if(this.computer.enabled == true) {
      if(this.currentPlayer == this.computer.symbol) this.computerAnalize();
    }

    let isFilled = true;
    this.shema.forEach((field) => {
      if(field.ref.text == this.symbols.unset) isFilled = false;
    });

    if(isFilled == true) {
      this.onEnd('d');
    }

  }

  computerAnalize() {
    let isComputerPlayed = false;
    let testIndexs = (indexs) => {
      if(isComputerPlayed == true) {return;}
      if(this.isPlayed(this.shema[indexs[0]].ref.text) && this.shema[indexs[0]].ref.text == this.shema[indexs[1]].ref.text) {
        if(this.shema[indexs[2]].ref.text == this.symbols.unset) {
          this.shema[indexs[2]].ref.onClick(this.shema[indexs[2]].name);
          isComputerPlayed = true;
        }
      }
      if(this.isPlayed(this.shema[indexs[1]].ref.text) && this.shema[indexs[1]].ref.text == this.shema[indexs[2]].ref.text) {
        if(this.shema[indexs[0]].ref.text == this.symbols.unset) {
          this.shema[indexs[0]].ref.onClick(this.shema[indexs[0]].name);
          isComputerPlayed = true;
        }
      }
      if(this.isPlayed(this.shema[indexs[2]].ref.text) && this.shema[indexs[2]].ref.text == this.shema[indexs[0]].ref.text) {
        if(this.shema[indexs[1]].ref.text == this.symbols.unset) {
          this.shema[indexs[1]].ref.onClick(this.shema[indexs[1]].name);
          isComputerPlayed = true;
        }
      }
    };

    // hor
    testIndexs([0, 1, 2]);
    testIndexs([3, 4, 5]);
    testIndexs([6, 7, 8]);
    // ver
    testIndexs([0, 3, 6]);
    testIndexs([1, 4, 7]);
    testIndexs([2, 5, 8]);
    // diagonal
    testIndexs([0, 4, 8]);
    testIndexs([2, 4, 6]);

    if(this.shema[4].ref.text == this.symbols.unset && isComputerPlayed == false) {
      this.shema[4].ref.onClick(this.shema[4].name);
      isComputerPlayed = true;
      return;
    }

    if(isComputerPlayed == false) {
      this.shema.forEach((field) => {
        if(field.ref.text == this.symbols.unset && isComputerPlayed == false) {
          console.log('I PLAY ANY ', field)
          field.ref.onClick(field.name);
          isComputerPlayed = true;
          return;
        }
      });
    }

  }

  constructor(arg) {
    super(arg);

    this.shema.forEach((item) => {
      On(item.name, (r) => {
        if(this.gameStatus != 'open') {return;}
        if(item.ref.text != this.symbols.x && item.ref.text != this.symbols.y) {
          let player = this.getPlayer();
          item.ref.setPropById(item.name + '-field', player, 1);
          item.ref.text = player;
          this.checkGameRole();
        }
      });
    });

    On('playWithComputer', (r) => {
      if (this.computer.enabled == true) return;
      r.detail.target.innerHTML = r.detail.target.innerHTML + ' - ACTIVATED';
      this.resetGame();
      this.computer.enabled = true;
    });
  }

  render = () => `
    <h2 class="middle">Safir AI - TicTacToe -</h2>
    <div class="horCenter bg-transparent">
    <span class="" id="playAI">
      ${this.playWithAI.renderId()}
    </span>
    </div>
    <div class="horCenter bg-transparent">
    <span class="" id="history">
      ${this.history.renderId()}
    </span>
    </div>
    <div class="horCenter bg-transparent">
      <span class="">Status:</span>
      <span class="" id="gameStatus">${this.gameStatus}</span>
    </div>
    <div class="horCenter column bg-transparent myPadding">
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