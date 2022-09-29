
# Popular Destroyer

### Tech: Based on Typescript/ECMA6 programming paradigms builded on Template Literals, CustomEvents, Custom Tags.
### Alternative software - High Performace
### Objective: 
 - Must be simple and usefull.
 - Performace must be `100%`with full PWA support.
 - For any platform adapted.


## Basics

WEB/HTML/JS/CSS (ecma6)
```js
let header = "Templates Literals";
let tags = ["template literals", "javascript", "es6"];


let html = `<h2>${header}</h2><ul>`;

for (const x of tags) {
  html += `<li>${x}</li>`;
}

html += `</ul>`;

document.getElementById("demo").innerHTML = html;
```

## Construct help classes for components creating procces.
## How to update without timer or any loop ? Try custom events
