import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not supabase_url or not supabase_service_role_key:
    raise RuntimeError("Supabase backend environment variables are missing.")

supabase: Client = create_client(
    supabase_url,
    supabase_service_role_key,
)