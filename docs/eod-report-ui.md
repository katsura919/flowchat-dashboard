# End of Day (EOD) Report - Implementation & API Docs

This document outlines the final implementation of the VA End of Day (EOD) Report feature and the required backend API specifications.

## Overview

The EOD Report system allows VAs to track their daily performance metrics across four key areas: Daily Numbers, Pipeline Movement, Account Health, and Insights. Access is restricted via a `CertificationGate` to ensure only fully trained VAs submit reports.

## Frontend Implementation

### Components
- **`EodPage`**: The main container (`src/app/va/eod/page.tsx`) using a tabbed interface.
- **`CertificationGate`**: Wraps the page content, checking certification status before allowing access.
- **`EodStatsOverview`**: Displays key metrics (New Leads, Requests, Conversations, Calls) from the latest report.
- **`EodForm`**: a 4-step wizard for data entry with Zod validation.
- **`EodHistoryTable`**: Lists past reports with a "View" action that opens a detailed `Dialog`.

### State Management & Hooks
Located in `src/hooks/eod-reports.ts`:
- **`useEodReports()`**: Fetches all reports for the current VA.
- **`useSubmitEod()`**: Handles the multipart form submission with automatic cache invalidation of `['eod-reports']`.

## Data Schema (Frontend & API)

```typescript
interface EodReport {
  date: string; // ISO Date string (YYYY-MM-DD)
  dailyNumbers: {
    newLeadsImported: number;
    friendRequestsSent: number;
    newConversationsStarted: number;
    nurtureResponsesSent: number;
    callsBooked: number;
  };
  pipelineMovement: {
    newReplies: number;
    pendingBookings: number;
    qualifiedAdded: number;
  };
  accountHealth: {
    status: 'healthy' | 'warning' | 'blocked';
    warnings?: string | null;
    actionTaken?: string | null;
  };
  insights: {
    topGroup: string;
    commonObjection: string;
    winningHook: string;
    recommendations: string;
  };
  blockers?: string | null;
}
```

## Required API Endpoints

### 1. Submit EOD Report
Used by the VA to submit their daily report.
- **Endpoint**: `POST /api/va/me/eod-reports`
- **Auth**: VA Token
- **Request Body**: `EodReport` (see schema above)
- **Validation**: 
  - Ensure only one report per VA per day.
  - VA must be certified.

### 2. Fetch VA History
Used by the VA to view their own past reports.
- **Endpoint**: `GET /api/va/me/eod-reports`
- **Auth**: VA Token
- **Response**: `EodReport[]`

### 3. Admin View (VA Performance)
Used by Admins to monitor a specific VA.
- **Endpoint**: `GET /api/admin/vas/:vaId/eod-reports`
- **Auth**: Admin Token
- **Response**: `EodReport[]`

### 4. Admin Dashboard Overview
Used for high-level tracking.
- **Endpoint**: `GET /api/admin/reports/eod-summary`
- **Auth**: Admin Token
- **Query Params**: `?startDate=...&endDate=...`
- **Response**: Aggregated stats per VA.
