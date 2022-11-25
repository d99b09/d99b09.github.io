console.log('hello')


const mWebSocket = 'ws://localhost:5678';

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
                    "opcode": "miobandtest",
                    "blockType": "command",
                    "text": "Тестовый блок",
                }

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

    miobandstate(){
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
    async miobandtest() {
        const url = new URL("http://127.0.0.1:5000/")

        let response = await fetch(url);
        consle.log(response)
    }


}


(function() {
    console.log('hello')
    var extensionClass1 = MioBandMod
    Scratch.extensions.register(new extensionClass1())
})()