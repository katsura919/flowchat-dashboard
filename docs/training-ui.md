# Training Progress & Certification System

This document outlines the architecture, data flow, and API implementation for the VA Training Progress and Certification feature.

## 1. Overview
The Training System allows Virtual Assistants (VAs) to track their progress through 17 core modules and 3 certification phases. It provides a premium, rewarding UI that visualizes their journey toward becoming a certified FlowChat professional.

## 2. UI Components (Frontend)

### `TrainingProgressOverview`
- Displays overall training status (`not_started`, `in_progress`, `completed`).
- Shows numerical progress (e.g., "5/17 modules completed").
- Features a visual progress bar and a certification badge.

### `ModuleRoadmap`
- A categorized list of 17 modules divided into groups (Getting Started, Client Walkthrough, Operations, etc.).
- Allows VAs to toggle modules as "Done".
- Provides direct links to **SOPs** for each module.
- Uses **Static SOP Mapping**: SOP links are managed on the frontend for speed and maintainability.

### `CertificationDashboard`
- Visualizes the 3-phase certification process.
- **Phase 1**: Assessment & Review.
- **Phase 2**: Operational Proficiency (Requires 100% completion).
- **Phase 3**: Final Review (Requires 4/5 items).
- Automatically updates certification status based on phase results.

## 3. Data Architecture

### Mapping & Slugs
Each module is uniquely identified by a **slug** (e.g., `m1`, `m2`, ..., `m17`). This slug is used to:
1. Map to static SOP links on the frontend.
2. Identify which module to update in the backend database.
3. Ensure consistent ordering (`order` field in schema).

### Auto-Seeding
When a VA visits the training page for the first time, the backend automatically seeds their progress record with the default 17 modules. This removes the need for manual setup by administrators.

### VA Model Integration
The VA's overall `trainingStatus` is automatically kept in sync.
- 0 modules = `not_started`
- >0 but <17 = `in_progress`
- 17 modules = `completed`

## 4. API Reference (Backend)

### `GET /api/va/training`
- **Description**: Fetches the logged-in VA's training progress.
- **Auto-Seeding**: Creates the default profile if none exists.
- **Response**: `ITrainingProgress` object containing the `modules` array and stats.

### `PATCH /api/va/training/:slug`
- **Description**: Updates the completion status of a specific module.
- **Payload**: `{ "completed": boolean }`
- **Reaction**: Triggers a rebuild of `completedCount` and `progressPercent` via Mongoose pre-save hooks.

### `GET /api/va/training/certification`
- **Description**: Fetches the VA's certification status and phase details.

## 5. Frontend Integration (TanStack Query)

The frontend uses specialized hooks in `src/hooks/training.ts`:
- **`useTrainingProgress`**: For fetching and caching module data.
- **`useUpdateModuleStatus`**: For optimistic-ready updates and cache invalidation.
- **`useCertification`**: For fetching certification-specific data.

### Static SOP Management
SOP links are defined in the `SOP_LINKS` constant within `src/hooks/training.ts`. To update a link, simply modify the mapping there.

```typescript
export const SOP_LINKS: Record<string, string> = {
    'm1': '/overview',
    'm2': '/va-role',
    // ...
};
```
