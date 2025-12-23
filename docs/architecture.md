# Architecture Guidelines

## Core Principles

- Domain-driven design with explicit bounded contexts (Tickets, Dashboard, Users)
- Predictable state management
- Testable business logic

## State Management

- Global state: NgRx Signal Store
- Local UI state: Angular Signals
- Async logic handled via services and store methods

## Component Design

- Smart components coordinate data
- Dumb components handle presentation
- No HTTP or complex logic in components

## Dependency Rules

- Domain libs (`libs/tickets`, `libs/dashboard`, `libs/users`) may depend on `core` and `shared`
- Avoid lateral domain-to-domain dependencies; use shared contracts when cross-domain data is required
- Apps compose domains and must not contain business logic
- `core` and `shared` must never depend on domain libs
- Boundaries are enforced by Sheriff

## Error Handling

- Centralized error handling in Core
- UI components only display errors

## Auth & Roles

- Role-based route guards
- Role-based UI visibility
