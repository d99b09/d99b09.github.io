import asyncio
import time

import websockets
import serial
import json

import requests


class WS_app:
    def __init__(self):
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = 'COM3'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0
        self.send_flag = False
        self.mouse_flag = False
        self.decode_message = {'x': 0, 'y': 0, 's': 0}#new decode fun


    def string_to_json(self, line):
        decode_line = line.decode()
        s_list = decode_line.split(',')[:-1]
        i_list = []
        for i in s_list:
            try:
                i_list.append(int(i))
            except:
                pass
        if i_list[0] == 49:
            self.decode_message['x'] = i_list[1]
            self.decode_message['y'] = i_list[2]
        elif i_list[0] == 145:
            print(i_list)
            self.decode_message['s'] = 1 if i_list[1] > 3 else 0
        elif i_list[0] == 81:
            print(f'Заряд:{i_list[1]}%')

        return self.decode_message

    async def header(self, websocket):
        while True:
            try:
                url = 'http://127.0.0.1:5000/port/'
                r = requests.get(url)
                self.ser.port = r.text
                print(f'Trying to open port {self.ser.port}')
                self.ser.open()
                line = self.ser.readline()
                print(f'Data: {line}')
                while True:
                    if self.send_flag:
                        self.send_flag = True
                    if self.mouse_flag:
                        self.mouse_flag = True
                    line = self.ser.readline()
                    try:
                        message = self.string_to_json(line)
                        msg = json.dumps(message)
                        print(f'Messege:{msg}')
                        await websocket.send(msg)
                        await asyncio.sleep(self.sleep_time)

                    except:
                        pass
            except:
                time.sleep(3)
                self.ser.close()

    async def main(self):
        async with websockets.serve(self.header, "localhost", 5678):
            await asyncio.Future()


if __name__ == '__main__':
    ws_serv = WS_app()
    asyncio.run(ws_serv.main())
