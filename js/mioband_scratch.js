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
                    "opcode": "miobandstate",
                    "blockType": "reporter",
                    "text": "Состояние браслета",
                },
                {
                    "opcode": "usbport",
                    "blockType": "reporter",
                    "text": "Порты"
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
                {
                    "opcose": "miobandtest",
                    "blockType": "reporter",
                    "text": "Тестовый блок",
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

    usbport(){
        const url = new URL("http://127.0.0.1:5000/ports/")
        return fetch(url).then(response => response.text())
    }

    usbportconect(port){
        const url = new URL("http://127.0.0.1:5000/set_port/" + port.port + '/')
        return fetch(url).then(response => response.text())
    }

    miobandstate(){
        return this.test_msg

    }

    isslant(direction){
        console.log(direction)
        if (direction.direction === "вверх"){
            return this.main_msg.y > 100
        } else if (direction.direction === "вниз"){
            return this.main_msg.y < -100
        } else if (direction.direction === "влево"){
            return this.main_msg.x < -100
        } else if (direction.direction === "вправо"){
            return this.main_msg.x > 100
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
            if (this.main_msg.y > 100){return true}
        } else if (direction.direction === "вниз"){
            if (this.main_msg.y < -100){return true}
        } else if (direction.direction === "влево"){
            if (this.main_msg.x < -100){return true}
        } else if (direction.direction === "вправо"){
            if (this.main_msg.x > 100){return true}
        }
        return false

    }
    ifslanth(){
        console.log("Hello");
        sleep(2000)
            .then(() => { console.log("World!"); })
            .then(() => {
                sleep(2000)
                    .then(() => { console.log("Goodbye!"); })
            });
        return true

        // return this.main_msg.s === "1";

    }
    miobandtest(){
        const url = new URL("http://127.0.0.1:5000/")
        return fetch(url).then(response => response.text())

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
                    "opcode": "moveMo",
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
                    "opcode": "moveMoBySpeed",
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
                    "opcode": "release",
                    "blockType": "command",
                    "text": "Отжать клик",
                },
                {
                    "opcode": "stopMouse",
                    "blockType": "command",
                    "text": "Остановить мышь",
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

    moveMo(direction){
        console.log(direction)
        console.log(direction.direction)

        var side = ""
        if (direction.direction == "Вверх"){
            var side = "up/"
        } else if (direction.direction == "Вниз"){
            var side = "down/"
        } else if (direction.direction == "Влево"){
            var side = "left/"
        } else {
            var side = "right/"
        }
        console.log(side)

        const url = new URL("http://127.0.0.1:5000/move_mouse/" + side)
        return fetch(url).then(response => response.text())

    }
    moveMoBySpeed(axis){
        if (axis.axis === "Вертикаль"){
            const url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/up/"+ axis.speed + "/")
        }
        else {
            const url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/right/"+ axis.speed + "/")
        }
        fetch(url).then(response => response.text())
    }

    oneclick(){
        const url = new URL("http://127.0.0.1:5000/one_click/")
        fetch(url).then(response => response.text())
    }

    dubleclick(){
        const url = new URL("http://127.0.0.1:5000/two_click/")
        return fetch(url).then(response => response.text())
    }

    press(){
        const url = new URL("http://127.0.0.1:5000/press/")
        return fetch(url).then(response => response.text())
    }

    release(){
        const url = new URL("http://127.0.0.1:5000/release/")
        return fetch(url).then(response => response.text())
    }

    stopMouse(){
        const url = new URL("http://127.0.0.1:5000/move_mouse/stop/")
        return fetch(url).then(response => response.text())
    }


}

(function() {
    console.log('hello')
    var extensionClass1 = MioBandMod
    var extensionClass2 = MouseMod
    if (typeof window === "undefined" || !window.vm) {
        Scratch.extensions.register(new extensionClass1())
        Scratch.extensions.register(new extensionClass2())

    }
    else {
        var extensionInstance = new extensionClass(window.vm.extensionManager.runtime)
        var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
        window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
    }
})()