# 🚀 AI-Powered Interview & Proctoring Platform

## 📌 Overview
An automated, real-time technical interview platform driven by Artificial Intelligence. This system evaluates candidates through dynamic, voice-based interactions and dynamic follow-up questions, while ensuring interview integrity via advanced AI proctoring mechanisms.

## ✨ Key Features (Ongoing)
* **🎙️ Interactive Voice UI:** Real-time audio visualizer for seamless human-AI conversation.
* **🧠 Dynamic AI Interviewer:** Powered by LLMs to ask context-aware, deep-dive technical questions based on candidate responses.
* **👁️ Automated Proctoring:** Built-in anti-cheating mechanisms including tab-switching detection and foundational eye/gaze tracking.
* **⚡ High-Performance Architecture:** Asynchronous processing of high-latency LLM responses to ensure a zero-lag interview experience.

## 🛠️ Tech Stack
**Frontend:**
* Next.js (App Router) & React
* Tailwind CSS & Framer Motion (Animations)
* WebRTC & MediaPipe (Proctoring/Camera APIs)

**Backend:**
* Java 17 & Spring Boot 3
* PostgreSQL (Database)
* REST APIs & Asynchronous Processing

**AI & Integrations:**
* Google Gemini API / OpenAI API (LLM Engine)
* Web Speech API (Speech-to-Text & Text-to-Speech)

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* Java 17+ & Maven
* PostgreSQL

### 1. Frontend Setup
```bash
# Clone the repository
git clone [https://github.com/oshadhap/ai-interviewer.git](https://github.com/oshadhap/ai-interviewer.git)

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
