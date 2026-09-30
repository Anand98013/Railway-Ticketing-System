# Postman load testing

Use the Postman collection for functional checks first.

For a basic load test:

1. Start MySQL, Redis and Spring Boot.
2. Import `Railway-Ticketing.postman_collection.json`.
3. Run `Register` once.
4. Run `Login` and copy the JWT into the collection `token` variable.
5. Run requests with Postman Collection Runner.
6. Increase iterations gradually: 10 → 50 → 100 → 500.
7. Observe response time, error rate, CPU, memory, MySQL connections and Redis hit ratio.

Recommended endpoints for load testing:
- `GET /api/trains`
- `GET /api/trains/search`
- `GET /api/trains/{trainId}/seats`
- `GET /api/status/{trainNumber}`
- authenticated `GET /api/bookings/my`

For real production load testing, use a dedicated tool such as k6, JMeter or Gatling rather than relying only on Postman.
