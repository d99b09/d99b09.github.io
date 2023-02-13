from flask import Flask
from flask_cors import CORS
from threading import Thread
import serial
import json

from backend.mio_data import Mio_API_get_data
from mouse_control import Mio_API_control

app = Flask(__name__)
CORS(app)
mouse = Mio_API_control()
data_getter = Mio_API_get_data()
mouse.start()
data_getter.start()


@app.route('/')
def test():
    return '1'


@app.route('/band_connect/<name>/')
def band_connect(name):
    # cmd = bytearray(('~' + 'G' + name).encode('utf-8'))
    cmd = bytearray(('~' + 'G' + name + '$L\n').encode('utf-8'))
    data_getter.band_connect(cmd)
    # data_getter.ser.write(cmd)
    # tmp = ''
    # while tmp != b'GOK\r\n':
    #     tmp = data_getter.ser.readline()
    return 'OK'



@app.route('/set_port/<com>/')
def port_connect(com):
    print(com)
    data_getter.set_port(com)
    return 'OK'


@app.route('/get_data/')
def get_data():
    return data_getter.get_last_msg()


@app.route('/is_slant/<direction>/')
def is_slant(direction):
    msg = data_getter.decode_message
    print(direction)
    if direction == 'вниз':
        return json.dumps({'v': msg['y']})
    elif direction == 'вверх':
        return json.dumps({'v': -msg['y']})
    elif direction == 'влево':
        return json.dumps({'v': -msg['x']})
    elif direction == 'вправо':
        return json.dumps({'v': msg['x']})
    return direction  # data_getter.get_last_msg()


@app.route('/is_slant_dg/<direction>/<dg>/')
def is_slant_dg(direction, dg):
    dg = int(dg)
    msg = data_getter.decode_message
    print(msg)
    if direction == 'вниз':
        return str(int(msg['y'] > dg))
    elif direction == 'вверх':
        return str(int(msg['y'] < -dg))
    elif direction == 'влево':
        return str(int(msg['x'] < -dg))
    elif direction == 'вправо':
        return str(int(msg['x'] > dg))
    return dg  # data_getter.get_last_msg()


@app.route('/slant_value_d/<direction>/')
def slant_value_d(direction):
    msg = data_getter.decode_message
    if direction == 'вниз':
        return str(msg['y']) if msg['y'] > 0 else str(0)
    elif direction == 'вверх':
        return str(-msg['y']) if msg['y'] < 0 else str(0)
    elif direction == 'влево':
        return str(-msg['x']) if msg['x'] < 0 else str(0)
    elif direction == 'вправо':
        return str(msg['x']) if msg['x'] > 0 else str(0)
    return str(0)  # data_getter.get_last_msg()


@app.route('/port/')
def get_port():
    return mouse.port


@app.route('/ports/')
def get_ports():
    ports = serial.tools.list_ports.comports()
    port_str = ''
    for port, _, _ in sorted(ports):
        port_str += port + ' '
    return port_str[:-1]


@app.route('/move_mouse/')
@app.route('/move_mouse/stop/')
def move_mouse_stop():
    mouse.x = 0
    mouse.y = 0
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse/up/')
def move_mouse_up():
    mouse.y = -200
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse/down/')
def move_mouse_down():
    mouse.y = 200
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse/left/')
def move_mouse_left():
    mouse.x = -200
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse/right/')
def move_mouse_right():
    mouse.x = 200
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse_by_speed/up/<speed>/')
def move_mouse_up_by_speed(speed):
    mouse.y = int(speed)
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse_by_speed/down/<speed>/')
def move_mouse_down_by_speed(speed):
    mouse.y = -int(speed)
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse_by_speed/left/<speed>/')
def move_mouse_left_by_speed(speed):
    mouse.x = -int(speed)
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/move_mouse_by_speed/right/<speed>/')
def move_mouse_right_by_speed(speed):
    mouse.x = int(speed)
    mouse.rotation_by_speed()
    return 'OK'


@app.route('/one_click/')
def one_click():
    mouse.one_click()
    return 'OK'


@app.route('/two_click/')
def two_click():
    mouse.two_click()
    return 'OK'


@app.route('/press/')
def press():
    mouse.press_button('left_click')
    return 'OK'


@app.route('/release/')
def release():
    mouse.release_button('left_click')
    return 'OK'


@app.route('/platform/connect/<mac_address_str>/')
def platform_connect(mac_address_str):#048198247176247028
    # mac_address_s = 'A4:CF:12:44:E2:74'
    mac_address = [int(x, base=16) for x in mac_address_str.split(':')]

    # print(mac_address)
    cmd = bytearray(8)
    cmd[0] = 0x7E  # ~
    cmd[1] = 0x48
    for i in range(2, 8):
        cmd[i] = mac_address[i - 2]
    data_getter.band_connect(cmd)
    # data_getter.ser.write(cmd)
    # tmp = ''
    # while tmp != b'HOK\r\n':
    #     tmp = data_getter.ser.readline()
    return 'OK'


@app.route('/platform/move_to/<axis>/')
def move_to(axis):
    if axis == 'Вперед':
        mov_dir = 0x3E
    elif axis == 'Назад':
        mov_dir = 0x3C
    else:
        return "Error 404"
    cmd = bytearray(3)
    cmd[0] = 0x7E  # ~
    cmd[1] = 0x4D
    cmd[2] = mov_dir
    data_getter.ser.write(cmd)
    return 'OK'


@app.route('/platform/turn_to/<axis>/')
def turn_to(axis):
    if axis == 'Вправо':
        rot_dir = 0x3E
    elif axis == 'Влево':
        rot_dir = 0x3C
    else:
        return "Error 404"
    cmd = bytearray(3)
    cmd[0] = 0x7E  # ~
    cmd[1] = 0x52
    cmd[2] = rot_dir
    data_getter.ser.write(cmd)
    return 'OK'


@app.route('/platform/move_and_turn_to/<axis>/')
def move_and_turn_to(axis):
    if axis == 'Вперед-Влево':
        dir= 0x01
    elif axis == 'Вперед-Вправо':
        dir = 0x02
    elif axis == 'Назад-Влево':
        dir = 0x03
    elif axis == 'Назад-Вправо':
        dir = 0x04
    else:
        return "Error 404"
    cmd = bytearray(3)
    cmd[0] = 0x7E  # ~
    cmd[1] = 0x4B
    cmd[2] = dir
    data_getter.ser.write(cmd)
    return 'OK'



@app.route('/platform/stop_platform/')
def stop_platform():
    cmd = bytearray(2)
    cmd[0] = 0x7E  # ~
    cmd[1] = 0x53
    data_getter.ser.write(cmd)
    return 'OK'


@app.route('/platform/get_us_sensor/<numb>/')
def get_us_sensor(numb):
    return str(data_getter.get_us_sensor(int(numb)))


@app.route('/platform/get_ir_sensor/<num>/')
def get_ir_sensor(num):
    return str(data_getter.get_ir_sensor(int(num)))


@app.route('/platform/lights_turn/<state>/')
def lights_turn(state):
    if state == 'Вкл':
        data_getter.turn_on_light()
    else:
        data_getter.turn_off_light()
    data_getter.change_light()
    return 'OK'


@app.route('/platform/us_lights_turn/<state>/')
def us_lights_turn(state):
    if state == 'Вкл':
        data_getter.turn_on_us()
    else:
        data_getter.turn_off_us()
    data_getter.change_light()
    return 'OK'


app.run()
