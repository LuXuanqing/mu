'use strict'

const init = {
    '100': {
        name: '魔法师',
        hp: 100,
        atk: 10,
        def: 10,
        spd: 10,
        str: 10,
        dex: 20,
        vit: 10,
        int: 30,
        equiptments: null,
        skills: null,
    }
}
// 各职业属性成长
const growth = {
    '100': {
        ap_per_lv: 5,
        hp_per_lv: 10,
        hp_per_vit: 5,
        def_per_dex: 1,
        spd_per_dex: 0.1,
        atk_per_int: 1,
    }
}

export {init, growth}