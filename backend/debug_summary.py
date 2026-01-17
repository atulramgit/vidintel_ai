import os
import django
import json
import ast

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings") # Adjust if project name is different
django.setup()

from core.models import Note

try:
    n = Note.objects.last()
    s = n.summary
    print(f"Content length: {len(s)}")
    print(f"First 50 chars: {s[:50]}")
    print(f"Last 50 chars: {s[-50:]}")
    
    print("\n--- JSON Attempt ---")
    try:
        parsed_json = json.loads(s)
        print("JSON Success!")
        print(f"Type: {type(parsed_json)}")
    except Exception as e:
        print(f"JSON Failed: {e}")

    print("\n--- AST Attempt ---")
    try:
        parsed_ast = ast.literal_eval(s)
        print("AST Success!")
        print(f"Type: {type(parsed_ast)}")
    except Exception as e:
        print(f"AST Failed: {e}")

except Exception as e:
    print(f"Error accessing DB: {e}")
