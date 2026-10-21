/**
 * AGENT RECOURSE — MOBILE APP ENGINE (2040)
 * Color Palette: Moonlit Mauve (#F3E8EB, #E9D5DA, #C9BBCF, #9384D1, #6B5B95)
 * Pure Vanilla JavaScript implementation with touch & cursor inspection
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STATE MANAGEMENT
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
    arbitrationState: 'PACKAGED',
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
        time: 'Today, 10:02 AM',
        value: '₹7,850.00',
        determination: 'breach',
        determinationLabel: 'CONFLICT',
        explanation: 'Scheduled arrival at 21:00 IST directly breaches Mandate SEC-TRV-102 (Limit: < 18:00 IST).'
      },
      {
        id: 'ACT-9041',
        title: '2-Year Hardware Warranty Add-On',
        merchant: 'Croma Electronics',
        agent: 'RetailAgent v4.2',
        time: 'Today, 09:41 AM',
        value: '₹1,500.00',
        determination: 'uncovered',
        determinationLabel: 'UNCOVERED',
        explanation: 'No constraint in Vault V13 applies to extended device warranties. Non-punitive state.'
      },
      {
        id: 'ACT-9039',
        title: 'Weekly Organic Sustenance Basket',
        merchant: 'BigBasket Hyperlocal',
        agent: 'HouseholdAgent v2.1',
        time: 'Today, 08:15 AM',
        value: '₹4,210.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED',
        explanation: 'Audited against household weekly sustenance budget allocation.'
      },
      {
        id: 'ACT-9038',
        title: 'Monthly Electric Utility Auto-Pay',
        merchant: 'BESCOM Power Corp',
        agent: 'FinanceAgent v6.1',
        time: 'Today, 06:30 AM',
        value: '₹2,340.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED',
        explanation: 'Within verified seasonal baseline variance.'
      },
      {
        id: 'ACT-9037',
        title: 'Autonomous Urban Commute (AV-4)',
        merchant: 'Uber Mobility',
        agent: 'MobilityAgent v3',
        time: 'Yesterday, 19:12',
        value: '₹450.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED',
        explanation: 'Standard commuter tariff compliant with Rule SEC-TRV-107.'
      }
    ],
    agents: [
      {
        name: 'Flipkart Shopping Agent',
        category: 'Commerce',
        status: 'Active · Audited',
        lastSync: '2m ago',
        isActive: true
      },
      {
        name: 'OpenAgent Travel v8.4',
        category: 'Travel',
        status: 'Active · Audited',
        lastSync: '4m ago',
        isActive: true
      },
      {
        name: 'FinanceBot Autonomous',
        category: 'Settlement',
        status: 'Active · Audited',
        lastSync: '18m ago',
        isActive: true
      }
    ]
  };

  // DOM Elements
  const navTabs = document.querySelectorAll('.m-nav-tab');
  const screenPanes = document.querySelectorAll('.screen-pane');
  const btnTopAvatar = document.getElementById('btnTopAvatar');
  const btnMReviewEvidence = document.getElementById('btnMReviewEvidence');
  const btnMProceedToDispute = document.getElementById('btnMProceedToDispute');
  const btnMReviewDismiss = document.getElementById('btnMReviewDismiss');
  const mPrimaryConflictCard = document.getElementById('mPrimaryConflictCard');
  const overviewOpenCases = document.getElementById('overviewOpenCases');
  const mOverviewActivityList = document.getElementById('mOverviewActivityList');
  const mRulesContainer = document.getElementById('mRulesContainer');
  const mAgentsList = document.getElementById('mAgentsList');
  const mActivityFilters = document.querySelectorAll('#mActivityFilters .m-pill');

  // Bottom Sheet
  const mSheetOverlay = document.getElementById('mSheetOverlay');
  const btnCloseSheet = document.getElementById('btnCloseSheet');
  const sheetActionId = document.getElementById('sheetActionId');
  const sheetActionTitle = document.getElementById('sheetActionTitle');
  const sheetBody = document.getElementById('sheetBody');

  // Add Rule Modal
  const btnMOpenAddRule = document.getElementById('btnMOpenAddRule');
  const mAddRuleOverlay = document.getElementById('mAddRuleOverlay');
  const btnCloseAddRule = document.getElementById('btnCloseAddRule');
  const btnMConfirmAddRule = document.getElementById('btnMConfirmAddRule');
  const inputMRuleText = document.getElementById('inputMRuleText');
  const selectMRuleDomain = document.getElementById('selectMRuleDomain');
  const selectMRuleSeverity = document.getElementById('selectMRuleSeverity');

  // Dispute & Kill Switch
  const btnMInitiateDispute = document.getElementById('btnMInitiateDispute');
  const mResolutionResult = document.getElementById('mResolutionResult');
  const btnMToggleEmergencyKill = document.getElementById('btnMToggleEmergencyKill');
  const mKillSwitchStatus = document.getElementById('mKillSwitchStatus');
  const btnMCopyKey = document.getElementById('btnMCopyKey');
  const btnMExportCert = document.getElementById('btnMExportCert');
  const btnMExportVault = document.getElementById('btnMExportVault');
  const btnMDownloadDossier = document.getElementById('btnMDownloadDossier');
  const mToastHub = document.getElementById('mToastHub');

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    renderActivityList();
    renderRules();
    renderAgents();
    renderSpentAnalysis();
    setupNavigation();
    setupExpandables();
    setupGlobalDetailTooltips();
    setupHandlers();
  }

  // ==========================================
  // NAVIGATION CONTROLLER
  // ==========================================
  function switchScreen(screenId) {
    navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-screen') === screenId);
    });

    screenPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === screenId);
    });

    const content = document.querySelector('.mobile-content');
    if (content) content.scrollTop = 0;
  }

  function setupNavigation() {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-screen');
        switchScreen(target);
      });
    });

    if (btnTopAvatar) {
      btnTopAvatar.addEventListener('click', () => {
        switchScreen('screen-security');
      });
    }

    if (btnMReviewEvidence) {
      btnMReviewEvidence.addEventListener('click', () => {
        switchScreen('screen-evidence');
      });
    }

    if (btnMProceedToDispute) {
      btnMProceedToDispute.addEventListener('click', () => {
        switchScreen('screen-disputes');
      });
    }

    if (btnMReviewDismiss) {
      btnMReviewDismiss.addEventListener('click', () => {
        if (mPrimaryConflictCard) {
          mPrimaryConflictCard.style.opacity = '0';
          mPrimaryConflictCard.style.transform = 'translateY(-8px)';
          mPrimaryConflictCard.style.transition = 'all 0.25s ease';
          setTimeout(() => {
            mPrimaryConflictCard.style.display = 'none';
          }, 250);
        }
        if (overviewOpenCases) {
          overviewOpenCases.textContent = '0';
          overviewOpenCases.classList.remove('text-critical');
        }
        showToast('Variance #ACT-9042 dismissed by principal.');
      });
    }
  }

  // ==========================================
  // RENDER: ACTIVITY FEED (OVERVIEW SCREEN)
  // ==========================================
  function renderActivityList() {
    if (!mOverviewActivityList) return;
    mOverviewActivityList.innerHTML = '';

    const filtered = state.streamRecords.filter(rec => {
      if (state.activeFilter === 'all') return true;
      if (state.activeFilter === 'mismatch') return rec.determination === 'breach';
      if (state.activeFilter === 'uncovered') return rec.determination === 'uncovered';
      if (state.activeFilter === 'verified') return rec.determination === 'verified';
      return true;
    });

    filtered.forEach(rec => {
      const isBreach = rec.determination === 'breach';
      const isVerified = rec.determination === 'verified';
      const tagText = isBreach ? 'CRITICAL CONFLICT' : (isVerified ? 'VERIFIED COMPLIANT' : 'UNCOVERED INTENT');
      const highlight = isBreach ? 'Variance: Scheduled arrival breaches limit' : (isVerified ? 'Audit verified against mandate' : 'No prior constraint defined');

      const item = document.createElement('div');
      item.className = 'm-activity-item';
      item.innerHTML = `
        <div class="act-item-left">
          <div class="act-item-title">${rec.title}</div>
          <div class="act-item-sub mono">${rec.merchant} · ${rec.time}</div>
        </div>
        <div class="act-item-right">
          <div class="act-item-amount">${rec.value}</div>
          <span class="status-pill-m status-${rec.determination} has-detail" data-detail-title="${rec.id} Audit Result" data-detail-tag="${tagText}" data-detail-highlight="${highlight}" data-detail-text="${rec.explanation} Source: ${rec.agent}." data-detail-meta="Tap item to open forensic receipt drawer">${rec.determinationLabel}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        openActionSheet(rec);
      });

      mOverviewActivityList.appendChild(item);
    });
  }

  // Filter Buttons
  mActivityFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      mActivityFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-filter');
      renderActivityList();
    });
  });

  // Action Bottom Sheet
  function openActionSheet(rec) {
    state.selectedAction = rec;
    if (sheetActionId) sheetActionId.textContent = `#${rec.id}`;
    if (sheetActionTitle) sheetActionTitle.textContent = rec.title;

    if (sheetBody) {
      sheetBody.innerHTML = `
        <div style="padding: 10px; background-color: var(--surface-subtle); border-radius: var(--radius-xs); border: 1px solid var(--rule-hairline); margin-bottom: 12px;">
          <div class="mono text-xs text-muted" style="font-size: 9.5px;">FORENSIC DETERMINATION</div>
          <div style="margin-top: 3px; font-size: 12px; color: var(--text-lead); font-weight: 500;">${rec.explanation}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 7px; font-size: 12px; margin-bottom: 14px;">
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Agent Actor:</span>
            <span class="mono font-600 text-lead">${rec.agent}</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Merchant API:</span>
            <span class="mono font-600 text-lead">${rec.merchant}</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Quantum:</span>
            <span class="mono font-700 text-lead">${rec.value} INR</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Timestamp:</span>
            <span class="mono text-xs text-muted">${rec.time}</span>
          </div>
        </div>

        ${rec.determination === 'breach' ? `
          <button class="btn btn-primary w-100" id="btnSheetInspectEvidence">
            Inspect Bilateral Evidence Dossier →
          </button>
        ` : ''}
      `;

      const btnSheetInspectEvidence = document.getElementById('btnSheetInspectEvidence');
      if (btnSheetInspectEvidence) {
        btnSheetInspectEvidence.addEventListener('click', () => {
          mSheetOverlay.classList.add('hidden');
          switchScreen('screen-evidence');
        });
      }
    }

    if (mSheetOverlay) mSheetOverlay.classList.remove('hidden');
  }

  if (btnCloseSheet) {
    btnCloseSheet.addEventListener('click', () => {
      mSheetOverlay.classList.add('hidden');
    });
  }

  if (mSheetOverlay) {
    mSheetOverlay.addEventListener('click', (e) => {
      if (e.target === mSheetOverlay) mSheetOverlay.classList.add('hidden');
    });
  }

  // ==========================================
  // RENDER: INSTRUCTION VAULT
  // ==========================================
  function highlightConstraint(text) {
    return text
      .replace(/after 18:00 IST \(6:00 PM\)/g, '<strong class="text-critical font-600">after 18:00 IST (6:00 PM)</strong>')
      .replace(/exceeding ₹15,000 INR/g, '<strong class="text-lead font-600">exceeding ₹15,000 INR</strong>')
      .replace(/under ₹2,000 INR/g, '<strong class="text-lead font-600">under ₹2,000 INR</strong>')
      .replace(/exceeding ₹1,000 INR\/month/g, '<strong class="text-lead font-600">exceeding ₹1,000 INR/month</strong>')
      .replace(/under 4 hours/g, '<strong class="text-lead font-600">under 4 hours</strong>')
      .replace(/under ₹800 INR/g, '<strong class="text-lead font-600">under ₹800 INR</strong>')
      .replace(/exceeding 1.5%/g, '<strong class="text-lead font-600">exceeding 1.5%</strong>')
      .replace(/between 01:00 IST and 06:00 IST/g, '<strong class="text-lead font-600">between 01:00 IST and 06:00 IST</strong>')
      .replace(/under ₹5,000 INR/g, '<strong class="text-lead font-600">under ₹5,000 INR</strong>')
      .replace(/under ₹500 INR/g, '<strong class="text-lead font-600">under ₹500 INR</strong>');
  }

  function renderRules() {
    if (!mRulesContainer) return;
    mRulesContainer.innerHTML = '';

    state.mandates.forEach(m => {
      const isHard = m.severity === 'Hard Limit';
      const item = document.createElement('div');
      item.className = 'm-card';
      item.style.marginBottom = '8px';
      item.innerHTML = `
        <div class="diff-m-item" style="margin-bottom: 5px;">
          <span class="mono font-600 text-xs text-mauve has-detail" data-detail-title="${m.code} Specification" data-detail-tag="${m.domain.toUpperCase()}" data-detail-highlight="Enforced in Vault ${m.version}" data-detail-text="${m.text}">${m.code}</span>
          <span class="status-pill-m ${isHard ? 'status-breach' : 'status-verified'} has-detail" data-detail-title="${m.severity} Enforcement" data-detail-tag="${isHard ? 'STRICT' : 'ADVISORY'}" data-detail-highlight="${isHard ? 'Mandatory Conflict Flag' : 'Discretionary Notice'}" data-detail-text="${isHard ? 'Violations of hard limits result in automatic statutory conflict flagging.' : 'Soft constraints permit 10% discretion.'}">${m.severity}</span>
        </div>
        <div style="font-size: 12px; line-height: 1.45; color: var(--text-lead);">${highlightConstraint(m.text)}</div>
        <div class="diff-m-item" style="margin-top: 6px; font-size: 10px; color: var(--text-muted);">
          <span class="mono">Domain: ${m.domain} · ${m.version}</span>
          <button class="btn-link mono text-xs btn-m-revoke" data-code="${m.code}" style="color: var(--text-muted); background: none; border: none; cursor: pointer; text-decoration: underline;">Revoke</button>
        </div>
      `;
      mRulesContainer.appendChild(item);
    });

    document.querySelectorAll('.btn-m-revoke').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.target.getAttribute('data-code');
        showToast(`Revocation of ${code} requires signing key attestation.`);
      });
    });
  }

  // Add Rule Modal Handlers
  if (btnMOpenAddRule) {
    btnMOpenAddRule.addEventListener('click', () => {
      if (inputMRuleText) inputMRuleText.value = '';
      if (mAddRuleOverlay) mAddRuleOverlay.classList.remove('hidden');
    });
  }

  if (btnCloseAddRule) {
    btnCloseAddRule.addEventListener('click', () => {
      if (mAddRuleOverlay) mAddRuleOverlay.classList.add('hidden');
    });
  }

  if (btnMConfirmAddRule) {
    btnMConfirmAddRule.addEventListener('click', () => {
      const text = inputMRuleText.value.trim();
      if (!text) {
        inputMRuleText.focus();
        return;
      }
      const domain = selectMRuleDomain.value;
      const severity = selectMRuleSeverity.value;
      const code = `SEC-${domain.substring(0, 3).toUpperCase()}-${100 + state.mandates.length + 1}`;

      state.mandates.unshift({
        code: code,
        domain: domain,
        text: text,
        severity: severity,
        version: 'V14.01'
      });
      state.activeVaultVersion = 'V14.01';

      renderRules();
      if (mAddRuleOverlay) mAddRuleOverlay.classList.add('hidden');
      showToast(`Mandate committed. Vault specification updated to V14.01.`);
    });
  }

  // ==========================================
  // RENDER: CONNECTED AGENTS
  // ==========================================
  function renderAgents() {
    if (!mAgentsList) return;
    mAgentsList.innerHTML = '';

    state.agents.forEach(ag => {
      const item = document.createElement('div');
      item.className = 'm-activity-item';
      item.innerHTML = `
        <div class="act-item-left">
          <div class="act-item-title">${ag.name}</div>
          <div class="act-item-sub mono">${ag.category} · Sync: ${ag.lastSync}</div>
        </div>
        <div class="act-item-right">
          <span class="status-pill-m ${ag.isActive ? 'status-verified' : 'status-breach'}">${ag.isActive ? 'Active' : 'Suspended'}</span>
        </div>
      `;
      mAgentsList.appendChild(item);
    });
  }

  // ==========================================
  // SPENT ANALYSIS IN PROFILE SCREEN
  // ==========================================
  function renderSpentAnalysis() {
    const donutSvg = document.getElementById('mSpendingDonutSvg');
    const legendList = document.getElementById('mDonutLegendList');
    const centerAmount = document.getElementById('mDonutCenterAmount');
    const centerSub = document.getElementById('mDonutCenterSub');
    const trendSvg = document.getElementById('mSpendingTrendSvg');
    const barsList = document.getElementById('mSpendingBarsList');

    const categoryMetadata = {
      'ACT-9042': { category: 'Travel & Flights', color: '#9384D1' },
      'ACT-9039': { category: 'Food & Sustenance', color: '#6B5B95' },
      'ACT-9038': { category: 'Utilities & Grid', color: '#A896B2' },
      'ACT-9041': { category: 'Hardware Peripherals', color: '#C9BBCF' },
      'ACT-9037': { category: 'Urban Mobility', color: '#D9CADA' }
    };

    const categoryTotals = {};
    let totalSpend = 0;

    state.streamRecords.forEach(rec => {
      const valNum = parseFloat(rec.value.replace(/[^0-9.]/g, '')) || 0;
      const catInfo = categoryMetadata[rec.id] || { category: rec.merchant, color: '#9384D1' };
      const catName = catInfo.category;

      if (!categoryTotals[catName]) {
        categoryTotals[catName] = { name: catName, color: catInfo.color, amount: 0 };
      }
      categoryTotals[catName].amount += valNum;
      totalSpend += valNum;
    });

    const categoriesArray = Object.values(categoryTotals).sort((a, b) => b.amount - a.amount);

    // 1. SVG Donut Ring
    if (donutSvg) {
      donutSvg.innerHTML = '';
      if (legendList) legendList.innerHTML = '';

      const C = 2 * Math.PI * 68; // ~427.256
      let accumulatedOffset = 0;

      categoriesArray.forEach(cat => {
        const pct = (cat.amount / totalSpend) * 100;
        const pctFormatted = pct.toFixed(1);
        const dash = (pct / 100) * C;
        const space = C - dash;
        const formattedAmount = `₹${cat.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '110');
        circle.setAttribute('cy', '110');
        circle.setAttribute('r', '68');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', cat.color);
        circle.setAttribute('stroke-width', '24');
        circle.setAttribute('stroke-dasharray', `${dash} ${space}`);
        circle.setAttribute('stroke-dashoffset', `${-accumulatedOffset}`);
        circle.setAttribute('style', 'transition: stroke-width 0.2s ease, opacity 0.2s ease; cursor: pointer;');
        accumulatedOffset += dash;

        function highlight() {
          if (centerAmount) centerAmount.textContent = `₹${Math.round(cat.amount).toLocaleString('en-IN')}`;
          if (centerSub) centerSub.textContent = `${cat.name} (${pctFormatted}%)`;
          donutSvg.querySelectorAll('circle').forEach(c => {
            c.style.opacity = c === circle ? '1' : '0.4';
            c.setAttribute('stroke-width', c === circle ? '28' : '24');
          });
          document.querySelectorAll('.donut-legend-row').forEach(r => {
            r.classList.toggle('highlighted', r.getAttribute('data-name') === cat.name);
          });
        }

        function reset() {
          if (centerAmount) centerAmount.textContent = `₹${Math.round(totalSpend).toLocaleString('en-IN')}`;
          if (centerSub) centerSub.textContent = '5 Domains';
          donutSvg.querySelectorAll('circle').forEach(c => {
            c.style.opacity = '1';
            c.setAttribute('stroke-width', '24');
          });
          document.querySelectorAll('.donut-legend-row').forEach(r => r.classList.remove('highlighted'));
        }

        circle.addEventListener('mouseenter', highlight);
        circle.addEventListener('mouseleave', reset);
        circle.addEventListener('click', highlight);
        donutSvg.appendChild(circle);

        if (legendList) {
          const row = document.createElement('div');
          row.className = 'donut-legend-row';
          row.setAttribute('data-name', cat.name);
          row.innerHTML = `
            <div>
              <span class="legend-dot" style="background-color: ${cat.color};"></span>
              <span class="text-lead font-500">${cat.name}</span>
            </div>
            <div class="mono text-xs">
              <strong class="text-lead">${pctFormatted}%</strong>
              <span class="text-muted" style="margin-left: 4px;">(${formattedAmount})</span>
            </div>
          `;
          row.addEventListener('mouseenter', highlight);
          row.addEventListener('mouseleave', reset);
          row.addEventListener('click', highlight);
          legendList.appendChild(row);
        }
      });
    }

    // 2. 24h Velocity Area Chart
    if (trendSvg) {
      trendSvg.innerHTML = `
        <defs>
          <linearGradient id="mTrendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9384D1" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#F3E8EB" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <line x1="20" y1="35" x2="420" y2="35" stroke="var(--rule-hairline)" stroke-dasharray="3 3" />
        <line x1="20" y1="85" x2="420" y2="85" stroke="var(--rule-hairline)" stroke-dasharray="3 3" />
        <path d="M 40,120 L 40,95 L 125,72 L 210,104 L 295,28 L 380,118 L 380,120 Z" fill="url(#mTrendGradient)" />
        <path d="M 40,95 L 125,72 L 210,104 L 295,28 L 380,118" fill="none" stroke="var(--mauve-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle class="trend-point" cx="40" cy="95" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="BESCOM Utilities · ₹2,340.00" />
        <circle class="trend-point" cx="125" cy="72" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="BigBasket Groceries · ₹4,210.00" />
        <circle class="trend-point" cx="210" cy="104" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="Croma Hardware · ₹1,500.00" />
        <circle class="trend-point" cx="295" cy="28" r="6" fill="#C53030" stroke="#FFFFFF" stroke-width="2.5" data-tip="IndiGo Flight 6E-2412 · ₹7,850.00 (BREACH)" />
        <circle class="trend-point" cx="380" cy="118" r="4.5" fill="#6B5B95" stroke="#FFFFFF" stroke-width="2" data-tip="Uber Mobility · ₹450.00" />
      `;

      trendSvg.querySelectorAll('.trend-point').forEach(pt => {
        pt.addEventListener('click', () => {
          showToast(pt.getAttribute('data-tip'));
        });
      });
    }

    // 3. Category Progress Bars
    if (barsList) {
      barsList.innerHTML = '';
      categoriesArray.forEach(cat => {
        const pct = (cat.amount / totalSpend) * 100;
        const pctFormatted = pct.toFixed(1);
        const formattedAmount = `₹${cat.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

        const row = document.createElement('div');
        row.className = 'spending-bar-row has-detail';
        row.setAttribute('data-detail-title', cat.name);
        row.setAttribute('data-detail-tag', `${pctFormatted}% SHARE`);
        row.setAttribute('data-detail-highlight', `${formattedAmount} INR`);
        row.setAttribute('data-detail-text', `Audited category outflow accounting for ${pctFormatted}% of total portfolio spend.`);

        row.innerHTML = `
          <div class="spending-bar-header">
            <span class="font-600 text-lead">${cat.name}</span>
            <span class="mono font-600 text-lead">${formattedAmount} (${pctFormatted}%)</span>
          </div>
          <div class="spending-bar-track">
            <div class="spending-bar-fill" style="width: ${pctFormatted}%; background-color: ${cat.color};"></div>
          </div>
        `;
        barsList.appendChild(row);
      });
    }
  }

  // ==========================================
  // ARBITRATION SUBMISSION FLOW
  // ==========================================
  if (btnMInitiateDispute) {
    btnMInitiateDispute.addEventListener('click', () => {
      if (state.arbitrationState === 'SETTLED') {
        showToast('Arbitration dispute already settled.');
        return;
      }

      btnMInitiateDispute.disabled = true;
      btnMInitiateDispute.textContent = 'Transmitting notice to carrier...';

      const step2Meta = document.getElementById('mStep2Meta');
      const step2Dot = document.getElementById('mStep2Dot');
      const step3Meta = document.getElementById('mStep3Meta');
      const step3Dot = document.getElementById('mStep3Dot');

      setTimeout(() => {
        if (step2Meta) step2Meta.textContent = 'Transmitted 10:04 IST';
        if (step2Dot) step2Dot.style.backgroundColor = 'var(--moss-verified)';
        if (step3Meta) step3Meta.textContent = 'Validating Signatures';
        showToast('Formal dispute notice delivered to InterGlobe Aviation API.');
      }, 1200);

      setTimeout(() => {
        if (step3Meta) step3Meta.textContent = 'Handshake Complete · Refund Approved';
        if (step3Dot) step3Dot.style.backgroundColor = 'var(--moss-verified)';
        if (mResolutionResult) mResolutionResult.classList.remove('hidden');
        btnMInitiateDispute.textContent = 'Restitution Confirmed (₹7,850.00 Refunded)';
        state.arbitrationState = 'SETTLED';
        showToast('Restitution confirmed: Full refund of ₹7,850.00 INR credited.');
      }, 2600);
    });
  }

  // ==========================================
  // EXPANDABLE NARRATIVE ACCORDION
  // ==========================================
  function setupExpandables() {
    document.querySelectorAll('.expandable-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const parent = hdr.closest('.expandable-narrative');
        if (parent) parent.classList.toggle('open');
      });
    });
  }

  // ==========================================
  // GLOBAL DETAIL INSPECTOR (TOOLTIP ENGINE)
  // ==========================================
  function setupGlobalDetailTooltips() {
    const tooltip = document.getElementById('mGlobalDetailTooltip');
    if (!tooltip) return;

    const ttTitle = document.getElementById('mttTitle');
    const ttTag = document.getElementById('mttTag');
    const ttHighlight = document.getElementById('mttHighlight');
    const ttBody = document.getElementById('mttBody');
    const ttMeta = document.getElementById('mttMeta');

    let activeTarget = null;

    function showTooltip(target) {
      if (!target) return;
      activeTarget = target;

      const title = target.getAttribute('data-detail-title') || 'Forensic Detail';
      const tag = target.getAttribute('data-detail-tag') || 'VERIFIED';
      const highlight = target.getAttribute('data-detail-highlight') || '';
      const text = target.getAttribute('data-detail-text') || '';
      const meta = target.getAttribute('data-detail-meta') || 'REF: ENCLAVE-ROOT // LOCAL';

      if (!text && !highlight && !title) return;

      if (ttTitle) ttTitle.textContent = title;
      if (ttTag) {
        ttTag.textContent = tag;
        if (tag.includes('CONFLICT') || tag.includes('CRITICAL') || tag.includes('BREACH')) {
          ttTag.style.backgroundColor = 'rgba(197, 48, 48, 0.35)';
          ttTag.style.color = '#FFA8A8';
        } else if (tag.includes('UNCOVERED') || tag.includes('ADVISORY')) {
          ttTag.style.backgroundColor = 'rgba(217, 119, 6, 0.35)';
          ttTag.style.color = '#FDE68A';
        } else {
          ttTag.style.backgroundColor = 'rgba(147, 132, 209, 0.3)';
          ttTag.style.color = '#E9D5DA';
        }
      }

      if (ttHighlight) {
        ttHighlight.textContent = highlight;
        ttHighlight.style.display = highlight ? 'block' : 'none';
      }

      if (ttBody) ttBody.textContent = text;
      if (ttMeta) {
        ttMeta.textContent = meta;
        ttMeta.style.display = meta ? 'block' : 'none';
      }

      tooltip.classList.remove('hidden');

      const rect = target.getBoundingClientRect();
      const ttRect = tooltip.getBoundingClientRect();
      const deviceRect = document.querySelector('.mobile-device')?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };

      let left = rect.left + (rect.width / 2) - (ttRect.width / 2);
      left = Math.max(deviceRect.left + 12, Math.min(deviceRect.left + deviceRect.width - ttRect.width - 12, left));

      let top = rect.top - ttRect.height - 8;
      if (top < deviceRect.top + 40) {
        top = rect.bottom + 8;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    function hideTooltip() {
      tooltip.classList.add('hidden');
      activeTarget = null;
    }

    // Delegated hover / tap events
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target) showTooltip(target);
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target && target === activeTarget) {
        if (!target.contains(e.relatedTarget)) hideTooltip();
      }
    });

    // Touch / tap toggle
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target) {
        if (activeTarget === target) {
          hideTooltip();
        } else {
          showTooltip(target);
        }
      } else {
        hideTooltip();
      }
    });
  }

  // ==========================================
  // PROFILE HANDLERS & EMERGENCY CONTROLS
  // ==========================================
  function setupHandlers() {
    if (btnMCopyKey) {
      btnMCopyKey.addEventListener('click', () => {
        const key = state.principal.keyFingerprint;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(key).then(() => {
            showToast(`Key ${key} copied to clipboard.`);
          });
        } else {
          showToast(`Key ${key} copied.`);
        }
      });
    }

    if (btnMToggleEmergencyKill) {
      btnMToggleEmergencyKill.addEventListener('click', () => {
        state.isSuspended = !state.isSuspended;
        if (state.isSuspended) {
          mKillSwitchStatus.textContent = 'STATUS: SUSPENDED // ALL 3 TOKENS REVOKED';
          mKillSwitchStatus.style.color = 'var(--vermillion-breach)';
          btnMToggleEmergencyKill.textContent = 'Resume Autonomous Authority';
          state.agents.forEach(a => a.isActive = false);
          renderAgents();
          showToast('EMERGENCY SUSPENSION ACTIVATED: All agent tokens revoked.');
        } else {
          mKillSwitchStatus.textContent = 'STATUS: NORMAL // AGENT MONITORING ACTIVE';
          mKillSwitchStatus.style.color = 'var(--moss-verified)';
          btnMToggleEmergencyKill.textContent = 'Trigger Emergency Delegation Suspension';
          state.agents.forEach(a => a.isActive = true);
          renderAgents();
          showToast('DELEGATION RESTORED: Continuous intent auditing active.');
        }
      });
    }

    if (btnMExportCert) {
      btnMExportCert.addEventListener('click', () => {
        const cert = {
          standard: "ADRP-PRINCIPAL-ATTESTATION-2040",
          principal: state.principal,
          vault: state.activeVaultVersion,
          mandates_count: state.mandates.length
        };
        downloadJson('principal-identity.json', cert);
        showToast('Identity Certificate exported (.json).');
      });
    }

    if (btnMExportVault) {
      btnMExportVault.addEventListener('click', () => {
        downloadJson('instruction-vault-v13.json', state.mandates);
        showToast('Instruction Vault exported (.json).');
      });
    }

    if (btnMDownloadDossier) {
      btnMDownloadDossier.addEventListener('click', () => {
        const dossier = {
          dossier_reference: "DSP-2040-8812",
          mandate_code: "SEC-TRV-102",
          carrier_receipt: "ACT-9042",
          variance: "+180 min breach",
          temporal_precedence_confirmed: true
        };
        downloadJson('Dossier-DSP-2040-8812.json', dossier);
        showToast('Forensic Dossier exported (.json).');
      });
    }
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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
    if (!mToastHub) return;
    const toast = document.createElement('div');
    toast.className = 'm-toast mono text-xs';
    toast.innerHTML = `<span style="color: var(--moss-verified);">§</span> <span>${message}</span>`;
    mToastHub.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // Run
  init();
});
