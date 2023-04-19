import {BaseComponent} from "safir";

export default class TTTHistory extends BaseComponent {

  id = 'h';

  // This is props
  tableData = [
    '👽 History'
  ];

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  onClick = this.clickBind;

  /**
   * @description
   * Index Key is not required but
   * it is nice to have.
   */
  render = () => `
    <div class="horCenter bg-transparent" style="height:30px">
      ${this.tableData.map((item, index) =>
          `<h4 data-key="${index}" onclick="(${this.onClick})('${this.id}')"
               class="middle">${item}</h4>`
      ).join('')}
    </div>
  `;
}
