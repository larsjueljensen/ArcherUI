
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const style = `
    <style>
        :host {
            position: fixed;
            inset: 0;
            border: 2px solid pink;
        }
        

    </style>
`;

const html = `
    ${style}
`;

class ArcherScrolltext extends HTMLElement {

    static observedAttributes = ['text', 'speed'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: "closed"});
        members(this).shadowRoot = shadowRoot;
        shadowRoot.innerHTML = html;
        members(this).zero = document.timeline.currentTime;
        requestAnimationFrame((timestamp) => this.onAnimate(timestamp));
    }

    onAnimate(timestamp) {
        const value = (timestamp - members(this).zero) / 100;
        members(this).shadowRoot.host.style.left = (value % 100) + 'em'
        requestAnimationFrame((timestamp) => this.onAnimate(timestamp));
    }
}

customElements.define('archer-scrolltext', ArcherScrolltext);