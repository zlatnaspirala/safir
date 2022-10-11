import {BaseComponent} from "../../index";
import MyHBox from "./hor-box";

export default class MyVHBox extends BaseComponent {

  id = '';
  tableData = ['Crazzy easy1 ', 'Super Performance1 ', 'Data access1 '];

  get getSubId () {
    return 'mybox-button1';
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
    // this.myHorizontalComp = new MyHBox('hor-box-custom');
  }

  onClick = this.clickBind;

  render = () => `
    <div id="${this.id}">
      <ver-box onclick="(${this.onClick})('${this.getSubId}')">
        ${this.tableData.map((item, index) =>
          (new MyHBox('hor-box-custom' + index)).render()
        ).join('')}
      </ver-box>
    </div>
  `;
}
