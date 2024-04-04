
const instanceMembers = new WeakMap();

const members = (instance) => {
    let members = instanceMembers.get(instance);
    if (members) return members;
    return instanceMembers.set(instance, {}).get(instance);
}

const toBoolean = (value) => {
    if (typeof (value) === 'string') {
        return ['y', 'yes', 'true', '1', 'on', 'enabled'].includes(value.trim().toLowerCase());
    }
    return Boolean(value);
}

class ArcherCardDeck extends HTMLElement {

    static observedAttributes = ['jokers'];

    constructor() {
        super();
        members(this).normalCards = ['clubs', 'hearts', 'spades', 'diamonds'].flatMap(suit =>
            ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].map(value => ({suit, value})));
        members(this).jokerCards = [{suit: 'joker', value: 1}, {suit: 'joker', value: 2}, {suit: 'joker', value: 3}];
    }

    connectedCallback() {}


    init() {
        members(this).cards = [...(members(this).normalCards)];
        if (members(this).useJokers) {
            members(this).cards.push(...(members(this).jokerCards));
        }
    }

    clear() {
        members(this).cards = undefined;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'jokers': this.jokersChangedCallback(oldValue, newValue); break;
        }
    }

    jokersChangedCallback(oldValue, newValue) {
        if (members(this).cards) {
            throw {type: 'PLAYING', msg: 'Can not change if jokers are to be included or not after the deck is initialized'};
        }
        members(this).useJokers = toBoolean(newValue);
    }

    hasMoreCards() {
        const cards = members(this).cards;
        if (cards) {
            return cards.length > 0;
        }
        throw {type: 'NOINIT', msg: 'Deck is not initialized. Please call init() or shuffle() first.'};
    }

    get numCards() {
        return members(this).cards.length;
    }

    nextCard() {
        const cards = members(this).cards;
        if (cards) {
            if (cards.length > 0) {
                const card = cards.splice(0, 1)[0];
                const cardElement = document.createElement('archer-card');
                cardElement.setAttribute('suit', card.suit);
                cardElement.setAttribute('value', card.value);
                return cardElement;
            }
            throw {type: 'EMPTY', msg: 'Deck is empty. No more cards available.'}
        }
        else {
            throw {type: 'NOINIT', msg: 'Deck is not initialized. Please call init() or shuffle() first.'};
        }
    }

    shuffle() {
        let cards = members(this).cards;
        if (! cards) {
            this.init();
            cards = members(this).cards;
        }

        members(this).cards = cards.map(v => ({v, s: Math.random()}))
            .sort((a,b) => a.s - b.s)
            .map(({v}) => v);
    }

}

customElements.define('archer-card-deck', ArcherCardDeck);