console.log('hello')


class MioBandMod{
    constructor(runtime) {
        this.ifslant_V = false
        this.runtime = runtime
        this.test_msg = ''
        this.main_msg = null
        this.isslant_msg = ''
        this.isslant_dg_msg = ''
        this.slantvalue_msg = ''
        this.slantvalue_d_msg = ''
        this.clear();
    }

    clear() {

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
                    "opcode": "band_connect",
                    "blockType": "command",
                    "text": "Подключится к браслету под именем [name]",
                    "arguments": {
                        "name": {
                            "type": "string",
                            "defaultValue": ""
                        }
                    }

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
                    "opcode": "isslant_dg",
                    "blockType": "Boolean",
                    "text": "Есть наклон [direction] на [dg]?",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        },
                        "dg": {
                            "type": "number",
                            "defaultValue": "0"
                        }
                    }
                },
                // {
                //     "opcode": "slantvalue",
                //     "blockType": "reporter",
                //     "text": "Степень наклона [axis]",
                //     "arguments": {
                //         "axis": {
                //             "type": "string",
                //             "menu": "axisMenu"
                //         },
                //     }
                // },
                {
                    "opcode": "slantvalue_d",
                    "blockType": "reporter",
                    "text": "Степень наклона [direction]",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        },
                    }
                },
                {
                    "opcode": "isgesture",
                    "blockType": "Boolean",
                    "text": "Есть жест?"
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
        const url = new URL("http://127.0.0.1:5000/get_data/")
        this.test_msg = fetch(url).then(response => response.text())
        return this.test_msg

    }

    isslant(direction){
        const url = new URL("http://127.0.0.1:5000/is_slant/" + direction.direction + "/")
        return fetch(url).then(async (response) => {
                const data = await response.json();
                return data.v > 200
            })
    }

    isslant_dg(direction){
        const url = new URL("http://127.0.0.1:5000/is_slant/" + direction.direction + "/")
        return fetch(url).then(async (response) => {
                const data = await response.json();
                return data.v > direction.dg
            })
    }
    isgesture(){
        const url = new URL("http://127.0.0.1:5000/get_data/")
        return fetch(url).then(async (response) => {
                const data = await response.json();
                return data.s === "1"
            })
    }
    // slantvalue(axis){
    //     const url = new URL("http://127.0.0.1:5000/get_data/")
    //     this.test_msg = fetch(url).then(response => response.text())
    //     if (axis.axis === "Вертикаль"){
    //         return this.main_msg.y
    //     }
    //     else {return this.main_msg.x}
    // }
    slantvalue_d(direction){
        const url = new URL("http://127.0.0.1:5000/slant_value_d/" + direction.direction + "/")
        return fetch(url).then(async (response) => {
                const data = await response.text();
                return data
            })
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
                // {
                //     "opcode": "moveMo",
                //     "blockType": "command",
                //     "text": "Двигать мышь [direction]",
                //     "arguments": {
                //         "direction": {
                //             "type": "string",
                //
                //             "menu": "directionMenu"
                //         }
                //     }
                // },
                {
                    "opcode": "moveMouseBySpeed",
                    "blockType": "command",
                    "text": "Двигать мышь [direction] со скоростью [speed]",
                    "arguments": {
                        "direction": {
                            "type": "string",
                            "menu": "directionMenu"
                        },
                        "speed": {
                            "type": "number",
                            "defaultValue": "0"
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

        if (direction.direction == "Вверх"){
            var url = new URL("http://127.0.0.1:5000/move_mouse/up/")
        } else if (direction.direction == "Вниз"){
            var url = new URL("http://127.0.0.1:5000/move_mouse/down/")
        } else if (direction.direction == "Влево"){
            var url = new URL("http://127.0.0.1:5000/move_mouse/left/")
        } else {
            var url = new URL("http://127.0.0.1:5000/move_mouse/right/")
        }
        console.log(url)

        return fetch(url).then(response => response.text())

    }
    moveMoBySpeed(axis){
        console.log(axis)
        if (axis.axis == "Вертикаль"){
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/up/"+ axis.speed + "/")
        }
        else {
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/right/"+ axis.speed + "/")
        }
        console.log(url)
        return fetch(url).then(response => response.text())
    }

    moveMouseBySpeed(axis){
        console.log(axis)

        if (axis.direction == "Вверх"){
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/up/" + axis.speed + "/")
        } else if (axis.direction == "Вниз"){
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/down/" + axis.speed + "/")
        } else if (axis.direction == "Влево"){
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/left/" + axis.speed + "/")
        } else {
            var url = new URL("http://127.0.0.1:5000/move_mouse_by_speed/right/" + axis.speed + "/")
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

class MioPlatformMod{
    constructor(runtime) {
        this.clear();
    }

    clear() {
        this.socket = null;
    }

    getInfo() {
        return{
            "id": "MioPlatformMod",
            "name": "PlatformControl",
            "blocks": [
                {
                    "opcode": "platform_connect",
                    "blockType": "command",
                    "text": "Подключиться к Платформе по адресу [adress]",
                    "arguments": {
                        "adress": {
                            "type": "string"
                        },
                    }
                },
                {
                    "opcode": "get_sensor",
                    "blockType": "reporter",
                    "text": "Показание УЗ датчика номер [adress]",
                    "arguments": {
                        "adress": {
                            "type": "string",
                            "menu": "sensorNumber"
                        },
                    }
                },
                {
                    "opcode": "move_to",
                    "blockType": "command",
                    "text": "Ехать [axis]",
                    "arguments": {
                        "axis": {
                            "type": "string",
                            "menu": "axisMenu1"
                        },
                    }
                },
                {
                    "opcode": "turn_to",
                    "blockType": "command",
                    "text": "Повернуть на месте [axis]",
                    "arguments": {
                        "axis": {
                            "type": "string",
                            "menu": "axisMenu2"
                        },
                    }
                },
                {
                    "opcode": "move_and_turn_to",
                    "blockType": "command",
                    "text": "Двигаться с поворотом [axis1] [axis2]",
                    "arguments": {
                        "axis1": {
                            "type": "string",
                            "menu": "axisMenu1"
                        },
                        "axis2": {
                            "type": "string",
                            "menu": "axisMenu2"
                        },
                    }
                },
                {
                    "opcode": "stop_platform",
                    "blockType": "command",
                    "text": "Остановить движение",
                },


            ],
            "menus": {
                "sensorNumber": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                "axisMenu1": [
                    "Вперед",
                    "Назад"
                ],
                "axisMenu2": [
                    "Влево",
                    "Вправо"
                ],
            }
        }
    }
    stop_platform(){
        console.log('stop')
    }



}

(function() {
    console.log('hello')
    var extensionClass1 = MioBandMod
    var extensionClass2 = MouseMod
    var extensionClass3 = MioPlatformMod

    if (typeof window === "undefined" || !window.vm) {
        Scratch.extensions.register(new extensionClass1())
        Scratch.extensions.register(new extensionClass2())
        Scratch.extensions.register(new extensionClass3())


    }
    else {
        var extensionInstance = new extensionClass(window.vm.extensionManager.runtime)
        var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
        window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
    }
})()
