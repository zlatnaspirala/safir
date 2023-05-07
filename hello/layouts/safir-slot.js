import {BaseComponent, On, JSON_HEADER, byID, byClass, getComp, LocalSessionMemory} from "../../index";

export class SingleCounter extends BaseComponent {

  refFunc = [];

  ready = () => {

    this.id = this.id;
    let slot = document.createElement('div');
    slot.id = `${this.rootDom}slot${this.id}`;
    slot.classList.add('slot');
    console.log("ROOT DOM", this.rootDom)
    byID(this.rootDom + '-holder').append(slot);
    if(this.id.indexOf('D') != -1) {
      slot.innerHTML = ',';
      slot.style.margin = '1px';
      slot.style.padding = '1px';
      slot.style.fontSize = 'xxx-large';
      slot.style.background = 'transparent';
      return;
    }
    slot.innerHTML = this.render(this.id);
    this.myAnim(this.id);
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
    this.rootDom = arg.rootDom;
  }

  calcAnim(ring) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        if(nextAngle > 360) nextAngle -= 360;
        console.log('nextAngle', nextAngle);
        ring.style.setProperty("--deg", `-${nextAngle}deg`)
        ring.setAttribute('data-slot', i)
      })
    });
  }

  myAnim = function(id) {
    const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
    const panels = $(`[data-root-${this.rootDom}-${id}]`);
    panels.forEach((panel, i) => {
      panel.style.setProperty("--angle", `${360 / panels.length * i}deg`)
    });
    const ring0 = $(`.ring-${this.rootDom}-${id}`)[0];
    this.calcAnim(ring0);
  }

  setNumber = function(num) {
    this.refFunc[num]();
  }

  render = (arg) => {
    return `
    <div class="ring-${this.rootDom}-${arg} ring${arg}" data-slot="0" data-root="${this.rootDom}">
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >0</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >1</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >2</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >3</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >4</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >5</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >6</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >7</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >8</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >9</div>
    </div>
    `;
  }
}

export class SafirSlot extends BaseComponent {

  VALUE = 0;
  speed = 100;
  editBtns = false;

  myConstruct(arg) {

    if (typeof arg.editBtns !== 'undefined') {
      this.editBtns = arg.editBtns;
    }

    this.field0 = new SingleCounter({id: '0', rootDom: this.rootDom});
    this.field1 = new SingleCounter({id: '1', rootDom: this.rootDom});
    this.field2 = new SingleCounter({id: '2', rootDom: this.rootDom});
    this.field3 = new SingleCounter({id: '3', rootDom: this.rootDom});
    this.field4 = new SingleCounter({id: '4', rootDom: this.rootDom});
    this.field5 = new SingleCounter({id: '5', rootDom: this.rootDom});
    this.field6 = new SingleCounter({id: '6', rootDom: this.rootDom});
    this.field7 = new SingleCounter({id: '7', rootDom: this.rootDom});
    this.dot = new SingleCounter({id: 'D', rootDom: this.rootDom});
    this.field8 = new SingleCounter({id: '8', rootDom: this.rootDom});
    this.field9 = new SingleCounter({id: '9', rootDom: this.rootDom});

    On('SafirSlot1-plus', (e) => {
      console.log( ">>>>>",  e.detail)
    })
  
    On('SafirSlot1-minus', (e) => {
      console.log( ">>>>>",  e.detail)
    })
    
    // setTimeout(() => {
    //   dispatchEvent(new CustomEvent(`${this.rootDom}`, {
    //     bubbles: true,
    //     detail: {
    //       rootDom: this.rootDom,
    //     }
    //   }));
    // }, 1)
  }
  constructor(arg) {
    super();
    this.initial(arg);
    console.log('ARG', arg);
    this.rootDom = arg.rootDom;
    this.myConstruct(arg);
  }

  setSlotClass(c) {
    function setByIndex(i, c) {
      let l0 = document.querySelectorAll(`[data-root-safirslot1-${i}]`)
      for(var x = 0;x < l0.length;x++) {
        l0[x].classList.add(c)
      }
    }
    for(var x = 0;x < 10;x++) {
      setByIndex(x, c);
    }
    byID(this.id).classList.add(c);
  }

  setSlotColor(c) {
    function setByIndex(i, c) {
      let l0 = document.querySelectorAll(`[data-root-safirslot1-${i}]`)
      for(var x = 0;x < l0.length;x++) {
        l0[x].style.background = c;
      }
    }
    for(var x = 0;x < 10;x++) {
      setByIndex(x, c);
    }
    byID(this.id).style.background = c;
  }

  setSum(num) {

    num = parseFloat(num.toFixed(2));
    var str = String(num);

    if(str.indexOf('.') == -1) {
      str = str + ".00"
    }

    if(str.indexOf('.') != -1) {
      console.log('Theres decimals intro number str.length;', str.length);
      byID(`${this.rootDom}slotD`).style.display = 'block';
      let delta = 0;
      if(str.length < 11) {
        let howMany = 11 - str.length;
        if(str.split('.')[1].length < 2) howMany--;

        for(var y = 0;y < howMany;y++) {
          str = "0" + str;
          if(str.split('.')[1].length < 2) {
            console.log('TEST STRRIGHT LINGTH = ', str.split('.')[1].length)
            str = str + "0";
            delta = -1;
          }
        }
      }
      var locHandler = false;
      for(var x = 10;x >= 0;x--) {
        if(str[x] != '.') {
          if(locHandler == true) {
            this[`field${x}`].setNumber(str[x])
          } else {
            if(x == 11) {
              this[`field${x - 2}`].setNumber(str[x])
            } else {
              this[`field${x - 1}`].setNumber(str[x])
            }
          }
        } else {
          locHandler = true;
          // console.log('DECIMAL CHAR DETECTED ', str[x])
        }
      }
    }
    this.VALUE = str;
  }

  getCurrentSum() {
    return parseFloat(parseFloat(this.VALUE).toFixed(2));
  }

  getNumByPosition(n) {
    let C = byClass(`ring-${this.rootDom}-${n}`)
    console.log('Get individual index value: ', C[x].getAttribute('data-slot'))
    return C[x].getAttribute('data-slot');
  }

  myX = 0;

  setByTime(newValue, speed) {
    if(typeof speed !== 'undefined') this.speed = speed;
    if(newValue.toString().indexOf('.') !== -1 &&
      newValue.toString().split('.')[1].length < 2) {
      newValue = newValue + "0";
    }
    let test = parseFloat((newValue - this.getCurrentSum()).toFixed(2));
    let X = (x) => {
      var CO = 1;
      if(test < 0) {
        CO = -1;
      }
      if(CO == 1) {
        if(test < 0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO)
        } else if(test < 1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO)
        } else if(test < 100) {
          this.setSum(this.getCurrentSum() + 2.12 * CO)
        } else if(test < 500) {
          this.setSum(this.getCurrentSum() + 112.12 * CO)
        } else {
          this.setSum(this.getCurrentSum() + 212.12 * CO)
        }
      } else {
        if(test > -0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO)
        } else if(test > -1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO)
        } else if(test > -100) {
          this.setSum(this.getCurrentSum() + 2.12 * CO)
        } else if(test > -500) {
          this.setSum(this.getCurrentSum() + 112.12 * CO)
        } else {
          this.setSum(this.getCurrentSum() + 212.12 * CO)
        }
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

  inc = this.clickBind;
  
  render = () => {
    return `
      <h2 data-label="welcome">Safir-Slot-UI-Component</h2>
      <div id="${this.rootDom}-holder" class="horCenter numAnimHolder" style="background-color:transparent"></div>
      ${(this.editBtns == true ? 
        `<button id="${this.rootDom}-minus" onclick="(${this.inc})('${this.rootDom+"-minus"}')" >-</button>
         <button id="${this.rootDom}-plus" onclick="(${this.inc})('${this.rootDom+"-plus"}')" >+</button>`
      : "")}
    `;
  }
}
