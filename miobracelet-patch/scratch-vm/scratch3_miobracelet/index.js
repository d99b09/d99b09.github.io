const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const color = require('../../util/color');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

/**
 * How long to wait in ms before timing out requests to translate server.
 * @type {int}
 */
const serverTimeoutMs = 10000; // 10 seconds (chosen arbitrarily).

class miobracelet {
    constructor () {
        /**
         * The result from the most recent translation.
         * @type {string}
         * @private
         */
        this._miobanddeta = '';
    }

    getInfo () {
        return {
            id: 'miobracelet',
            name: 'MioBracelet',
            blocks: [
                {
                    opcode: 'miobandstate',
                    blockType: BlockType.REPORTER,
                    text: 'Состояние браслета',
                },
                {
                    opcode: "band_connect",
                    blockType: BlockType.COMMAND,
                    text: "Подключится к браслету под именем [address]",
                    arguments: {
                        address: {
                            type: ArgumentType.STRING,
                            default: ""
                        }
                    }
                },
                {
                    opcode: 'usbport',
                    blockType: BlockType.REPORTER,
                    text: 'Порты',
                },
                {
                    opcode: "usbportconect",
                    blockType: BlockType.COMMAND,
                    text: "Подключиться к USB устройству на порту [port]",
                    arguments: {
                        port: {
                            type: ArgumentType.STRING,
                            default: ""
                        }
                    }
                },
                {
                    opcode: "isslant",
                    blockType: BlockType.BOOLEAN,
                    text: "Есть наклон [direction]?",
                    arguments: {
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "directionMenu"
                        }
                    }
                },
                {
                    opcode: "isslant_dg",
                    blockType: BlockType.BOOLEAN,
                    text: "Есть наклон [direction] на [dg]?",
                    arguments: {
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "directionMenu"
                        },
                        dg: {
                            type: ArgumentType.NUMBER,
                            default: 0
                        }
                    }
                },
                {
                    opcode: 'slantvalue_d',
                    blockType: BlockType.REPORTER,
                    text: 'Степень наклона [direction]',
                    arguments: {
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "directionMenu"
                        }
                    }
                },
                {
                    opcode: "isgesture",
                    blockType: BlockType.BOOLEAN,
                    text: "Есть жест?",     
                },
                // {
                //     opcode: "noslant",
                //     blockType: BlockType.BOOLEAN,
                //     text: "Нет наклона?",  
                // }
            ],
            menus: {
                directionMenu: [
                    "вверх",
                    "вниз",
                    "влево",
                    "вправо"
                ],
                axisMenu: [
                    "Вертикаль",
                    "Горизонталь"
                ]
            }
        };
    }
 
    miobandstate () {
        let urlBase = 'http://127.0.0.1:5000/get_data/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    band_connect (args) {
        let urlBase = 'http://127.0.0.1:5000/band_connect/'  + args.address + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    usbport () {
        let urlBase = 'http://127.0.0.1:5000/ports/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    usbportconect(args){
        let urlBase = 'http://127.0.0.1:5000/set_port/' + args.port + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise       
    }
    isslant(args){
        let urlBase = 'http://127.0.0.1:5000/is_slant/' + args.direction + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        const result = miodataPromise > 200
        return result
    }

    isslant_dg(args){
        let urlBase = 'http://127.0.0.1:5000/is_slant/' + args.direction + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        const result = miodataPromise > args.dg
        return result
    }
    isgesture(){
        let urlBase = 'http://127.0.0.1:5000/get_data/is_gesture/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        const result = miodataPromise > 0
        return result
        
    }

    slantvalue_d(args){
        let urlBase = 'http://127.0.0.1:5000/slant_value_d/' + args.direction + "/"
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise
    }

    // noslant(){

    // }

}

module.exports = miobracelet;