
import { middleBox } from "../style/base";

export class Base extends HTMLElement {

  constructor(...args: any) {

    super(...(args as ConstructorParameters<typeof HTMLElement>))

    console.log('Base class init...')
    const shadowRoot = this.attachShadow({mode: 'open'});
    let inputElement = document.createElement('template');
    inputElement.setAttribute('id', this.getAttribute('id')!);
    inputElement.innerHTML = this.innerHTML;

    // inputElement.setAttribute('type', this.getAttribute('type')!);
    // inputElement.setAttribute('value', this.getAttribute('value')!);
    // inputElement.setAttribute('max', this.getAttribute('max')!);
    // inputElement.setAttribute('min', this.getAttribute('min')!);
    // need trick
    // inputElement.setAttribute('class', this.getAttribute('class'));
    // predefined

    inputElement.setAttribute('style', middleBox);

    console.log('changed style')
    // if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style')!);

    inputElement.addEventListener('mousemove', () => {
      console.log('hover on element.', this.getAttribute('id'));
    });

    // inputElement.addEventListener('change', (e) => {
    //   console.log('changed', (e as any).path[0].value);
    //   this.setAttribute('value', (e as any).path[0].value)
    // });
    // if (typeof args[0] === 'function') inputElement.addEventListener('change', args[0])
    shadowRoot.appendChild(inputElement);
  }
}

export class myBase extends Base {
  constructor(...args: any) {
    super(...args);
  }
}
