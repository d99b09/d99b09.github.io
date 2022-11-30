import time

from flask import Flask
from flask_cors import CORS
import asyncio
from threading import Thread



app = Flask(__name__)
CORS(app)

class ThreadTest(Thread):
    def __init__(self):
        super(ThreadTest, self).__init__()
        self.j = 0

    def j_plus(self):
        self.j += 1

    def run(self) -> None:
        while 1:
            print(self.j)
            time.sleep(1)


tt = ThreadTest()
tt.start()
class asyncTest:
    def __init__(self, app):
        self.app = app
        self.j = 0
    async def counter(self):
        while True:
            for i in range(10):
                print(i + self.j)
                await asyncio.sleep(1)

    async def start_app(self):
        self.app.run()
    async def main(self):
        await asyncio.gather(self.start_app(), self.counter())



aT = asyncTest(app)
@app.route('/')
@app.route('/index/')
def index(j):

    tt.j += int(j)
    print('hello')
    # hello = False
    return "Hello, World!"

@app.route('/index2')
def index2():
    return "Hello, World2!"

if __name__ == '__main__':
    asyncio.run(aT.start_app())