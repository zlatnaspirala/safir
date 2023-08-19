
(window).On = window.addEventListener;
(window).Off = window.removeEventListener;

(window).getAllEvents = window.getEventListeners;

export const On = (window).On;
export const Off = (window).Off;
export const getAllEvents = (window).getAllEvents;
