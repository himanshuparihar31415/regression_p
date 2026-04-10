import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle2, XCircle, Clock, TrendingUp, Download, Share2, Filter, Search } from 'lucide-react';

const trendData = [
  { name: 'Mon', pass: 92, fail: 8 },
  { name: 'Tue', pass: 94, fail: 6 },
  { name: 'Wed', pass: 88, fail: 12 },
  { name: 'Thu', pass: 96, fail: 4 },
  { name: 'Fri', pass: 94, fail: 6 },
  { name: 'Sat', pass: 97, fail: 3 },
  { name: 'Sun', pass: 91, fail: 9 },
];

const MOCK_HISTORY = [
  { id: 'RUN_1024', suite: 'Core Regression', env: 'UAT', duration: '1h 12m', pass: '94.2%', status: 'Completed' },
  { id: 'RUN_1023', suite: 'Smoke Test', env: 'QA', duration: '15m', pass: '100%', status: 'Completed' },
  { id: 'RUN_1022', suite: 'Extended Suite', env: 'Pre-Prod', duration: '4h 22m', pass: '88.4%', status: 'Completed' },
  { id: 'RUN_1021', suite: 'Payments Regression', env: 'UAT', duration: '58m', pass: '91.7%', status: 'Completed' },
  { id: 'RUN_1020', suite: 'Security & Auth', env: 'QA', duration: '22m', pass: '97.2%', status: 'Completed' },
  { id: 'RUN_1019', suite: 'API Gateway Regression', env: 'Pre-Prod', duration: '34m', pass: '89.3%', status: 'Completed' },
  { id: 'RUN_1018', suite: 'Core Regression', env: 'UAT', duration: '1h 08m', pass: '96.1%', status: 'Completed' },
  { id: 'RUN_1017', suite: 'Smoke Test', env: 'QA', duration: '13m', pass: '100%', status: 'Completed' },
];

export const Results = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const filteredHistory = MOCK_HISTORY.filter(run => 
    run.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    run.suite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report exported successfully.');
    }, 1500);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface">Result Collection & Aggregation</h2>
          <p className="text-sm text-secondary font-medium mt-1">Holistic view of regression outcomes, trends, and quality benchmarks.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Pass Rate', value: '94.2%', icon: CheckCircle2, color: 'primary' },
          { label: 'Failures', value: '12', icon: XCircle, color: 'error' },
          { label: 'Avg Runtime', value: '1h 08m', icon: Clock, color: 'secondary' },
          { label: 'Trend', value: '+2.4%', icon: TrendingUp, color: 'primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col gap-2">
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}`} />
            </div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest mt-2">{stat.label}</span>
            <span className="text-2xl font-black text-on-surface">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Execution Trend (Last 5 Runs)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="pass" stroke="#00488d" strokeWidth={3} dot={{ r: 4, fill: '#00488d' }} name="Pass %" />
                <Line type="monotone" dataKey="fail" stroke="#ba1a1a" strokeWidth={3} dot={{ r: 4, fill: '#ba1a1a' }} name="Fail %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Failure Distribution</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {[
              { label: 'Environment', value: 64, color: 'primary' },
              { label: 'Code Bug', value: 24, color: 'error' },
              { label: 'Data Issue', value: 12, color: 'secondary' },
            ].map((dist, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface">{dist.label}</span>
                  <span className="text-outline">{dist.value}%</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className={`bg-${dist.color} h-full`} style={{ width: `${dist.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
            <p className="text-[10px] font-bold text-outline uppercase mb-2">AI Summary</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">Most failures are linked to <span className="font-bold">UAT_CLUSTER_01</span> instability. Recommend environment re-provisioning.</p>
          </div>
        </section>

        <section className="col-span-12 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Recent Execution History</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary w-48" 
                  placeholder="Search history..." 
                  type="text"
                />
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded cursor-pointer hover:bg-primary/20 transition-colors">VIEW ALL</span>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10 bg-surface-container-low">
                <th className="px-6 py-3">Run ID</th>
                <th className="px-6 py-3">Suite Name</th>
                <th className="px-6 py-3">Environment</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Pass Rate</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredHistory.map((run, i) => (
                <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-primary font-bold">{run.id}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{run.suite}</td>
                  <td className="px-6 py-4 text-outline">{run.env}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{run.duration}</td>
                  <td className="px-6 py-4 font-bold text-primary">{run.pass}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">{run.status}</span>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-outline text-xs font-medium uppercase tracking-widest">No history found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
