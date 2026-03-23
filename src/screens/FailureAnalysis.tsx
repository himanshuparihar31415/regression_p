import React from 'react';
import { ShieldAlert, Search, Filter, MoreVertical, ChevronRight, Zap, AlertTriangle, CheckCircle2, Bug, TrendingUp } from 'lucide-react';

export const FailureAnalysis = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Failure Classification & Triage</h2>
          <p className="text-sm text-secondary font-medium mt-1">AI-powered analysis and manual triage of regression failures.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest">Mark All as Env</button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2">
            <Bug className="w-4 h-4" /> Log Defects
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Unclassified', value: '4', color: 'error' },
              { label: 'AI Classified', value: '8', color: 'tertiary' },
              { label: 'Resolved', value: '12', color: 'primary' },
            ].map((stat, i) => (
              <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{stat.label}</span>
                <span className={`text-3xl font-black text-${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Failure List</h3>
              <div className="flex gap-4">
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                  <input className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" placeholder="Search failures..." type="text"/>
                </div>
                <Filter className="w-4 h-4 text-outline" />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface-container-lowest z-10">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10 bg-surface-container-low">
                    <th className="px-6 py-3">Test ID</th>
                    <th className="px-6 py-3">Scenario</th>
                    <th className="px-6 py-3">Classification</th>
                    <th className="px-6 py-3">AI Confidence</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { id: 'TC_089', name: 'Wire Transfer Int', class: 'Environment', conf: '98%', status: 'AI Classified' },
                    { id: 'TC_102', name: 'Balance Update', class: 'Code Bug', conf: '84%', status: 'Unclassified' },
                    { id: 'TC_044', name: 'Card Validation', class: 'Data Issue', conf: '92%', status: 'AI Classified' },
                  ].map((failure, i) => (
                    <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 cursor-pointer group">
                      <td className="px-6 py-4 font-mono text-primary font-bold">{failure.id}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">{failure.name}</td>
                      <td className="px-6 py-4">
                        <span className={failure.class === 'Code Bug' ? 'text-error font-bold' : 'text-on-surface-variant font-bold'}>{failure.class}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-surface-container-highest h-1 rounded-full overflow-hidden w-16">
                            <div className="bg-tertiary h-full" style={{ width: failure.conf }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-tertiary">{failure.conf}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Triage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <aside className="w-96 border-l border-outline-variant/10 bg-surface-container-low flex flex-col p-6 space-y-6 shrink-0 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Failure Analysis</span>
              <h3 className="text-xl font-black font-headline text-on-surface">TC_089</h3>
            </div>
            <button className="text-outline hover:text-on-surface">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest block mb-1">Error Message</span>
              <p className="text-[11px] font-mono text-error bg-error/5 p-2 rounded leading-relaxed">TimeoutError: waiting for selector "[data-testid='success-icon']" failed: timeout 30000ms exceeded</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest block mb-1">Stack Trace</span>
              <p className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low p-2 rounded leading-tight h-24 overflow-y-auto no-scrollbar">
                at Page.waitForSelector (node_modules/playwright/lib/page.js:124:23)<br/>
                at Object.test (tests/payment_flow.spec.ts:18:14)
              </p>
            </div>
          </div>

          <div className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-tertiary">
              <Zap className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest">AI Root Cause Analysis</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Analysis of system logs during execution shows <span className="font-bold text-tertiary">503 Service Unavailable</span> from the Notification Hub. This caused the success icon to never render.
            </p>
            <div className="p-3 bg-white/40 rounded-lg border border-tertiary/10">
              <p className="text-[10px] font-bold text-tertiary uppercase mb-1">Recommendation</p>
              <p className="text-[11px] text-on-surface-variant">Classify as <span className="font-bold">Environment Issue</span>. No script update required.</p>
            </div>
            <button className="w-full py-2 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">Confirm AI Triage</button>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <Bug className="w-4 h-4" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Linked Defects</h4>
            </div>
            <div className="p-3 bg-surface-container-highest rounded-lg flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">None Linked</span>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Link Jira →</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
