import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Search, Database, Github, GitBranch, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { AIInsightCard } from '../components/AIInsightCard';
import { useSignal } from '../context/SignalContext';

const MOCK_CHANGES = [
  { id: 'CR_101', type: 'Feature', source: 'Jira', modules: ['Payments', 'Portfolio'], impact: 'High', status: 'Pending' },
  { id: 'BUG_221', type: 'Defect Fix', source: 'Jira', modules: ['Login'], impact: 'Medium', status: 'Approved' },
  { id: 'CR_105', type: 'Feature', source: 'GitHub', modules: ['Dashboard'], impact: 'Low', status: 'Pending' },
  { id: 'BUG_230', type: 'Defect Fix', source: 'Jira', modules: ['Payments'], impact: 'High', status: 'Approved' },
];

export const ChangeSignal = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
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

  const handleDetect = () => {
    setIsDetecting(true);
    // Simulate detection process
    setTimeout(() => {
      setIsDetecting(false);
      setIsSignalDetected(true);
    }, 2000);
  };

  const handleTrigger = () => {
    if (selectedChanges.length === 0) {
      alert('Please select at least one change to trigger regression.');
      return;
    }
    alert(`Triggering regression for: ${selectedChanges.join(', ')}`);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
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
              <input 
                type="checkbox" 
                checked={configs.jira.enabled}
                onChange={(e) => setConfigs({...configs, jira: {...configs.jira, enabled: e.target.checked}})}
                className="rounded text-primary"
              />
            </div>
            <div className="space-y-2">
              <input 
                type="text" 
                value={configs.jira.url}
                onChange={(e) => setConfigs({...configs, jira: {...configs.jira, url: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary"
                placeholder="Jira URL"
              />
              <input 
                type="text" 
                value={configs.jira.project}
                onChange={(e) => setConfigs({...configs, jira: {...configs.jira, project: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary"
                placeholder="Project Key"
              />
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-secondary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Azure DevOps</span>
              </div>
              <input 
                type="checkbox" 
                checked={configs.azure.enabled}
                onChange={(e) => setConfigs({...configs, azure: {...configs.azure, enabled: e.target.checked}})}
                className="rounded text-secondary"
              />
            </div>
            <div className="space-y-2">
              <input 
                type="text" 
                value={configs.azure.url}
                onChange={(e) => setConfigs({...configs, azure: {...configs.azure, url: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-secondary"
                placeholder="Organization URL"
              />
              <input 
                type="text" 
                value={configs.azure.project}
                onChange={(e) => setConfigs({...configs, azure: {...configs.azure, project: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-secondary"
                placeholder="Project Name"
              />
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-tertiary">
                <Github className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">GIT Ingestion</span>
              </div>
              <input 
                type="checkbox" 
                checked={configs.git.enabled}
                onChange={(e) => setConfigs({...configs, git: {...configs.git, enabled: e.target.checked}})}
                className="rounded text-tertiary"
              />
            </div>
            <div className="space-y-2">
              <input 
                type="text" 
                value={configs.git.repo}
                onChange={(e) => setConfigs({...configs, git: {...configs.git, repo: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-tertiary"
                placeholder="Repository"
              />
              <input 
                type="text" 
                value={configs.git.branch}
                onChange={(e) => setConfigs({...configs, git: {...configs.git, branch: e.target.value}})}
                className="w-full bg-surface-container-lowest border-none rounded px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-tertiary"
                placeholder="Branch"
              />
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
            </div>

            <div className="bg-surface-container-lowest rounded-md overflow-hidden ring-1 ring-outline-variant/15">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
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
                      className={`hover:bg-surface-container-high transition-colors group cursor-pointer ${selectedChanges.includes(change.id) ? 'bg-primary/5' : ''}`}
                    >
                      <td className="px-4 py-3 text-xs font-bold text-primary flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedChanges.includes(change.id)}
                          onChange={() => {}} // Handled by row click
                          className="rounded border-outline-variant text-primary focus:ring-primary"
                        />
                        {change.id}
                      </td>
                      <td className="px-4 py-3 text-xs text-on-surface">{change.type}</td>
                      <td className="px-4 py-3 text-xs text-on-surface">{change.source}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {change.modules.map(module => (
                            <span key={module} className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full">{module}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${change.impact === 'High' ? 'text-error' : 'text-on-secondary-fixed-variant'}`}>
                          <span className={`w-2 h-2 rounded-full ${change.impact === 'High' ? 'bg-error' : 'bg-on-secondary-fixed-variant'}`}></span>
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
          </>
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
              <div className="pt-2">
                <span className="text-[10px] font-bold text-on-surface-variant block mb-2 uppercase">Next Step</span>
                <button 
                  onClick={() => navigate('/planning')}
                  className="w-full py-2 bg-on-surface text-surface text-xs font-bold rounded hover:opacity-90 transition-opacity"
                >
                  Go to Regression Planning
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-headline font-bold text-tertiary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">psychology</span>
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
