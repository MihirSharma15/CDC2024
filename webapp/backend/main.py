from fastapi import FastAPI

from app import get_buddies

app = FastAPI()

@app.get("/{uid}")
async def read_buddies(uid: str):
    return get_buddies(uid)
