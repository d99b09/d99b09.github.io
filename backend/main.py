from fastapi import FastAPI

app = FastAPI()

@app.get("/mioband/getport")
async def get_port():
    return 'com3'


@app.get("/mioband/")
async def get_mioand_data():
    return 'mioband'


