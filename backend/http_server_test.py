from flask import Flask
from flask_cors import CORS
from threading import Thread
import serial

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
    return ''


@app.route('/set_port/<com>/')
def port_connect(com):
    print(com)
    data_getter.set_port(com)
    return 'OK'

@app.route('/get_data/')
def get_data():
    return data_getter.get_last_msg()

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


app.run()
