
/**
 * @description
 * List of always usefull functions.
 * - Manager - Load script in runtime.
 * - degToRad/radToDeg
 * - getComp
 * - isMobile
 */
export let Manager = {
  load: (
    src,
    id,
    type,
    parent,
    callback
  ) => {
    var s = document.createElement("script");
    s.onload = function (e) {
      if (callback) callback(e);
      console.info("Script id loaded: " + src);
    };

    if (typeof type !== "undefined") {
      s.setAttribute("type", type);
      s.innerHTML = src;
    } else {
      s.setAttribute("src", src);
    }

    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }

    if (typeof parent !== "undefined") {
      (document ).getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  },
  loadModule: (
    src,
    id,
    type,
    parent,
    callback
  ) => {
    console.info("Async loader -> ", src);
    var s = document.createElement("script");

    s.onload = function (e) {
      if (callback) callback(e);
    };

    if (typeof type === "undefined") {
      s.setAttribute("type", "module");
      s.setAttribute("src", src);
    } else {
      s.setAttribute("type", type);
      s.innerHTML = src;
    }

    s.setAttribute("src", src);
    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }

    if (typeof parent !== "undefined") {
      (document ).getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  },
};

export const getComp = function (id) {
  return document.getElementById(id);
};

export const byClass = function (id) {
  return document.getElementsByClassName(id);
};

export const byTag = function (id) {
  return document.getElementsByTagName(id);
};

export const byID = function (id) {
  return document.getElementById(id);
};

export function degToRad (degrees) {
  return (degrees * Math.PI) / 180;
};

export function radToDeg(r) {
  var pi = Math.PI;
  return r * (180 / pi);
}

export function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}

export function loadImage(url, onload) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function (e) {
    onload();
  };
  return img;
};

/**
 * LocalStorageMemory save and load js objects in localStorage.
 */
export let LocalStorageMemory = {
  
  localStorage: window.localStorage,

  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of localstorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro localStorage.
   */
  save: function(name, obj) {
    try {
      return localStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalStorageMemory class , method save!");
      return false;
    }
  },

  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of localstorage key
   * @return {false | object} What ever we are stored intro localStorage.
   */
  load: function(name) {
    if (localStorage.getItem(name) === "undefined" || localStorage.getItem(name) == null || localStorage.getItem(name) === "") {
      // console.warn("LocalStorageMemory method load return's: ", localStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(localStorage.getItem(name));
    }
  }

}

/**
 * LocalSessionMemory save and load js objects in localStorage.
 */
export let LocalSessionMemory = {
  sessionStorage: window.sessionStorage,
  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of sessionStorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  save: function(name, obj) {
    try {
      return sessionStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalSessionMemory class , method save!");
      return false;
    }
  },

  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of sessionStorage key
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  load: function(name) {
    if (sessionStorage.getItem(name) === "undefined" || sessionStorage.getItem(name) == null || sessionStorage.getItem(name) === "") {
      // console.warn("LocalSessionMemory method load return's: ", sessionStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(sessionStorage.getItem(name));
    }
  }

}

export const colorLog1 = "color: #66ffff; font-size:14px;text-shadow: 0px 0px 51px #111222, 1px 1px 1px #aaa66a;";
export const colorLog2 = "color: #ffff66; font-size:12px;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;";
