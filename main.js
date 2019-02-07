'use strict'
import {
    Character
} from './creature.js'
import * as job from './jobs.js'

const app = new Vue({
    el: '#app',
    data: {
        character: null,
        monster: null,
        devtools: {
            atk: 40,
            heal: 50,
            ap: 10,
        },
    },
    methods: {
        p(val) {
            console.log(val)
        }
    },
    created() {
        this.character = new Character(job.init['100'],'法爷大人')
    },
    watch: {
        'character.int': function () {
            this.character.atk = this.character.int
        }
    }
    
})