import React from 'react';
import { Save, Rocket, GripVertical, AlertTriangle, Zap, TrendingUp } from 'lucide-react';

export const TaggingGrouping = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-4 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Regression Tagging & Grouping</h1>
          <p className="text-xs text-secondary font-medium mt-1 uppercase tracking-widest">Workspace / Test Management / Tagging</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-highest px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Save className="w-4 h-4" /> SAVE WORKSPACE
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm">
            <Rocket className="w-4 h-4" /> COMMIT TO PIPELINE
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto space-y-8 no-scrollbar">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-secondary">Global Tags</h2>
              <span className="text-[10px] text-primary bg-primary-fixed px-2 py-0.5 rounded-full font-bold">DRAGGABLE</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '@regression', color: 'primary' },
                { label: '@smoke', color: 'secondary' },
                { label: '@critical', color: 'error' },
                { label: '@high-risk', color: 'tertiary' },
              ].map((tag) => (
                <div key={tag.label} className={`group cursor-grab active:cursor-grabbing px-3 py-1.5 bg-surface-container-lowest rounded-md shadow-sm flex items-center gap-2 border-l-4 border-${tag.color}`}>
                  <span className={`text-sm font-semibold text-${tag.color}`}>{tag.label}</span>
                  <GripVertical className="w-3 h-3 text-outline opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6">
            {[
              { title: 'Smoke', subtitle: 'Health Check Base', tests: 12, tags: ['@smoke', '@regression'] },
              { title: 'Core', subtitle: 'Main Functionality', tests: 48, tags: ['@regression', '@high-risk'] },
              { title: 'Payments', subtitle: 'Transactional Integrity', tests: 114, tags: ['@critical', '@regression'] },
              { title: 'Login & Security', subtitle: 'Auth & MFA Gates', tests: 22, tags: ['@critical', '@smoke'] },
            ].map((suite) => (
              <div key={suite.title} className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-on-surface">{suite.title}</h3>
                    <p className="text-[10px] text-outline uppercase">{suite.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold text-secondary-container bg-on-secondary-container px-2 py-1 rounded">{suite.tests} Tests</span>
                </div>
                <div className="min-h-[80px] border-2 border-dashed border-outline-variant/30 rounded-md p-2 flex flex-wrap gap-2 items-start content-start bg-surface-container-low/30">
                  {suite.tags.map(tag => (
                    <div key={tag} className="px-2 py-1 bg-surface-container-highest text-on-surface-variant rounded text-[11px] font-bold">{tag}</div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="w-80 border-l border-outline-variant/20 flex flex-col bg-surface-container-low shrink-0 overflow-y-auto no-scrollbar">
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Suite Config
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Environment</label>
                <div className="bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm">UAT</div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Pipeline</label>
                <div className="bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm font-mono">nightly_regression</div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Version</label>
                <div className="bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm">v1.2.3</div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-indigo-50/40 dark:bg-indigo-950/20 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-4 h-4 text-tertiary" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary font-headline">AI Insights</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 rounded-lg border-l-4 border-tertiary shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-tertiary" />
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-tight">Coverage Gap</span>
                </div>
                <p className="text-xs text-on-surface leading-relaxed">Missing smoke coverage for Login edge cases identified in recent commits.</p>
                <button className="mt-3 text-[10px] font-bold text-tertiary hover:underline uppercase">Automate Selection</button>
              </div>
              
              <div className="p-4 bg-tertiary/5 rounded-lg border border-tertiary/10">
                <div className="text-[10px] font-bold text-tertiary uppercase mb-2">Execution Efficiency</div>
                <div className="h-1.5 w-full bg-tertiary/10 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[82%]"></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] font-bold text-tertiary">Optimized</span>
                  <span className="text-[10px] font-bold text-tertiary">82%</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Predictive Analytics</div>
              <div className="h-32 bg-surface-container rounded flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-outline opacity-20" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
