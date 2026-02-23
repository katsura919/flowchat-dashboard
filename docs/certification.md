# VA Certification Workflow

The certification process is a three-phase review conducted by Admins after a VA completes 100% of their training modules. This document outlines the user flow, UI components, and API requirements according to the backend schema.

## Workflow Overview

1.  **Trigger**: VA completes all training modules (100% progress).
2.  **Notification**: The VA appears in the Admin's "Pending Certification" list.
3.  **Review**: Admin checks performance items across 3 phases.
4.  **Completion**: Once Phase 2 and Phase 3 requirements are met, the VA is automatically marked as `isCertified: true`.
5.  **Access**: VA gains access to EOD Report submissions.

---

## Certification Phases

Based on `certifications-schema.ts`, the requirements for each phase are:

### Phase 1: Onboarding Review
- **Items**: 5 checklist items.
- **Pass Condition**: None (isPassed remains null). Used for tracking onboarding completion.

### Phase 2: Technical Proficiency
- **Items**: 4 checklist items.
- **Pass Condition**: `completedCount === totalCount` (All items must be checked).
- **Manual Gate**: Admin must verify the VA's technical setup and SOP understanding.

### Phase 3: Live Performance Review
- **Items**: 5 checklist items.
- **Pass Condition**: `completedCount >= 4` (At least 4 items must be checked).
- **Manual Gate**: Admin reviews live account performance and lead quality.

---

## Admin UI Components

### 1. Certification Dashboard
- **Table**: Shows VAs grouped by status: `Pending Review`, `In Progress`, `Certified`.
- **Filters**: Filter by VA ID, Team, or specific Phase progress.

### 2. Certification Review Drawer/Modal
- **Progress Tracker**: Visual indicator of the 3 phases.
- **Checklist Sections**: Accordion or Tabbed view for Phase 1, 2, and 3.
- **Live Updates**: As items are checked, the backend automatically recalculates phase status and overall certification.

---

## API Requirements

### VA Role
- **GET** `/api/va/me/certification`
  - Returns the current VA's certification status and checklist items.
  - Used by `CertificationGate` to determine access to EOD reports.

### Admin Role
- **GET** `/api/admin/certifications`
  - List all certifications with filtering by status.
- **GET** `/api/admin/certifications/:vaId`
  - Get detailed checklist items for a specific VA.
- **PATCH** `/api/admin/certifications/:vaId/items`
  - Toggle specific checklist items.
  - **Payload**: `{ phase: string, itemId: string, checked: boolean }`
- **PATCH** `/api/admin/certifications/:vaId/review`
  - Finalize review or add comments (optional, but good for tracking).

---

## Technical Logic (Backend)

The `ICertification` model includes a `pre-save` hook that automates the status updates:
- **`isCertified`** becomes `true` only if `phase2.isPassed && phase3.isPassed`.
- **`certifiedAt`** is set automatically upon the first time `isCertified` becomes true.
- **`reviewedBy`** stores the ID of the last Admin who made a change.
