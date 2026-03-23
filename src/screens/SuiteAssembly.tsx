import React from 'react';
import { Layers, Play, Settings, Save, Search, Filter, ChevronRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

export const SuiteAssembly = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Final Regression Suite Assembly</h2>
          <p className="text-sm text-secondary font-medium mt-1">Assembling the final execution payload based on validated scope and data.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Suite
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" /> Execute Suite
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Included Modules</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">3 SELECTED</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Payments', tests: 114, status: 'Ready' },
                  { name: 'Login & Security', tests: 22, status: 'Ready' },
                  { name: 'Portfolio', tests: 48, status: 'Ready' },
                ].map((module, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-on-surface">{module.name}</span>
                        <p className="text-[10px] text-outline font-bold">{module.tests} Tests</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Execution Parameters</h3>
                <Settings className="w-4 h-4 text-outline" />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-surface-container-low rounded-xl space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-outline font-bold uppercase tracking-tighter">Environment</span>
                    <span className="text-on-surface font-bold">UAT_CLUSTER_01</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-outline font-bold uppercase tracking-tighter">Parallelism</span>
                    <span className="text-on-surface font-bold">12 Threads</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-outline font-bold uppercase tracking-tighter">Retry Policy</span>
                    <span className="text-on-surface font-bold">2 Attempts</span>
                  </div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-tight">Estimated Runtime</span>
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-primary">1h 12m</div>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Suite Composition Preview</h3>
              <div className="flex gap-4">
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                  <input className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" placeholder="Search tests..." type="text"/>
                </div>
                <Filter className="w-4 h-4 text-outline" />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface-container-lowest z-10">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10">
                    <th className="px-6 py-3">Test ID</th>
                    <th className="px-6 py-3">Scenario Name</th>
                    <th className="px-6 py-3">Module</th>
                    <th className="px-6 py-3">Data Set</th>
                    <th className="px-6 py-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="text-[11px]">
                  {[
                    { id: 'TC_045', name: 'Payment via Card', module: 'Payments', data: 'Payment_Test_Users', priority: 'High' },
                    { id: 'TC_001', name: 'Login Valid User', module: 'Login', data: 'Default_Auth', priority: 'High' },
                    { id: 'TC_089', name: 'Wire Transfer Int', module: 'Payments', data: 'Edge_Case_Accounts', priority: 'Critical' },
                    { id: 'TC_112', name: 'Portfolio Rebalance', module: 'Portfolio', data: 'Portfolio_Benchmarks', priority: 'Medium' },
                  ].map((test, i) => (
                    <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5">
                      <td className="px-6 py-3 font-mono text-primary font-bold">{test.id}</td>
                      <td className="px-6 py-3 font-bold text-on-surface">{test.name}</td>
                      <td className="px-6 py-3 text-outline">{test.module}</td>
                      <td className="px-6 py-3 text-on-surface-variant">{test.data}</td>
                      <td className="px-6 py-3">
                        <span className={test.priority === 'Critical' ? 'text-error font-bold' : 'text-on-surface-variant'}>{test.priority}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <aside className="w-80 border-l border-outline-variant/10 bg-surface-container-low flex flex-col p-6 space-y-6 shrink-0">
          <div className="flex items-center gap-2 text-tertiary">
            <Zap className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest">AI Suite Audit</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-tertiary/5 rounded-xl border border-tertiary/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-tertiary" />
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Audit Passed</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">Suite composition matches 100% of high-risk change triggers identified in sprint analysis.</p>
            </div>
            <div className="p-4 bg-white/40 rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-tertiary" />
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Optimization Tip</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">Enabling <span className="font-bold">Headless Mode</span> will reduce estimated runtime by 14 minutes.</p>
              <button className="mt-3 text-[10px] font-bold text-tertiary uppercase tracking-widest hover:underline">Apply Optimization</button>
            </div>
          </div>
          <div className="mt-auto p-5 bg-on-surface text-surface rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total Suite Size</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">184</span>
              <span className="text-xs font-bold opacity-70">Test Cases</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
