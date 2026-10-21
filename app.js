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
    arbitrationState: 'PACKAGED', // 'PACKAGED' | 'TRANSMITTED' | 'SETTLED'
    retentionDays: '60',
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
        title: 'Flight 6E-2412 (BLR ➔ DEL)',
        merchant: 'InterGlobe Aviation (IndiGo)',
        agent: 'OpenAgent Travel v8.4',
        time: '2040-10-21 10:02:45 IST',
        value: '₹7,850.00',
        determination: 'breach',
        determinationLabel: 'INSTRUCTION CONFLICT',
        explanation: 'Scheduled arrival at 21:00 IST directly breaches Mandate SEC-TRV-102 (Limit: < 18:00 IST).',
        mandateCode: 'SEC-TRV-102'
      },
      {
        id: 'ACT-9041',
        title: '2-Year Hardware Warranty Add-On',
        merchant: 'Croma Electronics',
        agent: 'RetailAgent v4.2',
        time: '2040-10-21 09:41:10 IST',
        value: '₹1,500.00',
        determination: 'uncovered',
        determinationLabel: 'UNCOVERED INTENT',
        explanation: 'No constraint in Vault V13 applies to extended device warranties. Non-punitive state.'
      },
      {
        id: 'ACT-9039',
        title: 'Weekly Organic Sustenance Basket',
        merchant: 'BigBasket Hyperlocal',
        agent: 'HouseholdAgent v2.1',
        time: '2040-10-21 08:15:00 IST',
        value: '₹4,210.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Audited against household weekly sustenance budget allocation.'
      },
      {
        id: 'ACT-9038',
        title: 'Monthly Electric Utility Auto-Pay',
        merchant: 'BESCOM Power Corp',
        agent: 'FinanceAgent v6.1',
        time: '2040-10-21 06:30:22 IST',
        value: '₹2,340.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Within verified seasonal baseline variance.'
      },
      {
        id: 'ACT-9037',
        title: 'Autonomous Urban Commute (AV-4)',
        merchant: 'Uber Mobility',
        agent: 'MobilityAgent v3',
        time: '2040-10-20 19:12:00 IST',
        value: '₹450.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED COMPLIANT',
        explanation: 'Standard commuter tariff compliant with Rule SEC-TRV-107.'
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
  const btnManageVaultFromProfile = document.getElementById('btnManageVaultFromProfile');
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
  // INITIAL RENDER
  // ==========================================
  function init() {
    renderStreamTable();
    renderSpendingChart();
    renderVaultTable();
    renderAgentTable();
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
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, 10);
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

    if (btnInspectEvidence) {
      btnInspectEvidence.addEventListener('click', () => {
        switchView('view-evidence');
      });
    }

    if (btnProceedArbitration) {
      btnProceedArbitration.addEventListener('click', () => {
        switchView('view-disputes');
      });
    }

    if (btnDismissConflict) {
      btnDismissConflict.addEventListener('click', () => {
        if (conflictDocket) {
          conflictDocket.style.transition = 'all 0.25s ease';
          conflictDocket.style.opacity = '0';
          conflictDocket.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            conflictDocket.style.display = 'none';
          }, 250);
        }
        if (mismatchCountChip) {
          mismatchCountChip.textContent = '0 CONFLICTS DETECTED';
          mismatchCountChip.classList.remove('text-danger');
        }
        if (feedFlag) {
          feedFlag.textContent = '0 CONFLICTS';
          feedFlag.classList.remove('nav-flag');
          feedFlag.classList.add('nav-count');
        }
        showToast('Action #ACT-9042 variance dismissed by principal.');
      });
    }

    if (btnMastheadProfile) {
      btnMastheadProfile.addEventListener('click', () => {
        switchView('view-profile');
      });
    }

    if (btnManageVaultFromProfile) {
      btnManageVaultFromProfile.addEventListener('click', () => {
        switchView('view-vault');
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
        switchView('view-stream');
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

    // Restore saved collapse preference
    const isCollapsed = localStorage.getItem('ar-sidebar-collapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
      if (btnSidebarToggle) btnSidebarToggle.setAttribute('title', 'Expand sidebar (Ctrl+B)');
    }

    // Toggle collapse on desktop
    if (btnSidebarToggle) {
      btnSidebarToggle.addEventListener('click', () => {
        const collapsed = sidebar.classList.toggle('collapsed');
        localStorage.setItem('ar-sidebar-collapsed', collapsed);
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
          <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-faint); font-family: var(--font-mono);">
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
      
      const tagText = isBreach ? 'CRITICAL CONFLICT' : (isVerified ? 'VERIFIED COMPLIANT' : 'UNCOVERED INTENT');
      const highlightText = isBreach 
        ? `Variance: Scheduled arrival breaches limit (${rec.explanation})`
        : (isVerified ? 'Cryptographically audited · Mandate compliant' : 'Permitted under default pass-through policy');
      const detText = `${rec.title} with ${rec.merchant} for ${rec.value} INR. Audited by local enclave against active Vault ${state.activeVaultVersion}. Click row to inspect raw forensic receipt.`;
      const detMeta = `REF: #${rec.id} // AGENT: ${rec.agent}`;

      tr.innerHTML = `
        <td class="mono font-500">
          <span class="has-detail" data-detail-title="Action Receipt #${rec.id}" data-detail-tag="${rec.agent.toUpperCase()}" data-detail-highlight="${rec.merchant} · ${rec.value}" data-detail-text="${rec.title}. Logged at ${rec.time}." data-detail-meta="Click row to open forensic receipt drawer">${rec.id}</span>
        </td>
        <td>
          <div style="font-weight: 600; color: var(--text-lead);">${rec.title}</div>
          <div class="mono text-2xs text-muted">${rec.merchant}</div>
        </td>
        <td class="mono text-muted text-xs">${rec.agent}</td>
        <td class="mono text-muted text-xs">${rec.time}</td>
        <td class="mono font-600 text-lead">${rec.value}</td>
        <td style="text-align: right;">
          <span class="determination-pill det-${rec.determination} has-detail" data-detail-title="Determination for #${rec.id}" data-detail-tag="${tagText}" data-detail-highlight="${highlightText}" data-detail-text="${detText}" data-detail-meta="${detMeta}">${rec.determinationLabel}</span>
        </td>
      `;
      tr.addEventListener('click', () => {
        openActionDrawer(rec);
      });
      streamTableBody.appendChild(tr);
    });
  }

  filterLinks.forEach(link => {
    link.addEventListener('click', () => {
      filterLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      state.activeFilter = link.getAttribute('data-filter');
      renderStreamTable();
    });
  });

  // ==========================================
  // ACTION DETAIL DRAWER
  // ==========================================
  function openActionDrawer(rec) {
    state.selectedAction = rec;
    drawerRef.textContent = `REF: #${rec.id}`;
    drawerTitle.textContent = rec.title;

    let bodyHtml = `
      <div style="padding: 12px; background-color: var(--ink-subtle); border: 1px solid var(--rule-hairline); border-radius: var(--radius-xs);">
        <div class="mono text-2xs text-muted">DETERMINATION SUMMARY</div>
        <div style="margin-top: 4px; font-size: 13px; color: var(--text-lead);">${rec.explanation}</div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="mono text-muted text-xs">SOURCE AGENT:</span>
          <span class="mono text-xs font-500">${rec.agent}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="mono text-muted text-xs">MERCHANT:</span>
          <span class="mono text-xs font-500">${rec.merchant}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="mono text-muted text-xs">RECORD TIMESTAMP:</span>
          <span class="mono text-xs font-500">${rec.time}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
          <span class="mono text-muted text-xs">FINANCIAL QUANTUM:</span>
          <span class="mono text-xs font-500">${rec.value} INR</span>
        </div>
      </div>
    `;

    if (rec.determination === 'breach') {
      bodyHtml += `
        <div style="margin-top: 14px;">
          <button class="primary-action-btn" style="width: 100%;" id="btnDrawerInspectDossier">
            Inspect Bilateral Evidence Dossier →
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
        switchView('view-evidence');
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
  // DISMISS CONFLICT
  // ==========================================
  btnDismissConflict.addEventListener('click', () => {
    conflictDocket.style.opacity = '0.35';
    conflictDocket.style.pointerEvents = 'none';
    feedFlag.textContent = '0 FLAGS';
    feedFlag.style.backgroundColor = 'transparent';
    feedFlag.style.color = 'var(--text-muted)';
    feedFlag.style.borderColor = 'var(--rule-hairline)';
    mismatchCountChip.textContent = '0 CONFLICTS';
    mismatchCountChip.classList.remove('text-danger');
    showToast('Variance determination acknowledged and archived.');
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

  function renderVaultTable() {
    vaultTableBody.innerHTML = '';
    state.mandates.forEach(m => {
      const tr = document.createElement('tr');
      const isHard = m.severity === 'Hard Limit';
      const pseudoHash = '0x' + m.code.replace(/[^A-Za-z0-9]/g, '').toLowerCase() + 'a812e9b048';

      tr.innerHTML = `
        <td class="mono font-500">
          <span class="has-detail" data-detail-title="${m.code} Mandate Specification" data-detail-tag="${m.domain.toUpperCase()}" data-detail-highlight="Enforced in Vault ${m.version}" data-detail-text="${m.text}" data-detail-meta="Root Hash: ${pseudoHash}...">${m.code}</span>
        </td>
        <td class="mono text-muted">${m.domain}</td>
        <td>${formatMandateText(m.text)}</td>
        <td class="mono text-xs">
          <span class="has-detail" data-detail-title="Enforcement Mode: ${m.severity}" data-detail-tag="${isHard ? 'STRICT LIMIT' : 'ADVISORY'}" data-detail-highlight="${isHard ? 'Mandatory Breach Flagging' : 'Discretionary Advisory'}" data-detail-text="${isHard ? 'Transactions violating hard limits are immediately flagged as instruction conflicts for statutory recourse.' : 'Soft constraints guide agent choices while logging warnings.'}">
            ${isHard ? '<strong class="text-danger font-600">Hard Limit</strong>' : '<span class="text-mauve font-500">Soft Constraint</span>'}
          </span>
        </td>
        <td class="mono text-xs text-muted">${m.version}</td>
        <td style="text-align: right;">
          <button class="text-action-btn mono text-2xs btn-revoke-rule" data-code="${m.code}">Revoke</button>
        </td>
      `;
      vaultTableBody.appendChild(tr);
    });

    vaultMandatesCount.textContent = state.mandates.length;
    vaultCount.textContent = state.mandates.length;

    document.querySelectorAll('.btn-revoke-rule').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.target.getAttribute('data-code');
        showToast(`Revocation of ${code} requires signing key attestation.`);
      });
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
    document.getElementById('sidebarVaultVer').textContent = 'VERSION 14.01';
    renderVaultTable();
  }

  // ==========================================
  // RENDER: CONNECTED AGENTS
  // ==========================================
  function renderAgentTable() {
    agentTableBody.innerHTML = '';
    state.agents.forEach(ag => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-500">${ag.actor}</td>
        <td class="mono text-muted">${ag.category}</td>
        <td>
          <span class="determination-pill ${ag.isActive ? 'det-verified' : 'det-uncovered'}">${ag.status}</span>
        </td>
        <td class="mono text-muted">${ag.lastSync}</td>
        <td class="mono text-xs text-muted">${ag.protocol}</td>
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
  // ARBITRATION SUBMISSION FLOW
  // ==========================================
  btnTransmitArbitration.addEventListener('click', () => {
    if (state.arbitrationState === 'SETTLED') {
      showToast('Arbitration dispute has already reached finalized settlement.');
      return;
    }

    btnTransmitArbitration.disabled = true;
    btnTransmitArbitration.textContent = 'Transmitting Notice via ADRP Gateway...';

    setTimeout(() => {
      arbStep2.className = 'step-cell done';
      arbStep2Meta.textContent = 'Transmitted 10:04 IST';

      arbStep3.className = 'step-cell current';
      arbStep3Meta.textContent = 'Validating Signatures';
      arbitrationStateChip.textContent = 'NOTICE TRANSMITTED';
      showToast('Formal dispute notice delivered to InterGlobe Aviation API.');
    }, 1200);

    setTimeout(() => {
      arbStep3.className = 'step-cell done';
      arbStep3Meta.textContent = 'Handshake Verified';

      arbStep4.className = 'step-cell done current';
      arbStep4Meta.textContent = 'Restitution Complete';

      settlementBox.classList.remove('hidden');
      btnTransmitArbitration.textContent = 'Arbitration Finalized (Restitution Confirmed)';
      arbitrationStateChip.textContent = 'SETTLEMENT CONCLUDED';
      arbitrationStateChip.className = 'metric-chip mono text-verified';
      disputeFlag.textContent = 'SETTLED';
      disputeFlag.style.backgroundColor = 'var(--moss-subtle)';
      disputeFlag.style.color = 'var(--moss-verified)';
      disputeFlag.style.borderColor = 'var(--moss-border)';

      state.arbitrationState = 'SETTLED';
      showToast('Restitution confirmed: Full refund of ₹7,850.00 INR credited.');
    }, 2800);
  });

  // ==========================================
  // FORENSIC EVIDENCE JSON EXPORT
  // ==========================================
  const formalEvidencePayload = {
    standard_specification: "ADRP-2040-REV4",
    dossier_reference: "DSP-2040-8812",
    audit_attestation_timestamp_utc: "2040-10-21T04:33:00.120Z",
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
      statutory_remedy: "Immediate ticket rescission and 100% financial restitution"
    }
  };

  btnDownloadEvidenceJson.addEventListener('click', () => {
    triggerFileDownload('ADRP-Dossier-DSP-2040-8812.json', JSON.stringify(formalEvidencePayload, null, 2), 'application/json');
    showToast('Forensic dossier payload exported (.json).');
  });

  btnPreviewFilingJson.addEventListener('click', () => {
    rawJsonArea.textContent = JSON.stringify(formalEvidencePayload, null, 2);
    payloadModal.classList.remove('hidden');
  });

  btnClosePayloadModal.addEventListener('click', () => {
    payloadModal.classList.add('hidden');
  });

  btnCopyRawJson.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(formalEvidencePayload, null, 2)).then(() => {
      showToast('Payload copied to clipboard.');
    });
  });

  btnDownloadRawJson.addEventListener('click', () => {
    triggerFileDownload('ADRP-Filing-Payload.json', JSON.stringify(formalEvidencePayload, null, 2), 'application/json');
  });

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
      const meta = target.getAttribute('data-detail-meta') || 'REF: ENCLAVE-ROOT // LOCAL';

      if (!text && !highlight && !title) return;

      if (ttTitle) ttTitle.textContent = title;
      if (ttTag) {
        ttTag.textContent = tag;
        if (tag.includes('CONFLICT') || tag.includes('BREACH') || tag.includes('DANGER') || tag.includes('STRICT')) {
          ttTag.style.backgroundColor = 'rgba(197, 48, 48, 0.35)';
          ttTag.style.color = '#FFA8A8';
          ttTag.style.borderColor = 'rgba(197, 48, 48, 0.5)';
        } else if (tag.includes('UNCOVERED') || tag.includes('ADVISORY') || tag.includes('SECTION')) {
          ttTag.style.backgroundColor = 'rgba(217, 119, 6, 0.35)';
          ttTag.style.color = '#FDE68A';
          ttTag.style.borderColor = 'rgba(217, 119, 6, 0.5)';
        } else {
          ttTag.style.backgroundColor = 'rgba(147, 132, 209, 0.3)';
          ttTag.style.color = '#E9D5DA';
          ttTag.style.borderColor = 'rgba(147, 132, 209, 0.4)';
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
