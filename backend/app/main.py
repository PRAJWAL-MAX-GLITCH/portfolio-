import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Import the new RAG engine
from app.rag_engine import get_context

load_dotenv()

app = FastAPI(title="AI Twin V2 API (RAG Enhanced)", version="2.0.0")

# Enable CORS for Next.js frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API directly
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found in environment. Running in Offline Mock mode.")

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    detected_topics: list

def detect_topics(query: str) -> list:
    query_lower = query.lower()
    topics = []
    if any(k in query_lower for k in ["medisense", "medical"]):
        topics.append("MediSense AI")
    if any(k in query_lower for k in ["learning", "platform", "recommend"]):
        topics.append("Smart Learning Platform")
    if any(k in query_lower for k in ["skills", "technologies", "know"]):
        topics.append("Skills")
    if any(k in query_lower for k in ["hire", "achievements", "leetcode"]):
        topics.append("Achievements")
    return topics

def get_offline_fallback_response(query: str) -> str:
    """Fallback engine if Gemini API fails or is unconfigured."""
    query_lower = query.lower()
    if "prajwal" in query_lower or "about" in query_lower:
        return "I am Prajwal's AI Twin! Prajwal is an AI/ML Engineer specializing in Machine Learning, Generative AI, and FastAPI. He builds production-ready AI systems."
    elif "linguifai" in query_lower or "translation" in query_lower:
        return "LinguiFAI is a Multi-LLM Language Translation Platform that dynamically routes requests across OpenAI, Gemini, Groq, and DeepSeek using FastAPI, Celery, Redis, and Docker."
    elif "medisense" in query_lower:
        return "MediSense AI is a conversational medical assistant Prajwal built. It processes complex queries to provide domain-specific answers, powered by a highly concurrent FastAPI backend."
    elif "learning" in query_lower or "platform" in query_lower:
        return "The Smart Learning Platform is an educational app that uses deep learning to recommend tailored learning paths to students."
    elif "technologies" in query_lower or "know" in query_lower or "skills" in query_lower:
        return "Prajwal's core stack includes Python, FastAPI, Next.js, React, and Machine Learning algorithms (Generative AI, NLP, Computer Vision)."
    elif "hire" in query_lower or "achievements" in query_lower or "why" in query_lower:
        return "You should hire Prajwal because he merges deep learning expertise with scalable AI/ML engineering. He has solved 300+ LeetCode problems and builds real-world production AI applications with solid RAG and backend architecture."
    elif any(k in query_lower for k in ["contact", "email", "github", "linkedin", "leetcode"]):
        return "You can contact Prajwal via Email at prajwalpatil062008@gmail.com. Check out his work on GitHub: https://github.com/PRAJWAL-MAX-GLITCH, LinkedIn: https://www.linkedin.com/in/prajwal-patil-6a81a9383/, and LeetCode: https://leetcode.com/u/prajwalpatil28/."
    return "Hey! I'm running in offline backup mode. Try asking me to 'Tell me about Prajwal', 'Explain LinguiFAI', 'Explain MediSense AI', 'What technologies does he know?', 'Why should I hire him?', or 'How to contact him?'"

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query string cannot be empty")

    topics = detect_topics(query)
    
    if not api_key:
        return ChatResponse(response=get_offline_fallback_response(query), detected_topics=topics)

    # Use FAISS to retrieve semantic context
    semantic_context = get_context(query)

    system_prompt = (
        "You are Prajwal Patil's AI Twin — a virtual professional representative. "
        "Your ONLY job is to answer questions about Prajwal using the retrieved context below. "
        "STRICT RULES you MUST follow:\n"
        "1. NEVER invent or assume any metric, statistic, date, count, or fact not present in the context.\n"
        "2. NEVER mention contest ratings, global rankings, commit counts, repo counts, PR counts, or months of experience.\n"
        "3. NEVER mention any project other than 'LinguiFAI', 'MediSense AI', and 'AI Smart Learning Platform'.\n"
        "4. NEVER mention React, Node.js, TypeScript, or Railway as Prajwal's tech.\n"
        "5. NEVER claim performance benchmarks like '<300ms' or '10k+ documents'.\n"
        "6. The ONLY confirmed LeetCode stat is '300+ problems solved'. Do not break it down further.\n"
        "7. Speak confidently and professionally. Do not say 'I am an AI' or 'I am programmed to'.\n"
        "8. Provide deep, thorough, and detailed explanations for any question asked. Break down your answers clearly and do not be overly concise.\n"
        f"\n\n--- VERIFIED CONTEXT ---\n{semantic_context}\n------------------------"
    )

    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            generation_config={"temperature": 0.4}
        )
        full_query = f"{system_prompt}\n\nUSER QUESTION:\n{query}"
        response = model.generate_content(full_query)
        return ChatResponse(response=response.text.strip(), detected_topics=topics)
    except Exception as e:
        print(f"Gemini API execution failed: {e}. Falling back to offline engine.")
        return ChatResponse(response=get_offline_fallback_response(query), detected_topics=topics)

@app.get("/api/v1/telemetry")
async def telemetry_endpoint():
    return {
        "leetcode_solved": 300,
        "fastapi_latency": "<150ms",
        "api_status": "Operational" if api_key else "Offline Mode",
        "rag_status": "Active (FAISS)"
    }

