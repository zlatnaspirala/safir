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
      slot.style.margin = '0';
      slot.style.fontSize = '20px';
      console.log('ADD CHAR DOT')
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
      // num.addEventListener("click", () => {
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

  VALUE = 333.55;
  constructor() {
    super();
    this.field0 = new singleCounter({ id: '0'});
    this.field1 = new singleCounter({ id: '1'});
    this.field2 = new singleCounter({ id: '2'});
    this.field3 = new singleCounter({ id: '3'});
    this.field4 = new singleCounter({ id: '4'});
    this.field5 = new singleCounter({ id: '5'});
    this.field6 = new singleCounter({ id: '6'});
    this.field7 = new singleCounter({ id: '7'});
    this.dot = new singleCounter({ id: 'D'});
    this.field8 = new singleCounter({ id: '8'});
    this.field9 = new singleCounter({ id: '9'});
  }

  setSum(num) {
    var str = String(num);
    if (str.indexOf('.') != -1) {
      console.log('Theres decimals intro number');
      byID('slotD').style.display = 'block';
      if (str.length < 11) {
        let howMany = 11 - str.length;
        for (var y=0; y < howMany; y++) {
          str = "0" + str;
        }
      }
      // console.log('TEST STR = ', str)
      var locHandler = false;
      for (var x=str.length-1; x >= 0; x--) {
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
      // console.log('STR', str)
      for (var x=str.length-1; x >= 0; x--) {
        this[`field${x}`].setNumber(str[x])
      }

    }


  }

  setByCounting() {

    // 

  }
  render = () => {
    return `
      <h2>Safir-Slot-UI-Component</h2>
      <div id="numAnimHolder" class="horCenter numAnimHolder"></div>
    `;
  }
}
