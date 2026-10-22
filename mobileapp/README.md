# Agent Recourse — Mobile App Prototype (2040)
**Mobile-Optimized Companion for Flipkart APM ’29 Submission**

---

## 📱 Mobile Architecture & Design
This mobile prototype translates the full Swiss-inspired minimalism and high-context fintech clarity of **Agent Recourse** into a sleek, responsive mobile application:

* **Color Palette (Moonlit Mauve):**
  * `#F3E8EB` — Airy canvas & background
  * `#E9D5DA` & `#C9BBCF` — Muted cards, borders, hover states, and secondary UI elements
  * `#9384D1` — Primary accents, verified pills, and interactive focus states
  * `#6B5B95` — Brand titles, headings, and lead text accents
  * `#C53030` — Vermillion breach accent (for explicit instruction conflicts)
  * `#2D6A4F` — Forest moss accent (for verified cryptographic compliance)
* **Typography:** Modern sans-serif typography system (`Inter`, with `Arial, Helvetica, sans-serif` fallbacks).
* **Bottom Navigation Bar (Standard Mobile Pattern):**
  1. **Feed (`screen-overview`)** — Real-time transaction feed, 3 summary metrics, dominant flight conflict card with **+180 min breach**, and quick filter pills.
  2. **Vault (`screen-instructions`)** — 14 active human constraints with bolded thresholds, severity badges, and "+ Add Rule" modal.
  3. **Evidence (`screen-evidence`)** — Bilateral comparison of Mandate vs Observed Action, compact SHA-256 hash pills (`0x98f2...a8a2`, `0x3d08...0182`), vertical forensic timeline, and HMAC proof.
  4. **Disputes (`screen-disputes`)** — 4-cell Claim Overview Grid, expandable formal legal narrative, progression stepper, and 1-tap restitution trigger (**₹7,850.00** approved).
  5. **Profile (`screen-security`)** — Harshith's enclave credentials, **Spent Analysis high-level charts** (SVG Donut Allocation Ring & 24h Debit Velocity Area), connected agents directory, and emergency kill-switch.
  6. **Guide (`screen-guide`)** — 4 structured cards explaining Core Concept & Mental Model, Navigation Walkthrough, Conflict Detection & Spending Metrics, and Emergency Kill-Switch & Privacy guarantees.
* **On-Demand Detail Inspector:**
  * Cursor hover and tap reveal an institutional floating card (`#mGlobalDetailTooltip`) or action bottom sheet modal with cryptographic timestamps, raw payload details, and statutory citations.
* **Dual Viewport Support:**
  * **On Desktop:** Renders inside an authentic, centered mobile phone frame with camera notch, status bar, and home indicator.
  * **On Real Mobile Devices:** Expands seamlessly to 100% of the viewport.

---

## 🚀 How to Run
Open in any browser:
```
http://localhost:8080/mobileapp/index.html
```
Or double-click [`index.html`](file:///c:/Flipkart/mobileapp/index.html) directly. No build steps or npm dependencies required.
