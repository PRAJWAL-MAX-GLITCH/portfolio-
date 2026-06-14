import os
import json

# Attempt to import RAG dependencies; fall back gracefully if not installed
try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_community.vectorstores import FAISS
    from langchain_core.documents import Document
    RAG_AVAILABLE = True
except ImportError as e:
    RAG_AVAILABLE = False
    print(f"WARNING: LangChain/FAISS not installed or failed to import ({e}). RAG engine running in direct-context mode.")

INDEX_PATH = os.path.join(os.path.dirname(__file__), "faiss_index")

# ---------------------------------------------------------
# VERIFIED KNOWLEDGE BASE — Resume Truth Only
# No invented metrics, no fabricated timelines, no fake stats
# ---------------------------------------------------------
VERIFIED_KNOWLEDGE = """
## Identity
- Name: Prajwal Patil
- Degree: B.Tech, Computer Science
- College: Parul University (2023–2027)
- Status: Student. Open to AI Engineer, ML Engineer, Backend Engineer roles.
- Email: prajwalpatil062008@gmail.com
- GitHub: https://github.com/PRAJWAL-MAX-GLITCH (Username: @PRAJWAL-MAX-GLITCH)
- LinkedIn: https://www.linkedin.com/in/prajwal-patil-6a81a9383/
- LeetCode: https://leetcode.com/u/prajwalpatil28/

## Projects (3 Total — Resume Verified)

### Project 1: LinguiFAI — Multi-LLM Language Translation Platform
- Type: AI-powered language translation microservices platform
- Stack: FastAPI, OpenAI, Gemini, Groq, DeepSeek, Redis, Celery, Docker
- How it works: Dynamically routes requests across multiple LLMs to deliver context-aware translations. Uses Celery and Redis for asynchronous task execution to process large-scale PDF/DOCX documents.
- Key components: Multi-LLM routing, async document processing, Docker microservices

### Project 2: MediSense AI — RAG-Based Medical Assistant
- Type: Retrieval-Augmented Generation (RAG) system
- Stack: LangChain, FAISS, FastAPI, Python
- How it works: Uses LangChain and FAISS to perform semantic search over medical documents.
  Relevant context is retrieved and passed to an LLM to produce grounded, hallucination-resistant responses.
- Key components: FAISS vector store, LangChain RetrievalQA, FastAPI backend

### Project 3: AI Smart Learning Platform
- Type: AI-powered personalized learning recommendation platform
- Stack: FastAPI, PyTorch, TensorFlow, Python
- How it works: Uses deep learning models to recommend tailored learning paths to students
  based on their progress and interaction patterns.
- Key components: Deep learning recommendation engine, FastAPI backend

## Skills (Resume Verified)
- Python
- FastAPI
- Machine Learning
- Deep Learning
- TensorFlow
- PyTorch
- LangChain
- FAISS
- RAG (Retrieval-Augmented Generation)
- Generative AI
- LLM Pipelines
- Vector Databases
- Prompt Engineering

## Achievements (Resume Verified)
- 300+ LeetCode problems solved
- Built and deployed AI/ML/Generative AI applications
- Understanding of LLM Pipelines, Vector Databases, and Prompt Engineering

## What NOT to claim
- Do NOT mention specific LeetCode easy/medium/hard breakdowns
- Do NOT mention contest ratings or global rankings
- Do NOT mention commit counts, PR counts, or repository counts
- Do NOT mention specific years for any milestone
- Do NOT mention number of APIs deployed
- Do NOT mention months of experience
- Do NOT mention any project other than LinguiFAI, MediSense AI, and AI Smart Learning Platform
- Do NOT mention MongoDB, Docker, React, Node.js, TypeScript — not in resume
- Do NOT mention any deployment provider (Vercel, Railway, etc.)
- Do NOT mention performance benchmarks like <300ms or 10k+ documents
"""


def get_embeddings():
    return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


def build_documents_from_resume() -> list:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "resume_data.json")

    documents = []

    # Always include the verified knowledge base as a core document
    documents.append(Document(page_content=VERIFIED_KNOWLEDGE, metadata={"source": "verified_kb"}))

    try:
        with open(data_path, "r", encoding="utf-8") as f:
            resume_data = json.load(f)

        # Profile
        basic = (
            f"Prajwal Patil is a B.Tech Computer Science & Engineering student at Parul University. "
            f"He specializes in Generative AI, Machine Learning, LangChain, FAISS, FastAPI, and RAG systems. "
            f"He is open to AI Engineer, ML Engineer, and Backend Engineer roles."
        )
        documents.append(Document(page_content=basic, metadata={"source": "profile"}))

        # Skills from resume
        if "skills" in resume_data:
            skills_text = "Prajwal's verified skills: " + ", ".join(resume_data["skills"])
            documents.append(Document(page_content=skills_text, metadata={"source": "skills"}))

        # Only the 2 resume-verified projects
        for proj in resume_data.get("projects", []):
            text = (
                f"Project: {proj.get('title', '')}\n"
                f"Description: {proj.get('description', '')}\n"
                f"Technologies: {', '.join(proj.get('technologies', []))}"
            )
            documents.append(Document(page_content=text, metadata={"source": "projects"}))

        # Education
        for ed in resume_data.get("education", []):
            text = (
                f"Education: {ed.get('degree', '')} at {ed.get('institution', '')}."
            )
            documents.append(Document(page_content=text, metadata={"source": "education"}))

        # Achievements
        for ach in resume_data.get("achievements", []):
            documents.append(Document(page_content=f"Achievement: {ach}", metadata={"source": "achievements"}))

    except Exception as e:
        print(f"Note: Could not load resume_data.json ({e}). Using verified knowledge base only.")

    return documents


def ingest_data():
    if not RAG_AVAILABLE:
        return None

    documents = build_documents_from_resume()
    if not documents:
        return None

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)

    print(f"Building FAISS index from {len(chunks)} chunks...")
    embeddings = get_embeddings()
    vectorstore = FAISS.from_documents(chunks, embeddings)

    os.makedirs(INDEX_PATH, exist_ok=True)
    vectorstore.save_local(INDEX_PATH)
    print(f"Index saved to {INDEX_PATH}")
    return vectorstore


def get_retriever():
    if not RAG_AVAILABLE:
        return None

    if os.path.exists(INDEX_PATH):
        try:
            embeddings = get_embeddings()
            vectorstore = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
            return vectorstore.as_retriever(search_kwargs={"k": 3})
        except Exception as e:
            print(f"Failed to load index: {e}. Rebuilding...")

    vectorstore = ingest_data()
    return vectorstore.as_retriever(search_kwargs={"k": 3}) if vectorstore else None


def get_context(query: str) -> str:
    """Return relevant resume context for a query using FAISS, or direct verified context if RAG unavailable."""
    if not RAG_AVAILABLE:
        return VERIFIED_KNOWLEDGE

    retriever = get_retriever()
    if not retriever:
        return VERIFIED_KNOWLEDGE

    docs = retriever.invoke(query)
    retrieved = "\n\n".join([d.page_content for d in docs])
    # Always append the verified knowledge base to prevent hallucination
    return f"{retrieved}\n\n{VERIFIED_KNOWLEDGE}"
