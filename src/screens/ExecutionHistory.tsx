import React from 'react';
import { History, Search, Filter, MoreVertical, ChevronRight, Zap, Clock, ShieldCheck, PlayCircle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const MOCK_HISTORY = [
  { id: 'RUN-4829', name: 'Regression Suite v2.4', date: '2h ago', duration: '14m 22s', total: 124, passed: 120, failed: 4, status: 'Completed', type: 'Nightly' },
  { id: 'RUN-4828', name: 'Sanity Check - PR #142', date: '5h ago', duration: '3m 45s', total: 24, passed: 24, failed: 0, status: 'Completed', type: 'PR Trigger' },
  { id: 'RUN-4827', name: 'Smoke Test - Staging', date: '1d ago', duration: '5m 12s', total: 45, passed: 42, failed: 3, status: 'Completed', type: 'Manual' },
  { id: 'RUN-4826', name: 'Regression Suite v2.4', date: '1d ago', duration: '15m 02s', total: 124, passed: 118, failed: 6, status: 'Completed', type: 'Nightly' },
  { id: 'RUN-4825', name: 'Payment Module Deep Dive', date: '2d ago', duration: '22m 45s', total: 86, passed: 86, failed: 0, status: 'Completed', type: 'Manual' },
];

export const ExecutionHistory = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Execution History</h2>
          <p className="text-sm text-secondary font-medium mt-1">Review past test runs, performance trends, and historical data.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Export History</button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <History className="w-4 h-4" /> Compare Runs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Runs (30d)', value: '142', icon: PlayCircle, color: 'primary' },
          { label: 'Avg Pass Rate', value: '96.4%', icon: CheckCircle2, color: 'tertiary' },
          { label: 'Avg Duration', value: '12m 45s', icon: Clock, color: 'secondary' },
          { label: 'Failed Runs', value: '12', icon: XCircle, color: 'error' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
            <div className={`p-3 bg-${stat.color === 'error' ? 'error' : stat.color}/10 rounded-xl`}>
              <stat.icon className={`w-6 h-6 text-${stat.color === 'error' ? 'error' : stat.color}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{stat.label}</span>
              <span className="text-xl font-black text-on-surface">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Historical Runs</h3>
          <div className="flex gap-4">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              <input className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" placeholder="Search runs..." type="text"/>
            </div>
            <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
              <Filter className="w-4 h-4 text-outline" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10">
                <th className="px-6 py-3">Run ID</th>
                <th className="px-6 py-3">Suite Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Results</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {MOCK_HISTORY.map((run, i) => (
                <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-primary font-bold">{run.id}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{run.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{run.date}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{run.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-1.5 w-24 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${(run.passed / run.total) * 100}%` }}></div>
                        <div className="bg-error h-full" style={{ width: `${(run.failed / run.total) * 100}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-outline">{run.passed}/{run.total}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">{run.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {run.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-surface-container-highest rounded transition-colors">
                      <ChevronRight className="w-4 h-4 text-outline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
