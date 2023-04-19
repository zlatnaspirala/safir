'use strict';

/**
 * @description
 * Main export file for Safir.
 */

import {
  getComp,
  T,
  Safir } from "./src/core/root";
import { BaseComponent } from "./src/core/comp";
import { On } from "./src/core/modifier";
import {byID, JSON_HEADER} from "./src/core/utils";

export {
  Safir,
  BaseComponent,
  On,
  T,
  getComp,
  byID,
  JSON_HEADER
}
