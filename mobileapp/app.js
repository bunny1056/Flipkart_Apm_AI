/**
 * AGENT RECOURSE — MOBILE APP ENGINE (2040)
 * Pure Vanilla JavaScript implementation with touch-friendly interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const state = {
    user: {
      name: 'Harshith',
      id: 'USR-DEMO-2040',
      keyFingerprint: '8f9a-2b3c-1a92'
    },
    currentVaultVersion: 'V13',
    disputeStatus: 'Evidence compiled',
    activeFilter: 'all',
    selectedAction: null,
    selectedAgent: null,
    retentionDays: '60',
    agents: [
      {
        id: 'AGT-FLIPKART',
        name: 'Flipkart Shopping Agent',
        category: 'Shopping',
        status: 'Active · Demo',
        isActive: true,
        lastSync: '4m ago',
        protocol: 'Simulated API'
      },
      {
        id: 'AGT-TRAVELAI',
        name: 'TravelAI Executor',
        category: 'Travel',
        status: 'Active · Demo',
        isActive: true,
        lastSync: '12m ago',
        protocol: 'Simulated API'
      },
      {
        id: 'AGT-FINBOT',
        name: 'FinanceBot Autonomous',
        category: 'Finance',
        status: 'Active · Demo',
        isActive: true,
        lastSync: '32m ago',
        protocol: 'Simulated API'
      }
    ],
    rules: [
      { id: 'R-102', domain: 'Travel', text: 'Never book domestic flights landing after 6:00 PM.', version: 'V13' },
      { id: 'R-101', domain: 'Finance', text: 'Require explicit approval for any transfer exceeding ₹15,000.', version: 'V10' },
      { id: 'R-103', domain: 'Dining', text: 'Keep routine dining expenses under ₹2,000.', version: 'V11' },
      { id: 'R-104', domain: 'Subscriptions', text: 'Decline auto-renewing subscriptions over ₹1,000/mo.', version: 'V10' },
      { id: 'R-105', domain: 'Hardware', text: 'Verify replacement specs before buying electronic peripherals.', version: 'V10' },
      { id: 'R-106', domain: 'Travel', text: 'Prioritize direct nonstop flights over multi-layover routes.', version: 'V10' },
      { id: 'R-107', domain: 'Travel', text: 'Aisle seat preference on flights over 2 hours.', version: 'V10' },
      { id: 'R-108', domain: 'Finance', text: 'Block international transaction debits without 2FA prompt.', version: 'V10' },
      { id: 'R-109', domain: 'Dining', text: 'Restrict food delivery ordering between 1:00 AM and 6:00 AM.', version: 'V10' },
      { id: 'R-110', domain: 'Hardware', text: 'Cap autonomous office supply reorders under ₹5,000 per cycle.', version: 'V10' },
      { id: 'R-111', domain: 'Subscriptions', text: 'Auto-cancel unused cloud storage tiers after 45 days idle.', version: 'V10' },
      { id: 'R-112', domain: 'Travel', text: 'Cap urban autonomous ride fares under ₹800.', version: 'V10' },
      { id: 'R-113', domain: 'Finance', text: 'Sweep excess checking balance above ₹1,00,000 into overnight fund.', version: 'V10' },
      { id: 'R-114', domain: 'Hardware', text: 'Restrict all autonomous extended warranties exceeding ₹500.', version: 'V13' }
    ],
    activities: [
      {
        id: 'ACT-9042',
        title: 'Flight 6E-2412 (BLR ➔ DEL)',
        merchant: 'IndiGo Airlines',
        agent: 'OpenAgent Travel v8.4',
        time: 'Today, 10:02 AM',
        amount: '₹7,850.00',
        status: 'mismatch',
        statusLabel: 'Mismatch',
        explanation: 'Arrival at 9:00 PM violates Rule R-102 (< 6:00 PM).'
      },
      {
        id: 'ACT-9041',
        title: '2-Year Device Warranty',
        merchant: 'Croma Electronics',
        agent: 'RetailAgent v4.2',
        time: 'Today, 09:41 AM',
        amount: '₹1,500.00',
        status: 'uncovered',
        statusLabel: 'Uncovered',
        explanation: 'No rule in Vault V13 matches device warranties.'
      },
      {
        id: 'ACT-9039',
        title: 'Organic Grocery Basket',
        merchant: 'BigBasket Hyperlocal',
        agent: 'HouseholdAgent v2.1',
        time: 'Today, 08:15 AM',
        amount: '₹4,210.00',
        status: 'verified',
        statusLabel: 'Verified',
        explanation: 'Within weekly household allowance.'
      },
      {
        id: 'ACT-9038',
        title: 'Electric Utility Auto-Pay',
        merchant: 'BESCOM Power Corp',
        agent: 'FinanceAgent v6.1',
        time: 'Today, 06:30 AM',
        amount: '₹2,340.00',
        status: 'verified',
        statusLabel: 'Verified',
        explanation: 'Within expected monthly variance range.'
      },
      {
        id: 'ACT-9037',
        title: 'Office Commute (AV-4)',
        merchant: 'Uber Autonomous',
        agent: 'MobilityAgent v3',
        time: 'Yesterday, 19:12',
        amount: '₹450.00',
        status: 'verified',
        statusLabel: 'Verified',
        explanation: 'Routine commute fare verified.'
      }
    ]
  };

  // ==========================================
  // DOM REFERENCES
  // ==========================================
  const navTabs = document.querySelectorAll('.m-nav-tab');
  const screenPanes = document.querySelectorAll('.screen-pane');
  const btnTopAvatar = document.getElementById('btnTopAvatar');

  // Overview elements
  const mOverviewActivityList = document.getElementById('mOverviewActivityList');
  const btnMReviewEvidence = document.getElementById('btnMReviewEvidence');
  const btnMReviewDismiss = document.getElementById('btnMReviewDismiss');
  const mPrimaryConflictCard = document.getElementById('mPrimaryConflictCard');
  const btnMSeeAllActivity = document.getElementById('btnMSeeAllActivity');
  const overviewOpenCases = document.getElementById('overviewOpenCases');
  const overviewRulesCount = document.getElementById('overviewRulesCount');

  // Instructions elements
  const mRulesContainer = document.getElementById('mRulesContainer');
  const btnMOpenAddRule = document.getElementById('btnMOpenAddRule');

  // Activity elements
  const mFullActivityList = document.getElementById('mFullActivityList');
  const filterPills = document.querySelectorAll('#mActivityFilters .m-pill');

  // Evidence elements
  const btnMDownloadDossier = document.getElementById('btnMDownloadDossier');
  const btnMProceedToDispute = document.getElementById('btnMProceedToDispute');

  // Disputes elements
  const btnMInitiateDispute = document.getElementById('btnMInitiateDispute');
  const mResolutionResult = document.getElementById('mResolutionResult');
  const mStep2 = document.getElementById('mStep2');
  const mStep2Circle = document.getElementById('mStep2Circle');
  const mLine2 = document.getElementById('mLine2');
  const mStep3 = document.getElementById('mStep3');
  const mStep3Circle = document.getElementById('mStep3Circle');
  const mLine3 = document.getElementById('mLine3');
  const mStep4 = document.getElementById('mStep4');
  const mStep4Circle = document.getElementById('mStep4Circle');

  // Security elements
  const btnMCopyKey = document.getElementById('btnMCopyKey');
  const mAgentsList = document.getElementById('mAgentsList');
  const btnMAddAgentModal = document.getElementById('btnMAddAgentModal');
  const btnMExportVault = document.getElementById('btnMExportVault');
  const btnMExportAllData = document.getElementById('btnMExportAllData');
  const btnMPurgeData = document.getElementById('btnMPurgeData');
  const mRetentionBtns = document.querySelectorAll('#mRetentionGroup .retention-btn');

  // Bottom Sheet
  const mSheetOverlay = document.getElementById('mSheetOverlay');
  const btnCloseSheet = document.getElementById('btnCloseSheet');
  const sheetActionId = document.getElementById('sheetActionId');
  const sheetActionTitle = document.getElementById('sheetActionTitle');
  const sheetBody = document.getElementById('sheetBody');

  // Toast
  const mToastHub = document.getElementById('mToastHub');

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    renderOverviewActivities();
    renderRules();
    renderActivityFeed();
    renderAgents();
    setupNavigation();
  }

  // ==========================================
  // NAVIGATION
  // ==========================================
  function switchScreen(screenId) {
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-screen') === screenId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    screenPanes.forEach(pane => {
      if (pane.id === screenId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    document.querySelector('.mobile-content').scrollTop = 0;
  }

  function setupNavigation() {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const screenId = tab.getAttribute('data-screen');
        switchScreen(screenId);
      });
    });

    btnTopAvatar.addEventListener('click', () => {
      switchScreen('screen-security');
    });

    btnMReviewEvidence.addEventListener('click', () => {
      switchScreen('screen-evidence');
    });

    btnMSeeAllActivity.addEventListener('click', () => {
      switchScreen('screen-activity');
    });

    btnMProceedToDispute.addEventListener('click', () => {
      switchScreen('screen-disputes');
    });

    btnMReviewDismiss.addEventListener('click', () => {
      mPrimaryConflictCard.style.opacity = '0.4';
      mPrimaryConflictCard.style.pointerEvents = 'none';
      overviewOpenCases.textContent = '0';
      overviewOpenCases.classList.remove('text-critical');
      showToast('Conflict card dismissed');
    });
  }

  // ==========================================
  // RENDER: OVERVIEW ACTIVITIES
  // ==========================================
  function renderOverviewActivities() {
    mOverviewActivityList.innerHTML = '';
    state.activities.slice(0, 3).forEach(act => {
      const card = createActivityCard(act);
      mOverviewActivityList.appendChild(card);
    });
  }

  // ==========================================
  // RENDER: ACTIVITY FEED & FILTERS
  // ==========================================
  function renderActivityFeed() {
    mFullActivityList.innerHTML = '';
    const filtered = state.activities.filter(act => {
      if (state.activeFilter === 'all') return true;
      if (state.activeFilter === 'mismatch') return act.status === 'mismatch';
      if (state.activeFilter === 'uncovered') return act.status === 'uncovered';
      if (state.activeFilter === 'verified') return act.status === 'verified';
      return true;
    });

    filtered.forEach(act => {
      const card = createActivityCard(act);
      mFullActivityList.appendChild(card);
    });
  }

  function createActivityCard(act) {
    const el = document.createElement('div');
    el.className = 'm-activity-card';
    el.innerHTML = `
      <div class="m-act-left">
        <span class="m-act-title">${act.title}</span>
        <span class="m-act-sub">${act.merchant} · ${act.time}</span>
      </div>
      <div class="m-act-right">
        <span class="m-act-amount mono">${act.amount}</span>
        <span class="status-badge status-${act.status}">${act.statusLabel}</span>
      </div>
    `;
    el.addEventListener('click', () => {
      openActionSheet(act);
    });
    return el;
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-filter');
      renderActivityFeed();
    });
  });

  // ==========================================
  // BOTTOM SHEET ACTION INSPECTOR
  // ==========================================
  function openActionSheet(act) {
    state.selectedAction = act;
    sheetActionId.textContent = act.id;
    sheetActionTitle.textContent = act.title;

    let bodyHtml = '';
    if (act.status === 'mismatch') {
      bodyHtml = `
        <div style="background-color: var(--critical-bg); border: 1px solid var(--critical-border); padding: 10px; border-radius: 6px;">
          <div style="font-weight: 500; color: var(--critical);">Constraint conflict detected</div>
          <div style="font-size: 12px; color: var(--text-primary); margin-top: 2px;">${act.explanation}</div>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Merchant</span>
          <span class="spec-v">${act.merchant}</span>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Executing Agent</span>
          <span class="spec-v">${act.agent}</span>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Amount</span>
          <span class="spec-v mono">${act.amount}</span>
        </div>
        <button class="btn btn-primary w-100" id="btnSheetInspectEvidence" style="margin-top: 10px;">
          Inspect evidence dossier →
        </button>
      `;
    } else if (act.status === 'uncovered') {
      bodyHtml = `
        <div style="background-color: var(--caution-bg); border: 1px solid var(--caution-border); padding: 10px; border-radius: 6px;">
          <div style="font-weight: 500; color: var(--caution);">Uncovered Intent</div>
          <div style="font-size: 12px; color: var(--text-primary); margin-top: 2px;">${act.explanation}</div>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Merchant</span>
          <span class="spec-v">${act.merchant}</span>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Amount</span>
          <span class="spec-v mono">${act.amount}</span>
        </div>
        <div style="background-color: var(--canvas); padding: 10px; border-radius: 6px; margin-top: 6px;">
          <span class="text-xs font-500">Record a preference?</span>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            <button class="btn btn-secondary btn-sm" id="btnSheetLimitWarranty">Restrict warranties > ₹500</button>
            <button class="btn btn-secondary btn-sm" id="btnSheetBlockWarranty">Never auto-buy warranties</button>
          </div>
        </div>
      `;
    } else {
      bodyHtml = `
        <div style="background-color: var(--verified-bg); border: 1px solid var(--verified-border); padding: 10px; border-radius: 6px;">
          <div style="font-weight: 500; color: var(--verified);">Verified Compliant</div>
          <div style="font-size: 12px; color: var(--text-primary); margin-top: 2px;">${act.explanation}</div>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Merchant</span>
          <span class="spec-v">${act.merchant}</span>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Executing Agent</span>
          <span class="spec-v">${act.agent}</span>
        </div>
        <div class="m-spec-row">
          <span class="spec-k">Timestamp</span>
          <span class="spec-v mono text-xs">${act.time}</span>
        </div>
      `;
    }

    sheetBody.innerHTML = bodyHtml;
    mSheetOverlay.classList.remove('hidden');

    const btnSheetInspectEvidence = document.getElementById('btnSheetInspectEvidence');
    if (btnSheetInspectEvidence) {
      btnSheetInspectEvidence.addEventListener('click', () => {
        mSheetOverlay.classList.add('hidden');
        switchScreen('screen-evidence');
      });
    }

    const btnSheetLimitWarranty = document.getElementById('btnSheetLimitWarranty');
    if (btnSheetLimitWarranty) {
      btnSheetLimitWarranty.addEventListener('click', () => {
        addRule('Hardware', 'Restrict all autonomous extended warranties exceeding ₹500.');
        mSheetOverlay.classList.add('hidden');
        showToast('Rule added to Vault V14.');
      });
    }

    const btnSheetBlockWarranty = document.getElementById('btnSheetBlockWarranty');
    if (btnSheetBlockWarranty) {
      btnSheetBlockWarranty.addEventListener('click', () => {
        addRule('Hardware', 'Never auto-buy extended warranties or device insurance.');
        mSheetOverlay.classList.add('hidden');
        showToast('Rule added. Warranties blocked.');
      });
    }
  }

  btnCloseSheet.addEventListener('click', () => {
    mSheetOverlay.classList.add('hidden');
  });

  mSheetOverlay.addEventListener('click', (e) => {
    if (e.target === mSheetOverlay) mSheetOverlay.classList.add('hidden');
  });

  // ==========================================
  // RENDER: INSTRUCTIONS VAULT
  // ==========================================
  function renderRules() {
    mRulesContainer.innerHTML = '';
    state.rules.forEach(r => {
      const row = document.createElement('div');
      row.className = 'm-rule-row';
      row.innerHTML = `
        <div class="m-rule-text">${r.text}</div>
        <div class="m-rule-meta">
          <span>${r.domain} · ${r.version}</span>
          <span class="mono">${r.id}</span>
        </div>
      `;
      mRulesContainer.appendChild(row);
    });

    overviewRulesCount.textContent = state.rules.length;
  }

  btnMOpenAddRule.addEventListener('click', () => {
    const input = prompt('Enter new constraint for your AI agents:');
    if (input && input.trim().length > 4) {
      addRule('Custom', input.trim());
      showToast('New constraint recorded into Vault!');
    }
  });

  function addRule(domain, text) {
    const id = `R-${100 + state.rules.length + 1}`;
    state.rules.unshift({
      id: id,
      domain: domain,
      text: text,
      version: 'V14'
    });
    renderRules();
  }

  // ==========================================
  // RENDER: CONNECTED AGENTS
  // ==========================================
  function renderAgents() {
    mAgentsList.innerHTML = '';
    state.agents.forEach(agent => {
      const item = document.createElement('div');
      item.className = 'm-agent-item';
      item.innerHTML = `
        <div>
          <div class="m-agent-name">${agent.name}</div>
          <div class="m-agent-sub">${agent.category} · ${agent.lastSync}</div>
        </div>
        <button class="btn btn-secondary btn-sm btn-agent-manage" data-id="${agent.id}">
          ${agent.isActive ? 'Manage' : 'Offline'}
        </button>
      `;
      mAgentsList.appendChild(item);
    });

    document.querySelectorAll('.btn-agent-manage').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const ag = state.agents.find(a => a.id === id);
        if (ag) openAgentSheet(ag);
      });
    });
  }

  function openAgentSheet(agent) {
    sheetActionId.textContent = agent.id;
    sheetActionTitle.textContent = agent.name;
    sheetBody.innerHTML = `
      <div class="m-spec-row">
        <span class="spec-k">Status</span>
        <span class="spec-v"><span class="status-badge ${agent.isActive ? 'status-verified' : 'status-disconnected'}">${agent.status}</span></span>
      </div>
      <div class="m-spec-row">
        <span class="spec-k">Protocol</span>
        <span class="spec-v mono text-xs">${agent.protocol}</span>
      </div>
      <div class="m-spec-row">
        <span class="spec-k">Last sync</span>
        <span class="spec-v mono text-xs">${agent.lastSync}</span>
      </div>
      <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
        <button class="btn btn-secondary w-100" id="btnToggleAgentStatus">
          ${agent.isActive ? 'Revoke access' : 'Reconnect agent'}
        </button>
      </div>
    `;
    mSheetOverlay.classList.remove('hidden');

    document.getElementById('btnToggleAgentStatus').addEventListener('click', () => {
      agent.isActive = !agent.isActive;
      agent.status = agent.isActive ? 'Active · Demo' : 'Disconnected';
      renderAgents();
      mSheetOverlay.classList.add('hidden');
      showToast(agent.isActive ? `Reconnected ${agent.name}` : `Revoked access for ${agent.name}`);
    });
  }

  btnMAddAgentModal.addEventListener('click', () => {
    const name = prompt('Connect agent name (e.g. ConciergeBot):');
    if (name && name.trim()) {
      state.agents.push({
        id: `AGT-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        category: 'Assistant',
        status: 'Active · Demo',
        isActive: true,
        lastSync: 'Just now',
        protocol: 'Simulated API'
      });
      renderAgents();
      showToast(`Connected ${name} (Simulated)`);
    }
  });

  // ==========================================
  // EVIDENCE & DOSSIER DOWNLOAD
  // ==========================================
  btnMDownloadDossier.addEventListener('click', () => {
    const payload = {
      standard: "ADRP-2040-MOBILE",
      case_id: "DSP-2040-8812",
      claimant: state.user,
      action: "Flight 6E-2412",
      binding_hash: "0x9c4e71df88310ba0429fec819034aa1095cb7",
      verdict: "VIOLATION_CONFIRMED"
    };
    downloadJson('evidence-dossier-mobile.json', payload);
    showToast('Evidence dossier JSON downloaded');
  });

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

  // ==========================================
  // DISPUTES 1-TAP RESOLUTION
  // ==========================================
  btnMInitiateDispute.addEventListener('click', () => {
    if (state.disputeStatus === 'Submitted · Demo only') {
      showToast('Dispute already submitted');
      return;
    }

    btnMInitiateDispute.disabled = true;
    btnMInitiateDispute.textContent = 'Transmitting...';

    setTimeout(() => {
      state.disputeStatus = 'Submitted · Demo only';
      mStep2.classList.add('done');
      mLine2.classList.add('done');
      mStep3.classList.add('done');
      mLine3.classList.add('done');
      mStep4.classList.add('done', 'current');
      mStep4Circle.textContent = '✓';

      mResolutionResult.classList.remove('hidden');
      btnMInitiateDispute.textContent = 'Submitted (Demo)';
      overviewOpenCases.textContent = '0';
      overviewOpenCases.classList.remove('text-critical');

      showToast('Dispute approved! Full refund of ₹7,850.00 credited.');
    }, 1200);
  });

  // ==========================================
  // SECURITY & PRIVACY CONTROLS
  // ==========================================
  btnMCopyKey.addEventListener('click', () => {
    navigator.clipboard.writeText(state.user.keyFingerprint).then(() => {
      showToast('Key copied to clipboard');
    });
  });

  mRetentionBtns.forEach(b => {
    b.addEventListener('click', () => {
      mRetentionBtns.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      state.retentionDays = b.getAttribute('data-days');
      showToast(`Retention set to ${state.retentionDays}d`);
    });
  });

  btnMExportVault.addEventListener('click', () => {
    downloadJson('vault-v13-rules.json', { vault: 'V13', rules: state.rules });
    showToast('Vault rules exported as JSON');
  });

  btnMExportAllData.addEventListener('click', () => {
    downloadJson('agent-recourse-mobile-export.json', { user: state.user, rules: state.rules, agents: state.agents });
    showToast('All data exported as JSON');
  });

  btnMPurgeData.addEventListener('click', () => {
    if (confirm('Clear local demo caches? This does not delete external airline records.')) {
      state.activities = [];
      renderActivityFeed();
      renderOverviewActivities();
      mPrimaryConflictCard.style.display = 'none';
      overviewOpenCases.textContent = '0';
      showToast('Local demo cache cleared.');
    }
  });

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'm-toast';
    t.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    mToastHub.appendChild(t);

    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(6px)';
      t.style.transition = 'all 0.15s ease';
      setTimeout(() => t.remove(), 160);
    }, 2800);
  }

  init();
});
