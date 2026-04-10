import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FileCode, Clock, GitBranch, GitCommit, Search, ChevronRight, Play, CheckCircle2, XCircle, Terminal, ArrowRight, FileText, Package } from 'lucide-react';

// ── Repo Tree ───────────────────────────────────────────────────────────────

type TreeNode = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  scriptId?: string;
};

const REPO_TREE: TreeNode[] = [
  {
    id: 'src', name: 'src', type: 'folder', children: [
      {
        id: 'src-components', name: 'components', type: 'folder', children: [
          { id: 'PaymentGateway', name: 'PaymentGateway.ts', type: 'file' },
          { id: 'AuthService', name: 'AuthService.ts', type: 'file' },
          { id: 'PortfolioWidget', name: 'PortfolioWidget.ts', type: 'file' },
        ]
      },
      {
        id: 'src-services', name: 'services', type: 'folder', children: [
          { id: 'ledger', name: 'ledger.service.ts', type: 'file' },
          { id: 'notification', name: 'notification.service.ts', type: 'file' },
          { id: 'apiGateway', name: 'api-gateway.service.ts', type: 'file' },
        ]
      },
      {
        id: 'src-utils', name: 'utils', type: 'folder', children: [
          { id: 'validators', name: 'validators.ts', type: 'file' },
          { id: 'formatters', name: 'formatters.ts', type: 'file' },
        ]
      },
    ]
  },
  {
    id: 'tests', name: 'tests', type: 'folder', children: [
      {
        id: 'e2e', name: 'e2e', type: 'folder', children: [
          { id: 'payment_flow.spec.ts', name: 'payment_flow.spec.ts', type: 'file', scriptId: 'payment_flow.spec.ts' },
          { id: 'auth_gate.spec.ts', name: 'auth_gate.spec.ts', type: 'file', scriptId: 'auth_gate.spec.ts' },
          { id: 'portfolio_view.spec.ts', name: 'portfolio_view.spec.ts', type: 'file', scriptId: 'portfolio_view.spec.ts' },
        ]
      },
      {
        id: 'integration', name: 'integration', type: 'folder', children: [
          { id: 'wire_transfer.spec.ts', name: 'wire_transfer.spec.ts', type: 'file', scriptId: 'wire_transfer.spec.ts' },
          { id: 'api_rate_limit.spec.ts', name: 'api_rate_limit.spec.ts', type: 'file', scriptId: 'api_rate_limit.spec.ts' },
        ]
      },
      {
        id: 'unit', name: 'unit', type: 'folder', children: [
          { id: 'ledger.test.ts', name: 'ledger.test.ts', type: 'file', scriptId: 'ledger.test.ts' },
          { id: 'validators.test.ts', name: 'validators.test.ts', type: 'file', scriptId: 'validators.test.ts' },
        ]
      },
    ]
  },
  {
    id: 'config', name: 'config', type: 'folder', children: [
      { id: 'playwright.config.ts', name: 'playwright.config.ts', type: 'file' },
      { id: 'jest.config.ts', name: 'jest.config.ts', type: 'file' },
    ]
  },
  { id: 'package.json', name: 'package.json', type: 'file' },
  { id: 'README.md', name: 'README.md', type: 'file' },
];

// ── Scripts ─────────────────────────────────────────────────────────────────

const MOCK_SCRIPTS: Record<string, { id: string; content: string; executionLog: string[] }> = {
  'payment_flow.spec.ts': {
    id: 'payment_flow.spec.ts',
    content: `import { test, expect } from '@playwright/test';

test('verify payment processing flow', async ({ page }) => {
  await page.goto('/checkout');

  // Initialize payment
  await page.click('[data-testid="pay-button"]');

  // AI-Generated validation for dynamic fields
  const transactionId = await page.textContent('.tx-id');
  expect(transactionId).toMatch(/TXN-\\d{6}/);

  await page.fill('#card-number', '4242424242424242');
  await page.click('#submit-payment');

  await expect(page.locator('.success-message')).toBeVisible();
});`,
    executionLog: [
      '[10:42:31] Starting script: payment_flow.spec.ts',
      '[10:42:31] Environment: UAT_CLUSTER_01  |  Browser: Chromium',
      '[10:42:32] ✓  Playwright browser launched',
      '[10:42:33] ✓  Navigating to /checkout',
      '[10:42:34] ✓  Clicking [data-testid="pay-button"]',
      '[10:42:35] ✓  Transaction ID matched: TXN-482910',
      '[10:42:36] ✓  Card number entered: 4242...4242',
      '[10:42:38] ✓  Submitting payment',
      '[10:42:41] ✓  Success message visible',
      '[10:42:41] ─────────────────────────────────────────',
      '[10:42:41] RESULT: PASSED  (10.2s)',
      '[10:42:41] 1 passed, 0 failed',
    ],
  },
  'auth_gate.spec.ts': {
    id: 'auth_gate.spec.ts',
    content: `import { test, expect } from '@playwright/test';

test('verify authentication gate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('#login-btn');
  await expect(page).toHaveURL('/dashboard');
});`,
    executionLog: [
      '[10:45:00] Starting script: auth_gate.spec.ts',
      '[10:45:00] Environment: UAT_CLUSTER_01  |  Browser: Chromium',
      '[10:45:01] ✓  Playwright browser launched',
      '[10:45:02] ✓  Navigating to /login',
      '[10:45:03] ✓  Username entered: testuser',
      '[10:45:03] ✓  Password entered',
      '[10:45:04] ✓  Login button clicked',
      '[10:45:05] ✓  URL asserted: /dashboard',
      '[10:45:05] ─────────────────────────────────────────',
      '[10:45:05] RESULT: PASSED  (5.1s)',
      '[10:45:05] 1 passed, 0 failed',
    ],
  },
  'portfolio_view.spec.ts': {
    id: 'portfolio_view.spec.ts',
    content: `import { test, expect } from '@playwright/test';

test('verify portfolio summary loads correctly', async ({ page }) => {
  await page.goto('/portfolio');
  await expect(page.locator('.portfolio-summary')).toBeVisible();
  const allocation = await page.textContent('.total-allocation');
  expect(Number(allocation?.replace('%', ''))).toBeLessThanOrEqualTo(100);
});`,
    executionLog: [
      '[11:00:10] Starting script: portfolio_view.spec.ts',
      '[11:00:10] Environment: UAT_CLUSTER_01  |  Browser: Chromium',
      '[11:00:11] ✓  Playwright browser launched',
      '[11:00:12] ✓  Navigating to /portfolio',
      '[11:00:14] ✓  Portfolio summary visible',
      '[11:00:15] ✓  Allocation value: 94.2% (≤ 100%)',
      '[11:00:15] ─────────────────────────────────────────',
      '[11:00:15] RESULT: PASSED  (5.0s)',
      '[11:00:15] 1 passed, 0 failed',
    ],
  },
  'wire_transfer.spec.ts': {
    id: 'wire_transfer.spec.ts',
    content: `import { test, expect } from '@playwright/test';

test('validate wire transfer flow', async ({ page }) => {
  await page.goto('/transfers/wire');
  await page.fill('#recipient', 'SWIFT-GB29NWBK60161331926819');
  await page.fill('#amount', '1000');
  await page.click('#confirm-transfer');
  await expect(page.locator('.transfer-status')).toHaveText('Processing');
});`,
    executionLog: [
      '[11:10:05] Starting script: wire_transfer.spec.ts',
      '[11:10:05] Environment: UAT_CLUSTER_01  |  Browser: Chromium',
      '[11:10:06] ✓  Playwright browser launched',
      '[11:10:07] ✓  Navigating to /transfers/wire',
      '[11:10:08] ✓  Recipient SWIFT code entered',
      '[11:10:09] ✓  Amount entered: $1,000',
      '[11:10:10] ✓  Confirm button clicked',
      '[11:10:30] ✗  TimeoutError: .transfer-status text did not match "Processing"',
      '[11:10:30] ─────────────────────────────────────────',
      '[11:10:30] RESULT: FAILED  (25.1s)',
      '[11:10:30] 0 passed, 1 failed',
    ],
  },
  'api_rate_limit.spec.ts': {
    id: 'api_rate_limit.spec.ts',
    content: `import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

test('verify API rate limiting at 100 req/min', async ({ request }) => {
  for (let i = 0; i < 101; i++) {
    const res = await request.post('/v1/payments', { data: { amount: 10 } });
    if (i === 100) {
      expect(res.status()).toBe(429);
    }
  }
});`,
    executionLog: [
      '[11:20:00] Starting script: api_rate_limit.spec.ts',
      '[11:20:00] Environment: UAT_CLUSTER_01  |  API mode',
      '[11:20:00] ✓  API request context initialized',
      '[11:20:00] ✓  Sending 101 sequential requests to /v1/payments',
      '[11:20:06] ✓  Requests 1–100: HTTP 200 OK',
      '[11:20:06] ✗  Request 101: HTTP 200 OK (expected 429)',
      '[11:20:06] ─────────────────────────────────────────',
      '[11:20:06] RESULT: FAILED  (6.4s)',
      '[11:20:06] 0 passed, 1 failed  — rate limit not enforced',
    ],
  },
  'ledger.test.ts': {
    id: 'ledger.test.ts',
    content: `import { describe, it, expect } from '@jest/globals';
import { LedgerService } from '../src/services/ledger.service';

describe('LedgerService', () => {
  it('should debit correct amount from source account', () => {
    const ledger = new LedgerService();
    const result = ledger.debit('ACC_001', 500);
    expect(result.balance).toBe(500);
    expect(result.status).toBe('success');
  });
});`,
    executionLog: [
      '[11:30:00] Starting script: ledger.test.ts',
      '[11:30:00] Runner: Jest  |  Environment: Node',
      '[11:30:00] ✓  LedgerService instantiated',
      '[11:30:00] ✓  Debit ACC_001: $500',
      '[11:30:00] ✓  Remaining balance: $500',
      '[11:30:00] ✓  Status: success',
      '[11:30:00] ─────────────────────────────────────────',
      '[11:30:00] RESULT: PASSED  (0.8s)',
      '[11:30:00] 1 passed, 0 failed',
    ],
  },
  'validators.test.ts': {
    id: 'validators.test.ts',
    content: `import { describe, it, expect } from '@jest/globals';
import { validateCard, validateSWIFT } from '../src/utils/validators';

describe('Validators', () => {
  it('should accept valid Luhn card number', () => {
    expect(validateCard('4242424242424242')).toBe(true);
  });

  it('should reject invalid SWIFT code', () => {
    expect(validateSWIFT('INVALID')).toBe(false);
  });
});`,
    executionLog: [
      '[11:35:00] Starting script: validators.test.ts',
      '[11:35:00] Runner: Jest  |  Environment: Node',
      '[11:35:00] ✓  validateCard("4242424242424242"): true',
      '[11:35:00] ✓  validateSWIFT("INVALID"): false',
      '[11:35:00] ─────────────────────────────────────────',
      '[11:35:00] RESULT: PASSED  (0.5s)',
      '[11:35:00] 2 passed, 0 failed',
    ],
  },
};

const DEFAULT_SCRIPT = MOCK_SCRIPTS['payment_flow.spec.ts'];

// ── Tree Node Component ──────────────────────────────────────────────────────

const TreeItem = ({
  node, depth, selectedId, onSelect, expanded, onToggle,
}: {
  node: TreeNode; depth: number; selectedId: string; onSelect: (id: string, scriptId?: string) => void; expanded: Set<string>; onToggle: (id: string) => void;
}) => {
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const isScript = !!node.scriptId;

  return (
    <div>
      <div
        onClick={() => {
          if (node.type === 'folder') onToggle(node.id);
          else onSelect(node.id, node.scriptId);
        }}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`flex items-center gap-1.5 py-1 pr-2 rounded cursor-pointer transition-all text-xs ${isSelected ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
      >
        {node.type === 'folder' ? (
          <ChevronRight className={`w-3 h-3 text-outline shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        ) : (
          <span className="w-3 h-3 shrink-0" />
        )}
        {node.type === 'folder' ? (
          <Folder className={`w-3.5 h-3.5 shrink-0 ${isExpanded ? 'text-primary fill-primary/20' : 'text-outline'}`} />
        ) : node.name.endsWith('.json') ? (
          <Package className="w-3.5 h-3.5 shrink-0 text-tertiary" />
        ) : node.name.endsWith('.md') ? (
          <FileText className="w-3.5 h-3.5 shrink-0 text-secondary" />
        ) : (
          <FileCode className={`w-3.5 h-3.5 shrink-0 ${isScript ? 'text-primary' : 'text-outline'}`} />
        )}
        <span className="truncate">{node.name}</span>
        {isScript && <span className="ml-auto text-[8px] font-bold text-primary bg-primary/10 px-1 rounded shrink-0">SPEC</span>}
      </div>
      {node.type === 'folder' && isExpanded && node.children?.map(child => (
        <TreeItem key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
};

// ── Component ────────────────────────────────────────────────────────────────

export const AutomationManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScriptId, setSelectedScriptId] = useState('payment_flow.spec.ts');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['tests', 'e2e', 'integration', 'unit']));

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [executionDone, setExecutionDone] = useState(false);
  const [visibleLogLines, setVisibleLogLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const selectedScript = MOCK_SCRIPTS[selectedScriptId] || DEFAULT_SCRIPT;

  const handleSelect = (_id: string, scriptId?: string) => {
    if (scriptId && MOCK_SCRIPTS[scriptId]) {
      setSelectedScriptId(scriptId);
      setIsRunning(false);
      setExecutionDone(false);
      setVisibleLogLines([]);
    }
  };

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleRunScript = () => {
    setIsRunning(true);
    setExecutionDone(false);
    setVisibleLogLines([]);

    const lines = selectedScript.executionLog;
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLogLines(prev => [...prev, line]);
        if (i === lines.length - 1) {
          setIsRunning(false);
          setExecutionDone(true);
        }
        setTimeout(() => {
          logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
        }, 50);
      }, i * 380);
    });
  };

  const scriptPassed = executionDone && selectedScript.executionLog.some(l => l.includes('RESULT: PASSED'));
  const scriptFailed = executionDone && selectedScript.executionLog.some(l => l.includes('RESULT: FAILED'));

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ── Left: Repo Tree ─────────────────────────────────────────────── */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/10 flex flex-col shrink-0">
        <div className="p-3 border-b border-outline-variant/10">
          <div className="flex items-center gap-1.5 px-2 py-1 mb-2">
            <GitBranch className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">company/main-repo</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
            <input
              className="w-full bg-surface-container-high border-none rounded-md pl-9 pr-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary"
              placeholder="Search files..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2 no-scrollbar text-xs">
          {REPO_TREE.map(node => (
            <TreeItem
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedScriptId}
              onSelect={handleSelect}
              expanded={expandedNodes}
              onToggle={toggleNode}
            />
          ))}
        </div>
      </aside>

      {/* ── Center: Code + Terminal ──────────────────────────────────────── */}
      <section className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest">
        {/* Toolbar */}
        <div className="px-5 py-2.5 border-b border-outline-variant/10 flex justify-between items-center shrink-0 bg-[#161b22]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <GitBranch className="w-3 h-3" /> main
            </div>
            <span className="text-outline/40">/</span>
            <FileCode className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-gray-300">{selectedScript.id}</span>
          </div>
          <div className="flex gap-2 items-center">
            {executionDone && (
              <span className={`flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-md ${scriptPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {scriptPassed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {scriptPassed ? 'PASSED' : 'FAILED'}
              </span>
            )}
            <button
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              title="Execution History"
            >
              <Clock className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={handleRunScript}
              disabled={isRunning}
              className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm transition-all ${isRunning ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-primary text-on-primary hover:opacity-90'}`}
            >
              {isRunning
                ? <><span className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" /> Running...</>
                : <><Play className="w-2.5 h-2.5 fill-current" /> Run Script</>
              }
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed bg-[#0d1117] text-[#e6edf3]">
          <pre className="no-scrollbar">{selectedScript.content}</pre>
        </div>

        {/* Terminal output — shown during/after execution */}
        {(isRunning || executionDone) && (
          <div className="border-t border-white/10 flex flex-col shrink-0" style={{ height: '220px' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-white/10">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terminal Output</span>
              {isRunning && <span className="ml-auto flex items-center gap-1.5 text-[10px] text-yellow-400 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Executing</span>}
              {scriptPassed && <span className="ml-auto text-[10px] text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>}
              {scriptFailed && <span className="ml-auto text-[10px] text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3 h-3" /> Failed</span>}
            </div>
            <div ref={logRef} className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed bg-[#010409] no-scrollbar">
              {visibleLogLines.map((line, i) => (
                <div
                  key={i}
                  className={`${line.includes('RESULT: PASSED') ? 'text-emerald-400 font-bold' : line.includes('RESULT: FAILED') ? 'text-red-400 font-bold' : line.includes('✓') ? 'text-emerald-300' : line.includes('✗') ? 'text-red-300' : line.includes('───') ? 'text-gray-600' : 'text-gray-400'}`}
                >
                  {line}
                </div>
              ))}
              {isRunning && <span className="inline-block w-2 h-3 bg-emerald-400 animate-pulse ml-0.5" />}
            </div>

            {/* Execution summary + redirect CTA */}
            {executionDone && (
              <div className={`px-4 py-3 border-t border-white/10 flex items-center justify-between ${scriptPassed ? 'bg-emerald-950/50' : 'bg-red-950/40'}`}>
                <div className="flex items-center gap-3">
                  {scriptPassed
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    : <XCircle className="w-4 h-4 text-red-400" />}
                  <div>
                    <p className={`text-xs font-bold ${scriptPassed ? 'text-emerald-300' : 'text-red-300'}`}>
                      {scriptPassed ? `${selectedScript.id} executed successfully` : `${selectedScript.id} failed — review logs above`}
                    </p>
                    <p className="text-[10px] text-gray-500">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/data-prep')}
                  className="bg-primary text-on-primary px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:opacity-90 transition-opacity shrink-0"
                >
                  Go to Data & Env Prep <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Right: Commit History + Script Health ───────────────────────── */}
      <aside className="w-72 border-l border-outline-variant/10 flex flex-col bg-surface-container-low shrink-0">
        <div className="p-5 border-b border-outline-variant/10">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
            <GitCommit className="w-4 h-4" /> Commit History
          </h3>
          <div className="space-y-4">
            {[
              { user: 'HP', msg: 'Refactor payment validation logic', time: '2h ago', hash: '8f2a1c' },
              { user: 'AI', msg: 'Add edge case for card expiry handling', time: '5h ago', hash: '3d1e4f', isAI: true },
              { user: 'JD', msg: 'Add wire transfer integration spec', time: '8h ago', hash: 'b4c5d6' },
              { user: 'HP', msg: 'Fix API rate limit test assertion', time: '1d ago', hash: 'a1b2c3' },
              { user: 'AI', msg: 'Generate ledger unit test scaffolding', time: '2d ago', hash: 'f9e8d7', isAI: true },
            ].map((commit, i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${commit.isAI ? 'bg-tertiary/10' : 'bg-primary/10'}`}>
                  <span className={`text-[10px] font-bold ${commit.isAI ? 'text-tertiary' : 'text-primary'}`}>{commit.user}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">{commit.msg}</p>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-outline">{commit.time}</span>
                    <span className="text-[10px] font-mono text-outline">{commit.hash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Script Health
            </h3>
            <span className="text-[10px] font-bold text-tertiary">92%</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-tertiary/5 rounded-lg border border-tertiary/10">
              <p className="text-[10px] font-bold text-tertiary uppercase mb-1">AI Optimization</p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">Redundant wait statements detected. Suggested removal of 3 lines to improve execution speed by 12%.</p>
              <button className="mt-2 text-[10px] font-bold text-tertiary uppercase hover:underline">Apply Fix</button>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Coverage</p>
              <div className="flex justify-between text-[10px] font-bold mb-1.5">
                <span className="text-on-surface">E2E</span><span className="text-primary">3 specs</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold mb-1.5">
                <span className="text-on-surface">Integration</span><span className="text-primary">2 specs</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-on-surface">Unit</span><span className="text-primary">2 tests</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
