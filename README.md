# 🔒 LOCKDOWN – AI Study Planner

Lockdown is a full-stack generative AI agent that helps students turn limited time into a clear, structured, and executable study plan.

The goal of Lockdown is simple: **lock your focus and execute your plan**.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://lockdown.vercel.app  
- **Backend (Render):** https://lockdown-backend.onrender.com  
- **API Docs (Swagger):** https://lockdown-backend.onrender.com/docs
<img width="1918" height="925" alt="image" src="https://github.com/user-attachments/assets/81ca43c8-17ca-4413-ba77-478be7b7410d" />

---

## 🧠 What Problem Does It Solve?

Many students struggle with:
- Planning realistically before exams  
- Balancing multiple subjects  
- Turning “I’ll study today” into a concrete schedule  

Lockdown solves this by generating:
- A clear **study strategy**
- A **day-wise plan**
- Simple, actionable tasks that are easy to follow

---

## ✨ Key Features

- 🧩 AI-powered study plan generation  
- 📅 Deadline-aware scheduling  
- ⏱️ Time-constrained planning (hours per day)  
- 🧪 Strong input validation using Pydantic  
- 🛡️ Reliable fallback responses for robustness  
- ⚡ Fast, minimal, distraction-free UI  

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- Deployed on **Vercel**

### Backend
- **FastAPI**
- **Pydantic AI** (agent orchestration & validation)
- **Uvicorn**
- Deployed on **Render**

### AI / Models
- **OpenRouter** (free-tier compatible models)
- Environment-based API key configuration

---

## 🤖 Agent Design (Pydantic AI)

The core agent is built using **Pydantic AI**, ensuring:

- Strict schema-based inputs & outputs  
- Clean separation between API, agent, and models  
- Graceful fallback behavior if the model is unavailable  
- Deterministic and reliable responses  

Fallback plans are intentionally included to guarantee uptime and a smooth user experience.

---

## 📡 API Overview

### `POST /generate-plan`

**Request Body**
```json
{
  "subjects": [
    { "name": "DSA", "difficulty": 5 },
    { "name": "OS", "difficulty": 4 }
  ],
  "hours_per_day": 4,
  "deadline": "2026-02-10"
}
