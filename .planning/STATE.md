# Project State Tracking

## Current Status
- Current Phase: Phase 2 — Sentralisasi Keuangan & Modul Persediaan.
- Progress: 75% (Expense management + overbudget interception implemented).

## Completed Tasks
- [x] AGENTS.md implementation with strict business rules.
- [x] .planning/PROJECT.md created.
- [x] .planning/REQUIREMENTS.md created.
- [x] .planning/ROADMAP.md created.
- [x] Initialize Node.js + TypeScript npm workspaces monorepo structure.
- [x] Create packages/shared-types with core data models (Order, Branch, Courier, Transaction).
- [x] Initialize hub/ Express backend with TypeScript.
- [x] Implement POST /api/orders/allocate with Static Georouting (Haversine distance).
- [x] Implement Order Quota Lock (30 daily slots) with WhatsApp delay template.
- [x] Implement GET /api/couriers/:id_kurir/tasks with strict branch data isolation (NF01).
- [x] Create spokes/branch-app/ React frontend with Tugas Harian page (FR-LOG-03).
- [x] Implement PATCH /api/orders/:id_order/status endpoint.
- [x] Implement auto-journaling logic (Selesai/Lunas → CashBookEntry with id_cabang tag).
- [x] Create cashbook service (hub/src/services/cashbook.ts) with mock storage.
- [x] Create budget service (hub/src/services/budget.ts) with monthly budget ceilings per branch.
- [x] Create expense service (hub/src/services/expense.ts) with approval workflow.
- [x] Implement POST /api/expenses/request with overbudget interception (400 Bad Request).
- [x] Implement PATCH /api/expenses/:id_expense/approve for Hub admin approval.

## Open Issues / Next Actions
- [ ] Add integration tests for expense workflow and overbudget edge cases.
- [ ] Implement closing discrepancy detection and branch freeze logic (Phase 3).
- [ ] Build executive dashboard for cash flow visualization (Phase 3).
- [ ] Define shared database schema with mandatory id_cabang indexing.
