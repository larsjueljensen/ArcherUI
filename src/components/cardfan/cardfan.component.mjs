
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const style = `
    <style>
        :host {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 0px;
          justify-content: center;
        }
        
        ::slotted(archer-card) {
            position: absolute;
            -webkit-transition: -webkit-transform 0.5s ease;
            -moz-transition: transform 0.5s ease;
            -o-transition: transform 0.5s ease;
            transition: transform 0.5s ease;     
            pointer-events: all;       
        }
        
        ::slotted(archer-card:hover) {
            top: -4vh;
        }

    </style>
`;

const html = `
    ${style}
    <slot></slot>
`;

const updateCardPositions = (cardfanElement) => {
    const spreadAngle = 5.0;
    const cards = cardfanElement.querySelectorAll('archer-card');
    const startAngle = (cards.length - 1) * (- (spreadAngle / 2));
    cards.forEach((card, index) => {
        const angle = startAngle + (index * spreadAngle);
        card.style.transform = `rotate(${angle}deg)`;
        card.style.transformOrigin = '50% 160%';
    });
}


class ArcherCardFan extends HTMLElement {

    static observedAttributes = [];

    constructor() {
        super();
        members(this).observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    updateCardPositions(this);
                }
            }
        });
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: "closed"});
        members(this).shadowRoot = shadowRoot;
        shadowRoot.innerHTML = html;

        if (this.isConnected) {
            updateCardPositions(this);
        }

        members(this).observer.observe(this, {childList: true});
    }
}

customElements.define('archer-card-fan', ArcherCardFan);