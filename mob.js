`use strict`
const mob_init = {
    100: {
        mob_id: 100,
        name: '蜘蛛',
        max_hp: 50,
        atk: 5,
        def: 5,
        spd: 10,
        exp: 10,
    },
    200: {
        mob_id: 200,
        name: '巨人',
        max_hp: 200,
        atk: 20,
        def: 30,
        spd: 10,
        exp: 50,
    },
    300: {
        mob_id: 300,
        name: '雪人王',
        max_hp: 400,
        atk: 60,
        def: 80,
        spd: 10,
        exp: 100,
    },
    90000: {
        mob_id: 90000,
        name: '木头人',
        max_hp: 50000000,
        atk: 0,
        def: 0,
        spd: 10,
        exp: 0,
    }
}

const mob = new Vue({
    el: '#mobel',
    data: {
        mob_id: null,
        name: null,
        hp: null,
        max_hp: null,
        atk: null,
        def: null,
        spd: null,
        exp: null,
        tools: {
            mob_id: 100,
            mob_init: mob_init,
        }
    },
    methods: {
        spawn(mob_id) {
            Object.assign(this, mob_init[this.tools.mob_id])
            this.hp = this.max_hp
            console.info(`野生的${this.name}出现了`)
        },
        take_dmg: creature.take_dmg,
        dmg: creature.dmg,
        test() {
            console.log(chara)
        }
    },
    computed: {
        is_alive() {
            return this.hp > 0
        }
    },
    watch: {
        is_alive(val) {
            if (val === false) {
                chara.exp += this.exp
                this.spawn(this.tools.mob_id)
            }
        }
    },
    created() {
        this.spawn(this.tools.mob_id)
    },
})
