import React, { useState } from 'react';
import { CheckCircle2, Circle, Gauge, AlertTriangle, BarChart2, TrendingUp } from 'lucide-react';

const MOCK_IMPACT_MODULES = [
  { name: 'Payments', impact: 'High', count: 210, suite: 'Core + Extended', color: 'bg-error' },
  { name: 'Login', impact: 'Medium', count: 120, suite: 'Core', color: 'bg-primary' },
  { name: 'Portfolio', impact: 'Low', count: 45, suite: 'Smoke', color: 'bg-tertiary' },
];

export const ScopePlanning = () => {
  const [isSelective, setIsSelective] = useState(true);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>(['QA', 'UAT']);
  const [selectedSuites, setSelectedSuites] = useState<string[]>(['Smoke', 'Core']);

  const toggleEnv = (env: string) => {
    setSelectedEnvs(prev => 
      prev.includes(env) ? prev.filter(e => e !== env) : [...prev, env]
    );
  };

  const toggleSuite = (suite: string) => {
    setSelectedSuites(prev => 
      prev.includes(suite) ? prev.filter(s => s !== suite) : [...prev, suite]
    );
  };

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
          <button 
            onClick={() => alert(`Finalizing scope with ${selectedSuites.length} suites across ${selectedEnvs.length} environments.`)}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-semibold text-sm shadow-md hover:brightness-110 transition-all"
          >
            Finalize Scope
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Scope Decision</h3>
            <div 
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${isSelective ? 'bg-surface-container-low border border-primary/20' : 'bg-surface opacity-60'}`}
              onClick={() => setIsSelective(true)}
            >
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${isSelective ? 'text-primary' : 'text-on-surface'}`}>Selective Regression</span>
                <span className="text-[10px] text-on-secondary-container">Optimized based on impact</span>
              </div>
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSelective ? 'bg-primary' : 'bg-slate-300'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isSelective ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </div>
            </div>
            <div 
              className={`mt-3 flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${!isSelective ? 'bg-surface-container-low border border-primary/20' : 'bg-surface opacity-60'}`}
              onClick={() => setIsSelective(false)}
            >
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${!isSelective ? 'text-primary' : 'text-on-surface'}`}>Full Regression</span>
                <span className="text-[10px] text-on-surface-variant">Complete system verification</span>
              </div>
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${!isSelective ? 'bg-primary' : 'bg-slate-300'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${!isSelective ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Target Environments</h3>
            <div className="space-y-3">
              {['QA', 'UAT', 'Pre-Prod'].map((env) => (
                <div 
                  key={env}
                  onClick={() => toggleEnv(env)}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${
                    selectedEnvs.includes(env) 
                      ? 'bg-primary-fixed text-on-primary-fixed-variant border-primary/10' 
                      : 'bg-surface text-on-surface-variant border-outline-variant/20 grayscale opacity-70'
                  }`}
                >
                  {selectedEnvs.includes(env) ? <CheckCircle2 className="w-5 h-5 fill-current" /> : <Circle className="w-5 h-5" />}
                  <span className="text-sm font-bold">{env}</span>
                  {env === 'QA' && <span className="ml-auto text-[10px] uppercase font-bold tracking-widest opacity-70">Primary</span>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <section className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex-1">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Impact Mapping</h3>
              <div className="flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-sm font-bold">{MOCK_IMPACT_MODULES.length} MODULES</span>
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
                {MOCK_IMPACT_MODULES.map((module) => (
                  <tr key={module.name} className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${module.color}`}></div>
                        <span className="text-sm font-bold text-on-surface">{module.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase ${
                        module.impact === 'High' ? 'bg-error-container text-on-error-container' : 
                        module.impact === 'Medium' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 
                        'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {module.impact}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono text-on-surface-variant">{module.count}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-on-surface-variant font-medium">{module.suite}</span>
                    </td>
                  </tr>
                ))}
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
              {[
                { name: 'Smoke', desc: 'Critical path verification (15 mins)', status: 'ENABLED' },
                { name: 'Core', desc: 'Major features regression (1.2 hrs)', status: 'ENABLED' },
                { name: 'Extended', desc: 'Full feature coverage (4.5 hrs)', status: 'OPTIONAL' },
              ].map((suite) => (
                <div 
                  key={suite.name}
                  onClick={() => toggleSuite(suite.name)}
                  className={`p-4 border-2 rounded-lg flex flex-col gap-2 relative cursor-pointer transition-all ${
                    selectedSuites.includes(suite.name)
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant hover:border-primary/50'
                  }`}
                >
                  {selectedSuites.includes(suite.name) && <CheckCircle2 className="w-4 h-4 text-primary absolute top-4 right-4 fill-current" />}
                  <span className={`text-sm font-bold ${selectedSuites.includes(suite.name) ? 'text-primary' : 'text-on-surface-variant'}`}>{suite.name}</span>
                  <p className="text-[10px] text-on-surface-variant leading-tight">{suite.desc}</p>
                  <span className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${selectedSuites.includes(suite.name) ? 'text-on-surface' : 'text-outline'}`}>
                    {selectedSuites.includes(suite.name) ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              ))}
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
