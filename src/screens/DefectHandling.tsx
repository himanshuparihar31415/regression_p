import React, { useState } from 'react';
import { Bug, Plus, Search, Filter, MoreVertical, ExternalLink, AlertCircle, CheckCircle2, Clock, User } from 'lucide-react';

const MOCK_DEFECTS = [
  { id: 'JIRA-402', summary: 'Payment gateway timeout on multi-currency settlement', priority: 'Critical', assignee: 'JD', status: 'Open', tests: 3 },
  { id: 'JIRA-398', summary: 'MFA recovery flow UI glitch on mobile viewport', priority: 'High', assignee: 'HP', status: 'In Progress', tests: 1 },
  { id: 'JIRA-385', summary: 'Portfolio rebalance logic error for zero-balance accounts', priority: 'Medium', assignee: 'SA', status: 'Resolved', tests: 2 },
  { id: 'JIRA-410', summary: 'Login session expiration not triggering redirect', priority: 'High', assignee: 'HP', status: 'Open', tests: 1 },
];

export const DefectHandling = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const filteredDefects = MOCK_DEFECTS.filter(defect => {
    const matchesSearch = defect.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         defect.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || defect.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Defect Handling</h2>
          <p className="text-sm text-secondary font-medium mt-1">Logging, tracking, and linking regression failures to enterprise defect management systems.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Open Jira
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Log New Defect
          </button>
        </div>
      </div>

      <div className="flex-1 flex px-8 pb-8 gap-6 overflow-hidden">
        <section className="flex-1 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col min-w-0">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                <input 
                  className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary" 
                  placeholder="Search defects..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Status:</span>
                <select 
                  className="bg-surface-container-low border-none text-[10px] font-bold rounded px-2 py-1 focus:ring-1 focus:ring-primary"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
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
                <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10 bg-surface-container-low">
                  <th className="px-6 py-4">Defect ID</th>
                  <th className="px-6 py-4">Summary</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Assignee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Linked Tests</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filteredDefects.map((defect, i) => (
                  <tr key={i} className="group hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/5">
                    <td className="px-6 py-4 font-mono text-primary font-bold">{defect.id}</td>
                    <td className="px-6 py-4 font-bold text-on-surface max-w-xs truncate">{defect.summary}</td>
                    <td className="px-6 py-4">
                      <span className={defect.priority === 'Critical' ? 'text-error font-bold' : 'text-on-surface-variant font-bold'}>{defect.priority}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <User className="w-3 h-3 text-outline" />
                        </div>
                        <span className="font-medium">{defect.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={defect.status === 'Resolved' ? 'bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase' : 'bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase'}>
                        {defect.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">{defect.tests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-6">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Defect Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-on-surface">Resolution Rate</span>
                  <span className="text-xs font-bold text-primary">82%</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[82%]"></div>
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-on-surface">Avg Triage Time</span>
                  <Clock className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xl font-black text-on-surface">2.4h</span>
              </div>
            </div>
          </div>

          <div className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              <h4 className="text-[11px] font-bold uppercase tracking-tight">AI Defect Prediction</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Based on current code churn in <span className="font-bold">Portfolio</span> module, AI predicts a <span className="font-bold text-tertiary">65% probability</span> of new defects in the next sprint.
            </p>
            <div className="p-3 bg-white/40 rounded-lg border border-tertiary/10">
              <p className="text-[10px] font-bold text-tertiary uppercase mb-1">Prevention Strategy</p>
              <p className="text-[11px] text-on-surface-variant">Increase unit test coverage for rebalance logic by 20%.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
