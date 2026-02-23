# UI Design Plan — EOD Report

The End of Day (EOD) Report is the primary daily task for the VA. It must be clean, fast, and provide clear feedback on their certification status.

## UI Components

### 1. Certification Lock (Guard)
- **Visual**: A full-page overlay or a prominent banner if `isCertified === false`.
- **Content**: "Certification Pending. You must complete your 3-phase certification and all training modules before you can submit daily reports."
- **Action**: Button to "View Training Progress".

### 2. Multi-Step Form
To prevent overwhelm, the form should be divided into logical sections or tabs:

#### Section A: Daily Numbers
- **Inputs**: Number fields for:
  - New Leads Imported
  - Friend Requests Sent
  - New Conversations Started
  - Nurture Responses Sent
  - Calls Booked

#### Section B: Pipeline Movement
- **Inputs**: Number fields for:
  - New Replies (Stage 07)
  - Pending Bookings
  - Qualified Leads Added

#### Section C: Account Health
- **Inputs**: 
  - Status Dropdown (Healthy, Warning, Blocked)
  - Warnings Textarea (Conditional: only if not Healthy)
  - Action Taken Textarea (Conditional: only if not Healthy)

#### Section D: Insights & Blockers
- **Inputs**: 
  - Top Performing Group (Text)
  - Common Objection (Text)
  - Winning Hook (Textarea)
  - Recommendations (Textarea)
  - Blockers (Textarea)

### 3. Submission & Feedback
- **Action**: "Submit Daily Report" button.
- **Feedback**: Loading states and success/error toasts (using Sonner).
- **History**: A "Past Reports" table to view previous submissions.

## API Requirements

### VA Role
- **GET** `/api/va/me/eod-reports`
  - Fetch history of reports.
  - Used to check if a report for "today" already exists (prevent duplicates).
- **POST** `/api/va/me/eod-reports`
  - Submit the new report document.
  - Payload matches the `eod_reports` schema.

### Admin Role
- **GET** `/api/admin/vas/:id/eod-reports`
  - Admin view of a specific VA's performance.
