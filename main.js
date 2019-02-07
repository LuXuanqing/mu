'use strict'
import { Character } from './creature.js'

const app = new Vue({
    el: '#app',
    data: {
        character: null,
        monster: null,
        devtools: {
            atk: 40,
            heal: 50,
        },
    },
    created () {
        this.character = new Character('老子是魔法师', 100, 20, 20)
    }
})