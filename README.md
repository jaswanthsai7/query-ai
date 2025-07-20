# QueryAQ – AI-Powered Query Assistant

QueryAQ is an AI-powered web application designed to let users input structured data via user-friendly forms and interact with an intelligent assistant to generate, analyze, and retrieve meaningful insights and reports.

---

## 🌐 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: ASP.NET Core 8/9 Web API
- **Database**: PostgreSQL (Free hosting supported)
- **Deployment**: Azure (for backend & DB), Vercel or Azure Static Web Apps (for frontend)
- **Version Control & CI/CD**: GitHub with GitHub Actions

---

## 📁 Project Structure

```
/QueryAQ
│
├── /frontend/        # React (Vite) frontend app
│   └── src/
│       └── components/
│       └── pages/
│       └── services/
│
├── /backend/         # ASP.NET Core Web API
│   └── Controllers/
│   └── Models/
│   └── Services/
│   └── Data/         # DbContext and EF migrations
│
├── /database/        # SQL schema and seed scripts
│   └── schema.sql
│   └── seed.sql
│
└── README.md         # This file
```

---

## 📝 Features

- Collect structured data via dynamic forms
- Store user input in a PostgreSQL database
- Query, analyze, and summarize data using AI
- Clean UI with responsive design
- One-click deploy with CI/CD via GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8 or 9 SDK](https://dotnet.microsoft.com/)
- [Node.js (v18+)](https://nodejs.org/)
- PostgreSQL (Free: Railway.app or Supabase)
- GitHub account

---

## 🔧 Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/jaswanthsai7/Query-AI
   cd QueryAQ
   ```

2. **Frontend**  
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend**  
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

4. **Database**
   - Use `/database/schema.sql` to create tables
   - Use `/database/seed.sql` for initial data (optional)
   - You can automate DB deployment via EF Core Migrations or SQL script in CI

---

## ⚙️ Deployment (Suggested)

- **Frontend**: Vercel or Azure Static Web Apps
- **Backend**: Azure App Service (free tier)
- **Database**: Railway.app or Supabase.io

Use GitHub Actions for auto-deploy on push.

---

## 📌 Roadmap

- [ ] Dynamic Form Builder UI
- [ ] AI Assistant Integration (OpenAI or Azure OpenAI)
- [ ] Query History & Audit Logs
- [ ] User Authentication (Optional)

---

## 🧠 Purpose

To empower users with a simple interface to submit structured data and gain insights using integrated AI – all from a single app.

---

## 📝 License

MIT License
