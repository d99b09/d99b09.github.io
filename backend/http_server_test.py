from flask import Flask
from flask_cors import CORS
import asyncio



app = Flask(__name__)
CORS(app)

class asyncTest:
    def __init__(self, app):
        self.app = app
    async def counter(self):
        while True:
            for i in range(10):
                print(i)
                await asyncio.sleep(1)

    async def start_app(self):
        self.app.run()
    async def main(self):
        await asyncio.gather(self.start_app(), self.counter())

@app.route('/')
@app.route('/index')
def index():
    print('hello')
    return "Hello, World!"

@app.route('/index2')
def index2():
    return "Hello, World2!"

if __name__ == '__main__':
    aT = asyncTest(app)
    asyncio.run(aT.main())