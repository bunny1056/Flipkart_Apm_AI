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
    arbitrationState: 'PACKAGED', // 'PACKAGED' | 'TRANSMITTED' | 'UNDER_REVIEW'
    mandateFilterDomain: 'all',
    mandateFilterSearch: '',
    mandateFilterHardOnly: false,
    expandedVaultCategories: new Set(),
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
        determinationLabel: 'CONFLICT',
        explanation: 'Flight lands at 9:00 PM, which is 3 hours past your 6:00 PM arrival cutoff rule.'
      },
      {
        id: 'ACT-9041',
        title: '2-Year Hardware Warranty Add-On',
        merchant: 'Croma Electronics',
        agent: 'Shopping Assistant',
        time: 'Today, 09:41 AM',
        value: '₹1,500.00',
        determination: 'uncovered',
        determinationLabel: 'UNCOVERED',
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
        determinationLabel: 'VERIFIED',
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
        determinationLabel: 'VERIFIED',
        explanation: 'Standard utility bill, within normal range.'
      },
      {
        id: 'ACT-9037',
        title: 'City Ride (Uber)',
        merchant: 'Uber',
        agent: 'Ride Assistant',
        time: 'Yesterday, 07:12 PM',
        value: '₹450.00',
        determination: 'verified',
        determinationLabel: 'VERIFIED',
        explanation: 'Standard commuter ride compliant with travel budget.'
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
  const mActivityFilters = document.querySelectorAll('#mActivityFilters button');

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
  const mMandatesSearchInput = document.getElementById('mMandatesSearchInput');
  const mMandatesSearchClear = document.getElementById('mMandatesSearchClear');
  const mDomainFilterPills = document.getElementById('mDomainFilterPills');
  const btnMSeverityToggle = document.getElementById('btnMSeverityToggle');
  const mHardLimitsBadge = document.getElementById('mHardLimitsBadge');
  const mVaultSpecBadge = document.getElementById('mVaultSpecBadge');
  const mVaultRulesCount = document.getElementById('mVaultRulesCount');
  const mRevokeRuleOverlay = document.getElementById('mRevokeRuleOverlay');
  const mRevokeRuleCode = document.getElementById('mRevokeRuleCode');
  const mRevokeRuleText = document.getElementById('mRevokeRuleText');
  const btnCloseMRevoke = document.getElementById('btnCloseMRevoke');
  const btnMCancelRevoke = document.getElementById('btnMCancelRevoke');
  const btnMConfirmRevoke = document.getElementById('btnMConfirmRevoke');

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
    renderMDomainFilters();
    renderRules();
    renderAgents();
    renderSpentAnalysis();
    setupNavigation();
    setupExpandables();
    setupGlobalDetailTooltips();
    setupHandlers();
    renderSelectedMobileClaim('claim-1');
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

    const mConflictBarToggle = document.getElementById('mConflictBarToggle');
    if (mConflictBarToggle && mPrimaryConflictCard) {
      mConflictBarToggle.addEventListener('click', () => {
        mPrimaryConflictCard.classList.toggle('expanded');
      });
    }

    if (btnMReviewEvidence) {
      btnMReviewEvidence.addEventListener('click', (e) => {
        e.stopPropagation();
        switchScreen('screen-evidence');
      });
    }

    if (btnMProceedToDispute) {
      btnMProceedToDispute.addEventListener('click', () => {
        switchScreen('screen-disputes');
      });
    }

    if (btnMReviewDismiss) {
      btnMReviewDismiss.addEventListener('click', (e) => {
        e.stopPropagation();
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

    if (filtered.length === 0) {
      mOverviewActivityList.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-faint); font-family: var(--font-mono); font-size: 11px;">
          NO AUDITED ACTIONS MATCHING CRITERIA
        </div>
      `;
      return;
    }

    filtered.forEach(rec => {
      const isBreach = rec.determination === 'breach';
      const isUncovered = rec.determination === 'uncovered';
      const isVerified = rec.determination === 'verified';

      const dotClass = isBreach ? 'dot-breach' : (isUncovered ? 'dot-uncovered' : 'dot-verified');
      const tagText = isBreach ? 'CRITICAL CONFLICT' : (isVerified ? 'VERIFIED COMPLIANT' : 'UNCOVERED INTENT');
      const highlight = isBreach ? 'Variance: Scheduled arrival breaches limit' : (isVerified ? 'Audit verified against mandate' : 'No prior constraint defined');

      const item = document.createElement('div');
      item.className = 'm-activity-item';
      item.innerHTML = `
        <div class="m-act-left-wrap">
          <span class="m-act-dot ${dotClass}" title="${tagText}"></span>
          <div class="m-act-details">
            <div class="m-act-title">${rec.title}</div>
            <div class="m-act-sub">${rec.merchant} · ${rec.time}</div>
          </div>
        </div>
        <div class="m-act-right-wrap">
          <span class="m-act-amt">${rec.value}</span>
          <button class="m-quick-btn btn-m-trace" data-id="${rec.id}">Trace</button>
        </div>
      `;

      const btnTrace = item.querySelector('.btn-m-trace');
      if (btnTrace) {
        btnTrace.addEventListener('click', (e) => {
          e.stopPropagation();
          openActionSheet(rec);
        });
      }

      item.addEventListener('click', () => {
        openActionSheet(rec);
      });

      mOverviewActivityList.appendChild(item);
    });
  }

  // Filter Buttons
  mActivityFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      mActivityFilters.forEach(p => {
        p.classList.remove('active');
        if (p.hasAttribute('aria-selected')) p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      if (pill.hasAttribute('aria-selected')) pill.setAttribute('aria-selected', 'true');
      state.activeFilter = pill.getAttribute('data-filter');
      renderActivityList();
    });
  });

  // Action Bottom Sheet
  function openActionSheet(rec) {
    state.selectedAction = rec;
    if (sheetActionId) sheetActionId.textContent = rec.determination === 'breach' ? '⚠️ Conflict Detected' : 'Audit Details';
    if (sheetActionTitle) sheetActionTitle.textContent = rec.title;

    if (sheetBody) {
      sheetBody.innerHTML = `
        <div style="padding: 10px; background-color: var(--surface-subtle); border-radius: var(--radius-xs); border: 1px solid var(--rule-hairline); margin-bottom: 12px;">
          <div class="text-xs text-muted" style="font-size: 10.5px; font-weight: 600;">WHAT HAPPENED</div>
          <div style="margin-top: 3px; font-size: 12.5px; color: var(--text-lead); font-weight: 500;">${rec.explanation}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 7px; font-size: 12px; margin-bottom: 14px;">
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Booked by:</span>
            <span class="font-600 text-lead">${rec.agent}</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Merchant:</span>
            <span class="font-600 text-lead">${rec.merchant}</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Amount:</span>
            <span class="font-700 text-lead">${rec.value}</span>
          </div>
          <div class="diff-m-item" style="border-bottom: 1px solid var(--rule-hairline); padding-bottom: 4px;">
            <span class="diff-m-k">Time:</span>
            <span class="text-xs text-muted">${rec.time}</span>
          </div>
        </div>

        ${rec.determination === 'breach' ? `
          <button class="btn btn-primary w-100" id="btnSheetInspectEvidence">
            Inspect Evidence & Timeline →
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

  const mCategoryMeta = {
    'Travel': { icon: '✈️', description: 'Flight arrivals, cab fares & flight seat preferences' },
    'Dining': { icon: '🍽️', description: 'Food delivery hours & routine sustenance budgets' },
    'Finance': { icon: '💳', description: 'Interactive 2FA transfer limits & FX fee caps' },
    'Subscriptions': { icon: '🔄', description: 'Recurring subscriptions & cloud instance rules' },
    'Hardware': { icon: '💻', description: 'Office supplies, peripherals & hardware warranties' }
  };
  const mDefaultCategoryMeta = { icon: '🛡️', description: 'Operational rules & policy boundaries' };

  function renderMDomainFilters() {
    if (!mDomainFilterPills) return;
    mDomainFilterPills.innerHTML = '';
    const domains = ['all', 'Travel', 'Dining', 'Finance', 'Subscriptions', 'Hardware'];

    domains.forEach(d => {
      const count = d === 'all'
        ? state.mandates.length
        : state.mandates.filter(m => m.domain.toLowerCase() === d.toLowerCase()).length;

      const btn = document.createElement('button');
      btn.className = `m-domain-tab ${state.mandateFilterDomain.toLowerCase() === d.toLowerCase() ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.innerHTML = `
        <span>${d === 'all' ? 'All' : d}</span>
        <span class="m-domain-tab-badge mono">${count}</span>
      `;

      btn.addEventListener('click', () => {
        state.mandateFilterDomain = d;
        if (d !== 'all') {
          const matchCat = [...new Set(state.mandates.map(m => m.domain))].find(c => c.toLowerCase() === d.toLowerCase()) || d;
          state.expandedVaultCategories.add(matchCat);
        }
        renderMDomainFilters();
        renderRules();
      });

      mDomainFilterPills.appendChild(btn);
    });

    const hardCount = state.mandates.filter(m => m.severity === 'Hard Limit').length;
    if (mHardLimitsBadge) mHardLimitsBadge.textContent = hardCount;
  }

  function renderRules() {
    if (!mRulesContainer) return;
    mRulesContainer.innerHTML = '';

    const q = (state.mandateFilterSearch || '').toLowerCase().trim();

    const canonicalOrder = ['Travel', 'Dining', 'Finance', 'Subscriptions', 'Hardware'];
    const presentDomains = [...new Set(state.mandates.map(m => m.domain))];
    const orderedCategories = [
      ...canonicalOrder.filter(c => presentDomains.some(d => d.toLowerCase() === c.toLowerCase())),
      ...presentDomains.filter(d => !canonicalOrder.some(c => c.toLowerCase() === d.toLowerCase()))
    ];

    let categoriesRendered = 0;

    orderedCategories.forEach(categoryName => {
      if (state.mandateFilterDomain !== 'all' && categoryName.toLowerCase() !== state.mandateFilterDomain.toLowerCase()) {
        return;
      }

      const categoryRules = state.mandates.filter(m => m.domain.toLowerCase() === categoryName.toLowerCase());
      const matchingRules = categoryRules.filter(m => {
        if (state.mandateFilterHardOnly && m.severity !== 'Hard Limit') {
          return false;
        }
        if (q) {
          const matchCode = m.code.toLowerCase().includes(q);
          const matchText = m.text.toLowerCase().includes(q);
          const matchDomain = m.domain.toLowerCase().includes(q);
          if (!matchCode && !matchText && !matchDomain) return false;
        }
        return true;
      });

      if ((q || state.mandateFilterHardOnly) && matchingRules.length === 0) {
        return;
      }

      categoriesRendered++;

      const isExpanded = q.length > 0
        ? matchingRules.length > 0
        : state.expandedVaultCategories.has(categoryName);

      const meta = mCategoryMeta[categoryName] || mDefaultCategoryMeta;
      const hardCount = matchingRules.filter(m => m.severity === 'Hard Limit').length;

      const card = document.createElement('div');
      card.className = `m-cat-card ${isExpanded ? 'expanded' : ''}`;
      card.setAttribute('data-category', categoryName);

      card.innerHTML = `
        <button class="m-cat-header" type="button" aria-expanded="${isExpanded}">
          <div class="m-cat-header-left">
            <div class="m-cat-icon">
              ${meta.icon}
            </div>
            <div class="m-cat-title-wrap">
              <div class="m-cat-title-row">
                <span class="m-cat-title">${categoryName}</span>
                <span class="m-cat-count">${matchingRules.length}</span>
              </div>
            </div>
          </div>
          <div class="m-cat-header-right">
            <svg class="m-cat-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>
        <div class="m-cat-body"></div>
      `;

      const headerBtn = card.querySelector('.m-cat-header');
      headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.expandedVaultCategories.has(categoryName)) {
          state.expandedVaultCategories.delete(categoryName);
        } else {
          state.expandedVaultCategories.add(categoryName);
        }
        renderRules();
      });

      const body = card.querySelector('.m-cat-body');
      matchingRules.forEach(m => {
        const isHard = m.severity === 'Hard Limit';
        const ruleItem = document.createElement('div');
        ruleItem.className = 'm-card';
        ruleItem.style.marginBottom = '4px';
        ruleItem.style.background = '#FFFFFF';
        ruleItem.innerHTML = `
          <div class="diff-m-item" style="margin-bottom: 6px; align-items: center;">
            <span class="code-badge-m" style="font-size: 10px;">${m.code}</span>
            <span class="status-pill-m ${isHard ? 'pill-hard' : 'pill-soft'}">${m.severity}</span>
          </div>
          <div style="font-size: 12px; line-height: 1.45; color: var(--text-lead);">
            <span class="mandate-sentence">${highlightConstraint(m.text)}</span>
          </div>
          <div class="diff-m-item" style="margin-top: 8px; font-size: 11px; color: var(--text-muted); align-items: center;">
            <span>Active & Enforced</span>
            <button class="btn-ghost-revoke-m btn-m-revoke" data-code="${m.code}">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Revoke</span>
            </button>
          </div>
        `;

        const btnRevoke = ruleItem.querySelector('.btn-m-revoke');
        if (btnRevoke) {
          btnRevoke.addEventListener('click', (e) => {
            e.stopPropagation();
            openMRevokeSheet(m);
          });
        }
        body.appendChild(ruleItem);
      });

      mRulesContainer.appendChild(card);
    });

    if (categoriesRendered === 0) {
      mRulesContainer.innerHTML = `
        <div style="text-align: center; padding: 32px 14px; color: var(--text-faint); font-family: var(--font-mono); font-size: 11px;">
          <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-lead);">NO RULES MATCH CRITERIA</div>
          <div style="color: var(--text-muted); font-size: 10px;">Adjust search, clear domain, or toggle off Hard Limits.</div>
        </div>
      `;
    }

    if (mVaultRulesCount) mVaultRulesCount.textContent = `${state.mandates.length} RULES`;
    if (mVaultSpecBadge) mVaultSpecBadge.textContent = state.activeVaultVersion;
    const overviewRulesCount = document.getElementById('overviewRulesCount');
    if (overviewRulesCount) overviewRulesCount.textContent = state.mandates.length;
  }

  // Mobile Search & Filter Listeners
  if (mMandatesSearchInput) {
    mMandatesSearchInput.addEventListener('input', (e) => {
      state.mandateFilterSearch = e.target.value;
      if (mMandatesSearchClear) {
        if (e.target.value) mMandatesSearchClear.classList.remove('hidden');
        else mMandatesSearchClear.classList.add('hidden');
      }
      renderRules();
    });
  }

  if (mMandatesSearchClear) {
    mMandatesSearchClear.addEventListener('click', () => {
      if (mMandatesSearchInput) {
        mMandatesSearchInput.value = '';
        state.mandateFilterSearch = '';
        mMandatesSearchClear.classList.add('hidden');
        renderRules();
        mMandatesSearchInput.focus();
      }
    });
  }

  if (btnMSeverityToggle) {
    btnMSeverityToggle.addEventListener('click', () => {
      state.mandateFilterHardOnly = !state.mandateFilterHardOnly;
      btnMSeverityToggle.classList.toggle('active', state.mandateFilterHardOnly);
      btnMSeverityToggle.setAttribute('aria-checked', state.mandateFilterHardOnly ? 'true' : 'false');
      renderRules();
    });
  }

  // Mobile Revocation Bottom Sheet Handlers
  function openMRevokeSheet(mandate) {
    state.pendingRevokeMandate = mandate;
    if (mRevokeRuleCode) mRevokeRuleCode.textContent = mandate.code;
    if (mRevokeRuleText) mRevokeRuleText.textContent = `"${mandate.text}"`;
    if (mRevokeRuleOverlay) mRevokeRuleOverlay.classList.remove('hidden');
  }

  function closeMRevokeSheet() {
    state.pendingRevokeMandate = null;
    if (mRevokeRuleOverlay) mRevokeRuleOverlay.classList.add('hidden');
  }

  if (btnCloseMRevoke) btnCloseMRevoke.addEventListener('click', closeMRevokeSheet);
  if (btnMCancelRevoke) btnMCancelRevoke.addEventListener('click', closeMRevokeSheet);
  if (btnMConfirmRevoke) {
    btnMConfirmRevoke.addEventListener('click', () => {
      if (!state.pendingRevokeMandate) return;
      const code = state.pendingRevokeMandate.code;
      state.mandates = state.mandates.filter(m => m.code !== code);
      state.activeVaultVersion = 'V14.01';
      closeMRevokeSheet();
      renderMDomainFilters();
      renderRules();
      showToast(`Mandate ${code} revoked. Re-sealed under V14.01.`);
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

      renderMDomainFilters();
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
          <div class="act-item-sub">${ag.category}</div>
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
  // CLAIMS & ARBITRATION INTERACTIVE CONTROLLER (MOBILE)
  // ==========================================
  const mClaimsData = [
    {
      id: 'claim-1',
      merchant: 'IndiGo Airlines',
      title: 'Flight 6E-2412 (BLR ➔ DEL)',
      conflict: 'Arrives 9:00 PM (Rule: < 6:00 PM)',
      amount: '₹7,850.00',
      ruleStatus: 'Active Before Booking',
      currentStep: 2,
      steps: [
        { num: '1', title: '1. Conflict Detected', meta: '10:02 AM · Rule Breach' },
        { num: '2', title: '2. Evidence Sealed', meta: '10:03 AM · Ready' },
        { num: '3', title: '3. Merchant Review', meta: 'Pending Action' },
        { num: '4', title: '4. Resolution / Refund', meta: 'Pending Review' }
      ],
      statement: `On October 21 at 10:02 AM, your Travel Assistant booked IndiGo flight 6E-2412 from Bengaluru to New Delhi arriving at 9:00 PM. Prior to this booking, an active rule was set at 10:00 AM requiring all domestic flights to arrive before 6:00 PM.<br><br>Because the assistant booked a ticket arriving 3 hours after your specified cutoff time, this dispute package has been generated to submit to IndiGo for review and reimbursement.`,
      canSubmit: true,
      buttonText: '⚡ Submit Dispute Claim to IndiGo'
    },
    {
      id: 'claim-2',
      merchant: 'Croma Electronics',
      title: 'Smart Display Warranty Add-on',
      conflict: 'Unauthorized Warranty Attached (No User Intent)',
      amount: '₹1,299.00',
      ruleStatus: 'Protected · Refund Complete',
      currentStep: 4,
      steps: [
        { num: '1', title: '1. Conflict Detected', meta: 'Oct 19, 09:41 AM · Rule Breach' },
        { num: '2', title: '2. Evidence Transmitted', meta: 'Oct 19, 10:15 AM · Delivered' },
        { num: '3', title: '3. Merchant Review', meta: 'Oct 19, 14:30 PM · Approved' },
        { num: '4', title: '4. Resolution / Refund', meta: 'Oct 20, 11:00 AM · ₹1,299.00 Credited' }
      ],
      statement: `On October 19 at 09:41 AM, an unauthorized 2-year warranty add-on was charged by Croma. As per consumer protection protocol, merchant acknowledged erroneous inclusion and returned ₹1,299.00 to original payment method on October 20.`,
      canSubmit: false,
      buttonText: '✓ Claim Resolved & Refunded (₹1,299.00 Credited)'
    },
    {
      id: 'claim-3',
      merchant: 'Uber Premier',
      title: 'Airport Transit Surge Peak',
      conflict: 'Surge fare ₹1,450 exceeded ₹800 spending limit',
      amount: '₹650.00',
      ruleStatus: 'Active Before Booking',
      currentStep: 3,
      steps: [
        { num: '1', title: '1. Conflict Detected', meta: 'Oct 20, 07:12 PM · Rule Breach' },
        { num: '2', title: '2. Evidence Transmitted', meta: 'Oct 20, 07:45 PM · Delivered' },
        { num: '3', title: '3. Merchant Review', meta: 'In Progress · Est. 24h' },
        { num: '4', title: '4. Resolution / Refund', meta: 'Awaiting Decision' }
      ],
      statement: `On October 20 at 07:12 PM, Uber ride was booked with dynamic surge pricing amounting to ₹1,450.00, breaching the maximum allowed cap of ₹800.00. Dossier was submitted to Uber Partner Support seeking refund of ₹650.00 difference.`,
      canSubmit: false,
      buttonText: '⏳ Claim Under Review by Uber Partner Support'
    }
  ];

  let selectedMobileClaimId = 'claim-1';

  function renderSelectedMobileClaim(claimId) {
    selectedMobileClaimId = claimId;
    const claim = mClaimsData.find(c => c.id === claimId) || mClaimsData[0];

    // Highlight active list item
    document.querySelectorAll('#mClaimsNavList .m-claim-list-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-claim-id') === claimId);
    });

    // Update Overview Grid
    const mClaimMerchant = document.getElementById('mClaimMerchant');
    const mClaimConflict = document.getElementById('mClaimConflict');
    const mClaimAmount = document.getElementById('mClaimAmount');
    const mClaimRuleStatus = document.getElementById('mClaimRuleStatus');
    if (mClaimMerchant) mClaimMerchant.textContent = claim.merchant;
    if (mClaimConflict) mClaimConflict.textContent = claim.conflict;
    if (mClaimAmount) mClaimAmount.textContent = claim.amount;
    if (mClaimRuleStatus) mClaimRuleStatus.textContent = claim.ruleStatus;

    // Update Statement text
    const mClaimStatement = document.getElementById('mClaimStatement');
    if (mClaimStatement) mClaimStatement.innerHTML = claim.statement;

    // Update 4-step stepper
    renderMobileStepper(claim);

    // Update Action Button
    if (btnMInitiateDispute) {
      if (claim.id === 'claim-1' && state.arbitrationState === 'UNDER_REVIEW') {
        btnMInitiateDispute.textContent = 'Dispute Transmitted 🟢 (Under Review ⏳)';
        btnMInitiateDispute.disabled = true;
      } else {
        btnMInitiateDispute.textContent = claim.buttonText;
        btnMInitiateDispute.disabled = !claim.canSubmit;
      }
    }

    if (mResolutionResult) {
      if (claim.id === 'claim-1' && state.arbitrationState === 'UNDER_REVIEW') {
        mResolutionResult.classList.remove('hidden');
      } else {
        mResolutionResult.classList.add('hidden');
      }
    }
  }

  function renderMobileStepper(claim) {
    const rows = [
      { row: document.getElementById('mStep1Row'), dot: document.getElementById('mStep1Dot'), text: document.getElementById('mStep1Text'), lbl: document.getElementById('mStep1Lbl') },
      { row: document.getElementById('mStep2Row'), dot: document.getElementById('mStep2Dot'), text: document.getElementById('mStep2Meta'), lbl: document.getElementById('mStep2Lbl') },
      { row: document.getElementById('mStep3Row'), dot: document.getElementById('mStep3Dot'), text: document.getElementById('mStep3Meta'), lbl: document.getElementById('mStep3Lbl') },
      { row: document.getElementById('mStep4Row'), dot: document.getElementById('mStep4Dot'), text: document.getElementById('mStep4Meta'), lbl: document.getElementById('mStep4Lbl') }
    ];

    rows.forEach((step, idx) => {
      if (!step.row) return;
      const stepNum = idx + 1;
      const stepInfo = claim.steps[idx];

      if (step.text && stepInfo) step.text.textContent = stepInfo.meta;
      if (step.lbl && stepInfo) step.lbl.textContent = stepInfo.title;

      step.row.className = 'm-timeline-point';
      if (step.dot) {
        step.dot.className = 'm-tl-dot';
        step.dot.style.backgroundColor = '';
      }

      if (stepNum < claim.currentStep) {
        step.row.classList.add('point-done');
        if (step.dot) step.dot.classList.add('dot-done');
      } else if (stepNum === claim.currentStep) {
        if (claim.currentStep === 4) {
          step.row.classList.add('point-done');
          if (step.dot) step.dot.classList.add('dot-done');
        } else {
          step.row.classList.add('point-current');
          if (step.dot) step.dot.classList.add('dot-current');
        }
      }
    });
  }

  // Bind click on mobile claims list items
  document.querySelectorAll('#mClaimsNavList .m-claim-list-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-claim-id');
      renderSelectedMobileClaim(id);
    });
  });

  // Mobile Dispute Submission
  if (btnMInitiateDispute) {
    btnMInitiateDispute.addEventListener('click', () => {
      const claim = mClaimsData.find(c => c.id === selectedMobileClaimId);
      if (!claim || !claim.canSubmit) return;

      if (state.arbitrationState === 'UNDER_REVIEW' || state.arbitrationState === 'TRANSMITTED') {
        showToast('Dispute dossier already submitted and under vendor review.');
        return;
      }

      btnMInitiateDispute.disabled = true;
      btnMInitiateDispute.textContent = 'Transmitting dossier to IndiGo...';

      setTimeout(() => {
        claim.currentStep = 3;
        claim.steps[1].meta = 'Transmitted 10:04 IST';
        claim.steps[2].meta = 'Vendor Decision Pending (Est. 24-48h)';
        renderMobileStepper(claim);

        const badgeItem1 = document.querySelector('#mClaimsNavList [data-claim-id="claim-1"] .claim-item-status');
        if (badgeItem1) {
          badgeItem1.textContent = 'Step 3 of 4 · In Review';
          badgeItem1.className = 'claim-item-status status-step-3';
        }

        if (mResolutionResult) mResolutionResult.classList.remove('hidden');
        btnMInitiateDispute.textContent = 'Dispute Transmitted 🟢 (Under Vendor Review ⏳)';
        state.arbitrationState = 'UNDER_REVIEW';
        showToast('Dispute transmitted: Evidence Dossier received (#DSP-8910). Under Vendor Review.');

        // Trigger Mobile Preference Evolution Modal
        setTimeout(() => {
          const mPrefModal = document.getElementById('mPreferenceEvolutionModal');
          if (mPrefModal) {
            mPrefModal.classList.remove('hidden');
          }
        }, 700);
      }, 1200);
    });
  }

  // Mobile Preference Evolution Modal Handlers
  const mPrefModal = document.getElementById('mPreferenceEvolutionModal');
  const btnMClosePrefEvolModal = document.getElementById('btnMClosePrefEvolModal');
  const btnMDismissPrefEvol = document.getElementById('btnMDismissPrefEvol');
  const btnMConfirmLockPermanent = document.getElementById('btnMConfirmLockPermanent');

  if (btnMClosePrefEvolModal && mPrefModal) {
    btnMClosePrefEvolModal.addEventListener('click', () => {
      mPrefModal.classList.add('hidden');
    });
  }

  if (btnMDismissPrefEvol && mPrefModal) {
    btnMDismissPrefEvol.addEventListener('click', () => {
      mPrefModal.classList.add('hidden');
      showToast('Preference evolution deferred.');
    });
  }

  if (btnMConfirmLockPermanent && mPrefModal) {
    btnMConfirmLockPermanent.addEventListener('click', () => {
      mPrefModal.classList.add('hidden');
      state.activeVaultVersion = 'V14.00';
      const mVaultSpecBadge = document.getElementById('mVaultSpecBadge');
      if (mVaultSpecBadge) mVaultSpecBadge.textContent = 'V14.00';
      showToast("Mandate SEC-TRV-102 ('Arrive before 6 PM') permanently locked in Vault (Spec V14.00).");
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
      const meta = target.getAttribute('data-detail-meta') || 'Click to copy full trace // REF: ENCLAVE-ROOT';

      if (!text && !highlight && !title) return;

      if (ttTitle) ttTitle.textContent = title;
      if (ttTag) {
        ttTag.textContent = tag;
        if (tag.includes('CONFLICT') || tag.includes('CRITICAL') || tag.includes('BREACH')) {
          ttTag.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
          ttTag.style.color = '#FCA5A5';
        } else if (tag.includes('UNCOVERED') || tag.includes('ADVISORY')) {
          ttTag.style.backgroundColor = 'rgba(217, 119, 6, 0.2)';
          ttTag.style.color = '#FCD34D';
        } else {
          ttTag.style.backgroundColor = '#27272A';
          ttTag.style.color = '#D4D4D8';
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

    // Touch / tap toggle & copy trace
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-detail-text], [data-detail-title], .has-detail, .hash-pill');
      if (target) {
        if (target.closest('.mandate-info-icon-m, .code-badge-m')) {
          const title = target.getAttribute('data-detail-title') || 'Mandate';
          const text = target.getAttribute('data-detail-text') || '';
          const meta = target.getAttribute('data-detail-meta') || '';
          navigator.clipboard.writeText(`${title}: ${text} [${meta}]`).then(() => {
            showToast('Mandate constraint trace copied to clipboard.');
          }).catch(() => { });
        }
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
    // Hub-and-Spoke progressive disclosure controller
    const hubDrawerOverlay = document.getElementById('mHubDrawerOverlay');
    const hubDrawerTitle = document.getElementById('mHubDrawerTitle');
    const hubDrawerCategory = document.getElementById('mHubDrawerCategory');
    const btnCloseHubDrawer = document.getElementById('btnCloseHubDrawer');

    function openHubDrawer(subviewId, title, category) {
      if (hubDrawerTitle) hubDrawerTitle.textContent = title;
      if (hubDrawerCategory) hubDrawerCategory.textContent = category;

      document.querySelectorAll('.hub-subview').forEach(view => {
        view.classList.add('hidden');
      });

      const target = document.getElementById(subviewId);
      if (target) target.classList.remove('hidden');

      if (hubDrawerOverlay) hubDrawerOverlay.classList.remove('hidden');

      if (subviewId === 'hubSubSpending') {
        setTimeout(() => {
          renderSpentAnalysis();
        }, 50);
      }
    }

    function closeHubDrawer() {
      if (hubDrawerOverlay) hubDrawerOverlay.classList.add('hidden');
    }

    if (btnCloseHubDrawer) {
      btnCloseHubDrawer.addEventListener('click', closeHubDrawer);
    }

    if (hubDrawerOverlay) {
      hubDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === hubDrawerOverlay) closeHubDrawer();
      });
    }

    // Top Bar Back & Help
    const btnHubBack = document.getElementById('btnHubBack');
    if (btnHubBack) {
      btnHubBack.addEventListener('click', () => {
        switchScreen('screen-overview');
      });
    }

    const btnHubHelp = document.getElementById('btnHubHelp');
    if (btnHubHelp) {
      btnHubHelp.addEventListener('click', () => {
        switchScreen('screen-guide');
      });
    }

    // User Summary & Active Enclave Card
    const btnHubManageUser = document.getElementById('btnHubManageUser');
    if (btnHubManageUser) {
      btnHubManageUser.addEventListener('click', () => {
        openHubDrawer('hubSubCredentials', 'Hardware Enclave Identity', 'CRYPTOGRAPHIC CREDENTIALS');
      });
    }

    const btnHubEnclaveCard = document.getElementById('btnHubEnclaveCard');
    if (btnHubEnclaveCard) {
      btnHubEnclaveCard.addEventListener('click', () => {
        openHubDrawer('hubSubCredentials', 'Active TPM-2040 Enclave', 'CRYPTOGRAPHIC ATTESTATION');
      });
    }

    // Alert Banner Inspect Pill
    const btnHubAlertInspect = document.getElementById('btnHubAlertInspect');
    if (btnHubAlertInspect) {
      btnHubAlertInspect.addEventListener('click', () => {
        switchScreen('screen-overview');
        showToast('Viewing live continuous agent audit stream.');
      });
    }

    // Horizontal "Suggested for You" Tiles
    const tileDossierExport = document.getElementById('tileDossierExport');
    if (tileDossierExport) {
      tileDossierExport.addEventListener('click', () => {
        openHubDrawer('hubSubCredentials', 'Cryptographic Dossier Export', 'SIGNED ATTESTATION RECORD');
      });
    }

    const tileBearerKeys = document.getElementById('tileBearerKeys');
    if (tileBearerKeys) {
      tileBearerKeys.addEventListener('click', () => {
        openHubDrawer('hubSubAgents', 'Connected Agent Bearers', 'ACTIVE OAUTH BEARERS');
      });
    }

    const tileBiometric = document.getElementById('tileBiometric');
    if (tileBiometric) {
      tileBiometric.addEventListener('click', () => {
        openHubDrawer('hubSubPasskeys', 'Biometric Passkeys & FIDO2', 'WEBAUTHN ENCLAVE');
      });
    }

    const tileArbitration = document.getElementById('tileArbitration');
    if (tileArbitration) {
      tileArbitration.addEventListener('click', () => {
        openHubDrawer('hubSubArbitration', 'Statutory Arbitration Portal', 'ADRP-2040 SECTION 4');
      });
    }

    // Vertical Hub-and-Spoke List Items
    document.querySelectorAll('[data-hub-target]').forEach(row => {
      row.addEventListener('click', () => {
        const target = row.getAttribute('data-hub-target');
        switch (target) {
          case 'mandates':
            switchScreen('screen-instructions');
            showToast('Routing to Instruction Mandates Vault...');
            break;
          case 'spending':
            openHubDrawer('hubSubSpending', 'Audited Spent Analytics', 'EXECUTIVE PORTFOLIO OVERSIGHT');
            break;
          case 'ceilings':
            openHubDrawer('hubSubCeilings', 'Expenditure Ceilings', 'HARD LIMITS ENFORCEMENT');
            break;
          case 'agents':
            openHubDrawer('hubSubAgents', 'Connected Agent Bearers', 'OAUTH TOKEN DIRECTORY');
            break;
          case 'killswitch':
            openHubDrawer('hubSubKillSwitch', 'Emergency Delegation Suspension', 'ZERO-LATENCY REVOCATION');
            break;
          case 'hardware':
            openHubDrawer('hubSubHardware', 'TPM-2040 Hardware Specs', 'LOCAL CRYPTOGRAPHIC ROOT');
            break;
          case 'passkeys':
            openHubDrawer('hubSubPasskeys', 'Biometric Passkeys & Enclave', 'FIDO2 WEBAUTHN ATTESTATION');
            break;
          case 'arbitration':
            openHubDrawer('hubSubArbitration', 'Statutory Arbitration Portal', 'ADRP-2040 DISPUTE DOSSIER');
            break;
        }
      });
    });

    // Sticky Footer Banner
    const btnStickyPasskeyTip = document.getElementById('btnStickyPasskeyTip');
    if (btnStickyPasskeyTip) {
      btnStickyPasskeyTip.addEventListener('click', () => {
        openHubDrawer('hubSubPasskeys', 'Biometric Passkeys & Enclave', 'FIDO2 WEBAUTHN ATTESTATION');
      });
    }

    // Passkey registration button demo
    const btnMRegisterPasskey = document.getElementById('btnMRegisterPasskey');
    if (btnMRegisterPasskey) {
      btnMRegisterPasskey.addEventListener('click', () => {
        btnMRegisterPasskey.textContent = 'Enrolling TPM-2040 Passkey...';
        btnMRegisterPasskey.disabled = true;
        setTimeout(() => {
          btnMRegisterPasskey.textContent = 'Biometric Passkey Enrolled ✓';
          btnMRegisterPasskey.style.backgroundColor = 'var(--moss-verified)';
          showToast('Passkey enrolled: Touch ID / Windows Hello bound to TPM-2040.');
        }, 1200);
      });
    }

    // Go to dispute view button
    const btnMGoToDisputeView = document.getElementById('btnMGoToDisputeView');
    if (btnMGoToDisputeView) {
      btnMGoToDisputeView.addEventListener('click', () => {
        closeHubDrawer();
        switchScreen('screen-disputes');
      });
    }

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
