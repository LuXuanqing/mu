'use strict'
const creature = {
    take_dmg(atker) {
        let dmg = atker.atk - this.def
        // 如果伤害值<=0则终止
        if (dmg <= 0) return 0
        // 如果伤害>=当前生命值，挂掉
        if (dmg >= this.hp) {
            // console.log(`${this.name} 挂了`)
            this.hp = 0
            return -1
        } else {
            this.hp -= dmg
            // console.log(`${this.name} 受到了 ${dmg} 伤害`)
            return dmg
        }
    },
    dmg(tgt) {
        let rtn = tgt.take_dmg(this)
        if (rtn == 0) {
            console.log(`${tgt.name}完美防御了${this.name}的攻击`)
        } else if (rtn > 0) {
            console.log(`${this.name}对${tgt.name}造成了${rtn}伤害`)
        } else if (rtn == -1) {
            this.exp = parseInt(this.exp) + tgt.exp
            console.log(`${this.name}击杀了${tgt.name}，获得${tgt.exp}经验值`)
        }
    },
    test() {
        console.log(this)
    }
}