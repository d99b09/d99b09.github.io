const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const color = require('../../util/color');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

class miomouse {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'miomouse',
            name: 'MioMouse',
            blocks: [
                {
                    opcode: "moveMouseBySpeed",
                    blockType: BlockType.COMMAND,
                    text: "Двигать мышь [direction] со скоростью [speed]",
                    arguments: {
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "directionMenu"
                        },
                        speed: {
                            type: ArgumentType.NUMBER,
                            default: 0
                        }
                    }
                },
                {
                    opcode: "oneclick",
                    blockType: BlockType.COMMAND,
                    text: "Одиночный клик",
                },
                {
                    opcode: "dubleclick",
                    blockType: BlockType.COMMAND,
                    text: "Двойной клик",
                },
                {
                    opcode: "press",
                    blockType: BlockType.COMMAND,
                    text: "Зажать клик",
                },
                {
                    opcode: "release",
                    blockType: BlockType.COMMAND,
                    text: "Отжать клик",
                },
                {
                    opcode: "stopMouse",
                    blockType: BlockType.COMMAND,
                    text: "Остановить мышь",
                },
            ],
            menus: {
                directionMenu: [
                    "Вверх",
                    "Вниз",
                    "Влево",
                    "Вправо"
                ],
                axisMenu: [
                    "Вертикаль",
                    "Горизонталь"
                ]


            }
        };
    }
 
    moveMouseBySpeed (args) {
        if (args.direction == "Вверх"){
            let urlBase = 'http://127.0.0.1:5000/move_mouse_by_speed/up/' + args.speed + '/'
        } else if (args.direction == "Вниз"){
            let urlBase = 'http://127.0.0.1:5000/move_mouse_by_speed/down/' + args.speed + '/'
        } else if (args.direction == "Влево"){
            let urlBase = 'http://127.0.0.1:5000/move_mouse_by_speed/left/' + args.speed + '/'
        } else {
            let urlBase = 'http://127.0.0.1:5000/move_mouse_by_speed/right/' + args.speed + '/'
        }
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise
    }
    oneclick(){
        let urlBase = 'http://127.0.0.1:5000/one_click/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise
    }
    dubleclick(){
        let urlBase = 'http://127.0.0.1:5000/two_click/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise
    }
    press(){
        let urlBase = 'http://127.0.0.1:5000/press/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise
    }
    release(){
        let urlBase = 'http://127.0.0.1:5000/release/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
        .then(response => response.text())
    return miodataPromise
    }
    stopMouse(){
        let urlBase = 'http://127.0.0.1:5000/move_mouse/stop/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
        .then(response => response.text())
    return miodataPromise
    }
    
}

module.exports = miomouse;