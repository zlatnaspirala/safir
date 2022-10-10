/**
 * @description
 * Load script in runtime.
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

export const degToRad = function (degrees) {
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

export const loadImage = function (url, onload) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function (e) {
    onload();
  };
  return img;
};
