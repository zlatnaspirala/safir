
(window).On = window.addEventListener;
(window).Off = window.removeEventListener;

(window).GetAllEvents = [];

export const On = (window).On;
export const Off = (window).Off;
export const GetAllEvents = (window).GetAllEvents;
