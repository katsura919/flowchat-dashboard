# FlowChat VA Backend — MongoDB Schema

> **Stack:** Node.js · Express · MongoDB (Mongoose)
> **MVP Rules:**
>
> - Admin creates all VA accounts
> - VAs cannot self-register
> - EOD reports and Weekly Audits are **blocked** until `isCertified === true`
> - Certification items are checked by the **Admin**, not the VA
> - All auth via JWT (role-based: `admin` | `va`)

---

## Collections Overview

| Collection          | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `admins`            | Admin user accounts                                  |
| `vas`               | VA user accounts                                     |
| `training_progress` | VA self-reports module completion (17 modules)       |
| `certifications`    | Admin-reviewed 3-phase certification checklist       |
| `eod_reports`       | Daily operations report — one per working day per VA |

---

## 1. `admins`

```js
{
  _id:        ObjectId,
  name:       String,   // required
  email:      String,   // required, unique, lowercase
  password:   String,   // bcrypt hashed
  createdAt:  Date,
  updatedAt:  Date
}
```

---

## 2. `vas`

```js
{
  _id:             ObjectId,
  name:            String,   // required
  email:           String,   // required, unique, lowercase
  password:        String,   // bcrypt hashed
  assignedAdminId: ObjectId, // ref: admins — set at creation

  status:          String,   // enum: 'active' | 'inactive' | 'suspended' — default 'active'
  trainingStatus:  String,   // enum: 'not_started' | 'in_progress' | 'completed' — default 'not_started'

  isCertified:     Boolean,  // default false — flipped by backend when cert passes
  certifiedAt:     Date,     // nullable — stamped when isCertified flips to true

  createdAt:       Date,
  updatedAt:       Date
}
```

---

## 3. `training_progress`

One document per VA. Created automatically when Admin creates a VA account.
VAs mark modules complete. 17 modules total.

```js
{
  _id:             ObjectId,
  vaId:            ObjectId, // ref: vas — unique (one doc per VA)

  modules: [
    {
      slug:        String,   // unique identifier — see slug list below
      label:       String,   // display name
      group:       String,   // nav group (e.g. 'Getting Started')
      completed:   Boolean,  // default false
      completedAt: Date      // nullable
    }
  ],

  completedCount:  Number,   // count of modules where completed === true
  totalCount:      Number,   // always 17
  progressPercent: Number,   // (completedCount / 17) * 100, rounded

  updatedAt:       Date
}
```

### Module Slugs (17 total)

| Slug             | Label                         | Group              |
| ---------------- | ----------------------------- | ------------------ |
| `blueprint`      | SOP Growth Blueprint          | Getting Started    |
| `va-role`        | VA Role & Daily Rhythm        | Getting Started    |
| `limitations`    | Platform Limits & Safety      | Getting Started    |
| `overview`       | Overview & Purpose            | Client Walkthrough |
| `client-guide`   | Client Quick-Start Guide      | Client Walkthrough |
| `setup`          | Pre-Call Setup Protocol       | VA Setup           |
| `compliance`     | Compliance & Platform Limits  | VA Setup           |
| `day-1`          | Day 1 — Overview & Strategy   | Daily Walkthrough  |
| `day-2`          | Day 2 — Lead Import & Logic   | Daily Walkthrough  |
| `day-3`          | Day 3 — Messaging & Nurturing | Daily Walkthrough  |
| `day-4`          | Day 4 — Automation & Scaling  | Daily Walkthrough  |
| `maturity`       | Maturity Roadmap              | Growth System      |
| `audit`          | Weekly Growth Audit           | Growth System      |
| `scripts`        | Script Playbook               | Playbooks          |
| `report`         | Daily Operations Report       | Playbooks          |
| `optimization`   | 30-Day Optimization Review    | Operations         |
| `best-practices` | Best Practices & Skills       | Operations         |

---

## 4. `certifications`

One document per VA. Created automatically when Admin creates a VA account.
Items are checked by the **Admin** during a live review session.

```js
{
  _id:      ObjectId,
  vaId:     ObjectId, // ref: vas — unique (one doc per VA)

  phase1: {
    // Technical — NO pass mark, completion tracking only
    items: [
      {
        id:         String,   // 't1' ... 't5'
        text:       String,
        checked:    Boolean,  // default false
        checkedAt:  Date      // nullable
      }
    ],
    completedCount: Number,  // 0–5
    totalCount:     Number,  // always 5
    isPassed:       null     // always null — no pass requirement
  },

  phase2: {
    // Safety — 100% required to pass
    items: [
      {
        id:         String,   // 's1' ... 's4'
        text:       String,
        checked:    Boolean,
        checkedAt:  Date
      }
    ],
    completedCount: Number,  // 0–4
    totalCount:     Number,  // always 4
    isPassed:       Boolean  // completedCount === 4
  },

  phase3: {
    // Communication — 80% required (4 out of 5)
    items: [
      {
        id:         String,   // 'c1' ... 'c5'
        text:       String,
        checked:    Boolean,
        checkedAt:  Date
      }
    ],
    completedCount: Number,  // 0–5
    totalCount:     Number,  // always 5
    isPassed:       Boolean  // completedCount >= 4
  },

  isCertified:  Boolean,  // phase2.isPassed && phase3.isPassed
  certifiedAt:  Date,     // nullable — stamped when isCertified flips
  reviewedBy:   ObjectId, // ref: admins

  updatedAt:    Date
}
```

### Certification Items

**Phase 1 — Technical**

- `t1` Import 50 leads using a keyword filter
- `t2` Move a lead correctly through Stages 01–10
- `t3` Edit and rotate message templates in the Builder
- `t4` Confirm booking link is active and working end-to-end
- `t5` Archive leads that have been inactive for 21+ days

**Phase 2 — Safety (100% required)**

- `s1` Recite the safe daily limits for warm and cold accounts from memory
- `s2` Identify and correctly respond to a Facebook 'Please slow down' warning
- `s3` Explain why template rotation matters for account health
- `s4` Demonstrate correct manual message spacing (not bulk-sending)

**Phase 3 — Communication (80% required — 4 of 5)**

- `c1` Convert a 'How much does it cost?' message into a booking
- `c2` Execute the full Ghosting Protocol correctly
- `c3` Perform the Double-Tap booking method correctly
- `c4` Rewrite a robotic message into a natural, human-sounding response
- `c5` Handle a 'Is this a bot?' reply correctly

---

## 5. `eod_reports`

Append-only. One document per submission.
**Blocked if `vas.isCertified !== true`.**

```js
{
  _id:   ObjectId,
  vaId:  ObjectId, // ref: vas

  date:  Date,     // the working day being reported (required)

  dailyNumbers: {
    newLeadsImported:          Number, // default 0
    friendRequestsSent:        Number,
    newConversationsStarted:   Number,
    nurtureResponsesSent:      Number,
    callsBooked:               Number
  },

  pipelineMovement: {
    newReplies:       Number,
    pendingBookings:  Number,
    qualifiedAdded:   Number
  },

  accountHealth: {
    status:       String,  // enum: 'healthy' | 'warning' | 'blocked'
    warnings:     String,  // nullable
    actionTaken:  String   // nullable
  },

  insights: {
    topGroup:         String,
    commonObjection:  String,
    winningHook:      String,
    recommendations:  String
  },

  blockers:     String,    // nullable

  submittedAt:  Date       // auto-set on create
}
```

---

## Key Business Rules

1. **Admin creates VA** → backend auto-creates `training_progress` and `certifications` documents for that VA
2. **VA marks module complete** → `completedCount` and `progressPercent` recalculated; `vas.trainingStatus` updated to `in_progress` or `completed`
3. **Admin checks certification item** → `completedCount` updated for that phase; `isPassed` recalculated; if `phase2.isPassed && phase3.isPassed` → `isCertified = true`, `certifiedAt` stamped, `vas.isCertified` updated
4. **VA submits EOD report while `isCertified === false`** → `403 Forbidden`
5. **One EOD report per VA per day** — duplicate `(vaId, date)` returns `409 Conflict`

---

## API Route Summary

| Method | Route                                                         | Role           | Description                     |
| ------ | ------------------------------------------------------------- | -------------- | ------------------------------- |
| POST   | `/api/auth/admin/login`                                       | —              | Admin login                     |
| POST   | `/api/auth/va/login`                                          | —              | VA login                        |
| POST   | `/api/admin/vas`                                              | Admin          | Create VA account               |
| GET    | `/api/admin/vas`                                              | Admin          | List all VAs                    |
| GET    | `/api/admin/vas/:id`                                          | Admin          | Get single VA                   |
| PATCH  | `/api/admin/vas/:id/status`                                   | Admin          | Update VA status                |
| GET    | `/api/admin/vas/:id/training`                                 | Admin          | View VA training progress       |
| GET    | `/api/admin/vas/:id/certification`                            | Admin          | View VA certification           |
| PATCH  | `/api/admin/vas/:id/certification/phase/:phase/items/:itemId` | Admin          | Check/uncheck cert item         |
| GET    | `/api/admin/vas/:id/eod-reports`                              | Admin          | List VA's EOD reports           |
| GET    | `/api/va/me`                                                  | VA             | Get own profile                 |
| GET    | `/api/va/me/training`                                         | VA             | Get own training progress       |
| PATCH  | `/api/va/me/training/:slug`                                   | VA             | Mark module complete/incomplete |
| GET    | `/api/va/me/certification`                                    | VA             | View own certification status   |
| POST   | `/api/va/me/eod-reports`                                      | VA (certified) | Submit EOD report               |
| GET    | `/api/va/me/eod-reports`                                      | VA             | List own EOD reports            |
