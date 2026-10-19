import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employee, attendance

app = FastAPI(title="HRMS Lite API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        o.strip()
        for o in os.getenv(
            "CORS_ORIGINS", "http://localhost:5173,https://hrms-lite-eight-theta.vercel.app"
        ).split(",")
        if o.strip()
    ],
    # Starlette matches allow_origins literally, so "https://*.vercel.app" never
    # matched anything. Preview deployments of THIS project are matched by regex
    # instead (not every *.vercel.app site, which would let any Vercel app call us).
    allow_origin_regex=r"https://hrms-lite[a-z0-9-]*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return {"message": "HRMS Lite Backend is running"}


@app.get("/health")
def health():
    return {"status": "ok"}