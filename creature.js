'use strict'
import * as jobs from './jobs.js'

class Creature {
    constructor({
        name,
        hp,
        atk,
        def,
        spd
    }) {
        this.name = name
        this._hp = this.max_hp = hp
        this.atk = atk
        this.def = def
        this.spd = spd
    }
    get is_alive() {
        return this.hp > 0
    }
    be_atked(atk) {
        let dmg = atk - this.def
        // 如果伤害值<=0则终止
        if (dmg <= 0) return 0
        // 如果伤害>=当前生命值，挂掉
        if (dmg >= this.hp) {
            console.log(`${this.name} 挂了`)
            this.hp = 0
            return -1
        } else {
            this.hp -= dmg
            console.log(`${this.name} 受到了 ${dmg} 伤害`)
            return dmg
        }
    }
}


class Character extends Creature {
    constructor({
        name,
        hp,
        atk,
        def,
        spd,
        job_id,
        str,
        dex,
        vit,
        int,
        ap = 0,
        lv = 1,
        exp = 0,
        max_hp,
    }) {
        super({
            name,
            hp,
            atk,
            def,
            spd
        })
        this.max_hp = max_hp
        this.job_id = job_id
        this.str = str
        this.dex = dex
        this.vit = vit
        this.int = int
        this.ap = ap
        this.lv = lv
        this.exp = exp
    }
    get hp() {
        return this._hp
    }
    set hp(val) {
        this._hp = Math.min(val, this.max_hp)
    }
    be_healed(nhp) {
        let hp_old = this.hp //记住治疗前的血量，用于计算治疗量
        if (nhp == 'full') { // 完全恢复
            this.hp = this.max_hp
        }else if (nhp > 0) { // 定额恢复
            this.hp += nhp
        }
        let hp_healed = this.hp - hp_old
        console.log(`${this.name}恢复了${hp_healed}生命值`)
    }
    add_ap(target) {
        if (this.ap <= 0) {
            return false
        }
        this[target] += 1
        this.ap -= 1
    }
    lv_up() {
        this.lv += 1
        this.ap += jobs.grow[this.job_id].ap_per_lv
        this.exp = 0
        this.calc('max_hp')
        this.be_healed('full')
        // TODO: 升级多余的经验保留到下一级
    }
    calc(target) {
        let init = jobs.init[this.job_id]
        let grow = jobs.grow[this.job_id]
        switch (target) {
            case 'max_hp':
                this.max_hp = init.hp + grow.hp_per_lv * (this.lv - 1) + grow.hp_per_vit * (this.vit - init.vit)
                break
            case 'atk':
                this.atk = init.atk + grow.atk_per_int * (this.int - init.int)
                break
            case 'def':
                this.def = init.def + grow.def_per_dex * (this.dex - init.dex)
                break
            case 'spd':
                this.spd = init.spd + grow.spd_per_dex * (this.dex - init.dex)
                break
                // TODO: 不同角色不同成长
                // TODO：装备影响
        }
    }
}

export {
    Character
}