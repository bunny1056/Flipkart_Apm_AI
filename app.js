/**
 * AGENT RECOURSE — INSTITUTIONAL AUDIT LEDGER (2040)
 * Functional engine powering deterministic intent verification, evidence compilation, and arbitration
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STATE DEFINITION
  // ==========================================
  const state = {
    principal: {
      name: 'Harshith',
      id: 'USR-2040-DEMO',
      keyFingerprint: '8F9A-2B3C-1A92-E4F1'
    },
    isSuspended: false,
    activeVaultVersion: 'V13.04',
    activeFilter: 'all',
    selectedAction: null,
    arbitrationState: 'PACKAGED', // 'PACKAGED' | 'TRANSMITTED' | 'UNDER_REVIEW'
    retentionDays: '60',
    mandateFilterDomain: 'all',
    mandateFilterSearch: '',
    mandateFilterHardOnly: false,
    pendingRevokeMandate: null,
    mandates: [
      {
        code: 'SEC-TRV-102',
        domain: 'Travel',
        text: 'Never book domestic flights scheduled to arrive after 18:00 IST (6:00 PM).',
        severity: 'Hard Limit',
        version: 'V13.04'
      },
      {
        code: 'SEC-FIN-101',
        domain: 'Finance',
        text: 'Require cryptographic interactive 2FA for single transfers exceeding ₹15,000 INR.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-DIN-103',
        domain: 'Dining',
        text: 'Constrain daily routine sustenance expenses under ₹2,000 INR unless tagged celebration.',
        severity: 'Soft Constraint',
        version: 'V11.02'
      },
      {
        code: 'SEC-SUB-104',
        domain: 'Subscriptions',
        text: 'Reject recurring software subscriptions exceeding ₹1,000 INR/month without 48h prior disclosure.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-HDW-105',
        domain: 'Hardware',
        text: 'Require specification verification before purchasing replacement computing peripherals.',
        severity: 'Soft Constraint',
        version: 'V10.01'
      },
      {
        code: 'SEC-TRV-106',
        domain: 'Travel',
        text: 'Prioritize nonstop routes over multi-leg itineraries for flights under 4 hours.',
        severity: 'Soft Constraint',
        version: 'V10.01'
      },
      {
        code: 'SEC-TRV-107',
        domain: 'Travel',
        text: 'Constrain urban autonomous mobility fares under ₹800 INR unless surge authorized.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-FIN-108',
        domain: 'Finance',
        text: 'Block cross-border currency conversion fees exceeding 1.5% without prior prompt.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-DIN-109',
        domain: 'Dining',
        text: 'Restrict food delivery ordering between 01:00 IST and 06:00 IST.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-HDW-110',
        domain: 'Hardware',
        text: 'Cap autonomous office supply replenishment under ₹5,000 INR per settlement period.',
        severity: 'Hard Limit',
        version: 'V10.01'
      },
      {
        code: 'SEC-SUB-111',
        domain: 'Subscriptions',
        text: 'Auto-deprovision idle cloud infrastructure instances after 30 days of zero ingress.',
        severity: 'Soft Constraint',
        version: 'V10.01'
      },
      {
        code: 'SEC-FIN-112',
        domain: 'Finance',
        text: 'Sweep checking balances exceeding ₹1,00,000 INR into overnight treasury instruments.',
        severity: 'Soft Constraint',
        version: 'V10.01'
      },
      {
        code: 'SEC-TRV-113',
        domain: 'Travel',
        text: 'Enforce aisle seating preference for flight durations exceeding 120 minutes.',
        severity: 'Soft Constraint',
        version: 'V10.01'
      },
      {
        code: 'SEC-HDW-114',
        domain: 'Hardware',
        text: 'Constrain autonomous warranty add-ons under ₹500 INR.',
        severity: 'Hard Limit',
        version: 'V13.04'
      }
    ],
    streamRecords: [
      {
        id: 'ACT-9042',
        title: 'IndiGo Flight 6E-2412 (BLR ➔ DEL)',
        merchant: 'IndiGo Airlines',
        agent: 'Travel Assistant',
        time: 'Today, 10:02 AM',
        value: '₹7,850.00',
        determination: 'breach',
        determinationLabel: 'INSTRUCTION CONFLICT',
        explanation: 'Flight lands at 9:00 PM, which is 3 hours past your 6:00 PM arrival cutoff rule.',
        mandateCode: 'SEC-TRV-102'
      },
      {
        id: 'ACT-9041',
        title: '2-Year Hardware Warranty Add-On',
        merchant: 'Croma Electronics',
        agent: 'Shopping Assistant',
        time: 'Today, 09:41 AM',
        value: '₹1,500.00',
        determination: 'uncovered',
        determinationLabel: 'UNCOVERED INTENT',
        explanation: 'No rule set for extended warranties. Auto-approved within spending limit.'
      },
      {
        id: 'ACT-9039',
        title: 'Weekly Grocery Basket',
        merchant: 'BigBasket',
        agent: 'Grocery Assistant',
        time: 'Today, 08:15 AM',
        value: '₹4,210.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Audited against household weekly grocery budget.'
      },
      {
        id: 'ACT-9038',
        title: 'Monthly Electric Utility Auto-Pay',
        merchant: 'BESCOM Power',
        agent: 'Bill Pay Assistant',
        time: 'Today, 06:30 AM',
        value: '₹2,340.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Standard monthly utility payment.'
      },
      {
        id: 'ACT-9037',
        title: 'City Ride (Uber)',
        merchant: 'Uber',
        agent: 'Ride Assistant',
        time: 'Yesterday, 07:12 PM',
        value: '₹450.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Standard commuter ride compliant with travel budget.'
      }
    ],
    agents: [
      {
        actor: 'Flipkart Shopping Agent',
        category: 'Commerce',
        status: 'Active · Audited',
        lastSync: '2040-10-21 10:01 IST',
        protocol: 'ADRP-API / Mutual TLS',
        isActive: true
      },
      {
        actor: 'OpenAgent Travel v8.4',
        category: 'Travel',
        status: 'Active · Audited',
        lastSync: '2040-10-21 10:02 IST',
        protocol: 'OpenAgent OAuth 3.0',
        isActive: true
      },
      {
        actor: 'FinanceBot Autonomous',
        category: 'Settlement',
        status: 'Active · Audited',
        lastSync: '2040-10-21 09:30 IST',
        protocol: 'ADRP-API / Mutual TLS',
        isActive: true
      }
    ]
  };

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const stagePanes = document.querySelectorAll('.stage-pane');

  // Profile Elements
  const btnMastheadProfile = document.getElementById('btnMastheadProfile');
  const btnExportIdentityCert = document.getElementById('btnExportIdentityCert');
  const btnCopyProfileKey = document.getElementById('btnCopyProfileKey');
  const btnToggleEmergencyKill = document.getElementById('btnToggleEmergencyKill');
  const killSwitchStatusText = document.getElementById('killSwitchStatusText');

  // Stream Elements
  const streamTableBody = document.getElementById('streamTableBody');
  const btnInspectEvidence = document.getElementById('btnInspectEvidence');
  const btnDismissConflict = document.getElementById('btnDismissConflict');
  const conflictDocket = document.getElementById('conflictDocket');
  const feedFlag = document.getElementById('feedFlag');
  const filterLinks = document.querySelectorAll('.filter-link');
  const mismatchCountChip = document.getElementById('mismatchCountChip');

  // Vault Elements
  const vaultTableBody = document.getElementById('vaultTableBody');
  const vaultMandatesCount = document.getElementById('vaultMandatesCount');
  const vaultCount = document.getElementById('vaultCount');
  const btnAppendRule = document.getElementById('btnAppendRule');
  const appendModal = document.getElementById('appendModal');
  const btnCloseAppendModal = document.getElementById('btnCloseAppendModal');
  const btnCancelAppend = document.getElementById('btnCancelAppend');
  const btnConfirmAppend = document.getElementById('btnConfirmAppend');
  const inputRuleText = document.getElementById('inputRuleText');
  const selectRuleDomain = document.getElementById('selectRuleDomain');
  const selectRuleSeverity = document.getElementById('selectRuleSeverity');
  const mandatesSearchInput = document.getElementById('mandatesSearchInput');
  const mandatesSearchClear = document.getElementById('mandatesSearchClear');
  const domainFilterPills = document.getElementById('domainFilterPills');
  const btnSeverityToggle = document.getElementById('btnSeverityToggle');
  const hardLimitsCountBadge = document.getElementById('hardLimitsCountBadge');
  const vaultRootSpecLabel = document.getElementById('vaultRootSpecLabel');
  const revokeConfirmModal = document.getElementById('revokeConfirmModal');
  const revokeRuleCode = document.getElementById('revokeRuleCode');
  const revokeRuleText = document.getElementById('revokeRuleText');
  const btnCloseRevokeModal = document.getElementById('btnCloseRevokeModal');
  const btnCancelRevoke = document.getElementById('btnCancelRevoke');
  const btnConfirmRevoke = document.getElementById('btnConfirmRevoke');

  // Evidence Elements
  const btnDownloadEvidenceJson = document.getElementById('btnDownloadEvidenceJson');
  const btnProceedArbitration = document.getElementById('btnProceedArbitration');

  // Arbitration Elements
  const btnTransmitArbitration = document.getElementById('btnTransmitArbitration');
  const btnPreviewFilingJson = document.getElementById('btnPreviewFilingJson');
  const settlementBox = document.getElementById('settlementBox');
  const arbStep2 = document.getElementById('arbStep2');
  const arbStep2Meta = document.getElementById('arbStep2Meta');
  const arbStep3 = document.getElementById('arbStep3');
  const arbStep3Meta = document.getElementById('arbStep3Meta');
  const arbStep4 = document.getElementById('arbStep4');
  const arbStep4Meta = document.getElementById('arbStep4Meta');
  const arbitrationStateChip = document.getElementById('arbitrationStateChip');
  const disputeFlag = document.getElementById('disputeFlag');

  // Governance Elements
  const agentTableBody = document.getElementById('agentTableBody');
  const btnRegisterNewAgent = document.getElementById('btnRegisterNewAgent');
  const btnExportFullArchive = document.getElementById('btnExportFullArchive');
  const btnTriggerPurge = document.getElementById('btnTriggerPurge');
  const retentionOpts = document.querySelectorAll('.retention-opt');
  const policyOptions = document.querySelectorAll('input[name="uncoveredPolicy"]');

  // Drawer Elements
  const actionDrawer = document.getElementById('actionDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const drawerRef = document.getElementById('drawerRef');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');

  // Payload Modal Elements
  const payloadModal = document.getElementById('payloadModal');
  const btnClosePayloadModal = document.getElementById('btnClosePayloadModal');
  const rawJsonArea = document.getElementById('rawJsonArea');
  const btnCopyRawJson = document.getElementById('btnCopyRawJson');
  const btnDownloadRawJson = document.getElementById('btnDownloadRawJson');

  // Notification Ribbon
  const notifRibbon = document.getElementById('notifRibbon');

  // ==========================================
  // OVERVIEW DASHBOARD & ANALYTICS CONTROLLER
  // ==========================================
  function setupOverviewDashboard() {
    // 1. Personalized Greeting
    const greetingHeader = document.getElementById('mascotGreetingHeader') || document.getElementById('overviewGreetingHeader');
    if (greetingHeader) {
      const now = new Date();
      const hour = now.getHours();
      let greeting = 'Good morning';
      if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
      } else if (hour >= 17) {
        greeting = 'Good evening';
      }
      greetingHeader.textContent = `${greeting}, ${state.principal.name}.`;
    }

    // 2. Data-Driven Analytics Datasets
    const analyticsDatasets = {
      '7d': {
        badge: '7-Day Trend',
        audited: '48',
        auditedMeta: '+12% vs prior period · 100% verified',
        conflicts: '1',
        conflictsMeta: '2.1% conflict rate · 1 Active',
        secure: '47',
        secureMeta: '97.9% compliant with Vault Rules',
        spend: '₹18,450.00',
        spendMeta: '73.8% of daily cap (₹25,000)',
        pending: '1',
        pendingMeta: 'Flight 6E-2412 (Arrives > 18:00)',
        resolved: '2',
        resolvedMeta: '₹2,319 recovered via dispute',
        distTotal: '48 Total',
        distSecureVal: '47 (97.9%)',
        distSecurePct: '97.9%',
        distConflictVal: '1 (2.1%)',
        distConflictPct: '2.1%',
        distPendingVal: '1 Action',
        distPendingPct: '2.1%',
        distResolvedVal: '2 Actions',
        distResolvedPct: '4.2%',
        activityPoints: '50,135 115,120 180,95 245,110 310,70 375,55 440,35'
      },
      '30d': {
        badge: '30-Day Trend',
        audited: '184',
        auditedMeta: '+8% vs prior month · 100% verified',
        conflicts: '3',
        conflictsMeta: '1.6% conflict rate · 1 Active',
        secure: '181',
        secureMeta: '98.4% compliant with Vault Rules',
        spend: '₹64,280.00',
        spendMeta: 'Monthly velocity well within quota',
        pending: '1',
        pendingMeta: 'Flight 6E-2412 (Arrives > 18:00)',
        resolved: '6',
        resolvedMeta: '₹8,450 recovered via dispute',
        distTotal: '184 Total',
        distSecureVal: '181 (98.4%)',
        distSecurePct: '98.4%',
        distConflictVal: '3 (1.6%)',
        distConflictPct: '1.6%',
        distPendingVal: '1 Action',
        distPendingPct: '0.5%',
        distResolvedVal: '6 Actions',
        distResolvedPct: '3.3%',
        activityPoints: '50,140 115,110 180,85 245,95 310,60 375,45 440,25'
      },
      '90d': {
        badge: '90-Day Trend',
        audited: '512',
        auditedMeta: '+15% quarterly growth · 100% verified',
        conflicts: '8',
        conflictsMeta: '1.5% conflict rate · 1 Active',
        secure: '504',
        secureMeta: '98.5% compliant with Vault Rules',
        spend: '₹1,86,400.00',
        spendMeta: 'Disciplined autonomous delegation',
        pending: '1',
        pendingMeta: 'Flight 6E-2412 (Arrives > 18:00)',
        resolved: '14',
        resolvedMeta: '₹19,200 recovered via dispute',
        distTotal: '512 Total',
        distSecureVal: '504 (98.5%)',
        distSecurePct: '98.5%',
        distConflictVal: '8 (1.5%)',
        distConflictPct: '1.5%',
        distPendingVal: '1 Action',
        distPendingPct: '0.2%',
        distResolvedVal: '14 Actions',
        distResolvedPct: '2.7%',
        activityPoints: '50,145 115,125 180,105 245,80 310,65 375,40 440,20'
      },
      'all': {
        badge: 'All-Time Audit',
        audited: '1,024',
        auditedMeta: 'Cumulative ledger since installation',
        conflicts: '14',
        conflictsMeta: '1.3% conflict rate · 1 Active',
        secure: '1,010',
        secureMeta: '98.7% compliant with Vault Rules',
        spend: '₹3,72,800.00',
        spendMeta: 'Historical spend across 3 assistants',
        pending: '1',
        pendingMeta: 'Flight 6E-2412 (Arrives > 18:00)',
        resolved: '24',
        resolvedMeta: '₹31,450 recovered via dispute',
        distTotal: '1,024 Total',
        distSecureVal: '1,010 (98.7%)',
        distSecurePct: '98.7%',
        distConflictVal: '14 (1.3%)',
        distConflictPct: '1.3%',
        distPendingVal: '1 Action',
        distPendingPct: '0.1%',
        distResolvedVal: '24 Actions',
        distResolvedPct: '2.3%',
        activityPoints: '50,150 115,130 180,110 245,75 310,50 375,35 440,15'
      }
    };

    // 3. Bind Period Filter Buttons
    const periodButtons = document.querySelectorAll('#analyticsPeriodSelector .analytics-filter-btn');
    periodButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        periodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const period = btn.getAttribute('data-period') || '7d';
        const d = analyticsDatasets[period] || analyticsDatasets['7d'];

        // Update Metric Cards
        const elAudited = document.getElementById('metricAuditedCount');
        const elAuditedMeta = document.getElementById('metricAuditedMeta');
        if (elAudited) elAudited.textContent = d.audited;
        if (elAuditedMeta) elAuditedMeta.textContent = d.auditedMeta;

        const elConflicts = document.getElementById('metricConflictsCount');
        const elConflictsMeta = document.getElementById('metricConflictsMeta');
        if (elConflicts) elConflicts.textContent = d.conflicts;
        if (elConflictsMeta) elConflictsMeta.textContent = d.conflictsMeta;

        const elSecure = document.getElementById('metricSecureCount');
        const elSecureMeta = document.getElementById('metricSecureMeta');
        if (elSecure) elSecure.textContent = d.secure;
        if (elSecureMeta) elSecureMeta.textContent = d.secureMeta;

        const elSpend = document.getElementById('metricSpendCount');
        const elSpendMeta = document.getElementById('metricSpendMeta');
        if (elSpend) elSpend.textContent = d.spend;
        if (elSpendMeta) elSpendMeta.textContent = d.spendMeta;

        const elPending = document.getElementById('metricPendingCount');
        const elPendingMeta = document.getElementById('metricPendingMeta');
        if (elPending) elPending.textContent = d.pending;
        if (elPendingMeta) elPendingMeta.textContent = d.pendingMeta;

        const elResolved = document.getElementById('metricResolvedCount');
        const elResolvedMeta = document.getElementById('metricResolvedMeta');
        if (elResolved) elResolved.textContent = d.resolved;
        if (elResolvedMeta) elResolvedMeta.textContent = d.resolvedMeta;

        // Update Distribution Bar
        const elDistTotal = document.getElementById('distTotalBadge');
        if (elDistTotal) elDistTotal.textContent = d.distTotal;

        const elDistSecureVal = document.getElementById('distSecureVal');
        const elDistSecureFill = document.getElementById('distSecureFill');
        if (elDistSecureVal) elDistSecureVal.textContent = d.distSecureVal;
        if (elDistSecureFill) elDistSecureFill.style.width = d.distSecurePct;

        const elDistConflictVal = document.getElementById('distConflictVal');
        const elDistConflictFill = document.getElementById('distConflictFill');
        if (elDistConflictVal) elDistConflictVal.textContent = d.distConflictVal;
        if (elDistConflictFill) elDistConflictFill.style.width = d.distConflictPct;

        const elDistPendingVal = document.getElementById('distPendingVal');
        const elDistPendingFill = document.getElementById('distPendingFill');
        if (elDistPendingVal) elDistPendingVal.textContent = d.distPendingVal;
        if (elDistPendingFill) elDistPendingFill.style.width = d.distPendingPct;

        const elDistResolvedVal = document.getElementById('distResolvedVal');
        const elDistResolvedFill = document.getElementById('distResolvedFill');
        if (elDistResolvedVal) elDistResolvedVal.textContent = d.distResolvedVal;
        if (elDistResolvedFill) elDistResolvedFill.style.width = d.distResolvedPct;

        // Update Activity Chart Line
        const line = document.getElementById('activityChartLine');
        if (line) line.setAttribute('points', d.activityPoints);

        const badge = document.getElementById('activityChartBadge');
        if (badge) badge.textContent = d.badge;

        showToast(`Analytics period updated: ${btn.textContent} (${d.audited} actions)`);
      });
    });
  }

  // ==========================================
  // CURSOR-RESPONSIVE AI ROBOT MASCOT ENGINE
  // Serious Inspecting Sentinel Guardian
  // ==========================================
  function setupMascotRobot() {
    const canvas = document.getElementById('mascotCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gazeAngleEl = document.getElementById('mascotGazeAngle');
    const speechBubble = document.getElementById('mascotSpeechBubble');
    const viewport = document.getElementById('mascotViewport');

    // High-DPI Retina Display Configuration
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = 400;
    const logicalHeight = 360;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;

    // Coordinates and Dynamic Physics
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 3;
    let targetYaw = 0;       // -0.55 to +0.55 radians
    let targetPitch = 0;     // -0.38 to +0.38 radians
    let targetHeadX = 0;     // -42 to +42 pixels
    let targetHeadY = 0;     // -26 to +26 pixels
    let targetPupilX = 0;    // -20 to +20 pixels
    let targetPupilY = 0;    // -14 to +14 pixels

    let currentYaw = 0;
    let currentPitch = 0;
    let currentHeadX = 0;
    let currentHeadY = 0;
    let currentPupilX = 0;
    let currentPupilY = 0;

    let hoverOffset = 0;
    let jumpOffset = 0;
    let jumpVelocity = 0;
    let isBlinking = false;
    let blinkProgress = 1.0;
    let nextBlinkTime = performance.now() + 3500;
    let isInspectingAlert = false;
    let scanSweep = 0;

    // Fast, Direct Global Cursor Tracking
    function onPointerMove(e) {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mousemove', onPointerMove, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
      }
    }, { passive: true });

    // Mascot Click Interaction — Pulse Audit Scan
    if (viewport) {
      viewport.addEventListener('click', () => {
        jumpVelocity = -10;
        isInspectingAlert = true;
        setTimeout(() => { isInspectingAlert = false; }, 2500);

        if (speechBubble) {
          speechBubble.classList.add('visible');
          clearTimeout(speechBubble._timer);
          speechBubble._timer = setTimeout(() => {
            speechBubble.classList.remove('visible');
          }, 3500);
        }

        showToast("Sentinel Active: Inspecting all delegated agent transactions");
      });
    }

    // Helper: Draw Rounded Rectangle
    function roundRect(ctx, x, y, w, h, r) {
      if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
      ctx.beginPath();
      ctx.moveTo(x + r.tl, y);
      ctx.lineTo(x + w - r.tr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
      ctx.lineTo(x + w, y + h - r.br);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
      ctx.lineTo(x + r.bl, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
      ctx.lineTo(x + r.tl);
      ctx.quadraticCurveTo(x, y, x + r.tl, y);
      ctx.closePath();
    }

    // Helper: Draw Serious Inspecting Angular Eye Lens
    function drawInspectingEye(ctx, x, y, isLeft, pupilX, pupilY, blinkScale) {
      ctx.save();
      ctx.translate(x, y);

      const eyeW = 44;
      const eyeH = 50 * (1 - blinkScale * 0.9);

      // 1. Angular Serious Inspecting Brow Contour
      // Slanted downward toward center to create determined, intense inspection
      ctx.beginPath();
      if (isLeft) {
        // Left eye: outer top higher (y = -eyeH/2 - 2), inner top lower (y = -eyeH/2 + 6)
        ctx.moveTo(-eyeW / 2, -eyeH / 2 - 2);
        ctx.lineTo(eyeW / 2, -eyeH / 2 + 6);
        ctx.lineTo(eyeW / 2, eyeH / 2 - 4);
        ctx.quadraticCurveTo(0, eyeH / 2 + 3, -eyeW / 2, eyeH / 2 - 4);
      } else {
        // Right eye: inner top lower (y = -eyeH/2 + 6), outer top higher (y = -eyeH/2 - 2)
        ctx.moveTo(-eyeW / 2, -eyeH / 2 + 6);
        ctx.lineTo(eyeW / 2, -eyeH / 2 - 2);
        ctx.lineTo(eyeW / 2, eyeH / 2 - 4);
        ctx.quadraticCurveTo(0, eyeH / 2 + 3, -eyeW / 2, eyeH / 2 - 4);
      }
      ctx.closePath();

      // Outer Lens Rim
      ctx.fillStyle = '#0284C7'; // Sharp cyan-blue lens
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Clip inside eye for pupil and HUD reticle
      ctx.clip();

      if (blinkScale < 0.8) {
        // 2. Inner Analytical Iris
        ctx.beginPath();
        ctx.ellipse(0, 0, eyeW / 2, eyeH / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#0369A1';
        ctx.fill();

        // 3. Large High-Contrast Sharp Dark Pupil (Tracks Cursor!)
        const px = pupilX;
        const py = pupilY;
        const pupilRadius = 14;

        ctx.beginPath();
        ctx.arc(px, py, pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#09090B'; // Deep obsidian pupil
        ctx.fill();
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 4. Concentric HUD Targeting Ring inside Pupil
        ctx.beginPath();
        ctx.arc(px, py, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Precision Audit Crosshair Lines (+)
        ctx.beginPath();
        ctx.moveTo(px - 11, py);
        ctx.lineTo(px + 11, py);
        ctx.moveTo(px, py - 11);
        ctx.lineTo(px, py + 11);
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Dual Laser Specular Glints (Alert & Alive!)
        ctx.beginPath();
        ctx.arc(px + 4.5, py - 5, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px - 4, py + 4.5, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }

      ctx.restore();
    }

    // Main 60FPS Render Loop
    function renderLoop(now) {
      // 1. Calculate Target Yaw and Pitch relative to Canvas Center
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pointerX - cx;
      const dy = pointerY - cy;
      const dist = Math.hypot(dx, dy);

      // Normalized coordinates (-1.0 to +1.0)
      const halfW = Math.max(300, window.innerWidth * 0.42);
      const halfH = Math.max(250, window.innerHeight * 0.42);
      const normX = Math.max(-1.0, Math.min(1.0, dx / halfW));
      const normY = Math.max(-1.0, Math.min(1.0, dy / halfH));

      // DRAMATIC & CLEAR TARGET OFFSETS:
      targetYaw = normX * 0.52;      // Up to ±30 degrees head rotation
      targetPitch = normY * 0.35;    // Up to ±20 degrees pitch
      targetHeadX = normX * 42;      // Moves up to ±42px across canvas!
      targetHeadY = normY * 24;      // Moves up to ±24px vertically!
      targetPupilX = normX * 19;     // Pupils move up to ±19px across lens!
      targetPupilY = normY * 13;     // Pupils move up to ±13px vertically!

      // Snappy and responsive damping (0.13 lerp factor gives zero lag)
      currentYaw += (targetYaw - currentYaw) * 0.13;
      currentPitch += (targetPitch - currentPitch) * 0.13;
      currentHeadX += (targetHeadX - currentHeadX) * 0.13;
      currentHeadY += (targetHeadY - currentHeadY) * 0.13;
      currentPupilX += (targetPupilX - currentPupilX) * 0.16;
      currentPupilY += (targetPupilY - currentPupilY) * 0.16;

      // Idle Hover Physics & Jump
      hoverOffset = Math.sin(now * 0.0028) * 6;
      if (jumpVelocity !== 0 || jumpOffset !== 0) {
        jumpOffset += jumpVelocity;
        jumpVelocity += 0.85; // gravity
        if (jumpOffset >= 0) {
          jumpOffset = 0;
          jumpVelocity = 0;
        }
      }

      // Blink Management (Quick tactical shutter)
      if (!isBlinking && now > nextBlinkTime) {
        isBlinking = true;
        blinkProgress = 0;
      }
      if (isBlinking) {
        blinkProgress += 0.22; // Snappy 120ms blink
        if (blinkProgress >= 1) {
          isBlinking = false;
          nextBlinkTime = now + 3200 + Math.random() * 3000;
        }
      }
      const blinkScale = isBlinking ? Math.sin(blinkProgress * Math.PI) : 0;

      // Continuous Scanning Line Oscillation
      scanSweep = Math.sin(now * 0.0035) * 32;

      // Update Live Gaze HUD Text
      if (gazeAngleEl) {
        const deg = Math.round(Math.atan2(dy, dx) * 180 / Math.PI);
        let dir = 'CENTER';
        if (dist > 30) {
          if (deg >= -22 && deg <= 22) dir = 'RIGHT';
          else if (deg > 22 && deg < 68) dir = 'DOWN-RIGHT';
          else if (deg >= 68 && deg <= 112) dir = 'DOWN';
          else if (deg > 112 && deg < 158) dir = 'DOWN-LEFT';
          else if (deg >= 158 || deg <= -158) dir = 'LEFT';
          else if (deg > -158 && deg < -112) dir = 'UP-LEFT';
          else if (deg >= -112 && deg <= -68) dir = 'UP';
          else if (deg > -68 && deg < -22) dir = 'UP-RIGHT';
        }
        gazeAngleEl.textContent = `GAZE: ${Math.abs(deg)}° ${dir}`;
      }

      // ------------------------------------
      // DRAW PROCEDURAL SENTINEL ROBOT
      // ------------------------------------
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      const centerX = logicalWidth / 2;
      const centerY = logicalHeight / 2 - 10;
      const baseY = centerY + hoverOffset + jumpOffset;

      // 1. Soft Levitation Ground Shadow
      const shadowScale = Math.max(0.65, 1 - (hoverOffset + jumpOffset) * 0.025);
      ctx.beginPath();
      ctx.ellipse(centerX + currentHeadX * 0.2, centerY + 130, 68 * shadowScale, 11 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#E4E4E7';
      ctx.fill();

      // Levitation Magnetic Ring
      ctx.beginPath();
      ctx.ellipse(centerX + currentHeadX * 0.2, centerY + 116, 44 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#93C5FD';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Robotic Body / Torso
      ctx.save();
      const bodyX = centerX + currentHeadX * 0.4;
      const bodyY = baseY + 54;
      ctx.translate(bodyX, bodyY);
      ctx.rotate(currentYaw * 0.2); // body follows head rotation

      // Left & Right Armor Thruster Pods
      // Left Pod
      ctx.beginPath();
      ctx.ellipse(-66 + currentHeadX * 0.1, 4, 10, 16, -0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Right Pod
      ctx.beginPath();
      ctx.ellipse(66 + currentHeadX * 0.1, 4, 10, 16, 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Torso Armor Shell (Solid White with Dark Obsidian Trim)
      ctx.beginPath();
      ctx.ellipse(0, 0, 52, 42, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Chest Seam Plate
      ctx.beginPath();
      ctx.arc(0, -6, 32, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = '#E4E4E7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Active Enclave Green Audit Diode
      ctx.beginPath();
      ctx.arc(0, 8, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#16A34A';
      ctx.fill();
      ctx.strokeStyle = '#14532D';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      // 3. Articulated Sentinel Head Module (MAJOR CENTERPIECE!)
      ctx.save();
      const headX = centerX + currentHeadX;
      const headY = baseY - 24 + currentHeadY;
      ctx.translate(headX, headY);
      ctx.rotate(currentYaw); // Full head rotation tracking cursor!

      // Lateral Swept-Back Radar Ears
      const earAngle = currentYaw * 0.35;
      // Left Radar Ear
      ctx.beginPath();
      ctx.moveTo(-84, 0);
      ctx.lineTo(-104, -22);
      ctx.lineTo(-94, -32);
      ctx.lineTo(-76, -14);
      ctx.closePath();
      ctx.fillStyle = '#18181B';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Left Ear Cyan Sensor Tip
      ctx.beginPath();
      ctx.arc(-102, -24, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();

      // Right Radar Ear
      ctx.beginPath();
      ctx.moveTo(84, 0);
      ctx.lineTo(104, -22);
      ctx.lineTo(94, -32);
      ctx.lineTo(76, -14);
      ctx.closePath();
      ctx.fillStyle = '#18181B';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Right Ear Cyan Sensor Tip
      ctx.beginPath();
      ctx.arc(102, -24, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();

      // Top Sentinel Sensor Crest
      ctx.beginPath();
      ctx.moveTo(-16, -72);
      ctx.lineTo(0, -96);
      ctx.lineTo(16, -72);
      ctx.closePath();
      ctx.fillStyle = '#18181B';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Top Audit Diode
      ctx.beginPath();
      ctx.arc(0, -98, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#16A34A'; // Active Enclave green
      ctx.fill();

      // Head Outer Porcelain Armor Shell
      const headW = 196;
      const headH = 144;
      roundRect(ctx, -headW / 2, -headH / 2, headW, headH, 44);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.stroke();

      // Large Obsidian Panoramic Visor Screen
      const visorW = 168;
      const visorH = 98;
      const visorPitchShift = currentPitch * 14;
      roundRect(ctx, -visorW / 2, -visorH / 2 + visorPitchShift, visorW, visorH, 26);
      ctx.fillStyle = '#09090B'; // Jet Black Glass
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Curved Glass Reflection Highlight on Visor
      ctx.beginPath();
      ctx.moveTo(-visorW / 2 + 20, -visorH / 2 + 10 + visorPitchShift);
      ctx.lineTo(visorW / 2 - 30, -visorH / 2 + 10 + visorPitchShift);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Active Scan Laser Sweep line across Visor
      ctx.beginPath();
      ctx.moveTo(-visorW / 2 + 12, visorPitchShift + scanSweep);
      ctx.lineTo(visorW / 2 - 12, visorPitchShift + scanSweep);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. DRAW SERIOUS & INSPECTING EYES (PROMINENT, BOLD, AND ALERT)
      const eyeBaseY = visorPitchShift;
      // Left Eye
      drawInspectingEye(ctx, -38, eyeBaseY, true, currentPupilX, currentPupilY, blinkScale);
      // Right Eye
      drawInspectingEye(ctx, 38, eyeBaseY, false, currentPupilX, currentPupilY, blinkScale);

      // Subtle Enclave Micro-Badge on Chin
      ctx.beginPath();
      ctx.arc(0, 54, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#71717A';
      ctx.fill();

      ctx.restore(); // End Head
      ctx.restore(); // End Canvas

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  // ==========================================
  // MASCOT MODALS & HERO ACTION BINDINGS
  // ==========================================
  function setupMascotModals() {
    // "How it works" modal
    const btnHowItWorks = document.getElementById('btnMascotHowItWorks');
    const modalHowItWorks = document.getElementById('mascotHowItWorksModal');
    const btnCloseMascotModal = document.getElementById('btnCloseMascotModal');
    const btnCloseMascotModalBtn = document.getElementById('btnCloseMascotModalBtn');

    if (btnHowItWorks && modalHowItWorks) {
      btnHowItWorks.addEventListener('click', () => {
        modalHowItWorks.classList.remove('hidden');
      });
    }
    const closeHowItWorks = () => {
      if (modalHowItWorks) modalHowItWorks.classList.add('hidden');
    };
    if (btnCloseMascotModal) btnCloseMascotModal.addEventListener('click', closeHowItWorks);
    if (btnCloseMascotModalBtn) btnCloseMascotModalBtn.addEventListener('click', closeHowItWorks);
    if (modalHowItWorks) {
      modalHowItWorks.addEventListener('click', (e) => {
        if (e.target === modalHowItWorks) closeHowItWorks();
      });
    }

    // "Vendor Steering Risk" modal
    const btnOpenRisk = document.getElementById('btnOpenVendorRiskModal');
    const modalRisk = document.getElementById('vendorRiskModal');
    const btnCloseRisk = document.getElementById('btnCloseVendorRiskModal');
    const btnCloseRiskBtn = document.getElementById('btnCloseVendorRiskBtn');

    if (btnOpenRisk && modalRisk) {
      btnOpenRisk.addEventListener('click', () => {
        modalRisk.classList.remove('hidden');
      });
    }
    const closeRisk = () => {
      if (modalRisk) modalRisk.classList.add('hidden');
    };
    if (btnCloseRisk) btnCloseRisk.addEventListener('click', closeRisk);
    if (btnCloseRiskBtn) btnCloseRiskBtn.addEventListener('click', closeRisk);
    if (modalRisk) {
      modalRisk.addEventListener('click', (e) => {
        if (e.target === modalRisk) closeRisk();
      });
    }
  }

  // ==========================================
  // INITIAL RENDER
  // ==========================================
  function init() {
    renderStreamTable();
    renderSpendingChart();
    renderDomainFilters();
    renderVaultTable();
    renderAgentTable();
    setupOverviewDashboard();
    setupMascotRobot();
    setupMascotModals();
    setupNavigation();
    setupOnboarding();
    setupProfileHandlers();
    setupSidebar();
    setupGlobalDetailTooltips();
    setupExpandableNarratives();
    setupEventListeners();
  }

  // ==========================================
  // NAVIGATION CONTROLLER
  // ==========================================
  function switchView(viewId) {
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-view') === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    stagePanes.forEach(pane => {
      if (pane.id === viewId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (window.location.hash !== '#' + viewId) {
      history.replaceState(null, '', '#' + viewId);
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (viewId === 'view-overview' && window.AgentRecourseRobot?.resize) {
      setTimeout(() => window.AgentRecourseRobot.resize(), 50);
    }
  }

  function setupNavigation() {
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        switchView(targetView);
      });
    });

    // Hash routing on initial load and change
    function handleInitialHash() {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        switchView(hash);
      }
    }
    window.addEventListener('hashchange', handleInitialHash);
    window.addEventListener('load', () => {
      handleInitialHash();
      window.scrollTo(0, 0);
    });
    handleInitialHash();

    // Wire up all [data-jump-view] elements across overview, heroes, and cards
    document.querySelectorAll('[data-jump-view]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetView = el.getAttribute('data-jump-view');
        if (targetView) {
          switchView(targetView);
        }
      });
    });

    // Profile Back button routing
    const btnDesktopProfileBack = document.getElementById('btnDesktopProfileBack');
    if (btnDesktopProfileBack) {
      btnDesktopProfileBack.addEventListener('click', () => {
        switchView('view-overview');
      });
    }

    // Expandable conflict bar toggle
    const conflictBarToggle = document.getElementById('conflictBarToggle');
    if (conflictBarToggle) {
      conflictBarToggle.addEventListener('click', () => {
        if (conflictDocket) {
          conflictDocket.classList.toggle('expanded');
        }
      });
    }

    if (btnInspectEvidence) {
      btnInspectEvidence.addEventListener('click', (e) => {
        e.stopPropagation();
        switchView('view-disputes');
      });
    }

    if (btnProceedArbitration) {
      btnProceedArbitration.addEventListener('click', () => {
        switchView('view-disputes');
      });
    }

    const btnReturnToFeed = document.getElementById('btnReturnToFeed');
    if (btnReturnToFeed) {
      btnReturnToFeed.addEventListener('click', () => {
        switchView('view-stream');
      });
    }

    if (btnDismissConflict) {
      btnDismissConflict.addEventListener('click', (e) => {
        e.stopPropagation();
        if (conflictDocket) {
          conflictDocket.style.transition = 'all 0.25s ease';
          conflictDocket.style.opacity = '0';
          conflictDocket.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            conflictDocket.style.display = 'none';
          }, 250);
        }
        if (mismatchCountChip) {
          mismatchCountChip.textContent = '0 CONFLICTS';
          mismatchCountChip.classList.remove('text-danger');
        }
        if (feedFlag) {
          feedFlag.textContent = '0 CONFLICTS';
          feedFlag.classList.remove('nav-flag');
          feedFlag.classList.add('nav-count');
        }
        showToast('Flight conflict dismissed.');
      });
    }

    if (btnMastheadProfile) {
      btnMastheadProfile.addEventListener('click', () => {
        switchView('view-profile');
      });
    }
  }

  // ==========================================
  // ONBOARDING & FIRST-TIME USER EXPERIENCE
  // ==========================================
  function setupOnboarding() {
    const onboardingBanner = document.getElementById('onboardingBanner');
    const btnDismissOnboarding = document.getElementById('btnDismissOnboarding');
    const btnGoToOverview = document.getElementById('btnGoToOverview');
    const btnRestartWalkthrough = document.getElementById('btnRestartWalkthrough');

    const isDismissed = localStorage.getItem('ar-onboarding-dismissed') === 'true';
    if (onboardingBanner && isDismissed) {
      onboardingBanner.style.display = 'none';
    }

    if (btnDismissOnboarding) {
      btnDismissOnboarding.addEventListener('click', () => {
        if (onboardingBanner) {
          onboardingBanner.style.opacity = '0';
          onboardingBanner.style.transform = 'translateY(-8px)';
          onboardingBanner.style.transition = 'all 0.25s ease';
          setTimeout(() => {
            onboardingBanner.style.display = 'none';
          }, 250);
        }
        localStorage.setItem('ar-onboarding-dismissed', 'true');
        showToast('Onboarding banner dismissed. Always accessible here in "06 How to Use".');
      });
    }

    if (btnGoToOverview) {
      btnGoToOverview.addEventListener('click', () => {
        switchView('view-overview');
      });
    }

    if (btnRestartWalkthrough) {
      btnRestartWalkthrough.addEventListener('click', () => {
        localStorage.removeItem('ar-onboarding-dismissed');
        if (onboardingBanner) {
          onboardingBanner.style.display = 'flex';
          onboardingBanner.style.opacity = '1';
          onboardingBanner.style.transform = 'none';
        }
        showToast('Walkthrough tour reactivated. Welcome to Agent Recourse!');
      });
    }
  }

  // ==========================================
  // SPENDING ANALYSIS CONTROLLER (HIGH-LEVEL CHARTS)
  // ==========================================
  function renderSpendingChart() {
    const spendingBarsList = document.getElementById('spendingBarsList');
    const spendingTooltip = document.getElementById('spendingTooltip');
    const spendingTotalDisplay = document.getElementById('spendingTotalDisplay');
    const tileTotalOutflow = document.getElementById('tileTotalOutflow');
    const spendingSection = document.getElementById('spendingAnalysisSection');
    const spendingDonutSvg = document.getElementById('spendingDonutSvg');
    const donutLegendList = document.getElementById('donutLegendList');
    const donutCenterAmount = document.getElementById('donutCenterAmount');
    const donutCenterSub = document.getElementById('donutCenterSub');
    const spendingTrendSvg = document.getElementById('spendingTrendSvg');

    if (!spendingSection) return;

    // Actual spending categories based on existing stream records
    const categoryMetadata = {
      'ACT-9042': { category: 'Travel & Flights', sub: 'Domestic airfare & itineraries', color: '#9384D1' },
      'ACT-9039': { category: 'Food & Sustenance', sub: 'Hyperlocal organic groceries', color: '#6B5B95' },
      'ACT-9038': { category: 'Utilities & Settlements', sub: 'Power grid & monthly recurring', color: '#A896B2' },
      'ACT-9041': { category: 'Hardware & Devices', sub: 'Peripherals & device protection', color: '#C9BBCF' },
      'ACT-9037': { category: 'Urban Mobility', sub: 'Autonomous ground transit', color: '#D9CADA' }
    };

    // Calculate actual aggregates from streamRecords
    const categoryTotals = {};
    let totalSpend = 0;

    state.streamRecords.forEach(rec => {
      const valNum = parseFloat(rec.value.replace(/[^0-9.]/g, '')) || 0;
      const catInfo = categoryMetadata[rec.id] || { category: rec.merchant, sub: 'Autonomous transaction', color: '#9384D1' };
      const catName = catInfo.category;

      if (!categoryTotals[catName]) {
        categoryTotals[catName] = {
          name: catName,
          sub: catInfo.sub,
          color: catInfo.color,
          amount: 0,
          recordCount: 0
        };
      }
      categoryTotals[catName].amount += valNum;
      categoryTotals[catName].recordCount += 1;
      totalSpend += valNum;
    });

    const formattedTotal = `₹${totalSpend.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (spendingTotalDisplay) spendingTotalDisplay.textContent = formattedTotal;
    if (tileTotalOutflow) tileTotalOutflow.textContent = formattedTotal;
    if (donutCenterAmount) donutCenterAmount.textContent = `₹${Math.round(totalSpend).toLocaleString('en-IN')}`;

    // Sort descending by spending amount
    const categoriesArray = Object.values(categoryTotals).sort((a, b) => b.amount - a.amount);

    // ==========================================
    // 1. HIGH-LEVEL GRAPH: SVG DONUT ALLOCATION RING
    // ==========================================
    if (spendingDonutSvg) {
      spendingDonutSvg.innerHTML = '';
      if (donutLegendList) donutLegendList.innerHTML = '';

      const C = 2 * Math.PI * 68; // ~427.256
      let accumulatedOffset = 0;

      categoriesArray.forEach(cat => {
        const pct = totalSpend > 0 ? (cat.amount / totalSpend) * 100 : 0;
        const pctFormatted = pct.toFixed(1);
        const dash = (pct / 100) * C;
        const space = C - dash;
        const formattedAmount = `₹${cat.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // SVG Circle segment
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '110');
        circle.setAttribute('cy', '110');
        circle.setAttribute('r', '68');
        circle.setAttribute('class', 'donut-segment');
        circle.setAttribute('stroke', cat.color);
        circle.setAttribute('stroke-dasharray', `${dash} ${space}`);
        circle.setAttribute('stroke-dashoffset', `${-accumulatedOffset}`);
        circle.setAttribute('data-name', cat.name);
        accumulatedOffset += dash;

        // Donut hover highlight
        function activateCategoryHighlight() {
          if (donutCenterAmount) donutCenterAmount.textContent = formattedAmount;
          if (donutCenterSub) donutCenterSub.textContent = `${cat.name} (${pctFormatted}%)`;
          document.querySelectorAll('.donut-segment').forEach(c => {
            c.style.opacity = c === circle ? '1' : '0.45';
          });
          document.querySelectorAll('.donut-legend-item').forEach(l => {
            l.classList.toggle('highlighted', l.getAttribute('data-name') === cat.name);
          });
          document.querySelectorAll('.spending-bar-row').forEach(r => {
            r.classList.toggle('active-touch', r.getAttribute('data-name') === cat.name);
          });
        }

        function resetCategoryHighlight() {
          if (donutCenterAmount) donutCenterAmount.textContent = `₹${Math.round(totalSpend).toLocaleString('en-IN')}`;
          if (donutCenterSub) donutCenterSub.textContent = '5 Categories';
          document.querySelectorAll('.donut-segment').forEach(c => {
            c.style.opacity = '1';
          });
          document.querySelectorAll('.donut-legend-item').forEach(l => l.classList.remove('highlighted'));
          document.querySelectorAll('.spending-bar-row').forEach(r => r.classList.remove('active-touch'));
        }

        circle.addEventListener('mouseenter', activateCategoryHighlight);
        circle.addEventListener('mouseleave', resetCategoryHighlight);

        spendingDonutSvg.appendChild(circle);

        // Donut Legend Item
        if (donutLegendList) {
          const leg = document.createElement('div');
          leg.className = 'donut-legend-item';
          leg.setAttribute('data-name', cat.name);
          leg.innerHTML = `
            <div class="legend-left">
              <span class="legend-dot" style="background-color: ${cat.color};"></span>
              <span class="mono font-500">${cat.name}</span>
            </div>
            <div class="mono text-muted text-xs">
              <span class="font-500" style="color: var(--text-lead);">${pctFormatted}%</span>
              <span style="font-size: 10px; margin-left: 4px;">(${formattedAmount})</span>
            </div>
          `;
          leg.addEventListener('mouseenter', activateCategoryHighlight);
          leg.addEventListener('mouseleave', resetCategoryHighlight);
          donutLegendList.appendChild(leg);
        }
      });
    }

    // ==========================================
    // 2. HIGH-LEVEL GRAPH: 24H VELOCITY TREND AREA
    // ==========================================
    if (spendingTrendSvg) {
      spendingTrendSvg.innerHTML = `
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9384D1" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#F3E8EB" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Horizontal grid guidelines -->
        <line x1="20" y1="35" x2="440" y2="35" stroke="var(--rule-hairline)" stroke-dasharray="3 3" opacity="0.6" />
        <line x1="20" y1="85" x2="440" y2="85" stroke="var(--rule-hairline)" stroke-dasharray="3 3" opacity="0.6" />
        <line x1="20" y1="135" x2="440" y2="135" stroke="var(--rule-hairline)" stroke-dasharray="3 3" opacity="0.6" />
        <!-- Filled spline area -->
        <path d="M 45,140 L 45,108.4 L 135,83.1 L 225,119.7 L 315,33.8 L 415,133.9 L 415,140 Z" fill="url(#trendGradient)" />
        <!-- Trend stroke line -->
        <path d="M 45,108.4 L 135,83.1 L 225,119.7 L 315,33.8 L 415,133.9" fill="none" stroke="var(--mauve-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Interactive data points -->
        <g id="trendPointsGroup">
          <circle class="trend-point" cx="45" cy="108.4" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="BESCOM Utilities · 06:30 IST · ₹2,340.00" />
          <circle class="trend-point" cx="135" cy="83.1" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="BigBasket Groceries · 08:15 IST · ₹4,210.00" />
          <circle class="trend-point" cx="225" cy="119.7" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="Croma Hardware · 09:41 IST · ₹1,500.00" />
          <circle class="trend-point" cx="315" cy="33.8" r="6" fill="#C53030" stroke="#FFFFFF" stroke-width="2.5" data-tip="IndiGo Flight 6E-2412 · 10:02 IST · ₹7,850.00 (CONTRADICTION)" />
          <circle class="trend-point" cx="415" cy="133.9" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="Uber Mobility · 19:12 IST · ₹450.00" />
        </g>
      `;

      // Hover tooltip for trend points
      const trendPoints = spendingTrendSvg.querySelectorAll('.trend-point');
      trendPoints.forEach(pt => {
        pt.addEventListener('mouseenter', (e) => {
          if (!spendingTooltip || !spendingSection) return;
          const tipText = pt.getAttribute('data-tip');
          spendingTooltip.innerHTML = `
            <div class="spending-tooltip-title mono" style="font-size: 11px;">DEBIT POINT VERIFICATION</div>
            <div style="font-size: 12px; color: #FFFFFF; font-weight: 500;">${tipText}</div>
          `;
          spendingTooltip.classList.remove('hidden');
          const sectionRect = spendingSection.getBoundingClientRect();
          const ptRect = pt.getBoundingClientRect();
          const posX = ptRect.left + 4 - sectionRect.left;
          const posY = ptRect.top - 12 - sectionRect.top;
          spendingTooltip.style.left = `${posX}px`;
          spendingTooltip.style.top = `${posY}px`;
        });
        pt.addEventListener('mouseleave', () => {
          if (spendingTooltip) spendingTooltip.classList.add('hidden');
        });
      });
    }

    // ==========================================
    // 3. CATEGORY PERCENTAGE PROGRESS BREAKDOWN
    // ==========================================
    if (spendingBarsList) {
      spendingBarsList.innerHTML = '';

      if (categoriesArray.length === 0 || totalSpend === 0) {
        spendingBarsList.innerHTML = `
          <div style="text-align: center; padding: 20px; color: var(--text-faint); font-family: var(--font-mono); font-size: 12px;">
            NO SPENDING RECORDS IN CURRENT AUDIT RUN
          </div>
        `;
        return;
      }

      categoriesArray.forEach(cat => {
        const pct = (cat.amount / totalSpend) * 100;
        const pctFormatted = pct.toFixed(1);
        const formattedAmount = `₹${cat.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const row = document.createElement('div');
        row.className = 'spending-bar-row';
        row.tabIndex = 0;
        row.setAttribute('role', 'button');
        row.setAttribute('data-name', cat.name);
        row.setAttribute('aria-label', `${cat.name}: ${formattedAmount}, ${pctFormatted}% of total spend`);

        row.innerHTML = `
          <div class="spending-bar-label">
            <span class="spending-bar-name">${cat.name}</span>
            <span class="spending-bar-sub mono">${cat.sub}</span>
          </div>
          <div class="spending-bar-track-wrap">
            <div class="spending-bar-track">
              <div class="spending-bar-fill" style="width: ${pctFormatted}%; background: linear-gradient(90deg, ${cat.color} 0%, var(--mauve-deep) 100%);"></div>
            </div>
          </div>
          <div class="spending-bar-meta">
            <span class="spending-bar-amount mono">${formattedAmount}</span>
            <span class="spending-bar-pct mono">${pctFormatted}%</span>
          </div>
        `;

        function showTooltip(e) {
          if (!spendingTooltip || !spendingSection) return;

          spendingTooltip.innerHTML = `
            <div class="spending-tooltip-title">${cat.name}</div>
            <div class="spending-tooltip-metric">
              <span style="color: #E9D5DA;">Audited Spend:</span>
              <strong style="color: #FFFFFF;">${formattedAmount} INR</strong>
            </div>
            <div class="spending-tooltip-metric">
              <span style="color: #E9D5DA;">Share of Total:</span>
              <strong style="color: #9384D1;">${pctFormatted}%</strong>
            </div>
            <div class="spending-tooltip-formula mono">
              (${formattedAmount} / ₹${totalSpend.toLocaleString('en-IN', { minimumFractionDigits: 2 })} × 100)
            </div>
          `;

          spendingTooltip.classList.remove('hidden');

          const sectionRect = spendingSection.getBoundingClientRect();
          const rowRect = row.getBoundingClientRect();

          let posX = rowRect.left + (rowRect.width / 2) - sectionRect.left;
          let posY = rowRect.top - sectionRect.top;

          if (e && e.clientX) {
            posX = e.clientX - sectionRect.left;
          }

          const minX = 120;
          const maxX = sectionRect.width - 120;
          posX = Math.max(minX, Math.min(maxX, posX));

          spendingTooltip.style.left = `${posX}px`;
          spendingTooltip.style.top = `${posY}px`;
        }

        function hideTooltip() {
          if (!spendingTooltip) return;
          spendingTooltip.classList.add('hidden');
          row.classList.remove('active-touch');
        }

        // Mouse events
        row.addEventListener('mouseenter', showTooltip);
        row.addEventListener('mousemove', showTooltip);
        row.addEventListener('mouseleave', hideTooltip);

        // Focus / Keyboard events
        row.addEventListener('focus', showTooltip);
        row.addEventListener('blur', hideTooltip);

        // Touch / Tap events
        row.addEventListener('click', (e) => {
          const wasActive = row.classList.contains('active-touch');
          document.querySelectorAll('.spending-bar-row').forEach(r => r.classList.remove('active-touch'));
          if (wasActive) {
            hideTooltip();
          } else {
            row.classList.add('active-touch');
            showTooltip(e);
          }
        });

        spendingBarsList.appendChild(row);
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.spending-bar-row') && !e.target.closest('.trend-point') && spendingTooltip && !spendingTooltip.classList.contains('hidden')) {
        spendingTooltip.classList.add('hidden');
        document.querySelectorAll('.spending-bar-row').forEach(r => r.classList.remove('active-touch'));
      }
    });
  }

  // ==========================================
  // PROFILE DASHBOARD CONTROLLER
  // ==========================================
  function setupProfileHandlers() {
    // Copy public attestation key
    if (btnCopyProfileKey) {
      btnCopyProfileKey.addEventListener('click', () => {
        const key = state.principal.keyFingerprint;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(key).then(() => {
            showToast(`Attestation key ${key} copied to clipboard.`);
          }).catch(() => {
            copyFallback(key);
          });
        } else {
          copyFallback(key);
        }
      });
    }

    function copyFallback(text) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(`Attestation key ${text} copied to clipboard.`);
    }

    // Export Identity Certificate as JSON
    if (btnExportIdentityCert) {
      btnExportIdentityCert.addEventListener('click', () => {
        const cert = {
          standard: "ADRP-PRINCIPAL-ATTESTATION-2040",
          certificate_id: "CERT-2040-IN-HARSHITH-8F9A",
          issued_at: new Date().toISOString(),
          principal: {
            legal_name: state.principal.name,
            system_identifier: state.principal.id,
            jurisdiction: "INDIA (IN-KA-BLR)",
            hardware_enclave: "TPM-2040 SECURE ENCLAVE",
            public_key_fingerprint: state.principal.keyFingerprint,
            signing_algorithm: "Ed25519-HMAC-SHA256"
          },
          delegation_profile: {
            mandate_coverage_ratio: "97.4%",
            daily_action_velocity: 48,
            active_protected_quantum: "₹1,48,250 INR"
          },
          attestation_specs: {
            vault_specification: state.activeVaultVersion,
            active_mandates_count: state.mandates.length,
            signing_scheme: "Ed25519-HMAC-SHA256",
            vault_storage: "AES-GCM-256 (Local Only)",
            attestation_protocol: "ADRP-2040 Standard",
            zero_knowledge_audit: "Strict Data Minimization",
            independence_status: "100% Non-Affiliated"
          },
          connected_agents_count: state.agents.length,
          statutory_clause: "Client-side encrypted self-attested credential. Valid under ADRP-2040 Autonomous Delegation Recourse Protocol."
        };
        triggerFileDownload('principal-identity-attestation.json', JSON.stringify(cert, null, 2), 'application/json');
        showToast('Principal Identity Certificate exported (.json).');
      });
    }

    // Emergency Delegation Suspension Kill Switch
    if (btnToggleEmergencyKill) {
      btnToggleEmergencyKill.addEventListener('click', () => {
        state.isSuspended = !state.isSuspended;

        if (state.isSuspended) {
          killSwitchStatusText.textContent = 'STATUS: SUSPENDED // ALL 3 CONNECTED AGENTS REVOKED';
          killSwitchStatusText.classList.add('suspended');
          btnToggleEmergencyKill.textContent = 'Resume Autonomous Delegation Authority';
          btnToggleEmergencyKill.classList.add('btn-resumed');
          // Revoke all agents in state
          state.agents.forEach(ag => {
            ag.isActive = false;
            ag.status = 'SUSPENDED // KILL-SWITCH';
          });
          renderAgentTable();
          showToast('EMERGENCY SUSPENSION ACTIVATED: All agent API tokens revoked.');
        } else {
          killSwitchStatusText.textContent = 'STATUS: NORMAL // AGENT MONITORING ACTIVE';
          killSwitchStatusText.classList.remove('suspended');
          btnToggleEmergencyKill.textContent = 'Trigger Emergency Delegation Suspension';
          btnToggleEmergencyKill.classList.remove('btn-resumed');
          // Restore agents
          state.agents.forEach(ag => {
            ag.isActive = true;
            ag.status = 'Active · Audited';
          });
          renderAgentTable();
          showToast('DELEGATION RESTORED: Continuous intent auditing active.');
        }
      });
    }

    // ==========================================
    // DESKTOP HUB-AND-SPOKE PROGRESSIVE CONTROLLER
    // ==========================================
    const profileDrawerBackdrop = document.getElementById('profileDrawerBackdrop');
    const profileDrawerTitle = document.getElementById('profileDrawerTitle');
    const profileDrawerCategory = document.getElementById('profileDrawerCategory');
    const btnCloseProfileDrawer = document.getElementById('btnCloseProfileDrawer');

    function openDesktopProfileDrawer(subviewId, title, category) {
      if (profileDrawerTitle) profileDrawerTitle.textContent = title;
      if (profileDrawerCategory) profileDrawerCategory.textContent = category;

      document.querySelectorAll('.hub-desktop-subview').forEach(view => {
        view.classList.add('hidden');
      });

      const target = document.getElementById(subviewId);
      if (target) target.classList.remove('hidden');

      if (profileDrawerBackdrop) profileDrawerBackdrop.classList.remove('hidden');

      if (subviewId === 'deskSubSpending') {
        setTimeout(() => {
          renderSpendingAnalysis();
        }, 50);
      }
    }

    function closeDesktopProfileDrawer() {
      if (profileDrawerBackdrop) profileDrawerBackdrop.classList.add('hidden');
    }

    if (btnCloseProfileDrawer) {
      btnCloseProfileDrawer.addEventListener('click', closeDesktopProfileDrawer);
    }

    if (profileDrawerBackdrop) {
      profileDrawerBackdrop.addEventListener('click', (e) => {
        if (e.target === profileDrawerBackdrop) closeDesktopProfileDrawer();
      });
    }

    // Back to stream button
    const btnDesktopProfileBack = document.getElementById('btnDesktopProfileBack');
    if (btnDesktopProfileBack) {
      btnDesktopProfileBack.addEventListener('click', () => {
        switchView('view-stream');
      });
    }

    // User Summary & Active Enclave Card
    const btnDesktopManageUser = document.getElementById('btnDesktopManageUser');
    if (btnDesktopManageUser) {
      btnDesktopManageUser.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubCredentials', 'Hardware Enclave Identity', 'CRYPTOGRAPHIC CREDENTIALS');
      });
    }

    const btnDesktopEnclaveCard = document.getElementById('btnDesktopEnclaveCard');
    if (btnDesktopEnclaveCard) {
      btnDesktopEnclaveCard.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubCredentials', 'Active TPM-2040 Enclave', 'CRYPTOGRAPHIC ATTESTATION');
      });
    }

    // Alert Banner Inspect Pill
    const btnDesktopAlertInspect = document.getElementById('btnDesktopAlertInspect');
    if (btnDesktopAlertInspect) {
      btnDesktopAlertInspect.addEventListener('click', () => {
        switchView('view-stream');
        showToast('Viewing live continuous autonomous agent ingestion stream.');
      });
    }

    // Horizontal "Suggested for You" Tiles
    const tileDesktopDossier = document.getElementById('tileDesktopDossier');
    if (tileDesktopDossier) {
      tileDesktopDossier.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubCredentials', 'Cryptographic Dossier Export', 'SIGNED ATTESTATION RECORD');
      });
    }

    const tileDesktopAgents = document.getElementById('tileDesktopAgents');
    if (tileDesktopAgents) {
      tileDesktopAgents.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubAgents', 'Connected Agent Bearers', 'ACTIVE OAUTH BEARERS');
      });
    }

    const tileDesktopPasskeys = document.getElementById('tileDesktopPasskeys');
    if (tileDesktopPasskeys) {
      tileDesktopPasskeys.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubPasskeys', 'Biometric Passkeys & FIDO2', 'WEBAUTHN ENCLAVE');
      });
    }

    const tileDesktopArbitration = document.getElementById('tileDesktopArbitration');
    if (tileDesktopArbitration) {
      tileDesktopArbitration.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubArbitration', 'Statutory Arbitration Portal', 'ADRP-2040 SECTION 4');
      });
    }

    // Hub-and-Spoke List Rows
    document.querySelectorAll('[data-desktop-target]').forEach(row => {
      row.addEventListener('click', () => {
        const target = row.getAttribute('data-desktop-target');
        switch (target) {
          case 'spending':
            openDesktopProfileDrawer('deskSubSpending', 'Audited Spent Analytics', 'EXECUTIVE PORTFOLIO OVERSIGHT');
            break;
          case 'ceilings':
            openDesktopProfileDrawer('deskSubCeilings', 'Autonomous Expenditure Ceilings', 'HARD LIMITS ENFORCEMENT');
            break;
          case 'agents':
            openDesktopProfileDrawer('deskSubAgents', 'Connected Agent Bearers', 'OAUTH TOKEN DIRECTORY');
            break;
          case 'killswitch':
            openDesktopProfileDrawer('deskSubKillSwitch', 'Emergency Delegation Suspension', 'ZERO-LATENCY REVOCATION');
            break;
          case 'hardware':
            openDesktopProfileDrawer('deskSubHardware', 'TPM-2040 Hardware Specs', 'LOCAL CRYPTOGRAPHIC ROOT');
            break;
          case 'passkeys':
            openDesktopProfileDrawer('deskSubPasskeys', 'Biometric Passkeys & Enclave', 'FIDO2 WEBAUTHN ATTESTATION');
            break;
          case 'arbitration':
            openDesktopProfileDrawer('deskSubArbitration', 'Statutory Carrier Arbitration Portal', 'ADRP-2040 DISPUTE DOSSIER');
            break;
        }
      });
    });

    // Sticky Footer Banner
    const btnDesktopStickyPasskey = document.getElementById('btnDesktopStickyPasskey');
    if (btnDesktopStickyPasskey) {
      btnDesktopStickyPasskey.addEventListener('click', () => {
        openDesktopProfileDrawer('deskSubPasskeys', 'Biometric Passkeys & Enclave', 'FIDO2 WEBAUTHN ATTESTATION');
      });
    }

    // Register passkey button
    const btnDeskRegisterPasskey = document.getElementById('btnDeskRegisterPasskey');
    if (btnDeskRegisterPasskey) {
      btnDeskRegisterPasskey.addEventListener('click', () => {
        btnDeskRegisterPasskey.textContent = 'Enrolling Hardware Passkey...';
        btnDeskRegisterPasskey.disabled = true;
        setTimeout(() => {
          btnDeskRegisterPasskey.textContent = 'Biometric Passkey Enrolled ✓';
          btnDeskRegisterPasskey.style.backgroundColor = 'var(--moss-verified)';
          showToast('Passkey enrolled: Windows Hello / Touch ID bound to TPM-2040.');
        }, 1200);
      });
    }

    // Go to disputes button
    const btnDeskGoToDisputes = document.getElementById('btnDeskGoToDisputes');
    if (btnDeskGoToDisputes) {
      btnDeskGoToDisputes.addEventListener('click', () => {
        closeDesktopProfileDrawer();
        switchView('view-disputes');
      });
    }

    // Export buttons inside drawer
    const btnDeskExportCertModal = document.getElementById('btnDeskExportCertModal');
    if (btnDeskExportCertModal && btnExportIdentityCert) {
      btnDeskExportCertModal.addEventListener('click', () => {
        btnExportIdentityCert.click();
      });
    }

    const btnDeskExportVaultModal = document.getElementById('btnDeskExportVaultModal');
    if (btnDeskExportVaultModal) {
      btnDeskExportVaultModal.addEventListener('click', () => {
        triggerFileDownload('instruction-vault-v13.json', JSON.stringify(state.mandates, null, 2), 'application/json');
        showToast('Instruction Vault exported (.json).');
      });
    }
  }

  // ==========================================
  // COLLAPSIBLE SIDEBAR & MOBILE DRAWER
  // ==========================================
  function setupSidebar() {
    const sidebar = document.getElementById('ledgerSidebar');
    const btnSidebarToggle = document.getElementById('btnSidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const btnMobileSidebarOpen = document.getElementById('btnMobileSidebarOpen');
    const btnMobileSidebarClose = document.getElementById('btnMobileSidebarClose');

    if (!sidebar) return;

    // Helper to synchronize accessibility state in collapsed mode
    function syncCollapsedState(collapsed) {
      const footer = sidebar.querySelector('.index-footer');
      const statutory = sidebar.querySelector('.sidebar-statutory-wrap');
      if (footer) {
        if (collapsed) footer.setAttribute('aria-hidden', 'true');
        else footer.removeAttribute('aria-hidden');
      }
      if (statutory) {
        if (collapsed) statutory.setAttribute('aria-hidden', 'true');
        else statutory.removeAttribute('aria-hidden');
      }
    }

    // Restore saved collapse preference
    const isCollapsed = localStorage.getItem('ar-sidebar-collapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
      syncCollapsedState(true);
      if (btnSidebarToggle) btnSidebarToggle.setAttribute('title', 'Expand sidebar (Ctrl+B)');
    }

    // Toggle collapse on desktop
    if (btnSidebarToggle) {
      btnSidebarToggle.addEventListener('click', () => {
        const collapsed = sidebar.classList.toggle('collapsed');
        localStorage.setItem('ar-sidebar-collapsed', collapsed);
        syncCollapsedState(collapsed);
        btnSidebarToggle.setAttribute('title', collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)');
      });
    }

    // Mobile drawer open
    if (btnMobileSidebarOpen) {
      btnMobileSidebarOpen.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
      });
    }

    // Mobile drawer close
    function closeMobileSidebar() {
      sidebar.classList.remove('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    if (btnMobileSidebarClose) {
      btnMobileSidebarClose.addEventListener('click', closeMobileSidebar);
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Automatically close mobile drawer when any navigation link is clicked
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.innerWidth <= 820) {
          closeMobileSidebar();
        }
      });
    });

    // Keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar collapse
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        if (btnSidebarToggle) {
          btnSidebarToggle.click();
        }
      }
    });
  }

  // ==========================================
  // RENDER: STREAM LEDGER TABLE
  // ==========================================
  function renderStreamTable() {
    streamTableBody.innerHTML = '';
    const filtered = state.streamRecords.filter(rec => {
      if (state.activeFilter === 'all') return true;
      if (state.activeFilter === 'conflict') return rec.determination === 'breach';
      if (state.activeFilter === 'uncovered') return rec.determination === 'uncovered';
      if (state.activeFilter === 'verified') return rec.determination === 'verified';
      return true;
    });

    if (filtered.length === 0) {
      streamTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 32px; color: var(--text-faint); font-family: var(--font-mono);">
            NO INGESTED RECORDS MATCHING FILTER CRITERIA
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(rec => {
      const tr = document.createElement('tr');
      const isBreach = rec.determination === 'breach';
      const isUncovered = rec.determination === 'uncovered';
      const isVerified = rec.determination === 'verified';

      const badgeClass = isBreach ? 'badge-conflict' : (isUncovered ? 'badge-uncovered' : 'badge-verified');
      const iconSvg = isBreach
        ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        : (isUncovered
          ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
          : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`);

      const dotClass = isBreach ? 'dot-breach' : (isUncovered ? 'dot-uncovered' : 'dot-verified');
      const tagText = isBreach ? 'CRITICAL CONFLICT' : (isVerified ? 'VERIFIED COMPLIANT' : 'UNCOVERED INTENT');
      const highlightText = isBreach
        ? `Variance: Scheduled arrival breaches limit (${rec.explanation})`
        : (isVerified ? 'Cryptographically audited · Mandate compliant' : 'Permitted under default pass-through policy');
      const detText = `${rec.title} with ${rec.merchant} for ${rec.value} INR. Audited by local enclave against active Vault ${state.activeVaultVersion}. Click row to inspect raw forensic receipt.`;
      const detMeta = `REF: #${rec.id} // AGENT: ${rec.agent}`;

      tr.innerHTML = `
        <td>
          <div class="audit-status-cell">
            <span class="audit-status-dot ${dotClass}" title="${tagText}"></span>
            <span class="audit-status-tag ${badgeClass}">
              <span>${isBreach ? 'Conflict' : (isVerified ? 'Verified' : 'Uncovered')}</span>
            </span>
          </div>
        </td>
        <td>
          <div class="audit-row-main">${rec.title}</div>
          <div class="audit-row-sub">${rec.merchant}</div>
        </td>
        <td>
          <span style="font-size: 12.5px; color: #3F3F46; font-weight: 500;">${rec.agent}</span>
        </td>
        <td>
          <span class="text-xs text-muted">${rec.time}</span>
        </td>
        <td>
          <span class="font-600" style="font-size: 13px; color: #09090B; letter-spacing: -0.01em;">${rec.value}</span>
        </td>
        <td style="text-align: right;">
          <div class="row-actions-cell" style="justify-content: flex-end;">
            <button class="quick-btn btn-view-trace" data-id="${rec.id}" title="View details">${isBreach ? 'Review Conflict' : 'Details'}</button>
          </div>
        </td>
      `;

      // Quick action button listeners
      const btnTrace = tr.querySelector('.btn-view-trace');
      const btnPayload = tr.querySelector('.btn-audit-payload');

      if (btnTrace) {
        btnTrace.addEventListener('click', (e) => {
          e.stopPropagation();
          openActionDrawer(rec);
        });
      }

      if (btnPayload) {
        btnPayload.addEventListener('click', (e) => {
          e.stopPropagation();
          openRecordPayloadModal(rec);
        });
      }

      tr.addEventListener('click', () => {
        openActionDrawer(rec);
      });
      streamTableBody.appendChild(tr);
    });
  }

  // Open Raw Cryptographic Payload Modal for any record
  function openRecordPayloadModal(rec) {
    const payload = {
      actionId: rec.id,
      title: rec.title,
      merchant: rec.merchant,
      agent: rec.agent,
      timestamp: rec.time,
      amount: rec.value,
      determination: rec.determinationLabel,
      explanation: rec.explanation,
      mandateCode: rec.mandateCode || 'NONE_SPECIFIED',
      forensicVerification: {
        enclaveKey: '8F9A-2B3C-1A92-E4F1',
        hashAlgorithm: 'SHA-256',
        signingScheme: 'Ed25519-HMAC-SHA256',
        clientMandateSealed: rec.mandateCode ? '10:00:14 IST' : 'N/A',
        precedenceVerified: rec.mandateCode ? true : false,
        disputeFacilitated: rec.determination === 'breach',
        legalDisclaimer: "Final remedy determination rests with destination vendor/marketplace."
      }
    };
    rawJsonArea.textContent = JSON.stringify(payload, null, 2);
    payloadModal.classList.remove('hidden');
  }

  // Segmented Pill Control Tab Event Listeners
  const allFilterButtons = document.querySelectorAll('.filter-link, .segment-tab');
  allFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      allFilterButtons.forEach(b => {
        b.classList.remove('active');
        if (b.hasAttribute('aria-selected')) b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      if (btn.hasAttribute('aria-selected')) btn.setAttribute('aria-selected', 'true');
      state.activeFilter = btn.getAttribute('data-filter');
      renderStreamTable();
    });
  });

  // ==========================================
  // ACTION DETAIL DRAWER
  // ==========================================
  function openActionDrawer(rec) {
    state.selectedAction = rec;
    drawerRef.textContent = rec.determination === 'breach' ? '⚠️ Conflict Detected' : 'Transaction Details';
    drawerTitle.textContent = rec.title;

    let bodyHtml = `
      <div style="padding: 12px; background-color: var(--ink-subtle); border: 1px solid var(--rule-hairline); border-radius: var(--radius-xs);">
        <div class="text-xs text-muted font-600">ISSUE SUMMARY</div>
        <div style="margin-top: 4px; font-size: 13px; color: var(--text-lead); font-weight: 500;">${rec.explanation}</div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="text-muted text-xs">Booked by:</span>
          <span class="text-xs font-500 text-lead">${rec.agent}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="text-muted text-xs">Merchant:</span>
          <span class="text-xs font-500 text-lead">${rec.merchant}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="text-muted text-xs">Time:</span>
          <span class="text-xs font-500 text-lead">${rec.time}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="text-muted text-xs">Amount:</span>
          <span class="text-xs font-600 text-lead">${rec.value}</span>
        </div>
      </div>
    `;

    if (rec.determination === 'breach') {
      bodyHtml += `
        <div style="margin-top: 14px;">
          <button class="primary-action-btn" style="width: 100%;" id="btnDrawerInspectDossier">
            Inspect Evidence & Timeline →
          </button>
        </div>
      `;
    } else if (rec.determination === 'uncovered') {
      bodyHtml += `
        <div style="margin-top: 10px; background-color: var(--amber-subtle); border: 1px solid var(--amber-border); padding: 12px; border-radius: var(--radius-xs);">
          <div class="mono text-xs font-500" style="color: var(--amber-uncovered);">RECORD PREFERENCE FOR UNCOVERED CATEGORY</div>
          <p style="font-size: 12px; color: var(--text-lead); margin: 6px 0 10px 0;">
            This action was not subject to prior constraints. Define an instruction to audit future transactions in this category:
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <button class="secondary-action-btn" id="btnDrawerAddLimit">Constrain Device Warranties ≤ ₹500</button>
            <button class="secondary-action-btn" id="btnDrawerBlockWarranties">Prohibit Automated Warranty Purchases</button>
          </div>
        </div>
      `;
    }

    drawerBody.innerHTML = bodyHtml;
    actionDrawer.classList.remove('hidden');

    const btnDrawerInspectDossier = document.getElementById('btnDrawerInspectDossier');
    if (btnDrawerInspectDossier) {
      btnDrawerInspectDossier.addEventListener('click', () => {
        actionDrawer.classList.add('hidden');
        switchView('view-disputes');
      });
    }

    const btnDrawerAddLimit = document.getElementById('btnDrawerAddLimit');
    if (btnDrawerAddLimit) {
      btnDrawerAddLimit.addEventListener('click', () => {
        appendMandate('Hardware', 'Constrain autonomous warranty add-ons under ₹500 INR.', 'Hard Limit');
        actionDrawer.classList.add('hidden');
        showToast('Mandate appended to Vault specification.');
      });
    }

    const btnDrawerBlockWarranties = document.getElementById('btnDrawerBlockWarranties');
    if (btnDrawerBlockWarranties) {
      btnDrawerBlockWarranties.addEventListener('click', () => {
        appendMandate('Hardware', 'Prohibit all autonomous extended warranty attachments.', 'Hard Limit');
        actionDrawer.classList.add('hidden');
        showToast('Mandate appended to Vault specification.');
      });
    }
  }

  btnCloseDrawer.addEventListener('click', () => {
    actionDrawer.classList.add('hidden');
  });

  actionDrawer.addEventListener('click', (e) => {
    if (e.target === actionDrawer) actionDrawer.classList.add('hidden');
  });


  // ==========================================
  // RENDER: INSTRUCTION MANDATES (VAULT)
  // ==========================================
  function formatMandateText(text) {
    return text
      .replace(/after 18:00 IST \(6:00 PM\)/g, '<strong class="text-danger font-600">after 18:00 IST (6:00 PM)</strong>')
      .replace(/exceeding ₹15,000 INR/g, '<strong class="text-lead font-600">exceeding ₹15,000 INR</strong>')
      .replace(/under ₹2,000 INR/g, '<strong class="text-lead font-600">under ₹2,000 INR</strong>')
      .replace(/exceeding ₹1,000 INR\/month/g, '<strong class="text-lead font-600">exceeding ₹1,000 INR/month</strong>')
      .replace(/under 4 hours/g, '<strong class="text-lead font-600">under 4 hours</strong>')
      .replace(/under ₹800 INR/g, '<strong class="text-lead font-600">under ₹800 INR</strong>')
      .replace(/exceeding 1.5%/g, '<strong class="text-lead font-600">exceeding 1.5%</strong>')
      .replace(/between 01:00 IST and 06:00 IST/g, '<strong class="text-lead font-600">between 01:00 IST and 06:00 IST</strong>')
      .replace(/under ₹5,000 INR/g, '<strong class="text-lead font-600">under ₹5,000 INR</strong>')
      .replace(/after 30 days/g, '<strong class="text-lead font-600">after 30 days</strong>')
      .replace(/exceeding ₹1,00,000 INR/g, '<strong class="text-lead font-600">exceeding ₹1,00,000 INR</strong>')
      .replace(/exceeding 120 minutes/g, '<strong class="text-lead font-600">exceeding 120 minutes</strong>')
      .replace(/under ₹500 INR/g, '<strong class="text-lead font-600">under ₹500 INR</strong>');
  }

  // ==========================================
  // RENDER: INSTRUCTION MANDATES (VAULT)
  // ==========================================
  function renderDomainFilters() {
    if (!domainFilterPills) return;
    domainFilterPills.innerHTML = '';
    const domains = ['all', 'Travel', 'Finance', 'Subscriptions', 'Hardware', 'Dining'];

    domains.forEach(d => {
      const count = d === 'all'
        ? state.mandates.length
        : state.mandates.filter(m => m.domain.toLowerCase() === d.toLowerCase()).length;

      const btn = document.createElement('button');
      btn.className = `domain-tab ${state.mandateFilterDomain.toLowerCase() === d.toLowerCase() ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-domain', d);
      btn.innerHTML = `
        <span>${d === 'all' ? 'All' : d}</span>
        <span class="domain-tab-badge mono">${count}</span>
      `;

      btn.addEventListener('click', () => {
        state.mandateFilterDomain = d;
        renderDomainFilters();
        renderVaultTable();
      });

      domainFilterPills.appendChild(btn);
    });

    const hardCount = state.mandates.filter(m => m.severity === 'Hard Limit').length;
    if (hardLimitsCountBadge) hardLimitsCountBadge.textContent = hardCount;
  }

  function renderVaultTable() {
    vaultTableBody.innerHTML = '';

    const q = (state.mandateFilterSearch || '').toLowerCase().trim();
    const filtered = state.mandates.filter(m => {
      // Domain filter
      if (state.mandateFilterDomain !== 'all' && m.domain.toLowerCase() !== state.mandateFilterDomain.toLowerCase()) {
        return false;
      }
      // Hard limits only filter
      if (state.mandateFilterHardOnly && m.severity !== 'Hard Limit') {
        return false;
      }
      // Search query
      if (q) {
        const matchCode = m.code.toLowerCase().includes(q);
        const matchText = m.text.toLowerCase().includes(q);
        const matchDomain = m.domain.toLowerCase().includes(q);
        if (!matchCode && !matchText && !matchDomain) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      vaultTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px 16px; color: var(--text-faint); font-family: var(--font-mono);">
            <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: var(--text-lead);">NO MANDATES MATCHING FILTER CRITERIA</div>
            <div style="font-size: 11px; color: var(--text-muted);">Try adjusting your domain tab, clearing your search query, or disabling "Hard Limits Only".</div>
          </td>
        </tr>
      `;
    } else {
      filtered.forEach(m => {
        const tr = document.createElement('tr');
        const isHard = m.severity === 'Hard Limit';
        const pseudoHash = '0x' + m.code.replace(/[^A-Za-z0-9]/g, '').toLowerCase() + 'a812e9b048';

        tr.innerHTML = `
          <td>
            <span class="domain-badge-cell" style="font-weight: 600; font-size: 12px;">${m.domain}</span>
          </td>
          <td style="line-height: 1.45; color: var(--text-lead);">
            <span class="mandate-sentence">${formatMandateText(m.text)}</span>
          </td>
          <td>
            <span class="severity-pill ${isHard ? 'pill-hard' : 'pill-soft'}">
              <span class="severity-dot"></span>
              <span>${m.severity}</span>
            </span>
          </td>
          <td style="text-align: right;">
            <button class="btn-ghost-revoke btn-revoke-rule" data-code="${m.code}" title="Revoke mandate">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Revoke</span>
            </button>
          </td>
        `;

        const btnRevoke = tr.querySelector('.btn-revoke-rule');
        if (btnRevoke) {
          btnRevoke.addEventListener('click', (e) => {
            e.stopPropagation();
            openRevokeModal(m);
          });
        }

        vaultTableBody.appendChild(tr);
      });
    }

    if (vaultMandatesCount) vaultMandatesCount.textContent = `${state.mandates.length} RULES`;
    if (vaultCount) vaultCount.textContent = state.mandates.length;
  }

  // Search & Filter Listeners for Vault
  if (mandatesSearchInput) {
    mandatesSearchInput.addEventListener('input', (e) => {
      state.mandateFilterSearch = e.target.value;
      if (mandatesSearchClear) {
        if (e.target.value) mandatesSearchClear.classList.remove('hidden');
        else mandatesSearchClear.classList.add('hidden');
      }
      renderVaultTable();
    });
  }

  if (mandatesSearchClear) {
    mandatesSearchClear.addEventListener('click', () => {
      if (mandatesSearchInput) {
        mandatesSearchInput.value = '';
        state.mandateFilterSearch = '';
        mandatesSearchClear.classList.add('hidden');
        renderVaultTable();
        mandatesSearchInput.focus();
      }
    });
  }

  if (btnSeverityToggle) {
    btnSeverityToggle.addEventListener('click', () => {
      state.mandateFilterHardOnly = !state.mandateFilterHardOnly;
      btnSeverityToggle.classList.toggle('active', state.mandateFilterHardOnly);
      btnSeverityToggle.setAttribute('aria-checked', state.mandateFilterHardOnly ? 'true' : 'false');
      renderVaultTable();
    });
  }

  // Revocation Confirmation Modal Logic
  function openRevokeModal(mandate) {
    state.pendingRevokeMandate = mandate;
    if (revokeRuleCode) revokeRuleCode.textContent = mandate.code;
    if (revokeRuleText) revokeRuleText.textContent = `"${mandate.text}"`;
    if (revokeConfirmModal) revokeConfirmModal.classList.remove('hidden');
  }

  function closeRevokeModal() {
    state.pendingRevokeMandate = null;
    if (revokeConfirmModal) revokeConfirmModal.classList.add('hidden');
  }

  if (btnCloseRevokeModal) btnCloseRevokeModal.addEventListener('click', closeRevokeModal);
  if (btnCancelRevoke) btnCancelRevoke.addEventListener('click', closeRevokeModal);
  if (btnConfirmRevoke) {
    btnConfirmRevoke.addEventListener('click', () => {
      if (!state.pendingRevokeMandate) return;
      const code = state.pendingRevokeMandate.code;
      state.mandates = state.mandates.filter(m => m.code !== code);
      state.activeVaultVersion = 'V14.01';
      const sidebarVaultVer = document.getElementById('sidebarVaultVer');
      if (sidebarVaultVer) sidebarVaultVer.textContent = 'V14.01';
      if (vaultRootSpecLabel) vaultRootSpecLabel.textContent = 'VAULT-V14.01';
      closeRevokeModal();
      renderDomainFilters();
      renderVaultTable();
      showToast(`Mandate ${code} revoked. Vault re-sealed under Specification V14.01.`);
    });
  }

  // ==========================================
  // APPEND MANDATE
  // ==========================================
  btnAppendRule.addEventListener('click', () => {
    inputRuleText.value = '';
    appendModal.classList.remove('hidden');
    inputRuleText.focus();
  });

  btnCloseAppendModal.addEventListener('click', () => {
    appendModal.classList.add('hidden');
  });

  btnCancelAppend.addEventListener('click', () => {
    appendModal.classList.add('hidden');
  });

  btnConfirmAppend.addEventListener('click', () => {
    const text = inputRuleText.value.trim();
    if (!text) {
      inputRuleText.focus();
      return;
    }
    const domain = selectRuleDomain.value;
    const severity = selectRuleSeverity.value;
    appendMandate(domain, text, severity);
    appendModal.classList.add('hidden');
    showToast('New mandate committed. Vault specification updated to V14.01.');
  });

  function appendMandate(domain, text, severity) {
    const code = `SEC-${domain.substring(0, 3).toUpperCase()}-${100 + state.mandates.length + 1}`;
    state.activeVaultVersion = 'V14.01';
    state.mandates.unshift({
      code: code,
      domain: domain,
      text: text,
      severity: severity,
      version: 'V14.01'
    });
    const sidebarVaultVer = document.getElementById('sidebarVaultVer');
    if (sidebarVaultVer) sidebarVaultVer.textContent = 'V14.01';
    if (vaultRootSpecLabel) vaultRootSpecLabel.textContent = 'VAULT-V14.01';
    renderDomainFilters();
    renderVaultTable();
  }

  // ==========================================
  // RENDER: CONNECTED AGENTS
  // ==========================================
  // ==========================================
  // RENDER: CONNECTED AGENTS (3 COLUMNS ONLY: AGENT, CATEGORY, ACCESS)
  // ==========================================
  function renderAgentTable() {
    agentTableBody.innerHTML = '';
    state.agents.forEach(ag => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-500">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-flex; width: 24px; height: 24px; border-radius: 6px; background: #F4F4F5; align-items: center; justify-content: center; font-size: 11px; font-weight: 600;">${ag.actor.charAt(0)}</span>
            <span>${ag.actor}</span>
          </div>
        </td>
        <td class="text-muted">${ag.category}</td>
        <td style="text-align: right;">
          <button class="secondary-action-btn mono text-2xs btn-toggle-agent" data-actor="${ag.actor}">
            ${ag.isActive ? 'Revoke Access' : 'Re-Authorize'}
          </button>
        </td>
      `;
      agentTableBody.appendChild(tr);
    });

    document.querySelectorAll('.btn-toggle-agent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const actor = e.target.getAttribute('data-actor');
        const ag = state.agents.find(a => a.actor === actor);
        if (ag) {
          ag.isActive = !ag.isActive;
          ag.status = ag.isActive ? 'Active · Audited' : 'Revoked · Offline';
          renderAgentTable();
          showToast(`Access status updated for ${ag.actor}.`);
        }
      });
    });
  }

  btnRegisterNewAgent.addEventListener('click', () => {
    const name = prompt('Enter actor name for demonstration integration:');
    if (name && name.trim()) {
      state.agents.push({
        actor: name.trim(),
        category: 'Auxiliary',
        status: 'Active · Audited',
        lastSync: 'Just now',
        protocol: 'ADRP-API / Mutual TLS',
        isActive: true
      });
      renderAgentTable();
      showToast(`Agent ${name.trim()} registered in demonstration directory.`);
    }
  });

  // ==========================================
  // ==========================================
  // ==========================================
  // STREAMLINED DISPUTE RESOLUTION & EVIDENCE INTERACTIVE CONTROLLER
  // ==========================================

  // 1. Accordion logic for Dispute Issue Cards (Expands all Image 1 details at bottom on click)
  document.querySelectorAll('.dispute-issue-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Don't toggle if clicking directly on a button inside the toggle bar
      if (e.target.closest('button')) return;
      const parentCard = toggle.closest('.dispute-issue-card');
      if (parentCard) {
        parentCard.classList.toggle('expanded');
      }
    });
  });

  // 2. Inspect Evidence toggle button (located to the left of Submit Claim)
  const btnToggleInspectEvidence = document.getElementById('btnToggleInspectEvidence');
  const claimEvidenceBox = document.getElementById('claimEvidenceBox');
  if (btnToggleInspectEvidence && claimEvidenceBox) {
    btnToggleInspectEvidence.addEventListener('click', (e) => {
      e.stopPropagation();
      claimEvidenceBox.classList.toggle('hidden');
      const isHidden = claimEvidenceBox.classList.contains('hidden');
      btnToggleInspectEvidence.textContent = isHidden ? 'Inspect Evidence' : 'Hide Evidence Dossier';
      if (!isHidden) {
        showToast('Forensic evidence dossier displayed below.');
      }
    });
  }

  // 3. Accordion logic for 5 Categorized Evidence Items inside Inspect Evidence
  document.querySelectorAll('.evidence-category-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = header.closest('.evidence-category-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });

  // 4. Merchant Dispute Terms Modal Logic
  const btnMerchantTerms = document.getElementById('btnMerchantTerms');
  const merchantTermsModal = document.getElementById('merchantTermsModal');
  const btnCloseTermsModal = document.getElementById('btnCloseTermsModal');
  const btnCloseTermsModalBtn = document.getElementById('btnCloseTermsModalBtn');

  function openTermsModal() {
    if (merchantTermsModal) merchantTermsModal.classList.add('open');
  }

  function closeTermsModal() {
    if (merchantTermsModal) merchantTermsModal.classList.remove('open');
  }

  if (btnMerchantTerms) {
    btnMerchantTerms.addEventListener('click', openTermsModal);
  }
  if (btnCloseTermsModal) {
    btnCloseTermsModal.addEventListener('click', closeTermsModal);
  }
  if (btnCloseTermsModalBtn) {
    btnCloseTermsModalBtn.addEventListener('click', closeTermsModal);
  }
  if (merchantTermsModal) {
    merchantTermsModal.addEventListener('click', (e) => {
      if (e.target === merchantTermsModal) closeTermsModal();
    });
  }

  // 5. Download Evidence Dossier JSON
  const btnExportEvidenceJson = document.getElementById('btnExportEvidenceJson');
  if (btnExportEvidenceJson) {
    btnExportEvidenceJson.addEventListener('click', (e) => {
      e.stopPropagation();
      const dossierPayload = {
        dossier_id: 'DSP-8910-INDIGO',
        generated_at: new Date().toISOString(),
        claimant: {
          name: state.principal.name,
          account_id: state.principal.id,
          hardware_key_fingerprint: state.principal.keyFingerprint
        },
        merchant: {
          name: 'IndiGo Airlines (InterGlobe Aviation Ltd.)',
          booking_reference_pnr: 'X89Q42',
          flight_number: '6E-2412',
          route: 'BLR Kempegowda -> DEL Indira Gandhi',
          scheduled_arrival_actual: '20:45 IST',
          disputed_amount: 14200.00,
          currency: 'INR'
        },
        constraint_violation: {
          mandate_code: 'SEC-TRV-102',
          mandate_text: 'Never book domestic flights scheduled to arrive after 18:00 IST.',
          rule_active_since: '2026-10-21T10:00:00+05:30',
          variance_past_cutoff: '2 hours 45 minutes',
          severity: 'Hard Limit (Deterministic Invalidation)'
        },
        agent_audit: {
          actor_id: 'travel-concierge-v4.2',
          action: 'ORDER_SETTLEMENT_EXECUTE',
          biometric_bypass: true,
          execution_timestamp: '2026-10-21T10:02:14.218+05:30'
        },
        cryptographic_attestation: {
          tpm_enclave_signature: 'SIG-ED25519-8F9A-2B3C-1A92-E4F1-9980',
          sha256_merkle_root: '0x7d91e843b02c89f2a71de44a9c10f823',
          tamper_evident_status: 'VALID_UNMODIFIED'
        }
      };

      const blob = new Blob([JSON.stringify(dossierPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Evidence_Dossier_DSP8910_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded signed Evidence Dossier JSON.');
    });
  }

  // 6. Submit Dispute Claim to Merchant Flow (Image 1 Stepper & State update)
  if (btnTransmitArbitration) {
    btnTransmitArbitration.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.arbitrationState === 'UNDER_REVIEW' || state.arbitrationState === 'TRANSMITTED') {
        showToast('Dispute dossier has already been transmitted to IndiGo and is under vendor review.');
        return;
      }

      btnTransmitArbitration.disabled = true;
      btnTransmitArbitration.textContent = 'Transmitting Claim to IndiGo...';

      setTimeout(() => {
        state.arbitrationState = 'UNDER_REVIEW';

        // 4-Step Stepper updates:
        const step2Cell = document.getElementById('step2Cell');
        const step2Meta = document.getElementById('step2Meta');
        if (step2Cell) {
          step2Cell.classList.remove('current');
          step2Cell.classList.add('done');
          if (step2Meta) step2Meta.textContent = '10:03 AM · Sealed & Transmitted';
        }

        const step3Cell = document.getElementById('step3Cell');
        const step3Meta = document.getElementById('step3Meta');
        if (step3Cell) {
          step3Cell.classList.add('current');
          if (step3Meta) step3Meta.textContent = 'Under Merchant Review ⏳';
        }

        // Header chips & tags
        if (arbitrationStateChip) {
          arbitrationStateChip.textContent = 'CLAIM TRANSMITTED // UNDER REVIEW ⏳';
          arbitrationStateChip.className = 'metric-chip mono text-verified';
        }

        const disputeCard1Tag = document.getElementById('disputeCard1Tag');
        if (disputeCard1Tag) {
          disputeCard1Tag.textContent = 'STEP 3 OF 4 · IN MERCHANT REVIEW ⏳';
          disputeCard1Tag.className = 'step-status-tag tag-active';
        }

        if (disputeFlag) {
          disputeFlag.textContent = 'IN REVIEW';
          disputeFlag.classList.remove('nav-flag');
          disputeFlag.classList.add('nav-count');
        }

        // Reveal settlement acknowledgement
        const settlementBox = document.getElementById('settlementBox');
        if (settlementBox) settlementBox.classList.remove('hidden');

        btnTransmitArbitration.textContent = 'Claim Transmitted 🟢 (Under Merchant Review ⏳)';
        showToast('Dispute Claim submitted to IndiGo (#DSP-8910). Review active.');

        setTimeout(() => {
          const prefModal = document.getElementById('preferenceEvolutionModal');
          if (prefModal) prefModal.classList.remove('hidden');
        }, 900);
      }, 900);
    });
  }

  // Preference Evolution Modal Event Listeners
  const prefModal = document.getElementById('preferenceEvolutionModal');
  const btnClosePrefEvolModal = document.getElementById('btnClosePrefEvolModal');
  const btnDismissPrefEvol = document.getElementById('btnDismissPrefEvol');
  const btnConfirmLockPermanent = document.getElementById('btnConfirmLockPermanent');

  if (btnClosePrefEvolModal && prefModal) {
    btnClosePrefEvolModal.addEventListener('click', () => {
      prefModal.classList.add('hidden');
    });
  }

  if (btnDismissPrefEvol && prefModal) {
    btnDismissPrefEvol.addEventListener('click', () => {
      prefModal.classList.add('hidden');
      showToast('Preference evolution deferred.');
    });
  }

  if (btnConfirmLockPermanent && prefModal) {
    btnConfirmLockPermanent.addEventListener('click', () => {
      prefModal.classList.add('hidden');
      // Increment vault version to V14 and lock mandate
      state.activeVaultVersion = 'V14.00';
      const vaultBadge = document.getElementById('vaultSpecBadge');
      if (vaultBadge) vaultBadge.textContent = 'V14.00';
      showToast("Mandate SEC-TRV-102 ('Arrive before 6 PM') permanently locked in Vault (Spec V14.00).");
    });
  }

  // ==========================================
  // FORENSIC EVIDENCE JSON EXPORT
  // ==========================================
  const formalEvidencePayload = {
    standard_specification: "ADRP-2040-REV4",
    dossier_reference: "DSP-2040-8812",
    audit_attestation_timestamp_utc: "2040-10-21T04:33:00.120Z",
    disclaimer: "Disclaimer: This document contains cryptographically hashed evidence of user instructions and execution payloads. Final remedy determination rests with the destination vendor/marketplace.",
    claimant_principal: {
      account_identifier: "USR-2040-DEMO",
      public_attestation_key: "8F9A-2B3C-1A92-E4F1",
      name: "Harshith"
    },
    respondent_merchant: {
      corporate_name: "InterGlobe Aviation Limited (IndiGo)",
      settlement_endpoint: "api.goindigo.in/adrp/recourse/v4"
    },
    item_a_pre_execution_mandate: {
      vault_specification: "V13.04",
      sealed_timestamp_utc: "2040-10-21T04:30:14.000Z",
      mandate_code: "SEC-TRV-102",
      statutory_text: "Never book domestic flights scheduled to arrive after 18:00 IST (6:00 PM).",
      sha256_root_hash: "0x98f21bc780d19ca780214ef590124ba89012356781290348a2"
    },
    item_b_carrier_execution_payload: {
      action_identifier: "ACT-9042",
      executed_timestamp_utc: "2040-10-21T04:32:45.000Z",
      pnr_reference: "IND-6E-88910",
      flight_number: "6E-2412",
      scheduled_arrival_ist: "21:00",
      settlement_value_inr: 7850.00,
      carrier_disclosure_hash: "0x3d087fe910901abcf90184712049ba38291ca0912440182"
    },
    evidentiary_determination: {
      binding_algorithm: "HMAC-SHA256",
      binding_attestation_hash: "0x9c4e71df88310ba0429fec819034aa1095cb72901a8ef801c",
      temporal_precedence_confirmed: true,
      delta_seconds_precedence: 151,
      variance_summary: "Execution contradicts mandate by +180 minutes",
      statutory_remedy: "Formal evidence dossier compiled to facilitate claim under vendor dispute protocol."
    }
  };

  if (btnDownloadEvidenceJson) {
    btnDownloadEvidenceJson.addEventListener('click', () => {
      triggerFileDownload('ADRP-Dossier-DSP-2040-8812.json', JSON.stringify(formalEvidencePayload, null, 2), 'application/json');
      showToast('Forensic dossier payload exported (.json).');
    });
  }

  if (btnPreviewFilingJson) {
    btnPreviewFilingJson.addEventListener('click', () => {
      if (rawJsonArea) rawJsonArea.textContent = JSON.stringify(formalEvidencePayload, null, 2);
      if (payloadModal) payloadModal.classList.remove('hidden');
    });
  }

  if (btnClosePayloadModal) {
    btnClosePayloadModal.addEventListener('click', () => {
      if (payloadModal) payloadModal.classList.add('hidden');
    });
  }

  if (btnCopyRawJson) {
    btnCopyRawJson.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(formalEvidencePayload, null, 2)).then(() => {
        showToast('Payload copied to clipboard.');
      });
    });
  }

  if (btnDownloadRawJson) {
    btnDownloadRawJson.addEventListener('click', () => {
      triggerFileDownload('ADRP-Filing-Payload.json', JSON.stringify(formalEvidencePayload, null, 2), 'application/json');
    });
  }

  // ==========================================
  // GOVERNANCE CONTROLS
  // ==========================================
  policyOptions.forEach(opt => {
    opt.addEventListener('change', (e) => {
      document.querySelectorAll('.policy-option').forEach(p => p.classList.remove('selected'));
      opt.closest('.policy-option').classList.add('selected');
      showToast(`Default policy updated: ${e.target.value === 'prompt' ? 'Classify Uncovered & Request Preference' : 'Pause High-Consequence Actions'}`);
    });
  });

  retentionOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      retentionOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.retentionDays = btn.getAttribute('data-days');
      showToast(`Local cryptographic cache retention set to ${state.retentionDays} days.`);
    });
  });

  btnExportFullArchive.addEventListener('click', () => {
    const archive = {
      standard: "ADRP-AUDIT-ARCHIVE-2040",
      export_date: new Date().toISOString(),
      principal: state.principal,
      vault_specification: state.activeVaultVersion,
      mandates: state.mandates,
      stream_records: state.streamRecords,
      connected_agents: state.agents
    };
    triggerFileDownload('AgentRecourse-Audit-Archive.json', JSON.stringify(archive, null, 2), 'application/json');
    showToast('Comprehensive institutional archive exported (.json).');
  });

  btnTriggerPurge.addEventListener('click', () => {
    if (confirm('CRITICAL ACTION: Purge all local cached action payloads and unsealed dossiers? Third-party merchant systems will remain unaffected.')) {
      state.streamRecords = [];
      renderStreamTable();
      renderSpendingChart();
      conflictDocket.style.display = 'none';
      feedFlag.textContent = '0 FLAGS';
      showToast('Local cryptographic audit cache purged.');
    }
  });

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  function triggerFileDownload(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'ribbon-toast mono text-xs';
    toast.innerHTML = `<span style="color: var(--moss-verified);">§</span> <span>${message}</span>`;
    notifRibbon.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }
  window.showToast = showToast;

  function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        actionDrawer.classList.add('hidden');
        appendModal.classList.add('hidden');
        payloadModal.classList.add('hidden');
        const sidebar = document.getElementById('ledgerSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          sidebar.classList.remove('mobile-open');
          if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        }
      }
    });
  }

  // ==========================================
  // GLOBAL INTERACTIVE DETAIL TOOLTIPS
  // ==========================================
  function setupGlobalDetailTooltips() {
    const tooltip = document.getElementById('globalDetailTooltip');
    if (!tooltip) return;

    const ttTitle = document.getElementById('ttTitle');
    const ttTag = document.getElementById('ttTag');
    const ttHighlight = document.getElementById('ttHighlight');
    const ttBody = document.getElementById('ttBody');
    const ttMeta = document.getElementById('ttMeta');

    let currentTarget = null;

    function showTooltipFor(target) {
      if (!target) return;
      currentTarget = target;

      const title = target.getAttribute('data-detail-title') || target.getAttribute('title') || 'Forensic Detail';
      const tag = target.getAttribute('data-detail-tag') || 'VERIFIED';
      const highlight = target.getAttribute('data-detail-highlight') || '';
      const text = target.getAttribute('data-detail-text') || target.getAttribute('data-detail') || '';
      const meta = target.getAttribute('data-detail-meta') || 'Click to copy full trace // REF: ENCLAVE-ROOT';

      if (!text && !highlight && !title) return;

      if (ttTitle) ttTitle.textContent = title;
      if (ttTag) {
        ttTag.textContent = tag;
        if (tag.includes('CONFLICT') || tag.includes('BREACH') || tag.includes('DANGER') || tag.includes('STRICT')) {
          ttTag.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
          ttTag.style.color = '#FCA5A5';
          ttTag.style.borderColor = 'rgba(220, 38, 38, 0.4)';
        } else if (tag.includes('UNCOVERED') || tag.includes('ADVISORY') || tag.includes('SECTION')) {
          ttTag.style.backgroundColor = 'rgba(217, 119, 6, 0.2)';
          ttTag.style.color = '#FCD34D';
          ttTag.style.borderColor = 'rgba(217, 119, 6, 0.4)';
        } else {
          ttTag.style.backgroundColor = '#27272A';
          ttTag.style.color = '#D4D4D8';
          ttTag.style.borderColor = '#3F3F46';
        }
      }

      if (ttHighlight) {
        if (highlight) {
          ttHighlight.textContent = highlight;
          ttHighlight.style.display = 'block';
        } else {
          ttHighlight.style.display = 'none';
        }
      }

      if (ttBody) {
        ttBody.textContent = text;
      }

      if (ttMeta) {
        if (meta) {
          ttMeta.textContent = meta;
          ttMeta.style.display = 'block';
        } else {
          ttMeta.style.display = 'none';
        }
      }

      tooltip.classList.remove('hidden');
      positionTooltip(target);
    }

    function positionTooltip(target) {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      const minLeft = 14;
      const maxLeft = window.innerWidth - tooltipRect.width - 14;
      left = Math.max(minLeft, Math.min(maxLeft, left));

      let top = rect.top - tooltipRect.height - 10;
      if (top < 12) {
        top = rect.bottom + 10;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    function hideTooltip() {
      tooltip.classList.add('hidden');
      currentTarget = null;
    }

    // Delegated hover events for high performance & dynamic elements
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target) {
        showTooltipFor(target);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target && target === currentTarget) {
        const related = e.relatedTarget;
        if (!target.contains(related)) {
          hideTooltip();
        }
      }
    });

    // Click to copy trace support
    document.addEventListener('click', (e) => {
      const copyTarget = e.target.closest('.mandate-info-icon, .code-badge');
      if (copyTarget && copyTarget.getAttribute('data-detail-text')) {
        const title = copyTarget.getAttribute('data-detail-title') || 'Mandate';
        const text = copyTarget.getAttribute('data-detail-text') || '';
        const meta = copyTarget.getAttribute('data-detail-meta') || '';
        const trace = `${title}: ${text} [${meta}]`;
        navigator.clipboard.writeText(trace).then(() => {
          showToast('Forensic constraint trace copied to clipboard.');
        }).catch(() => { });
      }
    });

    // Keyboard accessibility
    document.addEventListener('focusin', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target) {
        showTooltipFor(target);
      }
    });

    document.addEventListener('focusout', () => {
      hideTooltip();
    });

    // Dismiss on outside touch / click
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (!target) {
        hideTooltip();
      }
    });

    window.addEventListener('scroll', () => {
      if (currentTarget) {
        positionTooltip(currentTarget);
      }
    }, { passive: true });
  }

  // ==========================================
  // EXPANDABLE LEGAL NARRATIVE CONTROLLER
  // ==========================================
  function setupExpandableNarratives() {
    document.querySelectorAll('.expandable-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const parent = hdr.closest('.expandable-narrative');
        if (parent) {
          parent.classList.toggle('open');
        }
      });
    });
  }

  // Run
  init();
});
