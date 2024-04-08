import './components/frame/frame.component.mjs'
import './components/card/card.component.mjs'
import './components/cardfan/cardfan.component.mjs'
import './components/carddeck/carddeck.component.mjs'
import './components/scrolltext/scrolltext.component.mjs'
import './components/fonts/fontface.component.mjs'


const components = [
    {tagName: 'archer-frame'},
    {tagName: 'archer-card'},
    {tagName: 'archer-card-fan'},
    {tagName: 'archer-card-deck'},
    {tagName: 'archer-font-face'}
]

const archer = {
    whenReady: async function () {
        return Promise.any(components.map(component => customElements.whenDefined(component.tagName)));
    }
};

((win) => {
    win.archer = archer;
})(window);

