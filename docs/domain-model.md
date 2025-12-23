# Domain Model

## Ticket

- id
- title
- description
- status (Open, In Progress, Waiting, Closed)
- priority (Low, Medium, High)
- assigneeId
- createdAt
- updatedAt

## User

- id
- name
- email
- role (Admin, Agent)
- active

## Comment

- id
- ticketId
- authorId
- message
- createdAt
