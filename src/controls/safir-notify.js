import {byID} from "../core/utils";

export let notify = {
  root: () => byID('msgBox'),
  pContent: () => byID('not-content'),
  copy: function() {
    navigator.clipboard.writeText(notify.root().children[0].innerText);
  },
  c: 0, ic: 0, t: {},
  setContent: function(content, t) {
    var iMsg = document.createElement('div');
    iMsg.innerHTML = content;
    iMsg.id = `msgbox-loc-${notify.c}`;
    notify.root().appendChild(iMsg);
    iMsg.classList.add('animate1')
    if(t == 'ok') {
      iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
    } else {
      iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
    }
  },
  kill: function() {
    notify.root().remove();
  },
  show: function(content, t) {
    notify.setContent(content, t);
    notify.root().style.display = "block";
    var loc2 = notify.c;
    setTimeout(function() {
      byID(`msgbox-loc-${loc2}`).classList.remove("fadeInDown");
      byID(`msgbox-loc-${loc2}`).classList.add("fadeOut");
      setTimeout(function() {
        byID(`msgbox-loc-${loc2}`).style.display = "none";
        byID(`msgbox-loc-${loc2}`).classList.remove("fadeOut");

        byID(`msgbox-loc-${loc2}`).remove();
        notify.ic++;
        if(notify.c == notify.ic) {
          notify.root().style.display = 'none';
        }
      }, 1000)
    }, 3000);
    notify.c++;
  },
  error: function(content) {
    notify.root().classList.remove("success")
    notify.root().classList.add("error")
    notify.root().classList.add("fadeInDown");
    notify.show(content, 'err');
  },
  success: function(content) {
    notify.root().classList.remove("error")
    notify.root().classList.add("success")
    notify.root().classList.add("fadeInDown");
    notify.show(content, 'ok');
  }
}