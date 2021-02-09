import '../reset.css'
import '../style.css'

import './mango.js'

import { asciiArt } from './asciiArt.const'

const $headerTitle = document.querySelectorAll('.a-header-title');

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

const randomTitle = () => {
    const randomNumber = getRndInteger(0, 9);

    $headerTitle[randomNumber].classList.add('visible')
}

const init = () => {
    randomTitle()
}

init()
