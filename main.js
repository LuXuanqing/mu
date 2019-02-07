'use strict'
import {
    Character
} from './creature.js'
import * as jobs from './jobs.js'

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
        save() {
            localStorage.setItem('save0', JSON.stringify(this.character))
            if (localStorage.getItem('save0')) {
                console.info('存档成功')
            } else {
                console.error('存档失败')
            }
        },
        load() {
            let data = localStorage.getItem('save0')
            if (data) {
                this.character = JSON.parse(data)
                console.info('读档成功')
            } else {
                console.error('读档失败')
            }
        },
        p(val) {
            console.log(val)
        }
    },
    created() {
        this.character = new Character(jobs.init['100'],'法爷大人')
    },
    watch: {
        'character.int': function () {
            this.character.calc('atk')
        },
        'character.dex': function() {
            this.character.calc('def')
            this.character.calc('spd')
        },
        'character.vit': function () {
            this.character.calc('max_hp')
        },
        'character.max_hp': function (val, oldVal) {
            let delta = val - oldVal
            console.log(delta)
            if (delta > 0) {
                this.character.hp2 += delta
            }
        }
    }
    
})