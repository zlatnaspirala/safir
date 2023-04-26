import {BaseComponent, On, JSON_HEADER, byID, getComp} from "safir";
import SimpleBtn from "../components/simple-btn";

export default class RocketCraftingLayout extends BaseComponent {

  id = 'my-body';

  loginBtn = new SimpleBtn({text: 'Login', id: 'loginBtn'}, 'w30');
  registerBtn = new SimpleBtn({text: 'Register', id: 'registerBtn'}, 'w30');

  nickname = null;

  email= null;
  token= null;
  photo= null;

  ready = () => {console.log('RocketCrafting Login form ready.')}

  async runApiCall(apiCallFlag) {
    let route = location.origin;
    const args = {
      emailField: byID('arg-username').value,
      passwordField: byID('arg-password').value
    }
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  async runUploadAvatar(apiCallFlag) {
    let route = 'maximumroulette.com'; // location.origin;
    // route = route.replace('https', 'http')
    const args = {
      email: this.email,
      token: this.token,
      photo: this.photo
    }
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  // Best way - intergalatic
  exploreResponse(res,) {
    byID('apiResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        for(let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
        }
      } else {
        if(key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
        } else if(res[key] == 'USER_LOGGED') {
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
    // how to use sub rerender
    console.log(" TEST #######")
    // simple override
    this.render = this.accountRender;
    getComp(this.id).innerHTML = this.render();
    this.accountData(res);
  }

  // Best way - intergalatic
  accountData(res) {
    byID('apiResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        for(let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #14ffff;';
          if (key1 == 'profileImage') {
            //                                                                         https://localhost HARD CODE 
            // byID('apiResponse').innerHTML += `<img style='${color}' alt="${key1}" src="https://localhost/storage${res[key][key1]}" />`;
            byID('apiResponse').innerHTML += `<img style='${color}' alt="${key1}" src="${location.origin}/storage${res[key][key1]}" />`;
            // hot to use in runtime attaching:
            byID('apiResponse').innerHTML += `<input type="file" id="avatar" />`;
            byID('apiResponse').innerHTML += `<button type="file" id="uploadAvatar">CHANGE AVATAR</button>`;
            byID('avatar').addEventListener('change', this.handleFileUpload , { passive: true });
            byID('uploadAvatar').addEventListener('click', this.handleAvatarUpload , { passive: true });
          } else if (key1 == 'email') {
            console.log('###########################')
            this.setPropById('email', res[key][key1], 1);
          } else if (key1 == 'token') {
            console.log('##########token#################')
            this.setPropById('token', res[key][key1], 1);
          } else {
            if (key1 == 'nickname') { 
              this.setPropById('nickname', res[key][key1])
            }
            byID('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
          }
        }
      } else {
        if(res[key] == 'USER_LOGGED') {
          byID('apiResponse').innerHTML += `<div style='${color}' >${res[key]} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
  }

  handleAvatarUpload = (e) => {
    //
    console.log('WHAT IS ', this.email)
    this.runUploadAvatar('profile/upload');
  }

  handleFileUpload = (e) => {
    const reader = new FileReader();
    let rawImg;
    reader.onloadend = () => {
      rawImg = reader.result;
      this.setPropById('photo', rawImg)
      console.log('avatar', rawImg);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  constructor(arg) {
    super(arg);
    console.info('[RC ARGS]:', arg);
    On('loginBtn', (data) => {
      console.info('[login] Trigger Btn', (data).detail);
      this.runApiCall('login');
    });
    On('registerBtn', (data) => {
      console.info('[register] Trigger Btn', (data).detail);
      this.runApiCall('register');
    });
  }

  accountRender = () => `
    <div class='midWrapper bg-transparent'>
      <h2>Welcome  <h2 id='nickname'>${this.nickname}</h2> </h2>
      <span id="apiResponse"></span>
    </div>
  `;

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
        <input class="w30" id='arg-password' type='password' value='12345678' />
        ${this.loginBtn.renderId()}
        ${this.registerBtn.renderId()}
    </div>

    <div class='midWrapper bg-transparent' >
      <span id="apiResponse"></span>
    </div>
  `
}
