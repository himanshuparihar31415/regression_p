import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Gauge, AlertTriangle, BarChart2, TrendingUp, ArrowRight, X, Layers } from 'lucide-react';

const MOCK_IMPACT_MODULES = [
  { name: 'Payments', impact: 'High', count: 210, suite: 'Core + Extended', color: 'bg-error' },
  { name: 'Login', impact: 'High', count: 120, suite: 'Core', color: 'bg-error' },
  { name: 'API Gateway', impact: 'High', count: 88, suite: 'Core + Extended', color: 'bg-error' },
  { name: 'User Management', impact: 'Medium', count: 64, suite: 'Core', color: 'bg-primary' },
  { name: 'Portfolio', impact: 'Medium', count: 45, suite: 'Smoke + Core', color: 'bg-primary' },
  { name: 'Dashboard', impact: 'Medium', count: 38, suite: 'Smoke', color: 'bg-primary' },
  { name: 'Notifications', impact: 'Low', count: 22, suite: 'Smoke', color: 'bg-tertiary' },
  { name: 'Reporting', impact: 'Low', count: 18, suite: 'Smoke', color: 'bg-tertiary' },
];

const ALL_MODULE_NAMES = MOCK_IMPACT_MODULES.map(m => m.name);

export const ScopePlanning = () => {
  const navigate = useNavigate();
  const [isSelective, setIsSelective] = useState(true);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>(['QA', 'UAT']);
  const [selectedSuites, setSelectedSuites] = useState<string[]>(['Smoke', 'Core']);
  const [includedModules, setIncludedModules] = useState<string[]>(['Payments', 'Login', 'API Gateway']);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  // When switching to Full Regression, auto-include all modules
  useEffect(() => {
    if (!isSelective) {
      setIncludedModules(ALL_MODULE_NAMES);
    }
  }, [isSelective]);

  const toggleEnv = (env: string) => {
    setSelectedEnvs(prev => prev.includes(env) ? prev.filter(e => e !== env) : [...prev, env]);
  };

  const toggleSuite = (suite: string) => {
    setSelectedSuites(prev => prev.includes(suite) ? prev.filter(s => s !== suite) : [...prev, suite]);
  };

  const toggleModule = (name: string) => {
    if (!isSelective) return; // In full regression, all are locked
    setIncludedModules(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
  };

  const handleFinalizeConfirm = () => {
    setShowFinalizeModal(false);
    navigate('/test-management');
  };

  const totalTests = MOCK_IMPACT_MODULES
    .filter(m => includedModules.includes(m.name))
    .reduce((acc, m) => acc + m.count, 0);

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
            onClick={() => setShowFinalizeModal(true)}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-semibold text-sm shadow-md hover:brightness-110 transition-all flex items-center gap-2"
          >
            Finalize Scope <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Scope Decision + Environments */}
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
            {!isSelective && (
              <p className="mt-3 text-[10px] text-primary font-bold bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                All {ALL_MODULE_NAMES.length} modules automatically included in Full Regression.
              </p>
            )}
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Target Environments</h3>
            <div className="space-y-3">
              {['QA', 'UAT', 'Pre-Prod'].map((env) => (
                <div
                  key={env}
                  onClick={() => toggleEnv(env)}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${selectedEnvs.includes(env) ? 'bg-primary-fixed text-on-primary-fixed-variant border-primary/10' : 'bg-surface text-on-surface-variant border-outline-variant/20 grayscale opacity-70'}`}
                >
                  {selectedEnvs.includes(env) ? <CheckCircle2 className="w-5 h-5 fill-current" /> : <Circle className="w-5 h-5" />}
                  <span className="text-sm font-bold">{env}</span>
                  {env === 'QA' && <span className="ml-auto text-[10px] uppercase font-bold tracking-widest opacity-70">Primary</span>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Impact Mapping table with checkboxes */}
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <section className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex-1">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Impact Mapping</h3>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-sm font-bold">{includedModules.length}/{MOCK_IMPACT_MODULES.length} INCLUDED</span>
                <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded-sm font-bold">AI ANALYZED</span>
                {isSelective && (
                  <button
                    onClick={() => setIncludedModules(ALL_MODULE_NAMES)}
                    className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                  >
                    Select All
                  </button>
                )}
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant w-10">
                    {!isSelective ? (
                      <CheckCircle2 className="w-4 h-4 text-primary fill-current" />
                    ) : (
                      <input
                        type="checkbox"
                        checked={includedModules.length === MOCK_IMPACT_MODULES.length}
                        onChange={(e) => setIncludedModules(e.target.checked ? ALL_MODULE_NAMES : [])}
                        className="rounded text-primary"
                      />
                    )}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Module</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Impact Level</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-right">Test Count</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Suggested Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {MOCK_IMPACT_MODULES.map((module) => {
                  const isIncluded = includedModules.includes(module.name);
                  return (
                    <tr
                      key={module.name}
                      onClick={() => toggleModule(module.name)}
                      className={`transition-colors group ${isSelective ? 'cursor-pointer' : 'cursor-default'} ${isIncluded ? 'bg-primary/5 hover:bg-primary/8' : 'hover:bg-surface-container-high opacity-60'}`}
                    >
                      <td className="px-4 py-4">
                        {!isSelective ? (
                          <CheckCircle2 className="w-4 h-4 text-primary fill-current" />
                        ) : (
                          <input
                            type="checkbox"
                            checked={isIncluded}
                            onChange={() => toggleModule(module.name)}
                            className="rounded text-primary"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${module.color}`}></div>
                          <span className={`text-sm font-bold ${isIncluded ? 'text-on-surface' : 'text-on-surface-variant'}`}>{module.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase ${module.impact === 'High' ? 'bg-error-container text-on-error-container' : module.impact === 'Medium' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-container text-on-secondary-container'}`}>
                          {module.impact}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-mono text-on-surface-variant">{module.count}</td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-on-surface-variant font-medium">{module.suite}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {includedModules.length > 0 && (
              <div className="px-6 py-3 bg-primary/5 border-t border-primary/10 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{includedModules.length} modules · {totalTests} tests included</span>
                <span className="text-[10px] text-on-surface-variant">Environments: {selectedEnvs.join(', ')}</span>
              </div>
            )}
          </section>
        </div>

        {/* Suite Definition */}
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
                  className={`p-4 border-2 rounded-lg flex flex-col gap-2 relative cursor-pointer transition-all ${selectedSuites.includes(suite.name) ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}
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

        {/* AI Insights */}
        <div className="col-span-12 lg:col-span-5">
          <aside className="bg-indigo-50/80 dark:bg-indigo-950/80 backdrop-blur-xl border-l-2 border-indigo-400/20 rounded-lg p-6 flex flex-col gap-4 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-tertiary" />
              <h3 className="text-indigo-900 font-Manrope font-bold text-sm">AI Insights</h3>
            </div>
            <div className="bg-white/60 dark:bg-indigo-900/40 p-3 rounded-lg border-l-4 border-tertiary flex gap-3 items-start cursor-default hover:bg-white/80 transition-all">
              <Gauge className="w-4 h-4 text-tertiary mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-1">Efficiency Gain</p>
                <p className="text-sm text-indigo-900 leading-relaxed">Selective regression reduces total execution runtime by <span className="font-bold">42%</span> compared to baseline.</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-indigo-900/40 p-3 rounded-lg border-l-4 border-tertiary flex gap-3 items-start cursor-default hover:bg-white/80 transition-all">
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

        {/* Next: Test Management CTA */}
        <div className="col-span-12">
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold text-on-surface">Scope ready — {includedModules.length} modules · {totalTests} tests</p>
                <p className="text-[11px] text-on-surface-variant">Next: Review test cases in Test Management</p>
              </div>
            </div>
            <button
              onClick={() => setShowFinalizeModal(true)}
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Finalize & Go to Test Management <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Finalize Scope Modal ────────────────────────────────────────────── */}
      {showFinalizeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
            <div className="px-6 py-4 border-b border-outline-variant/15 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black font-headline text-on-surface">Finalize Regression Scope</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Review and confirm your regression scope before proceeding.</p>
              </div>
              <button onClick={() => setShowFinalizeModal(false)} className="text-secondary hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Regression Type */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Regression Type</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${isSelective ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                  {isSelective ? 'Selective' : 'Full'}
                </span>
              </div>

              {/* Selected Modules */}
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">Included Modules ({includedModules.length})</p>
                <div className="flex flex-wrap gap-2">
                  {includedModules.map(mod => {
                    const m = MOCK_IMPACT_MODULES.find(x => x.name === mod);
                    return (
                      <span key={mod} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${m?.impact === 'High' ? 'bg-error/10 text-error border-error/20' : m?.impact === 'Medium' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-tertiary/10 text-tertiary border-tertiary/20'}`}>
                        {mod}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Suite Types */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Suite Types</span>
                <div className="flex gap-2">
                  {selectedSuites.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">{s}</span>
                  ))}
                </div>
              </div>

              {/* Summary row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-primary/5 rounded-lg text-center border border-primary/10">
                  <p className="text-xl font-black text-primary">{includedModules.length}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">Modules</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg text-center border border-primary/10">
                  <p className="text-xl font-black text-primary">{totalTests}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">Tests</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg text-center border border-primary/10">
                  <p className="text-xl font-black text-primary">{selectedEnvs.length}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">Environments</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/15 flex justify-end gap-3">
              <button
                onClick={() => setShowFinalizeModal(false)}
                className="px-5 py-2 text-sm font-bold text-secondary hover:bg-surface-container-high rounded-lg transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={handleFinalizeConfirm}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-2 rounded-lg text-sm font-black shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Confirm & Go to Test Management <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
