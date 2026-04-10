import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Search, Database, Github, RefreshCw, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { AIInsightCard } from '../components/AIInsightCard';
import { useSignal } from '../context/SignalContext';

const DETECTION_PHASES = [
  { pct: 0,  msg: 'Initializing ingestion connectors...' },
  { pct: 10, msg: 'Connecting to Jira (PROJ-A)...' },
  { pct: 20, msg: 'Authenticating with GitHub API...' },
  { pct: 30, msg: 'Fetching open change records from source...' },
  { pct: 40, msg: 'Scanning Git diff — branch: main...' },
  { pct: 52, msg: 'Parsing commit history & PR metadata...' },
  { pct: 62, msg: 'Analyzing semantic impact signatures...' },
  { pct: 71, msg: 'Mapping changes to test modules...' },
  { pct: 80, msg: 'Buffering signal payload...' },
  { pct: 88, msg: 'Cross-referencing dependency graph...' },
  { pct: 94, msg: 'Classifying regression risk levels...' },
  { pct: 99, msg: 'Finalizing signal registry...' },
];

const MOCK_CHANGES = [
  { id: 'CR_101', type: 'Feature', source: 'Jira', modules: ['Payments', 'Portfolio'], impact: 'High', status: 'Pending' },
  { id: 'BUG_221', type: 'Defect Fix', source: 'Jira', modules: ['Login'], impact: 'Medium', status: 'Approved' },
  { id: 'CR_105', type: 'Feature', source: 'GitHub', modules: ['Dashboard'], impact: 'Low', status: 'Pending' },
  { id: 'BUG_230', type: 'Defect Fix', source: 'Jira', modules: ['Payments'], impact: 'High', status: 'Approved' },
  { id: 'CR_112', type: 'Enhancement', source: 'Jira', modules: ['Notifications', 'User Management'], impact: 'Medium', status: 'Approved' },
  { id: 'BUG_245', type: 'Defect Fix', source: 'GitHub', modules: ['API Gateway'], impact: 'High', status: 'Pending' },
  { id: 'CR_118', type: 'Feature', source: 'Azure DevOps', modules: ['Reporting'], impact: 'Low', status: 'Approved' },
  { id: 'BUG_251', type: 'Defect Fix', source: 'Jira', modules: ['Login', 'User Management'], impact: 'High', status: 'Pending' },
  { id: 'CR_124', type: 'Enhancement', source: 'GitHub', modules: ['Portfolio', 'Dashboard'], impact: 'Medium', status: 'Approved' },
  { id: 'BUG_262', type: 'Defect Fix', source: 'Jira', modules: ['Payments', 'API Gateway'], impact: 'High', status: 'Pending' },
];


export const ChangeSignal = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectPct, setDetectPct] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { isSignalDetected, setIsSignalDetected } = useSignal();

  const [configs, setConfigs] = useState({
    jira: { url: 'https://jira.company.com', project: 'PROJ-A', enabled: true },
    azure: { url: 'https://dev.azure.com/org', project: 'Core-App', enabled: false },
    git: { repo: 'company/main-repo', branch: 'main', enabled: true }
  });

  const filteredChanges = MOCK_CHANGES.filter(change =>
    change.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    change.modules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSelection = (id: string) => {
    setSelectedChanges(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleDetect = () => {
    setIsDetecting(true);
    setDetectPct(0);
    setPhaseIdx(0);
    // ~18 seconds: increment by 1 every 180ms
    intervalRef.current = setInterval(() => {
      setDetectPct(prev => {
        const next = prev + 1;
        const nextPhase = DETECTION_PHASES.filter(p => p.pct <= next).length - 1;
        setPhaseIdx(Math.max(0, nextPhase));
        if (next >= 100) {
          clearInterval(intervalRef.current!);
          setTimeout(() => {
            setIsDetecting(false);
            setIsSignalDetected(true);
          }, 600);
        }
        return Math.min(next, 100);
      });
    }, 180);
  };

  const handleTrigger = () => {
    if (selectedChanges.length === 0) {
      alert('Please select at least one change to trigger regression.');
      return;
    }
    alert(`Triggering regression for: ${selectedChanges.join(', ')}`);
  };

  const handleGoToPlanning = () => navigate('/planning');

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main scrollable section */}
      <section className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 no-scrollbar">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Change Signal</h2>
            <p className="text-sm text-on-surface-variant font-medium">Configure ingestion sources and detect signals for regression planning.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDetect}
              disabled={isDetecting}
              className="px-5 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-md shadow-sm hover:opacity-90 transition-opacity uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
            >
              {isDetecting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              {isDetecting ? 'Detecting...' : 'Detect Signals'}
            </button>
            {isSignalDetected && (
              <button
                onClick={handleTrigger}
                className="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-bold rounded-md shadow-sm hover:opacity-90 transition-opacity uppercase tracking-wider flex items-center gap-2"
              >
                <Play className="w-3 h-3 fill-current" />
                Trigger Regression ({selectedChanges.length})
              </button>
            )}
          </div>
        </div>

        {/* Ingestion Configuration */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Database className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Jira Config</span>
              </div>
              <input type="checkbox" checked={configs.jira.enabled} onChange={(e) => setConfigs({ ...configs, jira: { ...configs.jira, enabled: e.target.checked } })} className="rounded text-primary" />
            </div>
            <div className="space-y-2">
              <input type="text" value={configs.jira.url} onChange={(e) => setConfigs({ ...configs, jira: { ...configs.jira, url: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary" placeholder="Jira URL" />
              <input type="text" value={configs.jira.project} onChange={(e) => setConfigs({ ...configs, jira: { ...configs.jira, project: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary" placeholder="Project Key" />
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-secondary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Azure DevOps</span>
              </div>
              <input type="checkbox" checked={configs.azure.enabled} onChange={(e) => setConfigs({ ...configs, azure: { ...configs.azure, enabled: e.target.checked } })} className="rounded text-secondary" />
            </div>
            <div className="space-y-2">
              <input type="text" value={configs.azure.url} onChange={(e) => setConfigs({ ...configs, azure: { ...configs.azure, url: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-secondary" placeholder="Organization URL" />
              <input type="text" value={configs.azure.project} onChange={(e) => setConfigs({ ...configs, azure: { ...configs.azure, project: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-secondary" placeholder="Project Name" />
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-tertiary">
                <Github className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">GIT Ingestion</span>
              </div>
              <input type="checkbox" checked={configs.git.enabled} onChange={(e) => setConfigs({ ...configs, git: { ...configs.git, enabled: e.target.checked } })} className="rounded text-tertiary" />
            </div>
            <div className="space-y-2">
              <input type="text" value={configs.git.repo} onChange={(e) => setConfigs({ ...configs, git: { ...configs.git, repo: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-tertiary" placeholder="Repository" />
              <input type="text" value={configs.git.branch} onChange={(e) => setConfigs({ ...configs, git: { ...configs.git, branch: e.target.value } })} className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-tertiary" placeholder="Branch" />
            </div>
          </div>
        </div>

        {isSignalDetected ? (
          <>
            <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search detected signals..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="text-[10px] text-on-surface-variant font-bold">{filteredChanges.length} signals</span>
            </div>

            {/* Scrollable signals table */}
            <div className="bg-surface-container-lowest rounded-md overflow-hidden ring-1 ring-outline-variant/15">
              <div className="max-h-72 overflow-y-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-surface-container-low">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Signal ID</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Type</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Source</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Impacted Modules</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Regression Impact</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {filteredChanges.map((change) => (
                      <tr
                        key={change.id}
                        onClick={() => toggleSelection(change.id)}
                        className={`hover:bg-surface-container-high transition-colors cursor-pointer ${selectedChanges.includes(change.id) ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : ''}`}
                      >
                        <td className="px-4 py-3 text-xs font-bold text-primary flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedChanges.includes(change.id)}
                            onChange={() => {}}
                            className="rounded border-outline-variant text-primary focus:ring-primary"
                          />
                          {change.id}
                        </td>
                        <td className="px-4 py-3 text-xs text-on-surface">{change.type}</td>
                        <td className="px-4 py-3 text-xs text-on-surface">{change.source}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {change.modules.map(module => (
                              <span key={module} className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full">{module}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1.5 text-xs font-bold ${change.impact === 'High' ? 'text-error' : change.impact === 'Medium' ? 'text-tertiary' : 'text-on-secondary-fixed-variant'}`}>
                            <span className={`w-2 h-2 rounded-full ${change.impact === 'High' ? 'bg-error' : change.impact === 'Medium' ? 'bg-tertiary' : 'bg-on-secondary-fixed-variant'}`}></span>
                            {change.impact}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-sm ${change.status === 'Approved' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                            {change.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prominent "Go to Regression Planning" CTA — appears when signals are selected */}
            {selectedChanges.length > 0 && (
              <div className="bg-gradient-to-r from-primary to-primary-container rounded-xl p-5 flex items-center justify-between shadow-lg ring-1 ring-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-on-primary" />
                  </div>
                  <div>
                    <p className="text-on-primary font-black text-sm">{selectedChanges.length} signal{selectedChanges.length > 1 ? 's' : ''} selected — Ready for Regression Planning</p>
                    <p className="text-on-primary/70 text-[11px] mt-0.5">
                      {selectedChanges.join(' · ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleGoToPlanning}
                  className="bg-white text-primary px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md hover:bg-on-primary/10 hover:text-on-primary transition-all flex items-center gap-2 shrink-0"
                >
                  Go to Regression Planning <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : isDetecting ? (
          /* ── Detection progress UI ── */
          <div className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-surface-container-low/40 border border-outline-variant/10 p-10 space-y-8">
            {/* Spinning ring + percentage */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-outline-variant/20" />
                <circle
                  cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - detectPct / 100)}`}
                  className="text-primary transition-all duration-150"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Zap className="w-5 h-5 text-primary mb-0.5" />
                <span className="text-2xl font-black text-on-surface tabular-nums">{detectPct}%</span>
              </div>
            </div>

            {/* Current phase message */}
            <div className="text-center space-y-1.5">
              <p className="text-sm font-bold text-on-surface tracking-tight">
                {DETECTION_PHASES[phaseIdx]?.msg}
              </p>
              <p className="text-[11px] text-on-surface-variant">
                Scanning {configs.jira.enabled ? 'Jira · ' : ''}{configs.git.enabled ? 'GitHub · ' : ''}{configs.azure.enabled ? 'Azure DevOps' : ''}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-sm space-y-1.5">
              <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-150"
                  style={{ width: `${detectPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant font-medium px-0.5">
                <span>Phase {Math.min(phaseIdx + 1, DETECTION_PHASES.length)} of {DETECTION_PHASES.length}</span>
                <span>{detectPct}% complete</span>
              </div>
            </div>

            {/* Phase log */}
            <div className="w-full max-w-sm bg-surface-container-lowest rounded-xl p-4 space-y-1.5 font-mono text-[10px] text-on-surface-variant max-h-36 overflow-hidden">
              {DETECTION_PHASES.slice(0, phaseIdx + 1).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className={`w-3 h-3 shrink-0 ${i < phaseIdx ? 'text-primary' : 'text-outline animate-pulse'}`} />
                  <span className={i < phaseIdx ? 'text-on-surface-variant' : 'text-on-surface font-bold'}>{p.msg}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/20 rounded-2xl bg-surface-container-low/30 p-12 text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <RefreshCw className="w-8 h-8 text-primary opacity-50" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface">No Signals Detected</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mx-auto">Configure your ingestion sources above and click "Detect Signals" to identify changes requiring regression.</p>
            </div>
            <button
              onClick={handleDetect}
              className="px-6 py-2 bg-primary text-on-primary text-xs font-bold rounded-full shadow-md hover:opacity-90 transition-opacity uppercase tracking-widest"
            >
              Start Detection
            </button>
          </div>
        )}
      </section>

      {/* Right sidebar */}
      <aside className="w-80 bg-surface-container-low border-l border-outline-variant/10 flex flex-col p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">analytics</span>
            Signal Analysis
          </h3>
          <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
              <span className="text-xs text-on-secondary-fixed-variant">Active Sources</span>
              <div className="flex gap-1">
                {configs.jira.enabled && <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">Jira</span>}
                {configs.git.enabled && <span className="px-1.5 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">GIT</span>}
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
              <span className="text-xs text-on-secondary-fixed-variant">Detection Status</span>
              <span className={`text-xs font-bold ${isSignalDetected ? 'text-primary' : 'text-outline'}`}>
                {isSignalDetected ? 'Completed' : 'Idle'}
              </span>
            </div>
            {isSignalDetected && (
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                <span className="text-xs text-on-secondary-fixed-variant">Signals Found</span>
                <span className="text-xs font-black text-primary">{MOCK_CHANGES.length}</span>
              </div>
            )}
            {isSignalDetected && (
              <div className="pt-2">
                <span className="text-[10px] font-bold text-on-surface-variant block mb-2 uppercase">Next Step</span>
                <button
                  onClick={handleGoToPlanning}
                  className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-black rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                >
                  Go to Regression Planning <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-headline font-bold text-tertiary uppercase tracking-widest flex items-center gap-2">
              AI Insights
            </h3>
            <span className={`w-2 h-2 rounded-full bg-tertiary ${isDetecting ? 'animate-pulse' : ''}`}></span>
          </div>
          <div className="space-y-3">
            <AIInsightCard
              title="Ingestion Health"
              description="Jira and GIT connections are stable. Azure DevOps is currently disabled."
              type="info"
            />
            {isSignalDetected && (
              <AIInsightCard
                title="Regression Required"
                description="12/18 changes require regression due to high dependency overlap in shared libraries."
                type="warning"
              />
            )}
            <div className="mt-4 p-4 border border-dashed border-tertiary/30 rounded-lg text-center">
              <span className="material-symbols-outlined text-tertiary text-lg mb-1 block">auto_awesome</span>
              <p className="text-[10px] text-on-tertiary-fixed-variant italic">
                {isDetecting ? 'Analyzing codebase for semantic triggers...' : 'Ready for signal detection'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
