# 🎮 PlayPals Contribution Guidelines

Welcome to the **PlayPals** open-source project! Before contributing, please read these guidelines carefully.

📺 **Watch this video to get started:**  
[![Watch on YouTube](https://img.youtube.com/vi/Ggh3ohfow_k/0.jpg)](https://youtu.be/Ggh3ohfow_k)

---

## 📌 Project Overview

**PlayPals** is a smart **turf booking and match-making app** designed to make sports more accessible, social, and fun.

🏟️ **Key Features**:
- Discover and **book turfs** based on availability
- **Join** matches based on player count or **invite friends**
- Separate portals for **Users** and **Turf Owners**
- Built-in **chat** and **reminder notifications**
- Clean **cross-platform mobile experience**

---

## 🛠️ Tech Stack

| Layer        | Technology             | Description                              |
|--------------|------------------------|------------------------------------------|
| 🧠 Backend    | Node.js + Express.js   | REST API hosted on [Render](https://render.com) |
| 💾 Database   | MongoDB (via Mongoose) | For storing users, turfs, bookings, etc. |
| 🌐 Frontend   | HTML, CSS, JS (Web)    | Admin dashboard / Turf Owner portal      |
| 📱 App        | React Native (Expo)    | Cross-platform app for players/users     |
| 🔐 Auth       | JWT + Bcrypt           | Secure user authentication               |
| ☁️ Hosting    | Render.com             | API deployment (Node.js backend)         |
| 🛎 Notifications | Expo Push API       | Match updates and reminders              |

---

## 🚀 How to Contribute

1. **Fork** this repository
2. **Clone** your forked repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PlayPals.git
   cd PlayPals
