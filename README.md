# Kanban Board

A simple 3-tier Kanban board application with:

- Frontend: static HTML/CSS/JavaScript
- Backend: Spring Boot REST API
- Database: PostgreSQL

## Project Structure

- `db/` - PostgreSQL Docker setup
- `backend/` - Spring Boot application
- `frontend/` - Static Kanban UI
- `.env` - Shared environment variables
- `docker-compose.yml` - Container orchestration

## Environment Variables

Create or update `.env` with:

## Run with Docker Compose

```bash
docker compose up --build
```

Then open:

- Frontend: http://localhost
- Backend API: http://localhost:8080/api/tasks
