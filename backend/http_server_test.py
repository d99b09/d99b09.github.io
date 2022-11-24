from flask import Flask

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/index2')
def index2():
    return "Hello, World2!"

if __name__ == '__main__':
    app.run()