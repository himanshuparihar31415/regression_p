import React, { useState } from 'react';
import { Folder, FileCode, Clock, GitBranch, GitCommit, Search, ChevronRight, Play } from 'lucide-react';

const MOCK_SCRIPTS = [
  { id: 'payment_flow.spec.ts', folder: 'tests', content: `import { test, expect } from '@playwright/test';

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
});` },
  { id: 'auth_gate.spec.ts', folder: 'tests', content: `import { test, expect } from '@playwright/test';

test('verify authentication gate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('#login-btn');
  await expect(page).toHaveURL('/dashboard');
});` },
];

export const AutomationManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScript, setSelectedScript] = useState(MOCK_SCRIPTS[0]);

  const filteredScripts = MOCK_SCRIPTS.filter(script => 
    script.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-outline-variant/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
            <input 
              className="w-full bg-surface-container-high border-none rounded-md pl-9 pr-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary" 
              placeholder="Search scripts..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Repository</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-container-high cursor-pointer group">
              <ChevronRight className="w-3 h-3 text-outline group-hover:text-primary transition-transform rotate-90" />
              <Folder className="w-4 h-4 text-primary fill-primary/10" />
              <span className="text-xs font-medium">src</span>
            </div>
            <div className="ml-4 space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-container-high cursor-pointer group">
                <ChevronRight className="w-3 h-3 text-outline group-hover:text-primary transition-transform rotate-90" />
                <Folder className="w-4 h-4 text-primary fill-primary/10" />
                <span className="text-xs font-medium">tests</span>
              </div>
              <div className="ml-4 space-y-0.5">
                {filteredScripts.map(script => (
                  <div 
                    key={script.id}
                    onClick={() => setSelectedScript(script)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all ${selectedScript.id === script.id ? 'bg-primary/5 text-primary font-bold border-l-2 border-primary' : 'hover:bg-surface-container-high'}`}
                  >
                    <FileCode className={`w-4 h-4 ${selectedScript.id === script.id ? 'text-primary' : 'text-outline'}`} />
                    <span className="text-xs">{script.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest">
        <div className="px-6 py-3 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-secondary uppercase tracking-widest">
              <GitBranch className="w-3 h-3" /> main
            </div>
            <span className="text-outline">/</span>
            <span className="text-xs font-bold text-on-surface">{selectedScript.id}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-surface-container-high rounded transition-colors">
              <Clock className="w-4 h-4 text-outline" />
            </button>
            <button 
              onClick={() => alert(`Running script: ${selectedScript.id}`)}
              className="bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Run Script
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed text-on-surface-variant bg-[#0d1117] text-white">
          <pre className="no-scrollbar">
            {selectedScript.content}
          </pre>
        </div>
      </section>

      <aside className="w-80 border-l border-outline-variant/10 flex flex-col bg-surface-container-low shrink-0">
        <div className="p-6 border-b border-outline-variant/10">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
            <GitCommit className="w-4 h-4" /> Commit History
          </h3>
          <div className="space-y-4">
            {[
              { user: 'HP', msg: 'Refactor payment validation logic', time: '2h ago', hash: '8f2a1c' },
              { user: 'AI', msg: 'Add edge case for card expiry', time: '5h ago', hash: '3d1e4f', isAI: true },
              { user: 'JD', msg: 'Initial script setup', time: '1d ago', hash: 'a1b2c3' },
            ].map((commit, i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className={commit.isAI ? "w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0" : "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"}>
                  <span className={commit.isAI ? "text-[10px] font-bold text-tertiary" : "text-[10px] font-bold text-primary"}>{commit.user}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">{commit.msg}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-outline">{commit.time}</span>
                    <span className="text-[10px] font-mono text-outline">{commit.hash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
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
          </div>
        </div>
      </aside>
    </div>
  );
};
