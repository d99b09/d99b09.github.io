import asyncio
import datetime
import random
import websockets

async def show_time(websocket):
    i = 1
    while True:
        if i == 1:
            i = 0
        else:
            i = 1
        message = f'Hello word!{i}'
        print(message)
        await websocket.send(message)
        await asyncio.sleep(random.random() * 5)

async def main():
    async with websockets.serve(show_time, "localhost", 5678):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())