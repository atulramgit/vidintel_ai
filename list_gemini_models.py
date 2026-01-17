import os
from dotenv import load_dotenv
from google import genai

# Load env variables from backend/.env
# Assuming this script is in the root ai-notes-generator folder and backend is a subdirectory
env_path = os.path.join(os.path.dirname(__file__), 'backend', '.env')
load_dotenv(env_path)

# Configure Gemini Client
api_key = os.environ.get("GEMINI_API_KEY")

# Debug: Print if key is found (redacted)
if api_key:
    print(f"API Key found: {api_key[:5]}...")
else:
    print(f"API Key NOT found in {env_path}")

if not api_key:
    # Try looking in current directory .env as fallback
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY not found in environment variables.")
    print("Please ensure you have a .env file in 'backend/' or the current directory with GEMINI_API_KEY set.")
    exit(1)

client = genai.Client(api_key=api_key)

print("Models that support generateContent:\n")

# list_models returns an iterator of Model objects
# In google-genai, we usually don't filter by method string exactly the same way,
# but we can list all and check relevant attributes if needed.
# For now, let's just list them.
try:
    for model in client.models.list():
        print(f"- {model.name}")
        print(f"  Display Name: {model.display_name}")
        print(f"  Description: {model.description}")
        print()
except Exception as e:
    print(f"Error listing models: {e}")
    print("Please ensure GEMINI_API_KEY is set in your environment.")