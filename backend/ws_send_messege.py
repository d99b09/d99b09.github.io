import asyncio
import datetime
import random
import websockets
import json

async def show_time(websocket):
    i = 1
    while True:
        if i == 1:
            i = 0
        else:
            i += 1
        message = {'x': str(0), 'y': str(3), 's': str(i)}
        msg = json.dumps(message)
        print(msg)
        await websocket.send(msg)
        await asyncio.sleep(2)

async def main():
    async with websockets.serve(show_time, "localhost", 5678):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())