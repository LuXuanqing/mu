'use strict'
class Creature {
    constructor(hp, atk, def) {
        this.hp = this.max_hp = hp
        this.atk = atk
        this.def = def
    }
    be_attacked(atk) {
        let dmg = atk - this.def
        // console.log(`dmg: ${dmg}`)
        // 如果伤害值<=0则终止
        if (dmg <= 0) return false
        // 如果伤害>=当前生命值，挂掉
        if (dmg >= this.hp) {
            console.log(`${this.name} died`)
            this.hp = this.max_hp
        } else {
            this.hp -= dmg
            console.log(`${this.name} 受到了 ${dmg} 伤害`)
        }
    }
    be_healed(nhp) {
        if (this.hp + nhp > this.max_hp) {
            console.log(`${this.name} 恢复了 ${this.max_hp - this.hp} 生命值`)
            this.hp = this.max_hp
        } else {
            this.hp += nhp
            console.log(`${this.name} 恢复了 ${nhp} 生命值`)
        }
    }
}
class Character extends Creature {
    constructor(name, hp, atk, def) {
        super(hp, atk, def)
        this.name = name
    }
}

export { Character }