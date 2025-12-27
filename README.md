# 🫧 BitUnsaid  
### The Unsaid Voices of BIT Deoghar

BitUnsaid is a **campus-only, real-time expression platform** built exclusively for students of **BIT Deoghar**.  
It allows students to share thoughts, ideas, opinions, confessions, and emotions that often remain *unsaid* — in a safe, pseudo-anonymous environment.

---

## 🎯 Objective

To create a shared digital campus space where students can:
- Express themselves freely
- Feel heard without fear of judgment
- Stay anonymous yet accountable

BitUnsaid is **anonymous — not fake**.

---

## 🔑 Core Philosophy

**Anonymity is the core feature of BitUnsaid.**

It is **not only a confession platform**, but also a space for:
- Ideas
- Opinions
- Questions
- Emotions
- Honest conversations

---

## 🫧 Key Features

### 🔐 Authentication & Identity
- Email-based login/signup
- Mandatory profile setup (Branch, Year, Gender)
- Pseudo-anonymous **animal-based User ID**
- Real name, email, and roll number are never shown publicly

---

### 🫧 Floating Bubble System
- Every message appears as a floating bubble
- Bubbles move smoothly and bounce within the screen
- All logged-in users see the same bubbles in real time
- Clicking a bubble opens the full message in a modal

---

### 😀 Emoji Reactions
- React using emojis instead of comments
- Only **one emoji reaction per user per message**
- Reactions update live for everyone

---

### 🔥 Trending Messages
- Messages with the highest reactions become trending
- Top 5 trending messages are highlighted
- Trending messages are visible via a dedicated icon

---

### ⏳ Message Lifetime
- Messages are **temporary**
- Automatically disappear after **7 days**
- Encourages honest, in-the-moment expression

---

### 🚩 Safety & Moderation
- Any user can report a message **once**
- Messages are hidden after **10 reports**
- Harassment, abuse, or hate speech is not tolerated

---

## 🧑‍🎓 Who Is This For?

BitUnsaid is built **by a student, for students of BIT Deoghar**.  
It is **not a social media platform**, but a shared emotional and intellectual campus space.

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- HTML5 Canvas (bubble animation)

**Backend**
- Firebase Authentication
- Firestore (real-time database)

**Deployment**
- Netlify

---

## 🔒 Environment Variables

This project uses environment variables for Firebase configuration.

Create a `.env` file locally (not committed to GitHub):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
