import {BaseComponent} from "../../index";

export default class MyVBox extends BaseComponent {

  id = '';
  tableData = ['Crazzy easy', 'Super Performance', 'Data access'];

  get getSubId () {
    return 'mybox-button1';
  }

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  render = () => `
    <div id="${this.id}">
      <ver-box onclick="(${this.onClick})('${this.getSubId}')">
        ${this.tableData.map((item) =>
          `<h2>` + item + `</h2>`
        )}
      </ver-box>
    </div>
  `;
}
