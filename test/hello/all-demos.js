
import { Safir } from "safir";

if (typeof QueryString.u != 'undefined' &&
typeof Examples[QueryString.u] != 'undefined') {
setTimeout(() => {
try {
  Examples[QueryString.u](world);
} catch(err) {
  // Examples['adding_color_cube'](world);
}
}, 100);
} else {
setTimeout(() => {
Examples['adding_color_cube'](world);
}, 100);
}

console.info("Query running [sync]...", Date.now());
