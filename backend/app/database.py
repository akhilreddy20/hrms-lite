from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "hrms_lite")

client = AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]

employee_collection = database.get_collection("employees")
attendance_collection = database.get_collection("attendance")
