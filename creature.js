'use strict'
import * as job from './jobs.js'

class Creature {
    constructor({
        name,
        hp,
        atk,
        def,
        spd
    }) {
        this.name = name
        this.hp = this.max_hp = hp
        this.atk = atk
        this.def = def
        this.spd = spd
    }
    be_atked(atk) {
        let dmg = atk - this.def
        // console.log(`dmg: ${dmg}`)
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
        job_id,
        hp,
        atk,
        def,
        spd,
        str,
        dex,
        vit,
        int,
        ap
    }) {
        super({
            name,
            hp,
            atk,
            def,
            spd
        })
        this.job_id = job_id
        this.str = str
        this.dex = dex
        this.vit = vit
        this.int = int
        this.ap = 0
        this.lv = 1
        this.exp = 0
    }
    be_healed(nhp) {
        // 完全恢复
        if (nhp == 'full') {
            this.hp = this.max_hp
            return false
        }
        if (this.hp + nhp > this.max_hp) {
            console.log(`${this.name} 恢复了 ${this.max_hp - this.hp} 生命值`)
            this.hp = this.max_hp
        } else {
            this.hp += nhp
            console.log(`${this.name} 恢复了 ${nhp} 生命值`)
        }
    }
    add_ap(target) {
        if (this.ap <=0 ) {
            return false
        }
        this[target] += 1
        this.ap -= 1
    }
}

export {
    Character
}