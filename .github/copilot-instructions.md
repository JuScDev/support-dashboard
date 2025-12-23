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

- Feature-based architecture
- Clear separation of concerns
- No cross-feature imports
- Global state via Signal Stores
- Local UI state via Signals
- Business logic must NOT live in components

## Folder Rules

- `features` may depend on `core` and `shared`
- `core` must NOT depend on `features`
- `shared` must NOT depend on `features`
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
