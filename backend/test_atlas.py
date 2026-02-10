from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def test():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    try:
        collections = await db.list_collection_names()
        print("Connection successful. Collections:", collections)
    except Exception as e:
        print("MongoDB connection failed:", e)

asyncio.run(test())
