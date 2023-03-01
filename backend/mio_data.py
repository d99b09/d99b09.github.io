import time
from threading import Thread
import serial
import json


class Mio_API_get_data(Thread):
    def __init__(self):
        super(Mio_API_get_data, self).__init__()
        self.rfid = '00000'
        self.decode_RFID_message = [0 for _ in range(6)]
        self.decode_sensor_message = [1 for _ in range(11)]
        self.last_msg = json.dumps({'x': 0, 'y': 0, 's': 0})
        self.is_open = False
        self.ser = serial.Serial()
        self.ser.port = '/dev/cu.usbmodem6D79266749551'
        self.ser.baudrate = 115200
        self.msg = '0'
        self.sleep_time = 0
        self.decode_message = {'x': 0, 'y': 0, 's': 0}  # new decode fun
        self.msg_whiting = False
        self.us_light_state = False
        self.light_state = False
        self.rfid_last_time = time.time()


    def string_to_json(self, line):
        decode_line = line.decode()
        s_list = decode_line.split(',')[:-1]
        i_list = []
        for i in s_list:
            try:
                i_list.append(int(i))
            except:
                pass
        if i_list[0] == 48:
            self.decode_message['y'] = i_list[2]
            self.decode_message['x'] = i_list[3]
        elif i_list[0] == 144:
            self.decode_message['s'] = i_list[4]
        elif i_list[0] == 80:
            # self.band_control.config.left_band.power = i_list[2]
            print(f'Заряд:{i_list[2]}%')
        elif i_list[0] == 73:
            self.decode_sensor_message = i_list
        elif i_list[0] == 70:
            s = ''
            for i in range((len(i_list) - 1)):
                s += str(i_list[i+1])
            self.rfid_last_time = time.time()
            self.rfid = s

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
                        self.delete_rfid()
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

    def get_us_sensor(self, num):
        return self.decode_sensor_message[num]

    def get_ir_sensor(self, num):
        return self.decode_sensor_message[num + 5]

    def change_light(self):
        if self.light_state and self.us_light_state:
            state = 3
        elif self.light_state:
            state = 2
        elif self.us_light_state:
            state = 1
        else:
            state = 0

        cmd = bytearray(3)
        cmd[0] = 0x7E  # ~
        cmd[1] = 0x4A
        cmd[2] = state
        print(state)
        self.ser.write(cmd)

    def delete_rfid(self):
        if self.rfid_last_time - time.time() > 3:
            self.rfid = '00000'

    def turn_on_us(self):
        self.us_light_state = True

    def turn_on_light(self):
        self.light_state = True

    def turn_off_us(self):
        self.us_light_state = False

    def turn_off_light(self):
        self.light_state = False
        
    def get_rfid(self):
        return self.rfid





if __name__ == '__main__':
    dater = Mio_API_get_data()
    dater.start()
    time.sleep(3)
    cmd = bytearray(('~' + 'G' + 'Bracelet_1' + '$L\n').encode('utf-8'))
    dater.band_connect(cmd)