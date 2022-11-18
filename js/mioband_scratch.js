console.log('hello')


const mWebSocket = 'ws://localhost:5678';

class WsMain{
    constructor() {
        this.test_msg = ''
        websocket.onmessage = (...data) => {
                this.test_msg = data[0].data
                this.main_msg = JSON.parse(data[0].data)


            };

    }
}
class MioBandMod{
    constructor(runtime) {
        this.ifslant_V = false
        this.runtime = runtime
        this.test_msg = ''
        this.main_msg = null
        var socket = new WebSocket(mWebSocket);
        socket.onmessage = ( ...data ) => {
            this.test_msg = data[0].data
            this.main_msg = JSON.parse(data[0].data)
        }
        this.clear();
    }

    clear() {
        // this.msg = 'o'
        // this.socket = new WebSocket("ws://localhost:8765");
        // this.socket.onmessage = function (event){
        //     this.msg = event.data
        // }
        // this.ip = 'localhost'
        // this.port = 8000
        // this.req = new XMLHttpRequest()
    }

    update() {
        if (this.runtime.currentMSecs == this.currentMSecs)
            return // not a new polling cycle
        this.currentMSecs = this.runtime.currentMSecs
        this.ifslant_V = (this.main_msg.s === "1")

    }

    getInfo() {
        return{
            "id": "MioBandMod",
            "name": "MioBand",
            "blocks": [{
                    "opcode": "miotestblock",
                    "blockType": "reporter",
                    "text": "Тестовый блок",
                },
                {
                    "opcode": "usbport",
                    "blockType": "reporter",
                    "text": "Порт USB-устройства"
                },
                {
                    "opcode": "usbportconect",
                    "blockType": "command",
                    "text": "Подключиться к USB устройству на порту [port]",
                    "arguments": {
                        "port": {
                            "type": "string"
                        }
                    }
                },
                {
                    "opcode": "colibration",
                    "blockType": "command",
                    "text": "Запустить калибровку браслета",
                },
                {
                    "opcode": "isslant",
                    "blockType": "Boolean",
                    "text": "Есть наклон [direction]?",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        }
                    }
                },
                {
                    "opcode": "slantvalue",
                    "blockType": "reporter",
                    "text": "Степень наклона [axis]",
                    "arguments": {
                        "axis": {
                            "type": "string",
                            "menu": "axisMenu"
                        },
                    }
                },
                {
                    "opcode": "isgesture",
                    "blockType": "Boolean",
                    "text": "Есть жест?"
                },
                {
                    "opcode": "ifgesture",
                    "blockType": "command",
                    "text": "Когда жест",
                },
                {
                    "opcode": "ifslant",
                    "blockType": "command",
                    "text": "Когда наклон [direction]?",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        }
                    }
                },
                {
                    "opcode": "ifgestureh",
                    "blockType": "hat",
                    "text": "Когда жест",
                },
                {
                    "opcode": "ifslanth",
                    "blockType": "hat",
                    "text": "Когда наклон [direction]?",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        }
                    }
                },
            ],
            "menus": {
                "directionMenu": [
                    "вверх",
                    "вниз",
                    "влево",
                    "вправо"
                ],
                "axisMenu": [
                    "Вертикаль",
                    "Горизонталь"
                ]
            }
        }
    }

    miotestblock(){
        return this.test_msg

    }

    isslant(direction){
        console.log(direction)
        if (direction.direction === "вверх"){
            return this.main_msg.y > 2
        } else if (direction.direction === "вниз"){
            return this.main_msg.y < -2
        } else if (direction.direction === "влево"){
            return this.main_msg.x < -2
        } else if (direction.direction === "вправо"){
            return this.main_msg.x > 2
        }

    }
    isgesture(){
        return this.main_msg.s === "1"
    }
    slantvalue(axis){
        if (axis.axis === "Вертикаль"){
            return this.main_msg.y
        }
        else {return this.main_msg.x}
    }
    ifgestureh(direction){
        if (direction.direction === "вверх"){
            if (this.main_msg.y > 2){return true}
        } else if (direction.direction === "вниз"){
            if (this.main_msg.y < -2){return true}
        } else if (direction.direction === "влево"){
            if (this.main_msg.x < -2){return true}
        } else if (direction.direction === "вправо"){
            if (this.main_msg.x > 2){return true}
        }
        return false

    }
    ifslanth(){
        this.update()
        return this.ifslant_V;

    }

}

class MouseMod{
    constructor(runtime) {
        this.clear();
    }

    clear() {
        this.socket = null;
    }

    getInfo() {
        return{
            "id": "MouseMod",
            "name": "MouseControl",
            "blocks": [
                {
                    "opcode": "moveMouse",
                    "blockType": "command",
                    "text": "Двигать мышь [direction]",
                    "arguments": {
                        "direction": {
                            "type": "string",

                            "menu": "directionMenu"
                        }
                    }
                },
                {
                    "opcode": "moveMouseBySpeed",
                    "blockType": "command",
                    "text": "Двигать мышь [axis] со скоростью [speed]",
                    "arguments": {
                        "axis": {
                            "type": "string",
                            "menu": "axisMenu"
                        },
                        "speed": {
                            "type": "number",
                            "defaultValue": "0"
                        }
                    }
                },
                {
                    "opcode": "oneclick",
                    "blockType": "command",
                    "text": "Одиночный клик",
                },
                {
                    "opcode": "dubleclick",
                    "blockType": "command",
                    "text": "Двойной клик",
                },
                {
                    "opcode": "press",
                    "blockType": "command",
                    "text": "Зажать клик",
                },
                {
                    "opcode": "relese",
                    "blockType": "command",
                    "text": "Отжать клик",
                },


            ],
            "menus": {
                "directionMenu": [
                    "Вверх",
                    "Вниз",
                    "Влево",
                    "Вправо"
                ],
                "axisMenu": [
                    "Вертикаль",
                    "Горизонталь"
                ]
            }
        }
    }

    substringy({num1, num2, string}) {
        return string.substring(num1 - 1, num2);
    };

}

(function() {
    console.log('hello')
    // var extensionClass1 = MioBandMod
    // var extensionClass2 = MouseMod
    // if (typeof window === "undefined" || !window.vm) {
    //     Scratch.extensions.register(new extensionClass1())
    //     Scratch.extensions.register(new extensionClass2())
    //
    // }
    // else {
    //     var extensionInstance = new extensionClass(window.vm.extensionManager.runtime)
    //     var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    //     window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
    // }
    var extensionMioBandMod = new MioBandMod(window.vm.extensionManager.runtime)
    // var extensionMouseMod = MouseMod
    // Scratch.extensions.register(new extensionMouseMod())
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionMioBandMod)
    window.vm.extensionManager._loadedExtensions.set(extensionMioBandMod.getInfo().id, serviceName)

})()