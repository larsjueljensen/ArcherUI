import cardData from './assets/cards.svg'

const svgNamespaceURI = "http://www.w3.org/2000/svg";

const instanceMembers = new WeakMap();
const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const CARD_IDS = {
    clubs: {
        A: 'CLUB-1', 2: 'CLUB-2', 3: 'CLUB-3', 4: 'CLUB-4', 5: 'CLUB-5', 6: 'CLUB-6', 7: 'CLUB-7', 8: 'CLUB-8',
        9: 'CLUB-9', 10: 'CLUB-10', J: 'CLUB-11-JACK', Q: 'CLUB-12-QUEEN', K: 'CLUB-13-KING'
    },
    hearts: {
        A: 'HEART-1', 2: 'HEART-2', 3: 'HEART-3', 4: 'HEART-4', 5: 'HEART-5', 6: 'HEART-6', 7: 'HEART-7', 8: 'HEART-8',
        9: 'HEART-9', 10: 'HEART-10', J: 'HEART-11-JACK', Q: 'HEART-12-QUEEN', K: 'HEART-13-KING'
    },
    spades: {
        A: 'SPADE-1', 2: 'SPADE-2', 3: 'SPADE-3', 4: 'SPADE-4', 5: 'SPADE-5', 6: 'SPADE-6', 7: 'SPADE-7', 8: 'SPADE-8',
        9: 'SPADE-9', 10: 'SPADE-10', J: 'SPADE-11-JACK', Q: 'SPADE-12-QUEEN', K: 'SPADE-13-KING'
    },
    diamonds: {
        A: 'DIAMOND-1', 2: 'DIAMOND-2', 3: 'DIAMOND-3', 4: 'DIAMOND-4', 5: 'DIAMOND-5', 6: 'DIAMOND-6', 7: 'DIAMOND-7', 8: 'DIAMOND-8',
        9: 'DIAMOND-9', 10: 'DIAMOND-10', J: 'DIAMOND-11-JACK', Q: 'DIAMOND-12-QUEEN', K: 'DIAMOND-13-KING'
    }
};

const cardId = (suit, value) => {
    return CARD_IDS[suit][value];
}

const HTML = `
    <style>
    </style>
`;

const CARD_WIDTH = 216;
const CARD_HEIGHT = 268;

const SVGSTYLE = `
  .cls-1 { font-family: ArialMT, Arial; font-size: 24.0766px; }
  .cls-1, .cls-2 { isolation: isolate; }
  .cls-3 { fill: #004c97; }
  .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9 { stroke-width: 0px; }
  .cls-5 { fill: #ff0; } .cls-6 { fill: white; stroke: #000; stroke-width: 1.83px; }
  .cls-10 { fill: none; stroke: #000; stroke-width: 1.83px; }
  .cls-7 { fill: #100f08; }
  .cls-8 { fill: #c8102e; }
  .cls-9 { fill: #ffcd00; }  
  #CLUB-1 { transform: translate(-${CARD_WIDTH * 0}px, 0px); }
  #CLUB-2 { transform: translate(-${CARD_WIDTH * 1}px, 0px); }
  #CLUB-3 { transform: translate(-${CARD_WIDTH * 2}px, 0px); }
  #CLUB-4 { transform: translate(-${CARD_WIDTH * 3}px, 0px); }
  #CLUB-5 { transform: translate(-${CARD_WIDTH * 4}px, 0px); }
  #CLUB-6 { transform: translate(-${CARD_WIDTH * 5}px, 0px); }
  #CLUB-7 { transform: translate(-${CARD_WIDTH * 6}px, 0px); }
  #CLUB-8 { transform: translate(-${CARD_WIDTH * 7}px, 0px); }
  #CLUB-9 { transform: translate(-${CARD_WIDTH * 8}px, 0px); }
  #CLUB-10 { transform: translate(-${CARD_WIDTH * 9}px, 0px); }
  #CLUB-11-JACK { transform: translate(-${CARD_WIDTH * 10}px, 0px); }
  #CLUB-12-QUEEN { transform: translate(-${CARD_WIDTH * 11}px, 0px); }
  #CLUB-13-KING { transform: translate(-${CARD_WIDTH * 12}px, 0px); }
  #HEART-1 { transform: translate(-${CARD_WIDTH * 0}px, -${CARD_HEIGHT * 1}px); }
  #HEART-2 { transform: translate(-${CARD_WIDTH * 1}px, -${CARD_HEIGHT * 1}px); }
  #HEART-3 { transform: translate(-${CARD_WIDTH * 2}px, -${CARD_HEIGHT * 1}px); }
  #HEART-4 { transform: translate(-${CARD_WIDTH * 3}px, -${CARD_HEIGHT * 1}px); }
  #HEART-5 { transform: translate(-${CARD_WIDTH * 4}px, -${CARD_HEIGHT * 1}px); }
  #HEART-6 { transform: translate(-${CARD_WIDTH * 5}px, -${CARD_HEIGHT * 1}px); }
  #HEART-7 { transform: translate(-${CARD_WIDTH * 6}px, -${CARD_HEIGHT * 1}px); }
  #HEART-8 { transform: translate(-${CARD_WIDTH * 7}px, -${CARD_HEIGHT * 1}px); }
  #HEART-9 { transform: translate(-${CARD_WIDTH * 8}px, -${CARD_HEIGHT * 1}px); }
  #HEART-10 { transform: translate(-${CARD_WIDTH * 9}px, -${CARD_HEIGHT * 1}px); }
  #HEART-11-JACK { transform: translate(-${CARD_WIDTH * 10}px, -${CARD_HEIGHT * 1}px); }
  #HEART-12-QUEEN { transform: translate(-${CARD_WIDTH * 11}px, -${CARD_HEIGHT * 1}px); }
  #HEART-13-KING { transform: translate(-${CARD_WIDTH * 12}px, -${CARD_HEIGHT * 1}px); }
  #SPADE-1 { transform: translate(-${CARD_WIDTH * 0}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-2 { transform: translate(-${CARD_WIDTH * 1}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-3 { transform: translate(-${CARD_WIDTH * 2}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-4 { transform: translate(-${CARD_WIDTH * 3}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-5 { transform: translate(-${CARD_WIDTH * 4}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-6 { transform: translate(-${CARD_WIDTH * 5}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-7 { transform: translate(-${CARD_WIDTH * 6}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-8 { transform: translate(-${CARD_WIDTH * 7}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-9 { transform: translate(-${CARD_WIDTH * 8}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-10 { transform: translate(-${CARD_WIDTH * 9}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-11-JACK { transform: translate(-${CARD_WIDTH * 10}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-12-QUEEN { transform: translate(-${CARD_WIDTH * 11}px, -${CARD_HEIGHT * 2}px); }
  #SPADE-13-KING { transform: translate(-${CARD_WIDTH * 12}px, -${CARD_HEIGHT * 2}px); }
  #DIAMOND-1 { transform: translate(-${CARD_WIDTH * 0}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-2 { transform: translate(-${CARD_WIDTH * 1}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-3 { transform: translate(-${CARD_WIDTH * 2}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-4 { transform: translate(-${CARD_WIDTH * 3}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-5 { transform: translate(-${CARD_WIDTH * 4}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-6 { transform: translate(-${CARD_WIDTH * 5}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-7 { transform: translate(-${CARD_WIDTH * 6}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-8 { transform: translate(-${CARD_WIDTH * 7}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-9 { transform: translate(-${CARD_WIDTH * 8}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-10 { transform: translate(-${CARD_WIDTH * 9}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-11-JACK { transform: translate(-${CARD_WIDTH * 10}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-12-QUEEN { transform: translate(-${CARD_WIDTH * 11}px, -${CARD_HEIGHT * 3}px); }
  #DIAMOND-13-KING { transform: translate(-${CARD_WIDTH * 12}px, -${CARD_HEIGHT * 3}px); }
`;

class ArcherCard extends HTMLElement {

    static observedAttributes = ['suit', 'value']

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'suit': this.suitChangedCallback(oldValue, newValue); break;
            case 'value': this.valueChangedCallback(oldValue, newValue); break;
        }
    }

    suitChangedCallback(oldValue, newValue) {
        members(this).suit = newValue;
        this.updateFace();
    }

    valueChangedCallback(oldValue, newValue) {
        members(this).value = newValue;
        this.updateFace();
    }

    updateFace() {
        const suit = members(this).suit;
        const value = members(this).value;
        const gCard = members(this).gCard;
        if (suit && value && gCard) {
            gCard.replaceChildren(members(this).hiddenSvg.querySelector(`#${cardId(suit, value)}`).cloneNode(true));
        }
    }

    connectedCallback() {

        members(this).shadowRoot = this.attachShadow({mode: "closed"});
        members(this).hiddenSvg = document.createElement('div');
        members(this).hiddenSvg.innerHTML = `${cardData}`;

        const svg = document.createElementNS(svgNamespaceURI, "svg");
        const defs = document.createElementNS(svgNamespaceURI, "defs");
        const style = document.createElementNS(svgNamespaceURI, "style");
        const gCard = document.createElementNS(svgNamespaceURI, "g");
        gCard.id = 'gCard';

        style.innerHTML = SVGSTYLE;
        defs.appendChild(style);
        svg.appendChild(defs);
        svg.style.position = 'relative';
        svg.style.inset = '0px';
        svg.setAttribute("viewBox", "0 0 180 252")
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
        svg.appendChild(gCard);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");


        const componentStyle = document.createElement('style');
        componentStyle.innerHTML = ':host { display: inline; width: 350px; }';

        members(this).shadowRoot.appendChild(componentStyle);
        members(this).shadowRoot.appendChild(svg);
        members(this).gCard = gCard;

        this.updateFace();
    }


}

customElements.define('archer-card', ArcherCard);
window.ArcherCard = ArcherCard;


class Test {

}