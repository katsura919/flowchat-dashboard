# UI Design Plan — Training Progress

The Training UI tracks the VA's journey through the 17 core modules. It should feel rewarding and organized.

## UI Components

### 1. Progress Overview
- **Visual**: Large circular or linear progress bar.
- **Metrics**: "X / 17 Modules Completed" and "Y% Certification Ready".
- **Status Badge**: Shows `trainingStatus` (Not Started, In Progress, Completed).

### 2. Module Roadmap
A vertical or grid-based list of modules grouped by their category (Getting Started, Client Walkthrough, etc.).

- **Module Item**:
  - Module Title & Group Label.
  - Status Indicator (Checkbox or Badge).
  - "View SOP" Link: Opens the corresponding documentation page.
  - "Mark as Complete" Toggle: Only active if they are on the page or have visited it.

### 3. Certification Dashboard
A separate section for the 3-phase certification items (Phase 1: Technical, Phase 2: Safety, Phase 3: Communication).

- **Items**: Read-only for the VA (since these are checked by the Admin).
- **Visual**: Checkmarks for items already passed by the Admin.
- **Pass Flags**: "Phase 2 Passed (Required)", "Phase 3 Passed (Required)".

## API Requirements

### VA Role
- **GET** `/api/va/me/training`
  - Fetch the `training_progress` document for the logged-in VA.
- **PATCH** `/api/va/me/training/:slug`
  - Update the `completed` status for a specific module.
  - Backend should automatically update `completedCount` and `progressPercent`.
- **GET** `/api/va/me/certification`
  - View current certification items and overall `isCertified` status.

### Admin Role
- **GET** `/api/admin/vas/:id/training`
  - Monitor VA progress.
- **PATCH** `/api/admin/vas/:id/certification/phase/:phase/items/:itemId`
  - The tool the Admin uses during a review session to check/uncheck items.
