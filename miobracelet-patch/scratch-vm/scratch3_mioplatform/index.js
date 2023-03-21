const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const color = require('../../util/color');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

class mioplatform {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'mioplatform',
            name: 'MioPlatform',
            blocks: [
                {
                    opcode: 'platform_connect',
                    blockType: BlockType.COMMAND,
                    text: 'Подключиться к Платформе по адресу [address]',
                    arguments: {
                        address: {
                            type: ArgumentType.STRING,
                            default: ''
                        }
                    }
                },
                {
                    opcode: 'get_us_sensor',
                    blockType: BlockType.REPORTER,
                    text: 'Показание УЗ датчика номер [address]',
                    arguments: {
                        address: {
                            type: ArgumentType.STRING,
                            menu: "sensorNumber"
                        }
                    }
                },
                {
                    opcode: 'get_ir_sensor',
                    blockType: BlockType.REPORTER,
                    text: 'Показание ИК датчика номер [address]',
                    arguments: {
                        address: {
                            type: ArgumentType.STRING,
                            menu: "sensorNumber"
                        }
                    }
                },
                {
                    opcode: 'move_to',
                    blockType: BlockType.COMMAND,
                    text: 'Двигаться [axis]',
                    arguments: {
                        axis: {
                            type: ArgumentType.STRING,
                            menu: 'axisMenu1'
                        }
                    }
                },
                {
                    opcode: 'turn_to',
                    blockType: BlockType.COMMAND,
                    text: 'Повернуть на месте [axis]',
                    arguments: {
                        axis: {
                            type: ArgumentType.STRING,
                            menu: 'axisMenu2'
                        }
                    }
                },
                {
                    opcode: 'move_and_turn_to',
                    blockType: BlockType.COMMAND,
                    text: 'Двигаться с поворотом [axis1] [axis2]',
                    arguments: {
                        axis1: {
                            type: ArgumentType.STRING,
                            menu: 'axisMenu1'
                        },
                        axis2: {
                            type: ArgumentType.STRING,
                            menu: 'axisMenu2'
                        }
                    }
                },
                {
                    opcode: 'stop_platform',
                    blockType: BlockType.COMMAND,
                    text: 'Остановить движение',
                },
                {
                    opcode: 'light_turn',
                    blockType: BlockType.COMMAND,
                    text: 'Свет [a]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            menu: 'lightMenu'
                        }
                    }
                },
                {
                    opcode: 'us_light_turn',
                    blockType: BlockType.COMMAND,
                    text: 'УФ свет [a]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            menu: 'lightMenu'
                        }
                    }
                },
                {
                    opcode: 'wheel_pair_speed',
                    blockType: BlockType.COMMAND,
                    text: 'Задать [pair] паре колёс скорость [speed]%',
                    arguments: {
                        pair: {
                            type: ArgumentType.STRING,
                            menu: 'pairMenu'
                        },
                        speed: {
                            type: ArgumentType.NUMBER,
                            default: 0
                        }
                    }
                },
                {
                    opcode: 'get_rfid',
                    blockType: BlockType.REPORTER,
                    text: 'Получить RFID',
                },
            ],
            menus: {
                sensorNumber: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                axisMenu1: [
                    "Вперед",
                    "Назад"
                ],
                axisMenu2: [
                    "Влево",
                    "Вправо"
                ],
                lightMenu: [
                    "Вкл",
                    "Выкл"
                ],
                pairMenu: [
                    "левой",
                    "правой"
                ]
            }
        };
    }
 
    platform_connect(args){
        let urlBase = 'http://127.0.0.1:5000/platform/connect/' + args.address + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    get_us_sensor(args){
        let urlBase = 'http://127.0.0.1:5000/platform/get_us_sensor/' + args.address + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    get_ir_sensor(args){
        let urlBase = 'http://127.0.0.1:5000/platform/get_ir_sensor/'  + args.address + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    move_to(args){
        let urlBase = 'http://127.0.0.1:5000/platform/move_to/' + args.axis + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    turn_to(args){
        let urlBase = 'http://127.0.0.1:5000/platform/turn_to/'  + args.axis + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    move_and_turn_to(args){
        let urlBase = 'http://127.0.0.1:5000/platform/move_and_turn_to/' +
        args.axis1 + '-' + args.axis2 + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    stop_platform(){
        let urlBase = 'http://127.0.0.1:5000/platform/stop_platform/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    light_turn(args){
        let urlBase = 'http://127.0.0.1:5000/platform/lights_turn/' + args.a + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    us_light_turn(args){
        let urlBase = 'http://127.0.0.1:5000/platform/us_lights_turn/' + args.a + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    wheel_pair_speed(args){
        let urlBase = 'http://127.0.0.1:5000/platform/wheel_pair_speed/' + args.pair + '/' + args.speed + '/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }
    get_rfid(){
        let urlBase = 'http://127.0.0.1:5000/platform/get_rfid/'
        const miodataPromise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
        return miodataPromise   
    }

}

module.exports = mioplatform;