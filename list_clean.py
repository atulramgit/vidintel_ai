import os
from dotenv import load_dotenv
from google import genai

env_path = os.path.join(os.path.dirname(__file__), 'backend', '.env')
load_dotenv(env_path)
if not os.environ.get("GEMINI_API_KEY"):
    load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("No API Key")
    exit(1)

client = genai.Client(api_key=api_key)

print("---BEGIN MODELS---")
try:
    for model in client.models.list():
        print(model.name)
except Exception as e:
    print(f"Error: {e}")
print("---END MODELS---")
