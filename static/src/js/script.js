import {tabs} from './modules/tabs.js';
import {slider} from './modules/slider.js';
import {timer} from './modules/timer.js';
import {modal} from './modules/modal.js';
import {cards} from './modules/cards.js';
import {forms} from './modules/forms.js';
import {calculator} from './modules/calculator.js';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    slider();
    timer();
    modal();
    cards();
    forms();
    calculator();
})