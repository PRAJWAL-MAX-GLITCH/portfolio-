import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("NO API KEY")
    exit(1)

genai.configure(api_key=api_key)

print("AVAILABLE MODELS:")
try:
    models = list(genai.list_models())
    for m in models:
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            
    print("\nAttempting to call gemini-1.5-flash...")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("hi")
    print("RESPONSE:", response.text)
except Exception as e:
    print("ERROR:", str(e))
