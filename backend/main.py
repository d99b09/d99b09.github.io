import asyncio
import time

import websockets
import serial
import json


class WS_app:
    def __init__(self):
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = '/dev/cu.usbmodem626AEF5E12351'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0

    async def header(self, websocket):
        while True:
            try:
                print(f'Trying to open port {self.ser.port}')
                self.ser.open()
                line = self.ser.readline()
                print(f'Data: {line}')
                while True:
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
        # while True:
        #     try:
        #         self.ser.open()
        #         line = self.ser.readline()
        #         self.is_open = True
        #         # break
        #     except:
        #         self.is_open = False
        #     print(self.is_open)
        #     while self.is_open:
        #         print('open')
        #         line = self.ser.readline()
        #         print(f'Data: {line}')
        #         s_list = line.decode().split(',')[:-1]
        #         i_list = []
        #         for i in s_list:
        #             try:
        #                 i_list.append(int(i))
        #             except:
        #                 pass# break
        #         try:
        #             if i_list[0]:
        #                 x = -i_list[1]
        #             else:
        #                 x = i_list[1]
        #
        #             if i_list[2]:
        #                 y = -i_list[3]
        #             else:
        #                 y = i_list[3]
        #
        #             s = i_list[4]
        #             # band_id = str(i_list[5])
        #             message = {'x': -y, 'y': x, 's': s}
        #             msg = json.dumps(message)
        #             print(msg)
        #             await websocket.send(msg)
        #         except:
        #             pass# break
        #         await asyncio.sleep(self.sleep_time)
        #     message = {'x': 0, 'y': 0, 's': 0}
        #     msg = json.dumps(message)
        #     print(msg)
        #     await websocket.send(msg)
        #     await asyncio.sleep(self.sleep_time)

    async def main(self):
        async with websockets.serve(self.header, "localhost", 5678):
            await asyncio.Future()


if __name__ == '__main__':
    ws_serv = WS_app()
    asyncio.run(ws_serv.main())
