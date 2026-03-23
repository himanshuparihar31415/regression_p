import React from 'react';
import { Play, TrendingUp } from 'lucide-react';
import { AIInsightCard } from '../components/AIInsightCard';

export const ChangeIdentification = () => {
  return (
    <div className="flex-1 flex overflow-hidden">
      <section className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Change Identification</h2>
            <p className="text-sm text-on-surface-variant font-medium">Analyze and trigger regression suites based on detected code shifts.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-md hover:bg-surface-container-highest transition-colors uppercase tracking-wider">
              Mark Non-Regression
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-bold rounded-md shadow-sm hover:opacity-90 transition-opacity uppercase tracking-wider flex items-center gap-2">
              <Play className="w-3 h-3 fill-current" />
              Trigger Regression
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Total Changes</span>
            <div className="text-2xl font-black text-primary">134</div>
            <div className="text-[10px] text-on-surface-variant flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-error" /> 
              +12% vs last sprint
            </div>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-tertiary flex flex-col gap-1">
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">AI Identified Risk</span>
            <div className="text-2xl font-black text-tertiary">High</div>
            <div className="text-[10px] text-on-surface-variant">Core Payments Impacted</div>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Regression Health</span>
            <div className="text-2xl font-black text-on-surface">94.2%</div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden mt-2">
              <div className="bg-primary h-full w-[94.2%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-md overflow-hidden ring-1 ring-outline-variant/15">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Change ID</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Type</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Source</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Impacted Modules</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Regression Impact</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-4 py-3 text-xs font-bold text-primary">CR_101</td>
                <td className="px-4 py-3 text-xs text-on-surface">Feature</td>
                <td className="px-4 py-3 text-xs text-on-surface">Jira</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full">Payments</span>
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full">Portfolio</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-error">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    High
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase rounded-sm">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer bg-surface-container-low/30">
                <td className="px-4 py-3 text-xs font-bold text-primary">BUG_221</td>
                <td className="px-4 py-3 text-xs text-on-surface">Defect Fix</td>
                <td className="px-4 py-3 text-xs text-on-surface">Jira</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full">Login</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-on-secondary-fixed-variant">
                    <span className="w-2 h-2 rounded-full bg-on-secondary-fixed-variant"></span>
                    Medium
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-sm">Approved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <aside className="w-80 bg-surface-container-low border-l border-outline-variant/10 flex flex-col p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">analytics</span>
            Impact Details
          </h3>
          <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
              <span className="text-xs text-on-secondary-fixed-variant">Environment</span>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">QA</span>
                <span className="px-1.5 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded">UAT</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
              <span className="text-xs text-on-secondary-fixed-variant">Criticality</span>
              <span className="text-xs font-bold text-error">High</span>
            </div>
            <div className="pt-2">
              <span className="text-[10px] font-bold text-on-surface-variant block mb-2 uppercase">Next Best Action</span>
              <button className="w-full py-2 bg-on-surface text-surface text-xs font-bold rounded hover:opacity-90 transition-opacity">
                Trigger Core Regression
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-headline font-bold text-tertiary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">psychology</span>
              AI Insights
            </h3>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          </div>
          <div className="space-y-3">
            <AIInsightCard 
              title="Regression Required"
              description="12/18 changes require regression due to high dependency overlap in shared libraries."
              type="warning"
            />
            <AIInsightCard 
              title="High Risk Detected"
              description="Payments module flagged as high-risk. Recent PRs show significant logic shifts in transaction flow."
              type="info"
            />
            <div className="mt-4 p-4 border border-dashed border-tertiary/30 rounded-lg text-center">
              <span className="material-symbols-outlined text-tertiary text-lg mb-1 block">auto_awesome</span>
              <p className="text-[10px] text-on-tertiary-fixed-variant italic">Analyzing codebase for semantic triggers...</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
