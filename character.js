 `use strict`
 // 各职业初始属性
 const job_init = {
     100: {
         name: '魔法师',
         job_id: 100,
         lv: 1,
         exp: 0,
         str: 10,
         dex: 10,
         vit: 10,
         int: 20,
         ap: 0,
         skills: null,
         equiptments: null,
         max_hp: 100,
         atk: 10,
         def: 10,
         spd: 10,
     }
 }
 // 各职业属性成长
 const job_grow = {
     100: {
         ap_per_lv: 5,
         hp_per_lv: 10,
         hp_per_vit: 5,
         def_per_dex: 1,
         spd_per_dex: 0.1,
         atk_per_int: 2,
     }
 }


 const chara = new Vue({
     el: '#charael',
     data: {
         name: '老子是法爷',
         job_id: 100,
         lv: 1,
         exp: 0,
         str: 10,
         dex: 10,
         vit: 10,
         int: 20,
         ap: 0,
         skills: null,
         equiptments: null,
         hp: 100,
     },
     methods: {
         save(key = 'character') {
             let data_str = JSON.stringify(this._data)
             if (data_str) {
                 localStorage.setItem(key, data_str)
                 console.info('存档成功')
                 return true
             } else {
                 console.error('存档失败')
                 return false
             }
         },
         load(key = 'character') {
            let data_str = localStorage.getItem(key)
            if (data_str) {
                let data = JSON.parse(data_str)
                Object.assign(this, data)
                console.info('读档成功')
                return true
            } else {
                console.error('读档失败')
                return false
            }
         },
         heal(val) {
             if (val == 'full') { // 完全恢复
                 this.hp = this.max_hp
             } else if (val > 0) { // 定额恢复
                 let hp_old = this.hp //记住治疗前的血量，用于计算治疗量
                 let hp_attemp = this.hp + val
                 this.hp = Math.min(hp_attemp, this.hp_max)
                 console.log(`${this.name}恢复了${this.hp - hp_old}生命值`)
             }
         },
         add_ap(target, val) {
             val = parseInt(val)
             if (typeof (val) !== 'number') return false
             if (this.ap < val) return false
             this[target] += val
             this.ap -= val
         },
         lv_up() {
             if (this.exp < this.next_exp) return false
             this.exp -= this.next_exp
             this.lv += 1
             this.ap += job_grow[this.job_id].ap_per_lv
             this.heal('full')
             console.info(`${this.name}升到了${this.lv}级`)
         },
         take_dmg: creature.take_dmg,
         dmg: creature.dmg,

     },
     computed: {
         next_exp() {
             return this.lv * 10
         },
         job() {
             return job_init[this.job_id].name
         },
         is_alive() {
             return this.hp > 0
         },
         atk() {
             return job_init[this.job_id].atk + job_grow[this.job_id].atk_per_int * (this.int - job_init[
                 this.job_id].int)
         },
         def() {
             return job_init[this.job_id].def + job_grow[this.job_id].def_per_dex * (this.dex - job_init[
                 this.job_id].dex)
         },
         spd() {
             return job_init[this.job_id].spd + job_grow[this.job_id].spd_per_dex * (this.dex - job_init[
                 this.job_id].dex)
         },
         max_hp() {
             return job_init[this.job_id].max_hp + job_grow[this.job_id].hp_per_lv * (this.lv - 1) +
                 job_grow[this.job_id].hp_per_vit * (this.vit - job_init[this.job_id].vit)
         }
     },
     watch: {
        exp: function (val, val_old) {
            if (val_old && val > val_old) {
                console.info(`${this.name}获得了${val - val_old}经验值`)
            }
            if (val >= this.next_exp) {
                this.lv_up()
            }
        }
     },
     created() {
         let rtn = this.load()
        //  如果读取失败则初始化角色
        //  if (!rtn) {
             
        //  }
     }

 })
