console.log('hello')

// String.prototype.hashCode = function() {
//     var hash = 0;
//     if (this.length == 0) {
//         return hash;
//     }
//     for (var i = 0; i < this.length; i++) {
//         var char = this.charCodeAt(i);
//         hash = ((hash<<5)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return hash;
// }
//
// var WsCons = {};
//
// class MainWs{
//     constructor(conname) {
//         this.conname = conname;
//         this.hash = this.conname.hashCode();
//         if (this.hash in WsCons) {
//             console.log("exists allready");
//             return;
//         }
//         this.rxque = [];
//         this.txresolve = 0;
//         this.openresolve = 0;
//         this._ws = new WebSocket(conname);
//
//
//     }
//     getdata(){//getdata from ws
//
//     }
//      waitcon() {
// 	var that = this;
// 	if (this._ws.readyState == 0) {
// 	    console.log("need startup promise");
// 	    return new Promise((resolve, reject) => {
// 		that.openresolve = resolve;
// 		setTimeout(() => {
// 		    console.log("stratup timeout");
// 		    if (that.openresolve == 0)
// 			return;
// 		    console.log("stratup timeout failed");
//
// 		    that.openresolve = 0;
// 		    resolve('timeout');
// 		    that.close();
// 		}, 2000);
// 	    });
// 	}
// 	return this.hash;
//     }
// }

const mWebSocket = 'ws://localhost:5678';

class WsMain{
    constructor() {
        this.test_msg = ''
        websocket.onmessage = (...data) => {
                var fieldNameElement = document.getElementById('wst');
                fieldNameElement.innerHTML = data[0].data;
                console.log(data[0].data)
                this.test_msg = data[0].data
                this.main_msg = JSON.parse(data[0].data)


            };

    }
}
class MioBandMod{
    constructor(runtime) {
        this.test_msg = ''
        var socket = new WebSocket(mWebSocket);
        socket.onmessage = ({ data }) => {
            this.test_msg = data;
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
        if (direction === "вверх"){
            return true
        } else if (direction === "вниз"){
            return true
        } else if (direction === "влево"){
            return true
        } else if (direction === "вправо"){
            return this
        } else {
            return false
        }




    }



    ifgestureh(){
        let istrue = True

        return {istrue}
    }

    substringy({num1, num2, string}) {
        return string.substring(num1 - 1, num2);
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