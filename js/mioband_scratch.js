class MioBandMod{
    constructor(runtime) {
        this.clear();
    }

    clear() {
        this.socket = null;
    }

    getInfo() {
        return{
            "id": "MioBandMod",
            "name": "MioBand",
            "blocks": [
                {
                    "opcode": "substringy",
                    "blockType": "reporter",
                    "text": "letters [num1] through [num2] of [string]",
                    "arguments": {
                        "num1": {
                            "type": "number",
                            "defaultValue": "2"
                        },
                        "num2": {
                            "type": "number",
                            "defaultValue": "5"
                        },
                        "string": {
                            "type": "string",
                            "defaultValue": "hello world"
                        }
                    }
                },
                {
                    "opcode": "colibration",
                    "blockType": "hat",
                    "text": "Запустить калибровку браслета",
                },
                {
                    "opcode": "isslant",
                    "blockType": "boolean",
                    "text": "Есть наклон?",
                },

            ],
            "menus": {//later

            }
        }
    }

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
                    "opcode": "hat",
                    "blockType": "hat",
                    "text": "Hat block",

                    // "arguments": {
                    //     "num1": {
                    //         "type": "number",
                    //         "defaultValue": "2"
                    //     },
                    //     "num2": {
                    //         "type": "number",
                    //         "defaultValue": "5"
                    //     },
                    //     "string": {
                    //         "type": "string",
                    //         "defaultValue": "hello world"
                    //     }
                    // }
                },
                {
                    "opcode": "command",
                    "blockType": "command",
                    "text": "Stack block",
                },
                {
                    "opcode": "reporter",
                    "blockType": "reporter",
                    "text": "Reporter block",
                },
                {
                    "opcode": "Boolean",
                    "blockType": "Boolean",
                    "text": "Boolean block",
                },

            ],
            "menus": {//later

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