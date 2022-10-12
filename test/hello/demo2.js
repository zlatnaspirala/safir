
import { Safir, On } from "safir";
import MyList from "./components/my-list";
import MyHeader from "./layouts/heder";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

On("app.ready", () => {
  let myHeader = app.loadComponent(new MyHeader('my-header'));
  let myBoxComp = app.loadComponent(new MyList('my-box-custom'), 'myScroll');
  console.info("Application running demo2 [ready]...", Date.now());
});

On("my-box-custom", (r) => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);

  alert(" List item clicked => " + r.path[0].innerHTML);

});
