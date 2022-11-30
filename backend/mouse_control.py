import time

from win32api import GetSystemMetrics
from threading import Thread
from pynput.mouse import Button, Controller
import serial.tools.list_ports

MAX_MOUSE_SPEED = 20
WIDTH_INCREASE = GetSystemMetrics(0) / GetSystemMetrics(1)
DIFF_INCREASE = 4
XY_LIMIT = 3


class Mio_API_control(Thread):
    def __init__(self):
        super(Mio_API_control, self).__init__()
        self.s = False
        self.duration = 1
        self.y_speed = 0
        self.x_speed = 0
        self.x = 0
        self.y = 0
        self.mouse = Controller()
        self.button_mouse_headers = {'left_click': Button.left, 'right_click': Button.right}
        self.pre_button_states = {'left_click': False, 'right_click': False}
        self.port = 'COM3'

    def run(self):
        while True:
            self.mouse.move(self.x_speed, self.y_speed)
            time.sleep(self.duration)

    def rotation_by_speed(self):
        x = self.x / 100
        y = self.y / 100
        if (x != 0) or (y != 0):
            self.duration = 1 / (MAX_MOUSE_SPEED * max(abs(x), abs(y)))
            if x == 0:
                self.x_speed = 0
                self.y_speed = y / abs(y)
            elif y == 0:
                self.x_speed = x / abs(x)
                self.y_speed = 0
            else:
                self.x_speed = x / min(abs(x), abs(y))
                self.y_speed = y / min(abs(x), abs(y))

        else:
            self.duration = 0.1
            self.x_speed = 0
            self.y_speed = 0

        self.x_speed *= DIFF_INCREASE * WIDTH_INCREASE
        self.y_speed *= DIFF_INCREASE

    def release_button(self, button):
        if self.pre_button_states[button]:
            self.mouse.release(self.button_mouse_headers[button])
            print(f'{button} released')
        self.pre_button_states[button] = False

    def press_button(self, button):
        if not self.pre_button_states[button]:
            self.mouse.press(self.button_mouse_headers[button])
            print(f'{button} pressed')
        self.pre_button_states[button] = True

    def one_click(self):
        self.mouse.click(Button.left, 1)

    def two_click(self):
        self.mouse.click(Button.left, 2)
