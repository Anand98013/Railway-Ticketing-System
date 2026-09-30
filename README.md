# Railway Ticketing System

Full-stack railway ticket booking application.

## Stack

### Backend
- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- MySQL
- Redis
- Spring Security
- JWT authentication
- Bean Validation
- Lombok

### Frontend
- React + Vite
- React Router
- Axios
- Plain CSS with responsive UI

### Testing
- Postman collection for API/load testing
- Playwright for frontend E2E tests

## Main features

- User registration/login with JWT
- User profile
- Train search and schedules
- Seat availability
- Ticket booking
- Booking history
- Railway status
- Redis caching for train search and railway status
- Admin-ready API structure
- Responsive frontend
- Postman collection
- Playwright smoke tests

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 20+
- MySQL 8+
- Redis 7+

## 1. Create database

```sql
CREATE DATABASE railway_ticketing;
```

The application creates tables automatically with Hibernate.

## 2. Configure backend

Edit:

`backend/src/main/resources/application.properties`

Set your MySQL username/password.

Default values:

```properties
DB_USERNAME=root
DB_PASSWORD=root
```

Change them if needed.

## 3. Start Redis

Windows/Linux example:

```bash
redis-server
```

Check:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

## 4. Run backend

> On Windows, Maven must be installed and available in PATH. If `mvn -version` is not recognized, install Maven and reopen PowerShell.


```bash
cd backend
mvn spring-boot:run
```

Backend:

http://localhost:8080

## 5. Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

http://localhost:5173

## API overview

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Trains
- GET `/api/trains`
- GET `/api/trains/{id}`
- GET `/api/trains/search?source=Delhi&destination=Mumbai&date=2026-10-01`

### Seats
- GET `/api/trains/{trainId}/seats?travelDate=2026-10-01`

### Booking
- POST `/api/bookings`
- GET `/api/bookings/my`
- GET `/api/bookings/{id}/status`
- DELETE `/api/bookings/{id}`

### Profile
- GET `/api/profile`
- PUT `/api/profile`

### Railway status
- GET `/api/status/{trainNumber}`

## Demo users

Register a user from the frontend. The application does not hard-code passwords.

## Sample train data

On first startup, sample trains are inserted:
- 12001 Rajdhani Express
- 12951 Mumbai Rajdhani
- 12301 Howrah Rajdhani
- 12622 Tamil Nadu Express

## Postman

Import:

`testing/postman/Railway-Ticketing.postman_collection.json`

First register/login and copy the returned JWT into the collection variable `token`.

## Playwright

```bash
cd frontend
npm install
npx playwright install
npm run test:e2e
```

## Production notes

For production:
- Use environment variables/secrets for JWT secret and database credentials.
- Use HTTPS.
- Use Flyway/Liquibase instead of `ddl-auto=update`.
- Add database indexes and connection pooling.
- Use Redis with authentication/TLS.
- Add payment gateway integration.
- Add refresh tokens.
- Add role-based admin endpoints.
- Add distributed locking or database row locking for very high-concurrency seat booking.

## Important booking behavior

- Travel dates in the past are rejected.
- Seat availability is calculated per train and travel date.
- Booking uses a database row lock for the selected seat to reduce double-booking during concurrent requests.
- Cancelled bookings make the seat available again for the same travel date.
- The railway status endpoint currently returns demo status data; it is not connected to an official live railway feed.

## Windows quick start

1. Start MySQL and create the database using `setup-database.sql`.
2. Start Redis if you want Redis services available for future cache configuration.
3. Run `start-backend.bat`.
4. Run `start-frontend.bat`.
5. Open `http://localhost:5173`.

## PNR Status

The frontend now includes a public PNR Status page at `/pnr-status`. It calls `GET /api/bookings/pnr/{pnr}` and displays the booking details returned from the database. The endpoint is permitted without login so passengers can check a PNR directly. Invalid or unknown PNRs return a clear `PNR not found` message.
