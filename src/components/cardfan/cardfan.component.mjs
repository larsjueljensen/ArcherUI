
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
            -webkit-transition: -webkit-transform 0.35s ease;
            -moz-transition: transform 0.35s ease;
            -o-transition: transform 0.35s ease;
            transition: transform 0.35s ease;     
            pointer-events: all;       
        }
        
    </style>
`;

const html = `
    ${style}
    <slot></slot>
`;

const onCardSelect = (event) => {
    event.stopPropagation();
    const card = event.target;
    card.fan.dispatchEvent(new CustomEvent("cardselect", {detail: card}));
}

const onCardEnter = (event) => {
    const card = event.target;
    const radians = card.angle * (Math.PI / 180);
    const dx = Math.sin(radians) * 4 * window.innerHeight / 100;
    const dy = -Math.cos(radians) * 4 * window.innerHeight / 100;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${card.angle}deg)`;
    card.addEventListener('click', onCardSelect);
}

const onCardLeave = (event) => {
    const card = event.target;
    card.style.transform = `rotate(${card.angle}deg)`;
    card.removeEventListener('click', onCardSelect);
}

const updateCardPositions = (cardfanElement) => {
    const spreadAngle = 5.0;
    const cards = cardfanElement.querySelectorAll('archer-card');
    const startAngle = (cards.length - 1) * (- (spreadAngle / 2));
    cards.forEach((card, index) => {
        const angle = startAngle + (index * spreadAngle);
        card.fan = cardfanElement;
        card.angle = angle;
        card.style.transform = `rotate(${angle}deg)`;
        card.style.transformOrigin = '50% 160%';
        card.addEventListener('mouseenter', onCardEnter);
        card.addEventListener('mouseleave', onCardLeave);
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

    get numCards() {
        return this.querySelectorAll('archer-card').length;
    }

    addCard(card) {
        this.appendChild(card);
    }

    removeCard(card) {
        this.removeChild(card);
    }

    clear() {
        this.replaceChildren();
    }

}

customElements.define('archer-card-fan', ArcherCardFan);