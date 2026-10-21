# Agent Recourse — Mobile App Prototype (2040)
**Mobile-Optimized Companion for Flipkart APM ’29 Submission**

---

## 📱 Mobile Architecture & Design
This mobile prototype translates the full Swiss-inspired minimalism and fintech clarity of **Agent Recourse** into a mobile-first interface:
* **Bottom Navigation Bar (iOS / Android pattern):**
  1. **Overview** — Greeting, 3 summary metrics, prominent IndiGo flight conflict card, and recent activity.
  2. **Vault** — Active instruction list with category tags and quick "+ Add" action.
  3. **Activity** — Filterable transaction feed with tap-to-inspect actions.
  4. **Evidence** — The signature audit view with side-by-side comparison, vertical timeline, HMAC hash inspection, and dossier export.
  5. **Disputes** — 4-step dispute progression stepper and 1-tap carrier arbitration simulator.
  6. **Security** — Profile & Security Center (Harshith, key copy, connected agents directory, and local data controls).
* **Native Mobile Bottom Sheet:** Tapping any transaction slides up an authentic, swipe-dismissible bottom sheet modal.
* **Dual Viewport Support:**
  * **On Desktop:** Renders inside a clean, centered phone frame with status bar and home indicator.
  * **On Mobile Devices / Chrome DevTools Mobile View:** Stretches natively to 100% of the screen.

---

## 🚀 How to Run
Double-click [`index.html`](file:///c:/Flipkart/mobileapp/index.html) or run:
```powershell
Start-Process "c:\Flipkart\mobileapp\index.html"
```
No build steps or dependencies required.
