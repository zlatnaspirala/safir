import {BaseComponent} from "../../index";

export default class MyHBox extends BaseComponent {

  id = '';
  tableData = ['Crazzy easy', 'Super Performance', 'Data access'];

  get getSubId () {
    return 'hor-box-button';
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  render = () => `
    <div id="${this.id}" style="width:100%">
      <hor-box onclick="(${this.onClick})('${this.getSubId}')">
          ${this.tableData.map((item) => {
           return `<h2 style="width:100%;text-align: center;">` + item + `</h2>`;
          }).join('')}
      </hor-box>
    </div>
  `;
}
