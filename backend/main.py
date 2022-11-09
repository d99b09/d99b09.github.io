import websockets
from websockets import WebSocketServerProtocol


class Server:
    def __init__(self):
        self.ws = None

    async def ws_handler(self, ws: WebSocketServerProtocol):


