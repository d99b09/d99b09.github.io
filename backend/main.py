import asyncio
import websockets
import serial
import json


class WS_app:
    def __init__(self):
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = 'COM3'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0

    async def header(self, websocket):
        while True:
            print(self.is_open)
            try:
                self.ser.open()
                line = self.ser.readline()
                self.is_open = True
                break
            except:
                self.is_open = False
            while self.is_open:
                line = self.ser.readline()
                print(f'Data: {line}')
                s_list = line.decode().split(',')[:-1]
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
                    band_id = str(i_list[5])
                    message = {'x': -y, 'y': x, 's': s}
                    msg = json.dumps(message)
                    print(msg)
                    await websocket.send(msg)
                except:
                    pass
                await asyncio.sleep(self.sleep_time)
            await asyncio.sleep(self.sleep_time)

    async def main(self):
        async with websockets.serve(self.header, "localhost", 5678):
            await asyncio.Future()



