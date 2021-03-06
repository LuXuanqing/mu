'use strict'
const vm = new Vue({
    el: '#appel',
    data: {
        chara: chara,
        mob: mob,
        is_auto_battle: true,
    },
    methods: {
        dmg(atker, defer) {
            if (!atker.is_alive) {
                console.log(`${atker.name}已经死了，死人是不会攻击的`)
                return false
            }
            if (!defer.is_alive) {
                console.log(`${defer.name}已经死了，别打了`)
                return false
            }
            let rtn = defer.take_dmg(atker)
            if (rtn == 0) {
                console.log(`${defer.name}完美防御了${atker.name}的攻击`)
            } else if (rtn > 0) {
                console.log(`${atker.name}对${defer.name}造成了${rtn}伤害`)
            } else if (rtn == -1) {
                console.log(`${atker.name}击杀了${defer.name}`)
            }
        },
        auto_battle() {
            let loop_dmg = (atker, defer) => {
                if (this.is_auto_battle) {
                    this.dmg(atker, defer)
                    setTimeout(() => {
                        loop_dmg(atker, defer)
                    }, atker.cd);
                }
            }
            loop_dmg(this.chara, this.mob)
            loop_dmg(this.mob, this.chara)
        }
    }
})