import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Play, Settings, Save, Search, Filter, ChevronRight, CheckCircle2, AlertTriangle, Zap, Circle } from 'lucide-react';

const MOCK_MODULES = [
  { name: 'Payments', tests: 114, status: 'Ready' },
  { name: 'Login & Security', tests: 22, status: 'Ready' },
  { name: 'Portfolio', tests: 48, status: 'Ready' },
  { name: 'User Management', tests: 34, status: 'Ready' },
  { name: 'API Gateway', tests: 28, status: 'Ready' },
  { name: 'Notifications', tests: 16, status: 'Ready' },
];

const MOCK_SUITE_TESTS = [
  { id: 'TC_045', name: 'Payment via Card', module: 'Payments', data: 'Payment_Test_Users', priority: 'High' },
  { id: 'TC_001', name: 'Login Valid User', module: 'Login', data: 'Default_Auth', priority: 'High' },
  { id: 'TC_089', name: 'Wire Transfer Int', module: 'Payments', data: 'Edge_Case_Accounts', priority: 'Critical' },
  { id: 'TC_112', name: 'Portfolio Rebalance', module: 'Portfolio', data: 'Portfolio_Benchmarks', priority: 'Medium' },
  { id: 'TC_103', name: 'MFA Enrollment', module: 'User Management', data: 'MFA_Test_Accounts', priority: 'High' },
  { id: 'TC_127', name: 'API Rate Limit', module: 'API Gateway', data: 'Load_Test_Tokens', priority: 'Critical' },
  { id: 'TC_134', name: 'Notification Email', module: 'Notifications', data: 'Email_Test_Addresses', priority: 'Medium' },
  { id: 'TC_012', name: 'Logout User', module: 'Login', data: 'Default_Auth', priority: 'Low' },
  { id: 'TC_078', name: 'Portfolio View', module: 'Portfolio', data: 'Portfolio_Benchmarks', priority: 'Medium' },
  { id: 'TC_148', name: 'Report Export PDF', module: 'Reporting', data: 'Report_Date_Ranges', priority: 'Low' },
];

const PRIORITY_COLOR: Record<string, string> = {
  Critical: 'text-error font-bold',
  High: 'text-tertiary font-bold',
  Medium: 'text-on-surface-variant',
  Low: 'text-outline',
};

export const SuiteAssembly = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Payments', 'Login & Security', 'Portfolio', 'User Management', 'API Gateway', 'Notifications',
  ]);

  const toggleModule = (moduleName: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleName) ? prev.filter(m => m !== moduleName) : [...prev, moduleName]
    );
  };

  const filteredTests = MOCK_SUITE_TESTS.filter(test => {
    const matchesSearch =
      test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModules.some(m => test.module.toLowerCase().includes(m.split(' ')[0].toLowerCase()));
    return matchesSearch && matchesModule;
  });

  const totalTests = MOCK_MODULES.filter(m => selectedModules.includes(m.name)).reduce((acc, m) => acc + m.tests, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 bg-surface-container-low flex justify-between items-center shrink-0 border-b border-outline-variant/10">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Final Regression Suite Assembly</h2>
          <p className="text-sm text-secondary font-medium mt-1">Assemble the final execution payload from validated scope and data.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Save className="w-4 h-4" /> Save Suite
          </button>
          <button
            onClick={() => navigate('/execution')}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4 fill-current" /> Execute Suite
          </button>
        </div>
      </div>

      {/* 3-Column Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left: Module Selection + Params ────────────────────────────── */}
        <div className="w-72 flex flex-col border-r border-outline-variant/10 bg-surface-container-low shrink-0 overflow-y-auto no-scrollbar">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Included Modules</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{selectedModules.length}/{MOCK_MODULES.length}</span>
            </div>
            <div className="space-y-2">
              {MOCK_MODULES.map((module) => {
                const isSelected = selectedModules.includes(module.name);
                return (
                  <div
                    key={module.name}
                    onClick={() => toggleModule(module.name)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-surface-container-lowest border-primary/30 shadow-sm' : 'bg-surface-container-high border-transparent opacity-50 hover:opacity-70'}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-primary/15' : 'bg-surface-container-highest'}`}>
                      {isSelected
                        ? <CheckCircle2 className="w-4 h-4 text-primary fill-current" />
                        : <Circle className="w-4 h-4 text-outline" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold truncate block ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{module.name}</span>
                      <p className={`text-[10px] font-bold ${isSelected ? 'text-primary' : 'text-outline'}`}>{module.tests} tests</p>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Parameters */}
          <div className="p-5 border-t border-outline-variant/10 mt-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Execution Params</h3>
              <Settings className="w-4 h-4 text-outline" />
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Environment', value: 'UAT_CLUSTER_01' },
                { label: 'Parallelism', value: '12 Threads' },
                { label: 'Retry Policy', value: '2 Attempts' },
              ].map((p, i) => (
                <div key={i} className="flex justify-between text-xs bg-surface-container-lowest rounded-lg px-3 py-2">
                  <span className="text-outline font-bold uppercase tracking-tighter text-[10px]">{p.label}</span>
                  <span className="text-on-surface font-bold text-[11px]">{p.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center bg-primary/5 border border-primary/10 rounded-lg px-3 py-2.5 mt-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-tight">Est. Runtime</span>
                <span className="text-lg font-black text-primary">1h 12m</span>
              </div>
            </div>
          </div>

          {/* Total summary */}
          <div className="p-5 bg-on-surface text-surface">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total Suite Size</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black">{filteredTests.length}</span>
              <span className="text-xs font-bold opacity-70">Test Cases</span>
            </div>
          </div>
        </div>

        {/* ── Center: Suite Composition (side-by-side) ─────────────────── */}
        <section className="flex-1 flex flex-col overflow-hidden bg-surface-container-lowest">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Suite Composition</h3>
              <p className="text-[10px] text-outline mt-0.5">{filteredTests.length} test cases from {selectedModules.length} modules</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="relative w-44">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary"
                  placeholder="Search tests..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Filter className="w-4 h-4 text-outline cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-lowest z-10">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10">
                  <th className="px-5 py-3">Test ID</th>
                  <th className="px-5 py-3">Scenario Name</th>
                  <th className="px-5 py-3">Module</th>
                  <th className="px-5 py-3">Data Set</th>
                  <th className="px-5 py-3">Priority</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                {filteredTests.map((test, i) => (
                  <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 cursor-pointer">
                    <td className="px-5 py-3 font-mono text-primary font-bold">{test.id}</td>
                    <td className="px-5 py-3 font-bold text-on-surface">{test.name}</td>
                    <td className="px-5 py-3">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold">{test.module}</span>
                    </td>
                    <td className="px-5 py-3 text-on-surface-variant font-mono text-[10px]">{test.data}</td>
                    <td className={`px-5 py-3 text-[11px] ${PRIORITY_COLOR[test.priority] || ''}`}>{test.priority}</td>
                  </tr>
                ))}
                {filteredTests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-outline text-xs font-medium uppercase tracking-widest">No tests match current module selection.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Execute CTA at bottom of composition panel */}
          <div className="p-5 border-t border-outline-variant/10 bg-surface-container-low shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs font-bold text-on-surface">{filteredTests.length} tests ready across {selectedModules.length} modules</p>
                <p className="text-[10px] text-on-surface-variant">Click Execute Suite to launch in Execution View</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/execution')}
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Execute Suite
            </button>
          </div>
        </section>

        {/* ── Right: AI Audit ──────────────────────────────────────────── */}
        <aside className="w-72 border-l border-outline-variant/10 bg-surface-container-low flex flex-col p-6 space-y-5 shrink-0">
          <div className="flex items-center gap-2 text-tertiary">
            <Zap className="w-4 h-4" />
            <h3 className="text-xs font-black uppercase tracking-widest">AI Suite Audit</h3>
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
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
              <p className="text-[10px] font-bold text-outline uppercase mb-2">Coverage Check</p>
              <div className="space-y-2">
                {['Payments', 'Login', 'Portfolio'].map((mod, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="text-on-surface-variant">{mod}</span>
                    <span className="text-primary font-bold">{[91, 97, 95][i]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-auto p-4 bg-on-surface text-surface rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Est. Completion</span>
            <span className="text-2xl font-black">14:52 PM</span>
            <div className="w-full bg-surface/20 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-primary h-full w-[0%]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
