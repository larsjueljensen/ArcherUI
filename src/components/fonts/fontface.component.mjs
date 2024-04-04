import adornEngraved from './assets/adorn-font.woff2'
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const types = {
    'adorn-engraved' : { "woff2" : adornEngraved }
}

const html = (family) => {
    const assets = types[family];
    return `
      @font-face {
        font-family: "${family}";
        src: url("${assets.woff2}") format("woff2");
        font-display: auto;
        font-style: normal;
        font-weight: 400;
        font-stretch: normal;
      }
    `;
}

class ArcherFontFace extends HTMLStyleElement {

    static observedAttributes = ['family']

    constructor() {
        super(); // Always call super() first in the constructor.
    }

    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'family': this.familyChangedCallback(oldValue, newValue); break;
        }
    }

    familyChangedCallback(oldValue, newValue) {
        this.innerHTML = html(newValue);
    }
}

customElements.define('archer-font-face', ArcherFontFace, { extends: 'style' });