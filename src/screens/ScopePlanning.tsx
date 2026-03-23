import React from 'react';
import { CheckCircle2, Circle, Gauge, AlertTriangle, BarChart2, TrendingUp } from 'lucide-react';

export const ScopePlanning = () => {
  return (
    <main className="p-8 overflow-y-auto no-scrollbar max-w-7xl mx-auto w-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-[2rem] font-headline font-bold text-on-surface leading-tight tracking-tight">Regression Scope Planning</h2>
          <p className="text-on-surface-variant font-body mt-1">Configure release verification parameters based on code impact analysis.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:bg-surface-container-highest transition-colors">
            Draft Strategy
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-semibold text-sm shadow-md hover:brightness-110 transition-all">
            Finalize Scope
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Scope Decision</h3>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary">Selective Regression</span>
                <span className="text-[10px] text-on-secondary-container">Optimized based on impact</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between p-4 bg-surface rounded-xl opacity-60">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface">Full Regression</span>
                <span className="text-[10px] text-on-surface-variant">Complete system verification</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Target Environments</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary-fixed text-on-primary-fixed-variant rounded-md border border-primary/10">
                <CheckCircle2 className="w-5 h-5 fill-current" />
                <span className="text-sm font-bold">QA</span>
                <span className="ml-auto text-[10px] uppercase font-bold tracking-widest opacity-70">Primary</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary-fixed text-on-primary-fixed-variant rounded-md border border-primary/10">
                <CheckCircle2 className="w-5 h-5 fill-current" />
                <span className="text-sm font-bold">UAT</span>
                <span className="ml-auto text-[10px] uppercase font-bold tracking-widest opacity-70">Secondary</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface text-on-surface-variant rounded-md border border-outline-variant/20 grayscale opacity-70">
                <Circle className="w-5 h-5" />
                <span className="text-sm font-medium">Pre-Prod</span>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <section className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex-1">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Impact Mapping</h3>
              <div className="flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-sm font-bold">3 MODULES</span>
                <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded-sm font-bold">AI ANALYZED</span>
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Module</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Impact Level</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-right">Test Count</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Suggested Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-error"></div>
                      <span className="text-sm font-bold text-on-surface">Payments</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-sm bg-error-container text-on-error-container text-[10px] font-bold uppercase">High</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-mono text-on-surface-variant">210</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-surface-variant font-medium">Core + Extended</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm font-bold text-on-surface">Login</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-sm bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase">Medium</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-mono text-on-surface-variant">120</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-surface-variant font-medium">Core</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-6 bg-surface-container-low/50">
              <img 
                src="https://picsum.photos/seed/gradient/800/200?blur=4" 
                alt="Impact Analysis" 
                className="h-16 w-full object-cover rounded shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm h-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Execution Suite Definition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg flex flex-col gap-2 relative">
                <CheckCircle2 className="w-4 h-4 text-primary absolute top-4 right-4 fill-current" />
                <span className="text-sm font-bold text-primary">Smoke</span>
                <p className="text-[10px] text-on-surface-variant leading-tight">Critical path verification (15 mins)</p>
                <span className="mt-4 text-[10px] font-bold text-on-surface uppercase tracking-widest">ENABLED</span>
              </div>
              <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg flex flex-col gap-2 relative">
                <CheckCircle2 className="w-4 h-4 text-primary absolute top-4 right-4 fill-current" />
                <span className="text-sm font-bold text-primary">Core</span>
                <p className="text-[10px] text-on-surface-variant leading-tight">Major features regression (1.2 hrs)</p>
                <span className="mt-4 text-[10px] font-bold text-on-surface uppercase tracking-widest">ENABLED</span>
              </div>
              <div className="p-4 border border-outline-variant rounded-lg flex flex-col gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
                <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">Extended</span>
                <p className="text-[10px] text-on-surface-variant leading-tight">Full feature coverage (4.5 hrs)</p>
                <span className="mt-4 text-[10px] font-bold text-outline uppercase tracking-widest">OPTIONAL</span>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <aside className="bg-indigo-50/80 dark:bg-indigo-950/80 backdrop-blur-xl border-l-2 border-indigo-400/20 rounded-lg p-6 flex flex-col gap-4 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-tertiary" />
              <h3 className="text-indigo-900 font-Manrope font-bold text-sm">AI Insights</h3>
            </div>
            <div className="bg-white/60 dark:bg-indigo-900/40 p-3 rounded-lg border-l-4 border-tertiary flex gap-3 items-start group hover:bg-white/80 transition-all cursor-default">
              <Gauge className="w-4 h-4 text-tertiary mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-1">Efficiency Gain</p>
                <p className="text-sm text-indigo-900 leading-relaxed">Selective regression reduces total execution runtime by <span className="font-bold">42%</span> compared to baseline.</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-indigo-900/40 p-3 rounded-lg border-l-4 border-tertiary flex gap-3 items-start group hover:bg-white/80 transition-all cursor-default">
              <AlertTriangle className="w-4 h-4 text-tertiary mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-1">Risk Indicator</p>
                <p className="text-sm text-indigo-900 leading-relaxed">Include <span className="font-bold underline">Portfolio</span> module due to indirect API dependency detected in recent commits.</p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">Confidence Score</span>
                <span className="text-xl font-headline font-extrabold tracking-tighter">98.4%</span>
              </div>
              <TrendingUp className="w-8 h-8 opacity-50" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
