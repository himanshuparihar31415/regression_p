import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Plus, Search, Filter, MoreVertical, CheckCircle2, AlertCircle, RefreshCw, Link as LinkIcon, ArrowRight, Edit3, X } from 'lucide-react';

const MOCK_DATA_SETS = [
  { name: 'Payment_Test_Users', type: 'Masked', source: 'Prod_Clone', records: '5,000', status: 'Ready', date: '2h ago' },
  { name: 'Edge_Case_Accounts', type: 'Synthetic', source: 'AI_Generator', records: '250', status: 'Provisioning', date: 'In Progress' },
  { name: 'Portfolio_Benchmarks', type: 'Synthetic', source: 'Script_Gen', records: '10,000', status: 'Ready', date: '1d ago' },
  { name: 'Auth_Tokens_UAT', type: 'Masked', source: 'Auth_Service', records: '1,200', status: 'Ready', date: '3h ago' },
  { name: 'Email_Test_Addresses', type: 'Synthetic', source: 'AI_Generator', records: '500', status: 'Ready', date: '6h ago' },
  { name: 'Load_Test_Tokens', type: 'Synthetic', source: 'Script_Gen', records: '2,000', status: 'Ready', date: '1d ago' },
  { name: 'MFA_Test_Accounts', type: 'Masked', source: 'Auth_Service', records: '300', status: 'Ready', date: '4h ago' },
  { name: 'Report_Date_Ranges', type: 'Synthetic', source: 'Script_Gen', records: '150', status: 'Ready', date: '2d ago' },
];

const DATA_SET_NAMES = MOCK_DATA_SETS.map(d => d.name);

const INITIAL_MAPPINGS: Record<string, string> = {
  'TC_045': 'Payment_Test_Users',
  'TC_089': 'Edge_Case_Accounts',
  'TC_001': 'Auth_Tokens_UAT',
  'TC_112': 'Portfolio_Benchmarks',
  'TC_103': 'MFA_Test_Accounts',
  'TC_127': 'Load_Test_Tokens',
  'TC_134': 'Email_Test_Addresses',
  'TC_148': 'Report_Date_Ranges',
  'TC_078': 'Portfolio_Benchmarks',
  'TC_012': 'Auth_Tokens_UAT',
};

const TC_LIST = [
  { id: 'TC_045', name: 'Payment via Card', module: 'Payments' },
  { id: 'TC_089', name: 'Wire Transfer Int', module: 'Payments' },
  { id: 'TC_001', name: 'Login Valid User', module: 'Login' },
  { id: 'TC_012', name: 'Logout User', module: 'Login' },
  { id: 'TC_103', name: 'MFA Enrollment', module: 'User Management' },
  { id: 'TC_112', name: 'Portfolio Rebalance', module: 'Portfolio' },
  { id: 'TC_078', name: 'Portfolio View', module: 'Portfolio' },
  { id: 'TC_127', name: 'API Rate Limit', module: 'API Gateway' },
  { id: 'TC_134', name: 'Notification Email', module: 'Notifications' },
  { id: 'TC_148', name: 'Report Export PDF', module: 'Reporting' },
];

export const TestDataPlanning = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [mappings, setMappings] = useState<Record<string, string>>(INITIAL_MAPPINGS);
  const [editingTc, setEditingTc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'datasets' | 'mapping'>('datasets');

  const filteredDataSets = MOCK_DATA_SETS.filter(ds => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || ds.type === selectedType;
    return matchesSearch && matchesType;
  });

  const mappedCount = Object.keys(mappings).filter(k => mappings[k]).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 flex justify-between items-end shrink-0 border-b border-outline-variant/10">
        <div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Data & Environment Preparation</h2>
          <p className="text-sm text-secondary mt-1">Provision datasets and map them to individual test cases before execution.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Syncing with DB...')}
            className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Sync with DB
          </button>
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Plus className="w-4 h-4" /> New Data Set
          </button>
          <button
            onClick={() => navigate('/suite-definition')}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
          >
            Go to Suite Definition <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-8 pt-4 shrink-0">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-4 py-2 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'datasets' ? 'bg-surface-container-lowest text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Data Sets ({MOCK_DATA_SETS.length})
        </button>
        <button
          onClick={() => setActiveTab('mapping')}
          className={`px-4 py-2 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${activeTab === 'mapping' ? 'bg-surface-container-lowest text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Test Case Mapping
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${mappedCount === TC_LIST.length ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
            {mappedCount}/{TC_LIST.length}
          </span>
        </button>
      </div>

      <div className="flex-1 flex px-8 pb-8 gap-6 overflow-hidden">

        {/* ── Datasets Tab ───────────────────────────────────────────────── */}
        {activeTab === 'datasets' && (
          <>
            <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 flex flex-col min-w-0">
              <div className="p-4 border-b border-outline-variant/15 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                    <input
                      className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary"
                      placeholder="Search data sets..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Type:</span>
                    <select
                      className="bg-surface-container-low border-none text-[10px] font-bold rounded px-2 py-1 focus:ring-1 focus:ring-primary"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option>All Types</option>
                      <option>Synthetic</option>
                      <option>Masked</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-outline cursor-pointer" />
                  <MoreVertical className="w-4 h-4 text-outline cursor-pointer" />
                </div>
              </div>
              <div className="flex-1 overflow-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-surface-container-lowest z-10">
                    <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/15">
                      <th className="px-6 py-4">Data Set Name</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Records</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Provisioned</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {filteredDataSets.map((data, i) => (
                      <tr key={i} className="group hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/5">
                        <td className="px-6 py-4 font-bold text-on-surface">{data.name}</td>
                        <td className="px-6 py-4">
                          <span className={data.type === 'Synthetic' ? 'bg-tertiary/10 text-tertiary px-2 py-0.5 rounded text-[10px] font-bold' : 'bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold'}>
                            {data.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">{data.source}</td>
                        <td className="px-6 py-4 font-mono">{data.records}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={data.status === 'Ready' ? 'w-2 h-2 rounded-full bg-primary' : 'w-2 h-2 rounded-full bg-tertiary animate-pulse'}></div>
                            <span className="font-semibold">{data.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-outline">{data.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="w-80 flex flex-col gap-6 shrink-0">
              <div className="bg-surface-container-low rounded-xl p-6 space-y-6">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-4 h-4" /> Data Strategy
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-on-surface">Compliance</span>
                      <CheckCircle2 className="w-4 h-4 text-primary fill-current" />
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">All PII data is masked using AES-256 standards for UAT environment.</p>
                  </div>
                  <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-on-surface">Data Freshness</span>
                      <AlertCircle className="w-4 h-4 text-tertiary" />
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">Payment data set is 48h old. Recommend re-syncing before execution.</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-on-surface text-surface text-xs font-bold rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Provision All Data
                </button>
              </div>
              <div className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-tertiary">
                  <h4 className="text-[11px] font-bold uppercase tracking-tight">AI Data Generation</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Detected missing scenarios for <span className="font-bold">International Wire Transfers</span>. AI can generate 50 synthetic records with valid SWIFT codes.</p>
                <button className="text-[10px] font-bold text-tertiary uppercase tracking-widest hover:underline text-left">Generate Now →</button>
              </div>
            </aside>
          </>
        )}

        {/* ── Mapping Tab ────────────────────────────────────────────────── */}
        {activeTab === 'mapping' && (
          <>
            <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 flex flex-col min-w-0">
              <div className="p-4 border-b border-outline-variant/15 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-on-surface">Test Case → Dataset Mapping</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Associate each test case with its required dataset. Changes are saved automatically.</p>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded ${mappedCount === TC_LIST.length ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                  {mappedCount}/{TC_LIST.length} mapped
                </span>
              </div>
              <div className="flex-1 overflow-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-surface-container-lowest z-10">
                    <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/15">
                      <th className="px-6 py-4">Test Case ID</th>
                      <th className="px-6 py-4">Test Case Name</th>
                      <th className="px-6 py-4">Module</th>
                      <th className="px-6 py-4">Mapped Dataset</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {TC_LIST.map((tc) => {
                      const mapped = mappings[tc.id];
                      const isEditing = editingTc === tc.id;
                      const dataset = MOCK_DATA_SETS.find(d => d.name === mapped);
                      return (
                        <tr key={tc.id} className={`border-b border-outline-variant/5 transition-colors ${isEditing ? 'bg-primary/5' : 'hover:bg-surface-container-high'}`}>
                          <td className="px-6 py-3 font-mono text-primary font-bold">{tc.id}</td>
                          <td className="px-6 py-3 font-bold text-on-surface">{tc.name}</td>
                          <td className="px-6 py-3 text-on-surface-variant">{tc.module}</td>
                          <td className="px-6 py-3">
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <select
                                  value={mapped || ''}
                                  onChange={(e) => setMappings(prev => ({ ...prev, [tc.id]: e.target.value }))}
                                  className="bg-surface-container-low border border-primary/30 rounded px-2 py-1 text-[11px] font-bold text-on-surface focus:ring-1 focus:ring-primary"
                                  autoFocus
                                >
                                  <option value="">— Select dataset —</option>
                                  {DATA_SET_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <button onClick={() => setEditingTc(null)} className="text-outline hover:text-on-surface">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 group/cell">
                                {mapped ? (
                                  <span className="font-mono text-[11px] font-bold text-on-surface bg-surface-container-high px-2 py-0.5 rounded">{mapped}</span>
                                ) : (
                                  <span className="text-[11px] text-outline italic">Not mapped</span>
                                )}
                                <button
                                  onClick={() => setEditingTc(tc.id)}
                                  className="opacity-0 group-hover/cell:opacity-100 transition-opacity text-outline hover:text-primary"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-3">
                            {mapped ? (
                              <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${dataset?.status === 'Ready' ? 'bg-primary' : 'bg-tertiary animate-pulse'}`} />
                                <span className={`text-[10px] font-bold ${dataset?.status === 'Ready' ? 'text-primary' : 'text-tertiary'}`}>
                                  {dataset?.status || 'Ready'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-error">Unmapped</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="w-72 flex flex-col gap-4 shrink-0">
              <div className="bg-surface-container-low rounded-xl p-5 space-y-4">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Mapping Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant">Fully Mapped</span>
                    <span className="text-primary">{mappedCount}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${(mappedCount / TC_LIST.length) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant">Unmapped</span>
                    <span className="text-error">{TC_LIST.length - mappedCount}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const auto: Record<string, string> = {};
                    TC_LIST.forEach((tc, i) => { auto[tc.id] = DATA_SET_NAMES[i % DATA_SET_NAMES.length]; });
                    setMappings(auto);
                  }}
                  className="w-full py-2 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-primary/20 transition-colors"
                >
                  Auto-Map All (AI)
                </button>
              </div>
              <div className="bg-tertiary/5 border-l-4 border-tertiary rounded-xl p-5">
                <p className="text-[10px] font-bold text-tertiary uppercase mb-2">Validation</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {mappedCount === TC_LIST.length
                    ? 'All test cases have datasets mapped. Ready for suite definition.'
                    : `${TC_LIST.length - mappedCount} test case(s) still need a dataset before execution.`}
                </p>
              </div>
              <button
                onClick={() => navigate('/suite-definition')}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Proceed to Suite Definition <ArrowRight className="w-4 h-4" />
              </button>
            </aside>
          </>
        )}
      </div>
    </div>
  );
};
