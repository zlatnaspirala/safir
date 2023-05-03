import {BaseComponent, On, JSON_HEADER, byID, getComp, LocalSessionMemory} from "../../index";

export class singleCounter extends BaseComponent {
  refFunc = [];
  ready = () => {
    this.id= this.id;
    let slot = document.createElement('div');
    slot.id = `slot${this.id}`;
    slot.classList.add('slot');
    byID('numAnimHolder').append(slot);
    if (this.id.indexOf('D') != -1) {
      slot.innerHTML = ',';
      slot.style.margin = '10px';
      slot.style.fontSize = '20px';
      // console.log('ADD CHAR DOT')
      return;
    }
    slot.innerHTML = this.render(this.id);
    this.myAnim(this.id);
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  calcAnim (ring) {
    const nums = [0,1,2,3,4,5,6,7,8,9];
    nums.forEach((num, i) => {
      this.refFunc.push(() => {
        const numAngle = 36 * i;
        const currentAngle =
          ring.style.getPropertyValue("--deg")
            .replace(/\D/g, "");
        let nextAngle = numAngle;
        while(nextAngle < currentAngle) {
          nextAngle += 360;
        }
        if (nextAngle > 360) nextAngle -= 360; 
        ring.style.setProperty("--deg", `-${nextAngle}deg`)
      })
    })
  }

  myAnim = function(id) {
    const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
    const panels = $(`.panel${id}`);
    panels.forEach((panel, i) => {
      panel.style.setProperty("--angle", `${360 / panels.length * i}deg`)
    });
    const ring0 = $(`.ring${id}`)[0];
    this.calcAnim(ring0);
  }

  setNumber = function(num) {
    this.refFunc[num]();
  }

  render = (arg) => {
    return `
    <div class="ring${arg}">
      <div class="panel${arg}">0</div>
      <div class="panel${arg}">1</div>
      <div class="panel${arg}">2</div>
      <div class="panel${arg}">3</div>
      <div class="panel${arg}">4</div>
      <div class="panel${arg}">5</div>
      <div class="panel${arg}">6</div>
      <div class="panel${arg}">7</div>
      <div class="panel${arg}">8</div>
      <div class="panel${arg}">9</div>
    </div>
    `;
  }
}

export class SafirSlot extends BaseComponent {

  VALUE = 0;
  speed = 100;

  constructor(arg) {
    super();
    this.initial(arg);
    this.field0 = new singleCounter({ id: '0'});
    this.field1 = new singleCounter({ id: '1'});
    this.field2 = new singleCounter({ id: '2'});
    this.field3 = new singleCounter({ id: '3'});
    this.field4 = new singleCounter({ id: '4'});
    this.field5 = new singleCounter({ id: '5'});
    this.field6 = new singleCounter({ id: '6'});
    this.field7 = new singleCounter({ id: '7'});
    this.dot    = new singleCounter({ id: 'D'});
    this.field8 = new singleCounter({ id: '8'});
    this.field9 = new singleCounter({ id: '9'});
  }

  setSum(num) {

    num = parseFloat(num.toFixed(2));

    var str = String(num);
    if (str.indexOf('.') != -1) {
      console.log('Theres decimals intro number');
      byID('slotD').style.display = 'block';
      let delta = 0;
      if (str.length < 11) {
        let howMany = 11 - str.length;
        for (var y=0; y < howMany; y++) {
          str = "0" + str;
          if (str.split('.')[1].length < 2) {
            console.log('TEST STRRIGHT LINGTH = ', str.split('.')[1].length)
            str = str + "0";
            delta = -1;
          }
        }
      }
      var locHandler = false;
      for (var x=str.length-1+delta; x >= 0; x--) {
        if (str[x] != '.') {
          if (locHandler == true) {
            this[`field${x}`].setNumber(str[x])
            console.log('DECIMAL AFTER= ', str[x] )
          } else {
            this[`field${x-1}`].setNumber(str[x])
          }
        } else {
          locHandler = true;
          console.log('DECIMAL CHAR DETECTED ', str[x] )
        }
      }

    } else {
      console.log('NO decimals intro number')
      byID('slotD').style.display = 'none';
      if (str.length < 10) {
        let howMany = 10 - str.length;
        for (var y=0; y < howMany; y++) {
          str = "0" + str;
        }
      }
      for (var x=str.length-1; x >= 0; x--) {
        this[`field${x}`].setNumber(str[x])
      }
    }

    this.VALUE = str;
  }

  getCurrentSum() {
    return parseFloat(this.VALUE);
  }

  myX = 0;

  setByTime(newValue) {

    if (newValue.toString().indexOf('.') !== -1 &&
        newValue.toString().split('.')[1].length < 2) {
      newValue = newValue + "0";
    }

    // console.log('current value:', this.getCurrentSum());
    let test = parseFloat((newValue - this.getCurrentSum()).toFixed(2));
    let X = (x) => {
      var CO = 1;
      if (test < 0) {
        CO= -1;
      }
      if (test < 1) {
        this.setSum(this.getCurrentSum() + 0.01*CO)
      } else if (test < 100) {
        this.setSum(this.getCurrentSum() + 1*CO)
      } else if (test < 500) {
        this.setSum(this.getCurrentSum() + 10*CO)
      } else {
        this.setSum(this.getCurrentSum() + 100*CO)
      }

    }

    if(this.getCurrentSum() < newValue && test > 0) {
      this.myX++;
      setTimeout((x) => {
         X(x);
         this.setByTime(newValue);
      }, this.speed, this.myX)
    } else if(this.getCurrentSum() > newValue && test < 0) {
      this.myX++;
      setTimeout((x) => {
         X(x);
         this.setByTime(newValue);
      }, this.speed, this.myX)
    }
  }

  setByLinear(newValue) {
    console.log('setByLinear getCurrentSum', this.getCurrentSum() )

    let X9 = (x) => {
      if (x == 0) {
        this[`field9`].setNumber(x)
        console.log('[9]timeout x  kad je nula ',  x)
      } else {
        this.field9.setNumber(x)
        // console.log('timeout', test * x)
        console.log('[9]timeout x ',  x)
      }
    }

    let X8 = (x) => {
      if (x == 0) {
        this[`field8`].setNumber(x)
      } else {
        this.field8.setNumber(x)
        // console.log('timeout', test * x)
        // console.log('[8]timeout x ',  x)
      }
    }

    let loopMe = () => {
      for(var x9 = 0; x9 < 10; x9++) {

        setTimeout((x) => {
          X9(x)
          if (x == 9) {
            setTimeout((x) => {
              console.log('this.field8', this.field8)
              
              // X8(x)
              loopMe()

            }, this.speed * 10, x9)
          }
        }, this.speed * x9, x9)

         }
      }

    loopMe()

  }

  render = () => {
    return `
      <h2>Safir-Slot-UI-Component</h2>
      <div id="numAnimHolder" class="horCenter numAnimHolder"></div>
    `;
  }
}
