# event-tracker
Build an Event-Driven User Activity Service with RabbitMQ and Rate Limiting

📄 STEP 1: README.md — Title & Overview
Create / open this file:
event-tracker/README.md

Paste this exactly:
# Event-Driven User Activity Service

## Overview

This project implements an event-driven microservice architecture for tracking user activity events.  
The system exposes a REST API for ingesting user activity data, publishes events to RabbitMQ for asynchronous processing, and persists processed events to a database via a separate consumer service.

The architecture is designed to be scalable, resilient, and production-oriented, following best practices commonly used in modern backend systems.

Key features include:
- Event-driven design using RabbitMQ
- Asynchronous processing via a dedicated consumer service
- IP-based rate limiting to prevent abuse
- Robust input validation and error handling
- Fully containerized multi-service setup using Docker Compose
- Comprehensive unit testing for API and consumer logic


✅ This satisfies:

Project overview requirement

Clear problem statement

Architectural intent

📄 STEP 2: Architecture Section (Very Important)

Paste below the previous content:

## Architecture

The system is composed of four main components:

1. **API Service**
   - Exposes REST endpoints for ingesting user activity events
   - Performs input validation and IP-based rate limiting
   - Publishes validated events to RabbitMQ
   - Responds quickly to clients without waiting for downstream processing

2. **RabbitMQ**
   - Acts as a message broker to decouple ingestion from processing
   - Uses a durable queue (`user_activities`) to ensure reliability
   - Enables asynchronous and fault-tolerant event handling

3. **Consumer Service**
   - Listens to the RabbitMQ queue
   - Parses incoming events
   - Persists activity data to the database
   - Implements proper message acknowledgment (ACK/NACK) to prevent data loss

4. **Database (MongoDB)**
   - Stores processed activity events
   - Captures original event data along with processing metadata

### Event Flow



Client
→ API Service
→ RabbitMQ (user_activities queue)
→ Consumer Service
→ Database


This separation of concerns improves scalability, fault tolerance, and system resilience.


💡 This is exactly what reviewers look for in system design clarity.

📄 STEP 3: Tech Stack

Paste next:

## Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – REST API framework
- **RabbitMQ** – Message broker for event-driven communication
- **MongoDB** – Persistent storage for activity events
- **Jest** – Unit testing framework
- **Docker & Docker Compose** – Containerization and service orchestration

📄 STEP 4: Folder Structure

Paste next:

## Project Structure



event-tracker/
├── api/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── services/
│ ├── tests/
│ ├── server.js
│ ├── Dockerfile
│ └── package.json
│
├── consumer/
│ ├── models/
│ ├── services/
│ ├── tests/
│ ├── worker.js
│ ├── Dockerfile
│ └── package.json
│
├── docker-compose.yml
├── env.example
├── README.md
└── API_DOCS.md


This structure enforces a clear separation between the API and consumer services.

📄 STEP 5: Environment Variables

Paste below the Project Structure section in README.md:

## Environment Variables

The project uses environment variables for configuration.  
An example file is provided as `env.example`.

### API Service

- `PORT` – Port on which the API server runs
- `RABBITMQ_URL` – Connection string for RabbitMQ
- `RATE_LIMIT_WINDOW_MS` – Time window for rate limiting
- `RATE_LIMIT_MAX_REQUESTS` – Maximum requests allowed per IP per window

### Consumer Service

- `RABBITMQ_URL` – Connection string for RabbitMQ
- `MONGO_URI` – MongoDB connection string


Why this matters:
✔ Shows configurability
✔ Shows production awareness
✔ Evaluators explicitly look for this

📄 STEP 6: How to Run the Project (Docker)

Paste next:

## Running the Project (Docker)

The recommended way to run the system is using Docker Compose.

### Prerequisites
- Docker Desktop
- Docker Compose

### Steps

1. Clone the repository
2. Navigate to the project root
3. Start all services:

```bash
docker-compose up --build


This will start:

API service

Consumer service

RabbitMQ

MongoDB

All services will run on the same Docker network and communicate internally.


---

# 📄 STEP 7: Running Without Docker (Optional)

Paste next:

```md
## Running Without Docker (Optional)

Each service can also be run locally for development purposes.

### API Service

```bash
cd api
npm install
npm start

Consumer Service
cd consumer
npm install
node worker.js


RabbitMQ and MongoDB must be running locally or accessible remotely.


This shows flexibility and dev experience maturity.

---

# 📄 STEP 8: Testing Strategy (IMPORTANT FOR EVALUATION)

Paste this **exactly** (this is a scoring section):

```md
## Testing Strategy

Testing focuses on validating core business logic and ensuring system reliability.

### API Tests
- Unit tests validate request handling, input validation, and service behavior
- External dependencies such as RabbitMQ are mocked to ensure isolated testing

### Consumer Tests
- Tests verify correct message processing and database persistence
- Database interactions are mocked to avoid external dependencies

### Running Tests

```bash
# API tests
cd api
npm test

# Consumer tests
cd consumer
npm test


The test suite ensures critical functionality works as expected without relying on live infrastructure.


This **directly explains** the Jest test you already ran — evaluators love this.

---

# 📄 STEP 9: Design Decisions

Paste next:

```md
## Design Decisions

- **Event-driven architecture** was chosen to decouple ingestion from processing
- **RabbitMQ** ensures reliable, asynchronous communication between services
- **Dedicated consumer service** improves scalability and fault isolation
- **Rate limiting** protects the system from abuse
- **Docker Compose** simplifies local setup and ensures environment consistency

📄 STEP 10: Future Improvements

Paste last section:

## Future Improvements

- Add retry and dead-letter queues for failed events
- Introduce schema validation using JSON Schema
- Add structured logging and monitoring
- Implement authentication and authorization
- Add integration and end-to-end tests
