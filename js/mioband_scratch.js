class MioBandMod{
    constructor(runtime) {
        this.clear();
    }

    clear() {
        this.socket = null;
        this.ip = 'localhost'
        this.port = 8000
        // this.req = new XMLHttpRequest()
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
        // this.req.open('GET', this.ip + this.port + '/mioband/', false)
        // this.req.send()
        // this.req.onload = function () {
        //     if (this.req.status !== 200){
        //         console.log('Error ${xhr.status}')
        //     }
        //     else{
        //         console.log(this.req.response)
        //         return this.req.response
        //     }
        // }
        // console.log(fetch(this.ip + this.port + '/mioband/').then(response => response.text()))
        // return fetch(this.ip + this.port + '/mioband/').then(response => response.text())
        let response = fetch(this.ip + this.port + '/mioband/')
        return {response.status}
        }

    }

    ifgestureh(){
        let istrue = True

        return {istrue}
    };

    substringy({num1, num2, string}) {
        return string.substring(num1 - 1, num2);
    };
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