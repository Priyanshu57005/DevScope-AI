# DevScope AI

> **AI-Powered GitHub Developer Analytics Platform**

DevScope AI is a full-stack MERN application that analyzes GitHub developer profiles beyond the standard GitHub dashboard. It processes repositories, activity, programming languages, and technology usage to generate meaningful developer insights, compare developers side-by-side, and provide AI-powered recommendations using Google Gemini.

The project follows a layered backend architecture with reusable service modules, RESTful APIs, caching, and Dockerized deployment.

---

# Live Demo

### Frontend (Netlify)

https://devscopeai-analyzer.netlify.app/

### Backend API (Railway + Docker)

https://devscope-ai-production.up.railway.app/

### Docker Hub

Backend:
https://hub.docker.com/r/priyanshudv/devscope-backend

Frontend:
https://hub.docker.com/r/priyanshudv/devscope-frontend

---

# Deployment Architecture

```text
                 User
                   │
                   ▼
        React Frontend (Netlify)
                   │
             HTTPS REST API
                   │
                   ▼
      Docker Container (Railway)
                   │
        Node.js + Express API
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 GitHub REST API      Google Gemini AI
        │
        ▼
   MongoDB Atlas
```

---

# Docker

Both frontend and backend are containerized using Docker to provide consistent and reproducible deployments.

## Pull Images

### Backend

```bash
docker pull priyanshudv/devscope-backend:latest
```

### Frontend

```bash
docker pull priyanshudv/devscope-frontend:latest
```

## Run Backend

```bash
docker run -p 3000:3000 --env-file .env priyanshudv/devscope-backend:latest
```

## Run Frontend

```bash
docker run -p 5173:5173 priyanshudv/devscope-frontend:latest
```

---

# Features

## GitHub Profile Search

- Search any public GitHub username
- Repository listing
- Recent GitHub activity
- Language distribution
- Repository statistics

---

## Developer Analytics

Generate custom developer metrics including:

- Repository Count
- Stars
- Forks
- Repository Size
- Language Distribution
- Technology Diversity
- Repository Quality Score
- Activity Score
- Overall Developer Score

---

## Compare Developers

Compare two GitHub profiles side-by-side.

Comparison includes:

- Repository Count
- Followers
- Stars
- Forks
- Technology Diversity
- Activity Score
- Overall Developer Score

Visual progress bars and statistics simplify comparison.

---

## AI-Powered Insights

Google Gemini generates:

- Strengths
- Weaknesses
- GitHub Profile Review
- Learning Recommendations
- Improvement Suggestions
- Career Advice

The backend computes developer metrics, while Gemini interprets them to produce actionable feedback.

---

## Smart Caching

Frequently searched GitHub profiles are cached to:

- Reduce GitHub API requests
- Improve response time
- Enhance scalability

---

# Backend Architecture

```text
               Client
                  │
                  ▼
             Express Routes
                  │
                  ▼
            Controllers
                  │
                  ▼
              Services
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 GitHub API  Analytics   AI Service
      │         │
      └────┬────┘
           ▼
      Cache Layer
           │
           ▼
      MongoDB Atlas
```

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## APIs

- GitHub REST API
- Google Gemini API

## DevOps

- Docker
- Railway
- Netlify
- MongoDB Atlas

---

# Project Structure

```text
DevScope-AI
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── package.json
│   └── Dockerfile
│
└── frontend
    ├── src
    ├── public
    ├── package.json
    └── Dockerfile
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/Priyanshu57005/DevScope-AI.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Docker

## Build Images

```bash
docker build -t devscope-backend ./backend

docker build -t devscope-frontend ./frontend
```

## Run Backend

```bash
docker run -p 3000:3000 --env-file backend/.env devscope-backend
```

## Run Frontend

```bash
docker run -p 5173:5173 devscope-frontend
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=

MONGODB_URI=

GITHUB_TOKEN=

GEMINI_API_KEY=

REDIS_URL=
```

---

# System Design Highlights

- Layered Backend Architecture
- Service Layer Pattern
- RESTful API Design
- Modular Codebase
- Promise.all() for Parallel API Requests
- Global Error Handling Middleware
- AI Integration using Google Gemini
- GitHub API Aggregation
- Smart Caching Strategy
- Dockerized Deployment
- Cloud Database using MongoDB Atlas

---

# Future Improvements

- Redis Caching
- GitHub Contribution Heatmap
- Repository Trend Analysis
- Organization Analytics
- Team Comparison
- Authentication
- Saved Searches
- PDF Report Generation
- Advanced Data Visualizations
- CI/CD Pipeline with GitHub Actions

---

# Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

# License

This project is licensed under the MIT License.

---

# Author

**Priyanshu Gautam**

B.Tech Information Technology

Aspiring Software Development Engineer (SDE)

GitHub:
https://github.com/Priyanshu57005

LinkedIn:
https://www.linkedin.com/in/priyanshu-gautam-12b5a0298

---

⭐ If you found this project useful, consider giving it a star on GitHub.
