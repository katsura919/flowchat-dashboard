# Admin EOD Management Plan

This document outlines the design and implementation plan for the Admin-side EOD Report Management dashboard. This interface will allow admins to monitor VA performance, aggregate KPIs, and audit specific daily reports.

## Objectives
- Centralized visibility into team performance.
- Advanced temporal and categorical filtering.
- Performance trend analysis across selected date ranges.

## Core Features

### 1. Advanced Filtering Interface
- **Date Range Picker**: Allow admins to look at a day, a week, or custom periods.
- **Search**: Real-time search by VA Name or Email.
- **Status Filter**: Filter by Account Health status (`Healthy`, `Warning`, `Blocked`).

### 2. Aggregated Metrics (Summary Cards)
Display totals for the selected period:
- **Total Leads Imported**
- **Total Conversations Started**
- **Total Calls Booked**
- **Average Conversion Rate** (Calls / Leads)

### 3. Performance Data Table
- **Columns**: Date, VA Name, Leads, Conversions, Booked, Health Status, Actions.
- **Sorting**: Sort by any numeric KPI to identify top performers or bottlenecks.
- **Actions**: "View Details" to open the full EOD report.

### 4. Detail View (Audit Mode)
- A modal/dialog showing the full qualitative data:
  - Phase-by-phase notes.
  - Success/Objection text.
  - Blocking issues and recommendations.

---

## Required API Endpoints

### 1. Fetch Reports List
- **Endpoint**: `GET /api/admin/reports/eod`
- **Query Params**:
  - `startDate`: ISO String
  - `endDate`: ISO String
  - `vaId`: Optional
  - `status`: Optional (healthy|warning|blocked)
  - `search`: String
- **Response**: Paginated list of EOD reports with populated VA details.

### 2. Stats Aggregation
- **Endpoint**: `GET /api/admin/reports/eod/summary`
- **Query Params**: `startDate`, `endDate`, `vaId`.
- **Response**: Aggregated object containing sums for all numeric KPIs.

---

## UI Components to Implement

### [NEW] `DateRangePicker`
- **Path**: `src/components/ui/date-range-picker.tsx`
- **Logic**: Use `react-day-picker` (shadcn calendar) for selecting start and end dates.

### [NEW] `EodPerformanceTable`
- **Path**: `src/components/admin/eod/eod-performance-table.tsx`
- **Logic**: Standard Shadcn table with integration for pagination and sorting.

### [NEW] `EodStatsOverview`
- **Path**: `src/components/admin/eod/eod-stats-overview.tsx`
- **Logic**: Layout with 4-5 KPI cards.
