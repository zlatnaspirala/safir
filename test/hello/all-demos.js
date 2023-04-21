
import {Safir, QueryString, Manager} from "safir";

console.warn('Safir: INIT');

if(QueryString.u != null) {
  try {
    Manager.load(QueryString.u, 'demo');
    console.warn('Safir: No demo found');
  } catch(err) {
    console.warn('Safir: No demo found');
  }
} else {
  //
}

console.info("Query running [sync]...", Date.now());
