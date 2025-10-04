# 🗂️ Kanban Board

A modern task management web app with drag-and-drop functionality, authentication, and Firestore integration.
Built with **TypeScript, Next.js, Tailwind CSS, Firebase, and React**, designed with a **dark theme UI** and smooth interactions.

🚀 **Live Demo**: [https://task-menager-eosin.vercel.app/](https://task-menager-eosin.vercel.app/)

---

## ✨ Features

* 📝 **Add & Edit Tasks** – Create and update tasks directly in any column.
* 🗑 **Delete Tasks** – Remove tasks with one click.
* 📌 **Drag & Drop** – Move tasks between columns seamlessly.
* 🔑 **Authentication** – Firebase auth with secure sign-in & sign-out.
* ☁️ **Firestore Sync** – Real-time database persistence for tasks.
* 🌙 **Dark Theme UI** – Modern dark mode styling.
* 📱 **Responsive Design** – Works on mobile, tablet, and desktop.
* 🎭 **Smooth Animations** – Subtle motion effects for clean UX.

---

## 📸 Screenshots

### Board View

<img width="2880" height="1800" alt="task-menager-eosin vercel app_" src="https://github.com/user-attachments/assets/5a963de4-3869-4ea1-a1e2-75b0fb863a1b" />
<img width="1902" height="949" alt="image" src="https://github.com/user-attachments/assets/f52c0ad2-edf3-4258-8456-e76dab1987ae" />

---

## 🛠 Tech Stack

* **TypeScript**
* **Next.js 14 (App Router)**
* **React 18**
* **Tailwind CSS**
* **Firebase (Auth + Firestore)**
* **@hello-pangea/dnd** (drag & drop)
* **React Hot Toast** (notifications)

---

## ⚡ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Vnill125/kanban-board.git
cd kanban-board
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id  
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id  
```

4. **Run locally**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

---

## 🌍 Deployment

This app is optimized for **Vercel**.
Simply connect your GitHub repo, set your environment variables in Vercel project settings, and deploy 🚀

---

## 📄 License

This project is licensed under the **MIT License** – free to use and modify.

---

💡 Author: **Vnill125**
If you like this project, don’t forget to ⭐ it on GitHub!
