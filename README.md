# Prajwal Patil - AI & Backend Engineer Portfolio

This repository contains the source code for my professional portfolio website. It features an interactive **AI Twin** powered by Retrieval-Augmented Generation (RAG) that can answer questions about my projects, skills, and background in real-time.

🌐 **Live Link**: [https://portfolio-hazel-chi-10.vercel.app](https://portfolio-hazel-chi-10.vercel.app)

---

## 🛠️ Tech Stack & Architecture

The project is structured into two main components:

### 💻 Frontend (Next.js & React)
* **Framework**: Next.js 16 (Pages Router)
* **UI & Styling**: React 19, Vanilla CSS, Tailwind CSS, Framer Motion (for smooth micro-animations and console transitions)
* **Host**: Deployed on **Vercel**

### ⚙️ Backend (FastAPI & RAG Engine)
* **Framework**: FastAPI (Python 3.11)
* **AI Core**: LangChain, FAISS Vector database, Google Gemini API
* **Host**: Deployed on **Render**

---

## 🚀 Key Features

* **RAG-Powered AI Twin**: An interactive command-line style terminal allowing recruiters to chat with my AI Twin, which retrieves relevant semantic data from my resume/projects to formulate grounding-resistant answers.
* **Responsive Visuals**: Sleek dark mode aesthetics featuring interactive stats components (GitHub, LeetCode, Skills metrics) and premium micro-animations.
* **Contact Integration**: Modern contact form communicating directly with backend endpoints.

---

## 🏃 Local Development

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in a `.env` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
5. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
