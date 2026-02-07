# **Three Things**

**Browser Extension – Phased Product & Design Specification**

## Product Intent

A calm, intentional browser extension that helps the user build a daily habit of gratitude by capturing **three things they appreciated from the previous day**, storing everything **locally**, and making it easy to reflect over time.

**Design ethos:**
Minimal. Human. Supportive. No guilt. No noise.

**Platform:**
Browser extension (Chrome-first; Edge-compatible)

**Data philosophy:**
Local-only. Offline-first. No accounts. No cloud.

---

## **Phase 1 — Core Capture MVP + Simple Confirmation View**

### Purpose

Create the smallest possible version that:

1. Lets the user capture three things, and
2. Immediately shows that those three things were saved exactly as intended.

This phase is about **trust and visibility**, not reflection.

---

### User Experience & Design

When the user clicks the extension icon, one of two states is shown.

#### **State A — Capture View (no entry yet)**

* Title:
  **"Three things I appreciated yesterday"**
* Three vertically stacked text fields:

  * Thing 1
  * Thing 2
  * Thing 3
* Primary action: **Save**
* Secondary action: **Close**

#### **State B — Simple Confirmation View (entry exists)**

* Title:
  **"Saved for yesterday"**
* A clean, read-only list:

  * • Thing 1 text
  * • Thing 2 text
  * • Thing 3 text
* Actions:

  * **Edit** (returns to capture view)
  * **Close**

Design principles:

* Single screen
* No tabs
* No scrolling history
* No extra metadata
* Immediate visual confirmation

---

### Functional Requirements

* One entry per date
* Entries are editable
* Data persists locally across browser restarts
* Confirmation view appears automatically after saving

---

### Technical Notes

* Storage: `chrome.storage.local`
* Data model:

  * `date` (unique key)
  * `thing1`, `thing2`, `thing3`
  * `createdAt`, `updatedAt`
* Conditional rendering based on entry existence

---

### Done Means

* I can save three things
* I immediately see them reflected back
* I trust that the app works

---

## **Phase 2 — Daily State Awareness**

### Purpose

Help the user understand whether today's reflection has already been captured, without pressure.

---

### User Experience & Design

* On open:

  * If no entry exists → Capture View
  * If entry exists → Confirmation View
* Copy reinforces completion, not obligation

---

### Functional Requirements

* Detect entry state per date
* Route user to correct view automatically

---

### Technical Notes

* Date comparison logic only
* No notifications yet

---

### Done Means

* The app "knows" whether today is done

---

## **Phase 3 — Remind Me Later (Browser Notifications)**

### Purpose

Support consistency through gentle, opt-in reminders.

---

### User Experience & Design

* Capture View includes:

  * **Remind me later**
* Options:

  * 15 minutes
  * 30 minutes
  * 60 minutes
* Reminder triggers a browser notification
* Clicking notification opens the Capture View

---

### Functional Requirements

* Schedule one reminder per day
* Cancel reminder once entry is saved

---

### Technical Notes

* Browser alarms + notifications APIs
* Reminder metadata stored locally

---

### Done Means

* I can defer
* I get reminded once
* Reminder disappears after completion

---

## **Phase 4 — Voice Input (Speech-to-Text)**

### Purpose

Reduce friction by allowing spoken reflection.

---

### User Experience & Design

* Microphone icon next to each field
* Visual feedback while listening
* Text appears in the field after transcription
* Editable like typed text

---

### Functional Requirements

* Speech converted to text only
* No audio stored
* Graceful fallback to typing

---

### Technical Notes

* Web Speech API
* Permission requested only on use

---

### Done Means

* Voice input feels optional and reliable

---

## **Phase 5 — Journal View (Structured Reflection)**

### Purpose

Transform individual entries into a meaningful history.

---

### User Experience & Design

* Add a **Journal** view
* Reverse chronological list of entries
* Each entry shows:

  * Date
  * Three saved items
  * Optional image thumbnail (if added later)
* Clicking an entry opens it for viewing/editing

Design continuity:

* Phase 1 confirmation view becomes the **single-entry version** of this list

---

### Functional Requirements

* View all entries
* Edit past entries

---

### Technical Notes

* Read-only list view + entry detail view
* Same underlying data model as Phase 1

---

### Done Means

* I can browse my past reflections easily

---

## **Phase 6 — Photo Attachment (Optional Memory Anchors)**

### Purpose

Allow visual context without increasing friction.

---

### User Experience & Design

* Optional "Add photo" action on entry
* One image per entry
* Thumbnail shown in Journal

---

### Functional Requirements

* Attach image
* Persist locally
* Display consistently

---

### Technical Notes

* Base64 or local reference storage
* Respect browser storage limits

---

### Done Means

* Photos feel additive, not required

---

## **Phase 7 — PDF Export**

### Purpose

Allow reflections to be taken outside the app.

---

### User Experience & Design

* Export action in Journal
* Date range selection
* Clean, readable PDF

---

### Functional Requirements

* Export text and images
* Download via browser

---

### Technical Notes

* Client-side PDF generation
* No server calls

---

### Done Means

* I can export a meaningful record of my reflections

---

## **Phase 8 — Settings & Polish (Optional)**

Includes:

* Reminder defaults
* Enable/disable voice
* Data reset
* Keyboard shortcut hint

---

## **Explicit Non-Goals**

* No automatic morning launch
* No cloud sync
* No accounts
* No social features
* No analytics
