import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Target, ShieldAlert, Zap, TrendingUp, Search, Filter } from 'lucide-react';

const coverageData = [
  { name: 'Covered', value: 84 },
  { name: 'Gap', value: 16 },
];

const moduleData = [
  { name: 'Login', coverage: 98, risk: 10 },
  { name: 'Payments', coverage: 72, risk: 85 },
  { name: 'Portfolio', coverage: 88, risk: 30 },
  { name: 'Settings', coverage: 92, risk: 15 },
];

const COLORS = ['#00488d', '#e0e3e5'];

const MOCK_GAPS = [
  { module: 'Payments', gap: 'Edge case validation for multi-currency settlement is missing.', severity: 'High' },
  { module: 'Portfolio', gap: 'Performance benchmarks for large dataset rendering not established.', severity: 'Medium' },
  { module: 'Login', gap: 'MFA recovery flow lacks automated verification scripts.', severity: 'Low' },
];

export const CoverageAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredGaps = MOCK_GAPS.filter(gap => 
    gap.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gap.gap.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('AI has generated 14 new test cases for the Payments module.');
    }, 2000);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface">Coverage & Gap Analysis</h2>
          <p className="text-sm text-secondary font-medium mt-1">Quantifying quality assurance depth through multi-dimensional metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Export Report</button>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm hover:opacity-90 transition-opacity">Generate Test Plan</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col items-center">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6 self-start">Overall Test Coverage</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coverageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {coverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-primary">84%</span>
              <span className="text-[10px] font-bold text-outline uppercase">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4 mt-4">
            <div className="p-3 bg-surface-container-low rounded-xl text-center">
              <span className="text-xl font-bold text-on-surface">1,240</span>
              <p className="text-[10px] text-outline uppercase font-bold mt-1">Total Scenarios</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl text-center">
              <span className="text-xl font-bold text-error">198</span>
              <p className="text-[10px] text-outline uppercase font-bold mt-1">Identified Gaps</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Module Coverage vs Risk</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700, paddingTop: 20 }} />
                <Bar dataKey="coverage" fill="#00488d" radius={[4, 4, 0, 0]} name="Coverage %" />
                <Bar dataKey="risk" fill="#ba1a1a" radius={[4, 4, 0, 0]} name="Risk Index" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-6">
          <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Critical Gaps Identified</h3>
              <div className="flex gap-2">
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" 
                    placeholder="Search gaps..." 
                    type="text"
                  />
                </div>
                <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                  <Filter className="w-4 h-4 text-outline" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredGaps.map((gap, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors cursor-default group">
                  <div className={gap.severity === 'High' ? "w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0" : "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"}>
                    <ShieldAlert className={gap.severity === 'High' ? "w-5 h-5 text-error" : "w-5 h-5 text-primary"} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-on-surface">{gap.module}</span>
                      <span className={gap.severity === 'High' ? "text-[10px] font-bold text-error uppercase" : "text-[10px] font-bold text-primary uppercase"}>{gap.severity}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{gap.gap}</p>
                  </div>
                </div>
              ))}
              {filteredGaps.length === 0 && (
                <div className="text-center py-8 text-outline text-xs font-medium uppercase tracking-widest">No gaps found matching your search.</div>
              )}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <aside className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-2xl p-6 h-full flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-tertiary" />
              <h3 className="text-sm font-black text-tertiary uppercase tracking-widest">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/40 rounded-xl border border-tertiary/10 shadow-sm">
                <p className="text-xs font-bold text-tertiary uppercase mb-2">Automated Augmentation</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">AI can generate <span className="font-bold">14 new test cases</span> to cover the identified gap in Payments module.</p>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="mt-3 w-full py-2 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Execute Generation'}
                </button>
              </div>
              <div className="p-4 bg-white/40 rounded-xl border border-tertiary/10 shadow-sm">
                <p className="text-xs font-bold text-tertiary uppercase mb-2">Risk Mitigation</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Prioritizing <span className="font-bold">Regression Suite B</span> will cover 92% of high-risk changes detected in the current sprint.</p>
              </div>
            </div>
            <div className="mt-auto p-4 bg-tertiary text-on-tertiary rounded-xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-70">Confidence Index</span>
                <span className="text-2xl font-black">94.8%</span>
              </div>
              <TrendingUp className="w-8 h-8 opacity-40" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
