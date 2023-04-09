import {BaseComponent} from "../../index";

export default class MyList extends BaseComponent {

  id = '';

  // This is props
  tableData = [
    '👽 Modern tech',
    '👌 Performance',
    '🤑 Free soft',
    '😜 Easy use',
    '💔 Breaking',
    '💥 Star project',
    '👁️‍🗨️ Event oriented',
    '🖖 No single unnecessary element',
    '🤘 Safir rocks',
    '👨‍🔬 Use npm service',
    '👨‍💻 Open source',
    '🐈 https://github.com/zlatnaspirala/safir'
  ];

  constructor(arg) {
    super(arg);
    this.initial(arg);
  }

  onClick = this.clickBind;

  /**
   * @description
   * Index Key is not required but
   * it is nice to have.
   */
  render = () => `
    <div class="verCenter">
      ${this.tableData.map((item, index) =>
          `<h2 data-key="${index}" onclick="(${this.onClick})('${this.id}')"
               class="middle">` + index + item + `</h2>`
      ).join('')}
    </div>
  `;
}
