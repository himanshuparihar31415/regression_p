import React from 'react';
import { Settings, Play, Save, Code, Terminal, GitBranch, Zap, Clock, ShieldCheck } from 'lucide-react';

export const ExecutionConfig = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Execution Configuration</h2>
          <p className="text-sm text-secondary font-medium mt-1">Configure pipeline triggers, environment parameters, and execution logic.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest">Reset Defaults</button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Config
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Pipeline YAML Configuration
                </h3>
                <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-[11px] text-gray-300 leading-relaxed overflow-x-auto no-scrollbar">
                  <pre>
{`name: regression-pipeline
on:
  push:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * *'

jobs:
  regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run IntelliQA Suite
        run: npx intelliqa run --suite "Core" --env "UAT"`}
                  </pre>
                </div>
              </section>

              <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Environment Variables</h3>
                <div className="space-y-3">
                  {[
                    { key: 'BASE_URL', value: 'https://uat.assetmark.com', type: 'System' },
                    { key: 'TIMEOUT', value: '30000', type: 'Execution' },
                    { key: 'RETRY_COUNT', value: '2', type: 'Execution' },
                  ].map((env, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-outline uppercase tracking-widest block mb-1">{env.key}</span>
                        <input className="w-full bg-transparent border-none p-0 text-xs font-bold text-on-surface focus:ring-0" defaultValue={env.value} />
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{env.type}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Trigger Logic
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Auto-Trigger on PR</span>
                      <span className="text-[10px] text-outline font-bold">Trigger regression on every pull request</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Nightly Schedule</span>
                      <span className="text-[10px] text-outline font-bold">Run full suite at 12:00 AM UTC</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-tertiary">
                  <Zap className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-widest">AI Config Audit</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/40 rounded-xl border border-tertiary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-tertiary" />
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Security Passed</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">No sensitive keys or secrets detected in plain text within the YAML configuration.</p>
                  </div>
                  <div className="p-4 bg-white/40 rounded-xl border border-tertiary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-tertiary" />
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Efficiency Tip</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Increasing parallelism to <span className="font-bold">16 threads</span> will optimize resource utilization for the current UAT cluster.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
