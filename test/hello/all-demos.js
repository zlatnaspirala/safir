
import {Safir, QueryString} from "safir";
import {Manager} from "safir/src/core/utils";

if(typeof Examples[QueryString.u] != 'undefined') {
    try {
      Examples[QueryString.u](world);
    } catch(err) {
      console.warn('Safir: No demo found');
    }
} else {
  setTimeout(() => {
    Examples['adding_color_cube'](world);
  }, 100);
}

console.info("Query running [sync]...", Date.now());
