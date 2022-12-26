import time
from threading import Thread
import serial
import json


class Mio_API_get_data(Thread):
    def __init__(self):
        super(Mio_API_get_data, self).__init__()
        self.last_msg = json.dumps({'x': 0, 'y': 0, 's': 0})
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = '/dev/cu.usbmodem8178E37417321'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0
        self.decode_message = {'x': 0, 'y': 0, 's': 0}  # new decode fun
        self.msg_whiting = False

    def string_to_json(self, line):
        decode_line = line.decode()
        s_list = decode_line.split(',')[:-1]
        i_list = []
        for i in s_list:
            try:
                i_list.append(int(i))
            except:
                pass
        if i_list[0] == 49 or i_list[0] == 48:
            self.decode_message['y'] = i_list[1]
            self.decode_message['x'] = i_list[2]
        elif i_list[0] == 145 or i_list[0] == 144:
            print(i_list)
            self.decode_message['s'] = 1 if i_list[1] > 3 else 0
        elif i_list[0] == 81 or i_list[0] == 80:
            print(f'Заряд:{i_list[1]}%')

        return self.decode_message

    def run(self) -> None:
        while True:
            try:
                # url = 'http://127.0.0.1:5000/port/'
                # r = requests.get(url)
                # self.ser.port = r.text
                print(f'Trying to open port {self.ser.port}')
                self.ser.open()
                print('ser opened ')
                line = self.ser.readline()
                print(f'Data: {line}')
                while True:
                    line = self.ser.readline()
                    print(line)
                    # if self.msg_whiting:
                    #     while line != b'GOK\r\n':
                    #         line = self.ser.readline()
                    #     self.msg_whiting = True
                    try:
                        message = self.string_to_json(line)
                        msg = json.dumps(message)
                        # print(f'Messege:{msg}')
                        self.last_msg = msg
                        # await websocket.send(msg)
                        # await asyncio.sleep(self.sleep_time)
                    except:
                        pass
            except:
                time.sleep(3)
                self.ser.close()

    def get_last_msg(self):
        return self.last_msg

    def set_port(self, port: str):
        self.ser.port = port

    def get_decode_message(self):
        return self.decode_message

    def band_connect(self, cmd):
        self.ser.write(cmd)


if __name__ == '__main__':
    dater = Mio_API_get_data()
    dater.start()
    dater.set_port('COM4')