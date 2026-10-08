# Marlowe & Finch ops-dashboard

## Run
```
docker compose up -d db
./mvnw spring-boot:run          # http://localhost:8080
SPRING_PROFILES_ACTIVE=demo ./mvnw spring-boot:run   # no Docker needed
```

## Test
```
./mvnw test          # Java: 25 tests (JUnit 5, H2, MockMvc)
npm install && npm test  # Frontend: 45 tests (Jest + jsdom)
```

## Layout
- Backend: `src/main/java/com/marlowefinch/ops/` — Spring JDBC, no JPA, Flyway migrations
- Frontend: `src/main/resources/static/` — `index.html`, `app.js`, `style.css` (no build step)
- Test harness: `src/test/javascript/setup/loadApp.js` — register every new element id here

## Conventions
- New element ids must be added to `REGISTERED_IDS` in `loadApp.js`
- App clock is pinned to 2026-09-21 (`ClockConfig.java`)
- pom.xml dependencies are frozen. Any change needs a CHG ticket.
