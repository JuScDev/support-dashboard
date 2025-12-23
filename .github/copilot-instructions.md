# GitHub Copilot Instructions

This project is a **professional Angular 21 application** built with the following principles:

## Tech Stack

- Angular 21 (Standalone Components)
- Nx Workspace
- RxJS + Angular Signals
- NgRx Signal Store for global state
- Angular Material for UI
- Vitest for unit/component tests
- Playwright for E2E tests
- ESLint + Prettier
- Sheriff for enforcing module boundaries

## Architecture Principles

- Domain-driven design with explicit bounded contexts
- Domain libraries under `libs/` for Tickets, Dashboard, Users; platform libraries `core` and `shared`
- Clear separation of concerns and boundaries enforced by Sheriff
- No cross-domain imports except through approved contracts (e.g., shared types/services)
- Global state via Signal Stores; local UI state via Signals
- Business logic must NOT live in components

## Folder Rules

- Apps compose domain libraries; do not place business logic in `apps/`
- Domain libs live in `libs/tickets`, `libs/dashboard`, `libs/users`
- Platform libs live in `libs/core` (infrastructure, shell) and `libs/shared` (UI atoms/utilities)
- Domain libs may depend on `core` and `shared`; avoid lateral domain-to-domain deps
- `core` and `shared` must never depend on domain libs
- All boundaries are enforced via Sheriff

## Coding Guidelines

- Prefer readable, maintainable code over clever solutions
- Avoid overengineering
- Use Angular best practices
- Use typed APIs and strict TypeScript
- Tests should focus on behavior, not implementation details

## What this app is

- Internal Customer Support / Ticket System
- Business-focused, production-like frontend
- No demo or toy app

## What this app is NOT

- A playground
- A tutorial project
- Overly experimental

You can find more useful information in the /docs folder.

When generating code, always respect these rules.
