# Customer Support Ticket System (Frontend)

This project is a **production-like Angular application** that simulates an internal customer support tool.

## 🎯 Goal

Build a realistic, maintainable frontend application that demonstrates:

- scalable Angular architecture
- modern state management
- professional testing strategies
- real-world frontend patterns

## 🧩 Core Features

- Ticket management (list, detail, status, priority)
- Role-based access (Admin, Agent)
- Dashboard with ticket statistics
- User management (Admin only)
- Authentication (mocked)

## 🧠 Tech Stack

- Angular 21 (Standalone Components)
- NgRx Signal Store
- RxJS & Signals
- Angular Material
- Nx
- Nx ESLint Module Boundaries
- Vitest
- Playwright
- ESLint & Prettier

## 🏗 Architecture Overview

- Domain-driven design with bounded contexts for Tickets, Dashboard, and Users
- Domain code lives in `libs/<domain>`; platform layers in `libs/core` (infrastructure) and `libs/shared` (UI/utils)
- Apps compose domain libraries; keep business logic out of `apps/`
- Clear module boundaries enforced by Nx ESLint Module Boundaries
- Business logic lives in services and stores; UI components remain lean

## 🧪 Testing Strategy

- Unit & component tests with Vitest
- E2E tests with Playwright
- Focus on business behavior and user flows

## 📁 Workspace Structure

- apps/
  - support-app/ (shell that composes domain libs)

- libs/
  - core/ (platform services: routing, auth, http, error handling)
  - shared/ (design system, primitives, utilities)
  - tickets/ (ticket domain: aggregates, stores, services)
  - dashboard/ (dashboard domain: metrics, reporting views)
  - users/ (user domain: profiles, roles, assignments)

## 📌 Case Study

This project serves as a case study to demonstrate how a real-world Angular frontend can be structured and maintained over time.
