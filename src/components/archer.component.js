
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}


class ArcherElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(attributes) {
        members(this).shadowRoot = this.attachShadow({mode: "closed"});
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }


}