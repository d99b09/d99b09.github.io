import json


class Game_data:
    def __init__(self):
        self.mode = 'AltHold'
        self.roll = 0
        self.pitch = 0
        self.yaw = 0
        self.althold = 0
        self.angle = 0
        self.pp = 0
        self.pl = 0
        self.zp = 0
        self.zl = 0
        self.height = 0
        self.dist = 0

    def get_info(self):
        info = {'mode': self.mode,
                'roll': self.roll,
                'pitch': self.pitch,
                'yaw': self.yaw,
                'althold': self.althold,
                'angle': self.angle,
                'pp': self.pp,
                'pl': self.pl,
                'zp': self.zp,
                'zl': self.zl,
                }
        return json.dumps(info)

    def set_height_dist(self, height, dist):
        self.height = height
        self.dist = dist

    def set_mode(self, mode):
        self.mode = mode

    def get_mode(self):
        return self.mode

    def set_rpy(self, rpy, value):
        if rpy == 'Roll':
            self.roll = value
        elif rpy == 'Pitch':
            self.pitch = value
        elif rpy == 'Yaw':
            self.yaw = value

    def get_rpy(self, rpy):
        if rpy == 'Roll':
            return str(self.roll)
        elif rpy == 'Pitch':
            return str(self.pitch)
        elif rpy == 'Yaw':
            return str(self.yaw)

    def set_althold(self, value):
        self.althold = value

    def set_angle(self, value):
        self.angle = value

    def set_motor_speed(self, motor, value):
        if motor == 'ПП':
            self.pp = value
        elif motor == 'ПЛ':
            self.pl = value
        elif motor == 'ЗП':
            self.zp = value
        elif motor == 'ЗЛ':
            self.zl = value

    def get_motor_speed(self, motor):
        if motor == 'ПП':
            return str(self.pp)
        elif motor == 'ПЛ':
            return str(self.pl)
        elif motor == 'ЗП':
            return str(self.zp)
        elif motor == 'ЗЛ':
            return str(self.zl)

    def get_height(self):
        return str(self.height)

    def get_dist(self):
        return str(self.dist)


