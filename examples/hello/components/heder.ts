import MyButton from "./button";

export default class MyHeder {

  id: string = 'my-new-heder';
  slogan: string = 'welcome here';

  onClick = () => {
    console.info("CLick")
  }

  render = () => `
    <div>
       ${(new MyButton()).render()}
    </div>
  `
}