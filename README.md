# Hypertube

## MTDB_TOKE

TMDB_TOKEN='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2ZkMmI4YjRiZTQ3ZGE3YTU5ZjlhZjgxOTE3M2RmOCIsIm5iZiI6MTc4NDQwNzkyNy40MTI5OTk5LCJzdWIiOiI2YTViZTc3N2RiNTVhN2M0MjBjNTRkOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cOVFZxGbJZ5crPeMPaQPGJv1I24R8W_l1tgvCqwQLIM'


## Project Goal

Build a full-stack web application that allows authenticated users to search, stream, and watch legally distributable videos. Videos are downloaded via the BitTorrent protocol on the server and streamed while downloading.

---

# Mandatory Requirements

## Authentication

- User registration
- User login/logout
- Password reset via email
- OAuth authentication
  - 42 Strategy
  - One additional provider (Google/GitHub)
- Profile management
- User profile page
- Multi-language support (default: English)

---

## Library

- Search bar
- Search from at least **2 legal external sources**
- Display movie thumbnails
- Infinite scrolling
- Pagination
- Sorting
- Filtering
- Watched / Unwatched indicator

Each movie card should contain:

- Poster
- Title
- Production Year
- IMDb Rating
- Genre

---

## Movie Page

- Video player
- Movie details
- Poster
- Summary
- Director
- Cast
- Runtime
- IMDb Rating
- Comments

---

## Streaming

- Download torrent on the server
- Stream while downloading
- Save downloaded movies
- Delete movies not watched for one month
- Automatic subtitle download
- Convert unsupported formats (minimum MKV → MP4/WebM)

---

## REST API

Implement OAuth2 protected REST API.

Required endpoints:

### Authentication

- POST /oauth/token

### Users

- GET /users
- GET /users/:id
- PATCH /users/:id

### Movies

- GET /movies
- GET /movies/:id

### Comments

- GET /comments
- GET /comments/:id
- POST /comments
- POST /movies/:movieId/comments
- PATCH /comments/:id
- DELETE /comments/:id

---

# Suggested Project Structure

```
hypertube/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── systemDesign/
│   ├── public/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── movies/
│   │   ├── comments/
│   │   ├── torrent/
│   │   ├── streaming/
│   │   ├── subtitles/
│   │   ├── scheduler/
│   │   ├── api/
│   │   └── common/
│   │
│   ├── uploads/
│   │   ├── movies/
│   │   ├── subtitles/
│   │   └── posters/
│   │
│   └── prisma/
│
├── docs/
├── docker-compose.yml
├── README.md
```

---

# Database Structure

## Users

- id
- username
- email
- password
- firstName
- lastName
- profileImage
- preferredLanguage
- provider
- createdAt
- updatedAt

---

## Movies

- id
- title
- year
- imdbRating
- genre
- runtime
- description
- director
- cast
- poster
- torrentHash
- videoPath
- downloaded
- lastWatched
- createdAt

---

## Comments

- id
- content
- userId
- movieId
- createdAt
- updatedAt

---

## WatchHistory

- id
- userId
- movieId
- watchedAt
- progress

---

## Subtitles

- id
- movieId
- language
- filePath

---

# Required Tools

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- shadcn

---

## Backend

- NestJS
- TypeScript

---

## Database

- PostgreSQL
- Prisma ORM

---

## Authentication

- Passport.js
- JWT
- OAuth2
- 42 OAuth
- Google OAuth

---

## Streaming

- FFmpeg
- HTTP Range Requests

---

## Torrent

- libtorrent
- Transmission RPC

> **Do NOT use:** WebTorrent, Peerflix, Pulsar

---

## Movie Metadata

- TMDb API
- OMDb API

---

## Subtitles

- OpenSubtitles API

---

## Email

- Nodemailer

---

## Background Jobs

- BullMQ
- Redis
- node-cron

---

## Storage

- Local File Storage

---

## Deployment

- Docker
- Docker Compose
- Nginx

---

# External APIs

- TMDb API
- OMDb API
- OpenSubtitles API
- Archive.org
- LegitTorrents
- 42 OAuth
- Google OAuth

---

# Security Checklist

- Password hashing (bcrypt)
- JWT Authentication
- OAuth2
- Input validation
- SQL Injection protection
- XSS protection
- CSRF protection
- Helmet
- CORS
- Rate Limiting
- Store secrets in `.env`

---

# Development Milestones

1. Authentication
2. User Profiles
3. Database
4. REST API
5. Search Engine
6. Library
7. Movie Page
8. Torrent Download
9. Streaming
10. FFmpeg Conversion
11. Subtitles
12. Comments
13. Background Jobs
14. Deployment
