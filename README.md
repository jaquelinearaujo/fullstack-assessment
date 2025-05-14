# 🧪 Technical Challenge – Full Stack Project (Java + React)

This project is a full-stack application developed as part of a technical challenge. The stack used includes:

- Backend: Java 17 + Spring Boot
- Database: PostgreSQL (via Docker Compose)
- Frontend: React.js

---

## 📁 Project Structure

```
root/
├── backend/                # Spring Boot Project
│   ├── src/                
│   ├── pom.xml     
│   ├── docker-compose.yml  # PostgreSQL Service via Docker         
├── frontend/               #  React.js Application
│   ├── public/
│   ├── src/
│   ├── package.json
└── README.md               # This file
```

---

## 🚀 How to Run the Project Locally

### Prerequisites

- Java 17
- Node.js (version 16+)
- Docker and Docker Compose

### 1. Clone the repository:
```bash
git clone https://github.com/jaquelinearaujo/fullstack-assessment.git
```

### 2. Navigate to the project directory:
```bash
cd fullstack-assessment
```

### 3. Start the Database and Run the Backend (Java + Spring Boot)

```bash
cd backend
docker-compose up -d
```

This command will start a PostgreSQL container with the configurations defined in `docker-compose.yml`.
And also start the Backend application

**Note: Check the `application.yml` file to confirm the PostgreSQL connection URL.

### 4. Run the Frontend (React.js)

```bash
cd ..
cd frontend
npm install
npm run dev
```

The application will be started at `http://localhost:5173`.

---

## 🔐  Features

### Backend

- RESTful API for user authentication and registration
- Session validation
- Integration with PostgreSQL
- Implementação de segurança com Spring Security (se aplicável)

### Frontend

- Login and registration pages
- Local session storage (via`localStorage`)
- Consuming backend APIs via `axios`
- Context API for authentication control

---

## ⚙️ Technologies Used

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Docker

### Frontend

- React.js
- Axios
- React Router
- Context API
- Sass

---

## 📝 Notes 

- The main focus was to implement basic authentication and a functional login/registration flow.
- Communication between frontend and backend is done through REST APIs.
- The project is structured to be easily expandable, with a clear separation of responsibilities.
- Data persistence is handled using a real database via Docker Compose.