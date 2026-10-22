# Agent Recourse — Autonomous Intent Auditing & Arbitration Ledger (2040)
**Flipkart APM ’29 Submission Component B (Visual Interactive Prototype)**

---

## 📌 Executive Overview
**Agent Recourse** is an independent intent auditing and dispute arbitration platform designed for the autonomous agent economy in 2040. It resolves the **Verification Paradox**:
> *"Delegation only pays off if you don't have to check. So the checking must be done for you, against what you actually authorized, by someone who isn't the agent."*

This prototype directly targets **Segment 4 (High Consequence, Weak Detection)**:
* **Principal Identity:** *Harshith* (`USR-2040-DEMO`), an executive delegating domestic travel bookings, daily purchases, recurring subscriptions, and utility settlements to autonomous AI agents.
* **Problem Solved:** Silent micro-deviations and high-consequence variance (such as an agent booking an evening flight violating curfew constraints) that humans only discover weeks later.
* **Core Guarantee:** Deterministic cryptographic comparison between pre-recorded human mandates and third-party signed booking payloads with 1-click statutory restitution.

---

## 🎨 Creative & Visual Direction
* **Aesthetic:** Swiss-inspired institutional minimalism combined with high-context precision fintech design.
* **Color Palette (Moonlit Mauve):**
  * `#F3E8EB` — Light, airy backgrounds & canvas
  * `#E9D5DA` & `#C9BBCF` — Muted cards, subtle borders, hover states, and secondary UI elements
  * `#9384D1` — Primary accents, verified pills, and interactive focus states
  * `#6B5B95` — Deep headings, lead body text, icons, and prominent brand accents
  * `#C53030` — Vermillion breach accent (for explicit instruction conflicts)
  * `#2D6A4F` — Forest moss accent (for verified cryptographic compliance)
* **Typography:** Modern sans-serif typography system (`Inter`, with `Arial, Helvetica, sans-serif` fallbacks) offering high legibility and uniform visual hierarchy across all views, audit feeds, and records.
* **Micro-Interactions & Depth:** Restrained floating attestation badges with layered depth, collapsible sidebar with `Ctrl+B` shortcut, and fluid SVG data visualizations.
* **Decluttered Information Architecture:** Dense legal walls of text are replaced by clean executive summary cards, with deep forensic context accessible on **cursor hover** and **expandable accordions**.

---

## 🧭 Application Structure & Views

| View | Code | Purpose & Functionality |
| :--- | :---: | :--- |
| **01 Ingestion Feed** | `view-stream` | Real-time audit stream. Features a prominent conflict docket showing **IndiGo 6E-2412** breach (**+180 min breach**, scheduled 21:00 arrival vs. **< 18:00 IST** mandate), filterable transaction ledger with slide-out forensic detail drawers. |
| **02 Instruction Mandates** | `view-vault` | The Instruction Vault (Version V13.04, 14 active rules). Interactive table with bolded operational limits (**after 18:00 IST**, **₹15,000 INR**, **₹2,000 INR**), severity badges, and "+ Record Pre-Execution Mandate" modal that bumps vault specifications. |
| **03 Evidence Dossier** | `view-evidence` | The forensic audit suite. Two-column timeline comparing Pre-Execution Mandate vs. Carrier Execution Payload, compact SHA-256 hash pills (`0x98f2...a8a2`, `0x3d08...0182`), and mathematical HMAC binding proof confirming temporal precedence (**151s before booking**). |
| **04 Arbitration Cases** | `view-disputes` | Statutory dispute resolution tracking. Clean 4-cell Claim Overview Grid (**Respondent**, **Recorded Breach**, **Statutory Remedy ₹7,850.00**, **Temporal Proof**), toggleable formal statement of claim draft, and 1-tap transmission delivering instant carrier restitution. |
| **05 Agent Access & Trust** | `view-governance` | Autonomous agent governance directory. Manages *Flipkart Shopping Agent*, *OpenAgent Travel*, and *FinanceBot*. Configurable uncovered action policies and local cache retention controls (30, 60, 90 days). |
| **06 How to Use** | `view-guide` | Interactive onboarding guide. Four structured cards explaining Core Concept & Mental Model, Navigation Walkthrough, Conflict Detection & Spending Metrics, and Emergency Kill-Switch & Privacy guarantees. |
| **Profile & Security Center** | `view-profile` | Accessible via masthead. Displays TPM-2040 enclave identity, public key fingerprint (`8F9A-2B3C-1A92-E4F1`), **high-level Spent Analysis graphs** (SVG Donut Allocation Ring & 24h Debit Velocity Area), and the emergency kill-switch. |
| **Statutory Charter** | `view-terms` & `view-privacy` | Institutional documents establishing deterministic audit standards, non-repudiation, client-side zero-knowledge encryption, and data minimization. |

---

## 🔍 On-Demand Detail Inspector (Cursor-Hover System)
Rather than cluttering the screen with dense text, key elements feature interactive hover triggers (`.has-detail`):
* **Determination Badges:** Hovering on `INSTRUCTION CONFLICT`, `VERIFIED COMPLIANT`, or `UNCOVERED INTENT` reveals exact variance reasons, source agents, and settlement implications.
* **Mandate Specifications:** Hovering on rule codes (`SEC-TRV-102`) or severity pills displays full cryptographic root hashes and strict vs. advisory enforcement rules.
* **Compact Hash Pills:** Hovering over abbreviated hash pills (`0x98f2...a8a2`) reveals the unabbreviated 64-character SHA-256 strings and gateway confirmation IDs.
* **Executive Spending Tiles:** Hovering over metric cards reveals domain allocation formulas and real-time ledger accounting.

---

## 📊 Spent Analysis (In Profile Page)
1. **Interactive SVG Donut Ring:** Categorizes total outflow (**₹16,350.00**) across Travel & Flights (48.0%), Food & Sustenance (25.7%), Utilities (14.3%), Hardware (9.2%), and Urban Mobility (2.8%). Hovering segments dynamically updates the center readout and cross-highlights legend rows.
2. **24h Debit Velocity Spline Area:** Visualizes expenditure timing throughout the audit day with interactive hover points pinpointing transaction timestamps and anomaly spikes.

---

## 🚀 How to Run the Prototype

### Option 1: Direct File Open
No dependencies or build tools required (pure HTML5, CSS3, and modern Vanilla ES6+ JavaScript):
1. Double-click or open [`index.html`](file:///c:/Flipkart/index.html) in Microsoft Edge, Google Chrome, Safari, or Mozilla Firefox.

### Option 2: Local HTTP Server (Recommended)
Run the included PowerShell static server:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Open [http://localhost:8080/](http://localhost:8080/) in your browser.

---

## 📦 Repository Structure
```
├── index.html        # Main desktop & mobile responsive application markup
├── styles.css        # Moonlit Mauve design system, layout, micro-interactions, tooltips
├── app.js            # State engine, dynamic rendering, charts, arbitration flow, tooltips
├── server.ps1        # Local lightweight PowerShell HTTP server
├── prototype.zip     # Bundled distribution archive ready for submission
├── mobileapp/        # Mobile-specific complementary prototype application
└── README.md         # Documentation and project specification
```
