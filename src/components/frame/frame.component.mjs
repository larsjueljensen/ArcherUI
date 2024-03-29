
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const calculatePolygon = (width, height) => {

    const left = width;
    const right = `calc(100% - ${width})`;
    const top = height;
    const bottom = `calc(100% - ${height})`;

    const topLeft = `${left} ${top}`;
    const bottomLeft = `${left} ${bottom}`;
    const bottomRight = `${right} ${bottom}`;
    const topRight = `${right} ${top}`;

    return `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${topLeft}, ${bottomLeft}, ${bottomRight}, ${topRight}, ${topLeft})`;
}

const querySelector = (instance, selector) => {
    return members(instance).shadowRoot.querySelector(selector);
}

const getFrame = (instance) => {
    return querySelector(instance,"#frame");
}

const getFrameShadow = (instance) => {
    return querySelector(instance, "#frame-shadow");
}

const updateFrame = (instance) => {
    if (members(instance).shadowRoot) {

        const frame = getFrame(instance);
        frame.style.clipPath = calculatePolygon(members(instance).width, members(instance).height);
        frame.style.backgroundImage = `url(${members(instance).src})`;
        getFrameShadow(instance).style.inset = `${members(instance).height} ${members(instance).width}`;
    }
}

const HTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
    }
    
    #component {
        position: relative;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        overflow: hidden;
        border: 4px outset rgba(0,0,0,1);
    }
    #frame {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background-repeat: repeat;
        background-size: 512px;
    }
    
    #frame-shadow {
        position: absolute;
        box-shadow: inset 0px 0px 8px 8px rgba(0,0,0,0.5);
        border: 2px inset rgba(0,0,0,1);
    }
</style>
<div id="component">
    <div id="frame"></div>   
    <div id="frame-shadow"></div> 
</div>
`;

class ArcherFrame extends HTMLElement {

    static observedAttributes = ["width", "height", "color", "src"];

    connectedCallback() {
        members(this).shadowRoot = this.attachShadow({mode: "closed"});
        members(this).shadowRoot.innerHTML = HTML;
        if (members(this).color) {
            members(this).shadowRoot.querySelector("#frame").style.backgroundColor = members(this).color;
        }

        if (members(this).width) {
            updateFrame(this);
        }

        if (members(this).height) {
            updateFrame(this);
        }

        if (members(this).src) {
            updateFrame(this);
        }

    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    get width() {
        return members(this).width;
    }

    set width(width) {
        members(this).width = width;
        updateFrame(this);
    }

    get height() {
        return members(this).height;
    }

    set height(height) {
        members(this).height = height;
        updateFrame(this);
    }

    get color() {
        return members(this).color;
    }

    set color(color) {
        members(this).color = color;
        const shadowRoot = members(this).shadowRoot;
        if (shadowRoot) {
            shadowRoot.querySelector("#frame").style.backgroundColor = color;
        }
    }

    get src() {
        return members(this).src;
    }

    set src(src) {
        members(this).src = src;
        updateFrame(this);
    }


}

customElements.define("archer-frame", ArcherFrame);