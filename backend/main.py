import asyncio
import time

import websockets
import serial
import json

from flask import Flask
from flask_cors import CORS


class WS_app:
    def __init__(self):
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = '/dev/cu.usbmodem626AEF5E12351'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0
        self.send_flag = False
        self.mouse_flag = False
        self.app = Flask(__name__)
        CORS(self.app)

    async def header(self, websocket):
        while True:
            try:
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
                    print(f'Data: {line}')
                    decode_line = line.decode()
                    if decode_line[0] == '%':
                        power_s_list = decode_line.split(',')
                        band_id = int(power_s_list[0][-1])
                        power = int(power_s_list[1][:-2])
                        print(f'Power of band number {band_id}: {power}%')
                        continue
                    s_list = decode_line.split(',')[:-1]
                    i_list = []
                    for i in s_list:
                        try:
                            i_list.append(int(i))
                        except:
                            pass
                    try:
                        if i_list[0]:
                            x = -i_list[1]
                        else:
                            x = i_list[1]

                        if i_list[2]:
                            y = -i_list[3]
                        else:
                            y = i_list[3]

                        s = i_list[4]
                        # band_id = str(i_list[5])
                        message = {'x': y, 'y': x, 's': s}
                        msg = json.dumps(message)
                        print(f'Messege:{msg}')
                        await websocket.send(msg)
                        await asyncio.sleep(self.sleep_time)

                    except:
                        pass
            except:
                time.sleep(3)
                self.ser.close()

    async def start_app(self):
        self.app.run()

    async def main(self):
        async with websockets.serve(self.header, "localhost", 5678):
            await asyncio.Future()

serv = WS_app()

@serv.app.route('/')
@serv.app.route('/index')
def test_get():
    serv.send_flag = True
    while not serv.send_flag:
        return






if __name__ == '__main__':
    ws_serv = WS_app()
    asyncio.run(ws_serv.main())
