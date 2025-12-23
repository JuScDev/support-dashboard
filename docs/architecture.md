# Architecture Guidelines

## Core Principles

- Feature-based architecture
- Explicit boundaries between domains
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

- Features may depend on Core and Shared
- Core and Shared must never depend on Features
- Enforced by Sheriff

## Error Handling

- Centralized error handling in Core
- UI components only display errors

## Auth & Roles

- Role-based route guards
- Role-based UI visibility
