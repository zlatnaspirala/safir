
import { Safir, On } from "safir";
import MyList from "./components/my-list";
import MyHeader from "./layouts/heder";

let app  = new Safir();
app.loadVanillaComp("vanilla-components/footer.html");

let myBoxComp, myHeader;

On("app.ready", () => {
  myHeader = app.loadComponent(new MyHeader('my-header'));
  myBoxComp = app.loadComponent(new MyList('my-box-custom'), 'myScroll');
  console.info("Application running demo2 [ready]...", Date.now());

  // Exsposed to the global scope for testing in console!
  window.myBoxComp = myBoxComp;
});

On("my-box-custom", (r) => {
  console.info("Application On ver-box custom integrated dom element, click event attached.", r);
  console.info('myBoxComp.tableData' + myBoxComp.tableData);
  let getIndex = r.srcElement.getAttribute('data-key');
  myBoxComp.tableData.splice(getIndex , 1);
  setTimeout(() => {
    myBoxComp.set('tableData', myBoxComp.tableData);
  }, 1000);
  
  r.srcElement.classList.add('animate-destroy');
  console.info('r.srcElement.classList' + r.srcElement.classList);

});
