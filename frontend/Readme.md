#  DevScope AI

> **AI-Powered GitHub Developer Analytics Platform**

DevScope AI is a full-stack MERN application that analyzes GitHub developer profiles beyond the basic information provided by GitHub. Instead of simply displaying profile details, it processes repositories, activity, and technologies to generate meaningful developer insights, compare two developers side-by-side, and provide AI-powered suggestions for improvement.

The project is built with scalability and clean architecture in mind, following a layered backend structure using Express, service-based architecture, and reusable components.

---

##  Live Demo

**Frontend:** (Vercel)_

**Backend API:** (Railway + Docker)_

---

##  Features

###  GitHub Profile Search

- Search any public GitHub username
- View profile information
- Repository listing
- Recent GitHub activity
- Language distribution
- Repository statistics

---

###  Developer Analytics

Instead of showing only GitHub data, DevScope AI calculates custom developer metrics such as:

- Total Repositories
- Total Stars
- Total Forks
- Repository Size
- Most Used Language
- Technology Distribution
- Repository Quality Score
- Activity Score
- Overall Developer Score

---

###  Compare Two Developers

Compare two GitHub profiles side by side.

Comparison includes:

- Repository Count
- Followers
- Stars
- Forks
- Technology Diversity
- Activity
- Developer Score

The comparison is displayed using visual progress bars and statistics for easier understanding.

---

### 🤖 AI Powered Feedback

Using Google Gemini AI, the application generates:

- Strengths
- Weaknesses
- Improvement Suggestions
- GitHub Profile Review
- Learning Recommendations
- Career Advice

The AI explains the backend-generated analytics instead of calculating statistics itself.

---

###  Smart Caching

To improve performance and reduce unnecessary GitHub API requests, searched profiles are cached.

Benefits:

- Faster repeated searches
- Reduced API calls
- Better scalability

---

##  Backend Architecture

The backend follows a layered architecture.

```
Client
    │
    ▼
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ├── GitHub Service
    ├── Statistics Service
    ├── Cache Service
    └── AI Service
    │
    ▼
Utilities
    │
    ▼
External APIs / Database
```

Each layer has a single responsibility, making the project easier to maintain and extend.

---

##  Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### APIs

- GitHub REST API
- Google Gemini API

### DevOps

- Docker
- Railway (Deployment)

### AI
 
- Gemini

### Deployment

- Frontend → Vercel
- Backend → Railway

---

##  Project Structure

```
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
│   └── validators
│
└── frontend
    ├── components
    ├── pages
    ├── services
    └── utils
```

---

##  Getting Started

### Clone Repository

```bash
git clone https://github.com/Priyanshu57005/DevScope-AI
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=

MONGODB_URI=

GITHUB_TOKEN=

GEMINI_API_KEY=

REDIS_URL=
```

---

##  Real World Concepts Used

This project is designed to demonstrate concepts commonly used in production backend systems.

- Clean Architecture
- Service Layer Pattern
- REST API Design
- Promise.all() for parallel API requests
- API Response Standardization
- Error Handling Middleware
- Global Exception Handling
- Data Aggregation
- AI Integration
- Caching Strategy
- Modular Backend Structure
- Dockerized Deployment

---

##  Why This Project?

GitHub provides a lot of information, but it doesn't explain what that information means.

DevScope AI aims to bridge that gap by converting raw GitHub data into meaningful insights that can help developers understand their profile better, compare themselves with others, and identify areas for improvement.

---

##  Future Improvements

- Redis Cache
- GitHub Contribution Heatmap
- Organization Analysis
- Repository Trend Analysis
- Team Comparison
- PDF Report Generation
- Leaderboard
- Authentication
- Saved Searches
- Advanced Charts

---

##  Contributing

Suggestions and improvements are always welcome.

Feel free to fork the repository and create a pull request.

---

##  License

This project is licensed under the MIT License.

---

### Made with ❤️ by Priyanshu Gautam