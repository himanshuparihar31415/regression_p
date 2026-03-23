import React from 'react';
import { FileUp, Plus, Search, Filter, MoreVertical, X, ListOrdered, CheckCircle2, Edit3 } from 'lucide-react';

export const TestCaseRegistration = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Test Case Registration</h2>
          <p className="text-sm text-secondary mt-1">Manage and architect precision-focused quality validation scenarios.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <FileUp className="w-4 h-4" /> Import Test Cases
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm active:opacity-90">
            <Plus className="w-4 h-4" /> Create Test Case
          </button>
        </div>
      </div>

      <div className="flex-1 flex px-8 pb-8 gap-6 overflow-hidden">
        <aside className="w-56 flex flex-col gap-4 shrink-0">
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-secondary px-2">Modules</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-md bg-white text-primary font-bold shadow-sm text-sm flex justify-between items-center group">
                Login
                <span className="text-[10px] bg-primary/10 px-1.5 py-0.5 rounded text-primary">12</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm flex justify-between items-center">
                Payments
                <span className="text-[10px] opacity-40">08</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm flex justify-between items-center">
                Portfolio
                <span className="text-[10px] opacity-40">24</span>
              </button>
            </div>
          </div>
          <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-tertiary mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Suggestion</span>
            </div>
            <p className="text-[11px] leading-relaxed text-tertiary/80">Coverage in <span className="font-bold">Payments</span> is 14% below baseline. Recommend adding 3 API validation scenarios.</p>
          </div>
        </aside>

        <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 flex flex-col min-w-0">
          <div className="p-4 border-b border-outline-variant/15 flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary" placeholder="Filter cases by ID or Name..." type="text"/>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-outline cursor-pointer hover:text-primary" />
              <MoreVertical className="w-4 h-4 text-outline cursor-pointer hover:text-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-lowest z-10">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/15">
                  <th className="px-4 py-3">Test ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Module</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {[
                  { id: 'TC_001', name: 'Login Valid User', module: 'Login', type: 'UI', priority: 'High', status: 'Active' },
                  { id: 'TC_045', name: 'Payment via Card', module: 'Payments', type: 'API', priority: 'High', status: 'Active' },
                  { id: 'TC_078', name: 'Portfolio View', module: 'Portfolio', type: 'UI', priority: 'Medium', status: 'Candidate' },
                ].map((tc) => (
                  <tr key={tc.id} className="group hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/5">
                    <td className="px-4 py-3 font-mono text-primary font-semibold">{tc.id}</td>
                    <td className="px-4 py-3 font-medium">{tc.name}</td>
                    <td className="px-4 py-3 text-secondary">{tc.module}</td>
                    <td className="px-4 py-3">
                      <span className="bg-surface-container-highest px-2 py-0.5 rounded text-[10px]">{tc.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={tc.priority === 'High' ? 'text-error' : 'text-secondary'}>{tc.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-sm font-semibold text-[10px]">{tc.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="w-80 flex flex-col gap-6 overflow-hidden shrink-0">
          <div className="bg-indigo-50/80 backdrop-blur-xl border border-indigo-400/20 rounded-xl p-5 flex flex-col h-full shadow-2xl shadow-indigo-500/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Detail View</span>
                <h3 className="text-lg font-extrabold font-headline text-on-surface">TC_045</h3>
              </div>
              <button className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto no-scrollbar space-y-6">
              <section>
                <h4 className="text-[10px] font-bold uppercase text-secondary mb-3 flex items-center gap-1">
                  <ListOrdered className="w-3 h-3" /> Steps
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs leading-relaxed">
                    <span className="text-primary font-bold">01</span>
                    <p className="text-on-surface-variant">Initialize payment session via REST endpoint `/v1/checkout`</p>
                  </div>
                  <div className="flex gap-3 text-xs leading-relaxed">
                    <span className="text-primary font-bold">02</span>
                    <p className="text-on-surface-variant">Submit encrypted payload with valid test card credentials</p>
                  </div>
                </div>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase text-secondary mb-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Expected Result
                </h4>
                <div className="bg-white/50 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-xs text-on-surface-variant leading-relaxed">System confirms card authorization and triggers balance update in ledger service within 200ms latency window.</p>
                </div>
              </section>
            </div>
            <div className="mt-auto pt-6 border-t border-indigo-200/50">
              <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-2.5 rounded-lg text-sm font-bold shadow-md flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" /> Edit Case Logic
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
