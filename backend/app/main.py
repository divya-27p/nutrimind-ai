from fastapi import FastAPI
from app.supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="NutriMind AI API",
    description="Backend API for NutriMind AI.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "NutriMind AI API is running",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }
@app.get("/health/supabase")
def supabase_health_check():
    try:
        response = supabase.storage.list_buckets()

        return {
            "status": "healthy",
            "service": "supabase",
            "bucket_count": len(response),
        }
    except Exception as error:
        return {
            "status": "unhealthy",
            "service": "supabase",
            "error": str(error),
        }