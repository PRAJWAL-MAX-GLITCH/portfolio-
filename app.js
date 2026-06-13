
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
const sections = document.querySelectorAll('.console-content .section-card');

function activateSection(targetId) {
    navItems.forEach(item => {
        if (item.getAttribute('href') === `#${targetId}`) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    sections.forEach(sec => {
        if (sec.id === targetId) {
            sec.classList.add('active-section');
        } else {
            sec.classList.remove('active-section');
        }
    });
    const currentPathEl = document.querySelector('.path-current');
    if (currentPathEl) {
        currentPathEl.textContent = `~/portfolio/${targetId}`;
    }
}
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').replace('#', '');
        activateSection(targetId);
    });
});
function toggleArchitecture(id) {
    const archContainer = document.getElementById(id);
    if (archContainer) {
        archContainer.classList.toggle('hidden');
    }
}
const kb = [
    {
        keys: ['about', 'who are you', 'bio', 'background', 'prajwal'],
        response: `Prajwal is a Computer Science developer who doesn't just study code; he builds systems that run. He focuses on the intersection of Generative AI, Retrieval-Augmented Generation (RAG), and fast backend architectures. He treats APIs and data structures as the core engine of any product. When he's not optimizing FastAPI routers or designing vector database pipelines, he's refining his algorithmic thinking—he's solved over 300 problems on LeetCode to make sure his code is optimized and performant.`
    },
    {
        keys: ['skills', 'capabilities', 'expertise', 'know'],
        response: `His technical skill set is organized by execution layers:
• **AI & GenAI:** He designs RAG retrieval pipelines using LangChain, generating semantic maps with vector stores like FAISS.
• **Backend Engines:** He uses FastAPI to write fast, asynchronous endpoints. He pairs this with MongoDB and SQL databases for robust data structures.
• **CS Foundations:** He approaches software design with a strong grasp of data structures and algorithms, keeping runtimes lean and scalable.`
    },
    {
        keys: ['project', 'medisense', 'learning', 'portfolio', 'code'],
        response: `Let me highlight his two primary builds:
1. **MediSense AI:** This is a RAG medical assistant. Prajwal used LangChain and Hugging Face models, indexing medical references into a FAISS vector database to enable semantic queries. The backend is powered by FastAPI to support real-time async processing.
2. **AI Smart Learning Platform:** This is an end-to-end recommender. He integrated PyTorch/TensorFlow predictive analytics with a MongoDB backend and deployed it using Vercel.

Which architecture would you like me to walk you through?`
    },
    {
        keys: ['rag', 'vector', 'faiss', 'embedding', 'medical'],
        response: `**MediSense AI** is a RAG-based Medical Assistant built using Python, LangChain, Hugging Face models, FAISS vector search, and FastAPI.
• **Core Logic:** Document retrieval is performed using chunking strategies and embedding representations mapped to local FAISS indices.
• **Backend Routing:** Designed under FastAPI to run query processing async, delivering contextually accurate data with minimal latency.`
    },
    {
        keys: ['leetcode', 'dsa', 'algorithms', 'solved', 'problems'],
        response: `Prajwal has solved **300+ Data Structures & Algorithms (DSA)** problems on LeetCode. 
This solidifies his understanding of time/space complexity, sorting/searching algorithms, trees, and custom graph processing, ensuring his AI models run on optimized core application code.`
    },
    {
        keys: ['fastapi', 'django', 'flask', 'backend', 'api'],
        response: `FastAPI was selected over frameworks like Django or Flask due to its high throughput, native support for async/await concurrency, and automatic OpenAPI schema documentation. 
For machine learning inference APIs where downstream calls can block execution, FastAPI prevents request stalling.`
    }
];
function askTwin(queryText) {
    activateSection('twin');
    const inputField = document.getElementById('chat-input');
    if (inputField) {
        inputField.value = queryText;
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
}
function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const messageContainer = document.getElementById('chat-messages');
    if (!input || !messageContainer || !input.value.trim()) return;
    const query = input.value.trim();
    input.value = '';
    appendMessage('user', query);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    const thinkingId = appendMessage('system', 'Twin is parsing query embeddings...');
    messageContainer.scrollTop = messageContainer.scrollHeight;
    setTimeout(() => {
        const thinkingNode = document.getElementById(thinkingId);
        if (thinkingNode) thinkingNode.remove();
        const normalizedQuery = query.toLowerCase();
        let match = null;
        for (const entry of kb) {
            if (entry.keys.some(key => normalizedQuery.includes(key))) {
                match = entry.response;
                break;
            }
        }
        if (!match) {
            match = `Prajwal's AI Twin: "I processed your request, but I couldn't find a direct keyword match in my local memory store. Ask me about **MediSense AI**, **FastAPI**, **LeetCode DSA**, or my **AI Smart Learning Platform**."`;
        }
        appendMessage('assistant', match);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 900);
}
function appendMessage(sender, text) {
    const messageContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    const msgId = 'msg-' + Date.now();
    msgDiv.id = msgId;
    msgDiv.className = `message ${sender}`;
    const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/•/g, '&bull;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');       
    msgDiv.innerHTML = `<p>${formattedText}</p>`;
    messageContainer.appendChild(msgDiv);
    return msgId;
}
