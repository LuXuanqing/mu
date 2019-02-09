'use strict'
import {
    Character,
    Mob
} from './creature.js'
import * as jobs from './jobs.js'
import * as mobs from './mobs.js'

const app = new Vue({
    el: '#app',
    data: {
        character: null,
        mob: null,
        devtools: {
            atk: 40,
            heal: 50,
            ap: 10,
            mob_id: 90000,
            is_auto_respawn: true,
        },
    },
    methods: {
        save() {
            let data = this.character
            if (!data) {
                console.error('save data doesnt exist')
                return false
            }
            localStorage.setItem('save0', JSON.stringify(data))
            if (localStorage.getItem('save0')) {
                console.info('存档成功')
                return true
            } else {
                console.error('存档失败')
                return false
            }
        },
        load() {
            let data_str = localStorage.getItem('save0')
            if (data_str) {
                let data = JSON.parse(data_str)
                this.character = new Character(data)
                console.info('读档成功')
                return true
            } else {
                console.error('读档失败')
                return false
            }
        },
        spawn_character(job_id = 100, name = '测试号') {
            let job_info = jobs.init[job_id]
            job_info.name = name
            this.character = new Character(job_info)
        },
        p(val) {
            console.log(this.character.dmg_interval)
        },
        spawn_enemy(mob_id) {
            let mob_info = mobs.init[mob_id]
            this.mob = new Mob(mob_info)
            console.info(`野生的${this.mob.name}出现了`)
        },
    },
    created() {
        // 读档失败则新建角色
        if (!this.load()) {
            spawn_character()
        }
        this.spawn_enemy(this.devtools.mob_id)
    },
    mounted() {
        setInterval(() => this.save(), 30000)
    },
    watch: {
        'character.int': function () {
            this.character.calc('atk')
        },
        'character.dex': function () {
            this.character.calc('def')
            this.character.calc('spd')
        },
        'character.vit': function () {
            this.character.calc('max_hp')
        },
        'character.max_hp': function (val, oldVal) {
            let delta = val - oldVal
            if (delta > 0) {
                this.character.hp += delta
            }
        },
        'mob.is_alive': function (val) {
            if (val == false) {
                this.mob = null
                if (this.devtools.is_auto_respawn) {
                    this.spawn_enemy(this.devtools.mob_id)
                }
            }
        },
        'character.exp': function (val) {
            if (val >= this.character.next_exp) {
                this.character.lv_up()
            }
        }
    }

})