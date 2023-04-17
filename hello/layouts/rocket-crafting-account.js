import { BaseComponent, On } from "../../index";
import {JSON_HEADER, byID} from "../../src/core/utils";
import SimpleBtn from "../components/simple-btn";

export default class RocketCraftingLayout extends BaseComponent {

  id = 'my-body';

  loginBtn = new SimpleBtn({text: 'Login', id: 'loginBtn'}, 'w30');
  registerBtn = new SimpleBtn({text: 'Register', id: 'registerBtn'}, 'w30');

  ready = () => { console.log('RocketCrafting Login form ready.') }

  async runApiCall(apiCallFlag) {
    let route = 'http://maximumroulette.com'
    const args = {
      emailField: byID('arg-username').value,
      passwordField: byID('arg-password').value
    }
    const rawResponse = await fetch(route + '/rocket/' +  apiCallFlag, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  // Best way - intergalatic
  exploreResponse(res) {
    byID('apiResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        for (let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
        }
      } else {
        if (key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
        } else if (res[key] == 'USER_LOGGED') {
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
  }

  constructor(arg) {
    super(arg);

    On('loginBtn', (data) => {
      console.info('[login] Trigger Btn', (data).detail);
      this.runApiCall('login');
    });
    On('registerBtn', (data) => {
      console.info('[register] Trigger Btn', (data).detail);
      this.runApiCall('register');
    });
  }

  render = () => `
    <div class="paddingtop20 animate-jello2 bg-transparent textCenter">
      <h2 class='blackText' >Safir extreme simple networking 🌍</h2>
      <p class="textColorWhite">Account login/register/confirmation</p>
      <p class="textColorWhite">Safir can be used for any web api server.</p>
      <p class="textColorWhite">In this example safir use <a href="https://github.com/RocketCraftingServer/rocket-craft-server" >rocketCraftingServer</a></p>
      <p class="textColorWhite">RocketCraftingServer is simple REST/HTTP server. It is used also in ue4 
     <a href="https://github.com/RocketCraftingServer/rocket-craft">rocketCraft</a> project.</p>

    </div>
    <div class="midWrapper animate-jello2 bg-transparent">
        <input class="w30" id='arg-username' type='text' value='zlatnaspirala@gmail.com' />
        <input class="w30" id='arg-password' type='password' value='123123123' />
        ${this.loginBtn.renderId()}
        ${this.registerBtn.renderId()}
    </div>

    <div class='midWrapper bg-transparent' >
      <span id="apiResponse"></span>
    </div>
  `
}
