import React, { useState } from 'react';
import { Save, Rocket, GripVertical, AlertTriangle, Zap, TrendingUp, Search, Plus, CheckCircle, Camera, History, ShieldCheck } from 'lucide-react';

const MOCK_TAGS = [
  { label: '@regression', color: 'primary' },
  { label: '@smoke', color: 'secondary' },
  { label: '@critical', color: 'error' },
  { label: '@high-risk', color: 'tertiary' },
  { label: '@core-flow', color: 'primary' },
];

const MOCK_SUITES = [
  { id: 'S_001', title: 'Smoke Regression', subtitle: 'Minimal Health Check Base', tests: 12, tags: ['@smoke', '@regression', '@core-flow'], status: 'Approved', version: 'v1.4.0', risk: 'Low' },
  { id: 'S_002', title: 'Core Regression', subtitle: 'Main Functionality & Flows', tests: 48, tags: ['@regression', '@high-risk', '@core-flow'], status: 'Approved', version: 'v1.4.2', risk: 'Medium' },
  { id: 'S_003', title: 'Payments Regression', subtitle: 'Transactional Integrity', tests: 114, tags: ['@critical', '@regression', '@high-risk'], status: 'Under Review', version: 'v1.5.0-rc', risk: 'High' },
  { id: 'S_004', title: 'Extended Regression', subtitle: 'Deep Coverage / Major Release', tests: 320, tags: ['@regression', '@extended'], status: 'Draft', version: 'v2.0.0-alpha', risk: 'High' },
];

export const TaggingGrouping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suites, setSuites] = useState(MOCK_SUITES);
  const [selectedSuiteId, setSelectedSuiteId] = useState(MOCK_SUITES[0].id);
  const [isSaving, setIsSaving] = useState(false);

  const selectedSuite = suites.find(s => s.id === selectedSuiteId) || suites[0];

  const filteredSuites = suites.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Workspace saved successfully.');
    }, 1200);
  };

  const handleApprove = (id: string) => {
    setSuites(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
    alert('Suite approved by QA Lead.');
  };

  const handleSnapshot = () => {
    alert(`Snapshot created for ${selectedSuite.title} - ${selectedSuite.version}`);
  };

  const handleAutoTag = () => {
    alert('AI is identifying test cases based on business criticality and risk... Tags applied.');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-4 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Regression Tagging & Grouping</h1>
          <p className="text-xs text-secondary font-medium mt-1 uppercase tracking-widest">Workspace / Test Management / Tagging & Versioning</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSnapshot}
            className="bg-surface-container-highest px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors"
          >
            <Camera className="w-4 h-4" /> SNAPSHOT
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-surface-container-highest px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'SAVING...' : 'SAVE'}
          </button>
          <button 
            onClick={() => alert('Committing changes to pipeline...')}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
          >
            <Rocket className="w-4 h-4" /> COMMIT TO PIPELINE
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto space-y-8 no-scrollbar">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-secondary">Global Tags & Labels</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3 h-3" />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-surface-container-low border-none rounded-full pl-8 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary w-32" 
                    placeholder="Search suites..." 
                    type="text"
                  />
                </div>
                <button 
                  onClick={handleAutoTag}
                  className="text-[10px] text-primary bg-primary-fixed px-3 py-1 rounded-full font-bold flex items-center gap-1 hover:brightness-95"
                >
                  <Zap className="w-3 h-3" /> AI AUTO-TAG
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {MOCK_TAGS.map((tag) => (
                <div key={tag.label} className={`group cursor-grab active:cursor-grabbing px-3 py-1.5 bg-surface-container-lowest rounded-md shadow-sm flex items-center gap-2 border-l-4 border-${tag.color}`}>
                  <span className={`text-sm font-semibold text-${tag.color}`}>{tag.label}</span>
                  <GripVertical className="w-3 h-3 text-outline opacity-0 group-hover:opacity-100" />
                </div>
              ))}
              <button className="px-3 py-1.5 bg-surface-container-low border border-dashed border-outline-variant rounded-md flex items-center gap-2 text-[10px] font-bold text-outline hover:bg-surface-container-high transition-colors">
                <Plus className="w-3 h-3" /> NEW TAG
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6">
            {filteredSuites.map((suite) => (
              <div 
                key={suite.id} 
                onClick={() => setSelectedSuiteId(suite.id)}
                className={`bg-surface-container-lowest p-5 rounded-lg border transition-all cursor-pointer ${selectedSuiteId === suite.id ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-outline-variant/20 hover:shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-on-surface">{suite.title}</h3>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        suite.status === 'Approved' ? 'bg-primary/10 text-primary' : 
                        suite.status === 'Under Review' ? 'bg-tertiary/10 text-tertiary' : 
                        'bg-surface-container-highest text-outline'
                      }`}>
                        {suite.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-outline uppercase">{suite.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-secondary-container bg-on-secondary-container px-2 py-1 rounded block mb-1">{suite.tests} Tests</span>
                    <span className="text-[9px] font-mono text-outline">{suite.version}</span>
                  </div>
                </div>
                <div className="min-h-[80px] border-2 border-dashed border-outline-variant/30 rounded-md p-2 flex flex-wrap gap-2 items-start content-start bg-surface-container-low/30 mb-4">
                  {suite.tags.map(tag => (
                    <div key={tag} className="px-2 py-1 bg-surface-container-highest text-on-surface-variant rounded text-[11px] font-bold">{tag}</div>
                  ))}
                  <button className="px-2 py-1 bg-surface-container-low text-outline rounded text-[10px] font-bold border border-dashed border-outline-variant/50 hover:bg-surface-container-high transition-colors">
                    + Add
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-outline uppercase">Risk:</span>
                    <span className={`text-[10px] font-bold uppercase ${
                      suite.risk === 'High' ? 'text-error' : 
                      suite.risk === 'Medium' ? 'text-tertiary' : 
                      'text-primary'
                    }`}>{suite.risk}</span>
                  </div>
                  {suite.status !== 'Approved' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleApprove(suite.id); }}
                      className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredSuites.length === 0 && (
              <div className="col-span-2 text-center py-12 text-outline text-xs font-medium uppercase tracking-widest">No suites found matching your search.</div>
            )}
          </section>
        </div>

        <aside className="w-80 border-l border-outline-variant/20 flex flex-col bg-surface-container-low shrink-0 overflow-y-auto no-scrollbar">
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Suite Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Target Environment</label>
                <select className="w-full bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm border-none focus:ring-1 focus:ring-primary">
                  <option>UAT</option>
                  <option>QA</option>
                  <option>Pre-Prod</option>
                  <option>Production (Smoke Only)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Mapped Pipeline</label>
                <div className="bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm font-mono flex justify-between items-center">
                  <span>nightly_regression</span>
                  <History className="w-3 h-3 text-outline" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase mb-1">Active Version</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={selectedSuite.version}
                    readOnly
                    className="flex-1 bg-surface-container-highest px-3 py-2 rounded font-semibold text-sm border-none"
                  />
                  <button onClick={handleSnapshot} className="p-2 bg-primary/10 text-primary rounded hover:bg-primary/20">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-indigo-50/40 dark:bg-indigo-950/20 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary font-headline">Risk-Based Insights</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 rounded-lg border-l-4 border-tertiary shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-tertiary" />
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-tight">Criticality Alert</span>
                </div>
                <p className="text-xs text-on-surface leading-relaxed">
                  <span className="font-bold">Payments</span> suite has 14% high-risk dependency overlap. Recommend adding 3 more edge-case scenarios.
                </p>
                <button className="mt-3 text-[10px] font-bold text-tertiary hover:underline uppercase">Identify Tests</button>
              </div>
              
              <div className="p-4 bg-tertiary/5 rounded-lg border border-tertiary/10">
                <div className="text-[10px] font-bold text-tertiary uppercase mb-2">Impact Analysis</div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mb-2">
                  Recent commits to <span className="font-bold">Auth Service</span> impact 22 test cases in the Smoke suite.
                </p>
                <div className="h-1.5 w-full bg-tertiary/10 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[94%]"></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] font-bold text-tertiary">Confidence</span>
                  <span className="text-[10px] font-bold text-tertiary">94%</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Regression Health Trend</div>
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

