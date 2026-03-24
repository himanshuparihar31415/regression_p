import React, { useState } from 'react';
import { Database, Plus, Search, Filter, MoreVertical, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const MOCK_DATA_SETS = [
  { name: 'Payment_Test_Users', type: 'Masked', source: 'Prod_Clone', records: '5,000', status: 'Ready', date: '2h ago' },
  { name: 'Edge_Case_Accounts', type: 'Synthetic', source: 'AI_Generator', records: '250', status: 'Provisioning', date: 'In Progress' },
  { name: 'Portfolio_Benchmarks', type: 'Synthetic', source: 'Script_Gen', records: '10,000', status: 'Ready', date: '1d ago' },
  { name: 'Auth_Tokens_UAT', type: 'Masked', source: 'Auth_Service', records: '1,200', status: 'Ready', date: '3h ago' },
];

export const TestDataPlanning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredDataSets = MOCK_DATA_SETS.filter(ds => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || ds.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Test Data Planning</h2>
          <p className="text-sm text-secondary mt-1">Architecting and provisioning synthetic and masked data for regression cycles.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Syncing with DB...')}
            className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Sync with DB
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Data Set
          </button>
        </div>
      </div>

      <div className="flex-1 flex px-8 pb-8 gap-6 overflow-hidden">
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
                      <span className={data.type === 'Synthetic' ? "bg-tertiary/10 text-tertiary px-2 py-0.5 rounded text-[10px] font-bold" : "bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold"}>
                        {data.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{data.source}</td>
                    <td className="px-6 py-4 font-mono">{data.records}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={data.status === 'Ready' ? "w-2 h-2 rounded-full bg-primary" : "w-2 h-2 rounded-full bg-tertiary animate-pulse"}></div>
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
              <span className="material-symbols-outlined text-lg">psychology</span>
              <h4 className="text-[11px] font-bold uppercase tracking-tight">AI Data Generation</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Detected missing scenarios for <span className="font-bold">International Wire Transfers</span>. AI can generate 50 synthetic records with valid SWIFT codes.</p>
            <button className="text-[10px] font-bold text-tertiary uppercase tracking-widest hover:underline text-left">Generate Now →</button>
          </div>
        </aside>
      </div>
    </div>
  );
};
