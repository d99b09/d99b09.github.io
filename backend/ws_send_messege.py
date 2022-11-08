import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://localhost:8765") as websocket:
        await websocket.send("Hello world!")
        await websocket.recv()
        await asyncio.sleep(0.5)

async def repeat_send():
    while 1:
        await hello()

asyncio.run(repeat_send())