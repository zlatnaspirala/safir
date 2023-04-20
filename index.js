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
import {byID, JSON_HEADER, LocalSessionMemory, LocalStorageMemory, Manager, QueryString} from "./src/core/utils";

export {
  Safir,
  BaseComponent,
  getComp,
  byID,
  On,
  T,
  JSON_HEADER,
  LocalSessionMemory,
  LocalStorageMemory,
  QueryString,
  Manager
}
