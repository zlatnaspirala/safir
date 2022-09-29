
export default class MyButton {

  id: string = 'my-button';
  slogan: string = 'welcome here';

  onClick: () => void = () => {
    console.info('CLick');
  }

  render = () => `
    <button onClick="${ this.onClick }">
      ${this.slogan}
    </button>
  `
}
