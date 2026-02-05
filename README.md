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