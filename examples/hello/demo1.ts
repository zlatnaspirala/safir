
import { PopularDestroyer } from "../../index";
import myHeder from "./components/heder";

let app  = new PopularDestroyer();
(window as any).app = app;

// app.regComponent({ id: 'heder'});
app.loadComponent((new myHeder));
