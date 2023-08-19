
## CHANGES

Added modifiers 
```js
(window).On = window.addEventListener;
(window).Off = window.removeEventListener;
(window).getAllEvents = window.getEventListeners;

export const On = (window).On;
export const Off = (window).Off;
export const getAllEvents = (window).getAllEvents;
```



## About SafirSlot

For SafirSlotUI control you must have multilang label by
`<NAME_OF_SAFIR_COMPONENT>SlotTitle` : "YOUR TEXT HERE"

See [safir\hello\assets\multilang\en.json]:

{
  "changeTheme": "Change Theme",
  "yes": "Yes",
  "no": "No",
  "destroyer": "Safir",
  "SafirSlot1SlotTitle": "With default value:",
  "SafirSlot2SlotTitle": "Default value :",
  "textAlert": "No emit"
}
