import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import {
  CheckCircle2, XCircle, Clock, TrendingUp, Download, Share2,
  Search, AlertTriangle, Zap, Activity, Shield, Layers,
  Target, Flame, Eye, ChevronDown, BarChart3, GitCommit,
} from 'lucide-react';

// ── Data ───────────────────────────────────────────────────────────────────

const trendDataMap: Record<string, { name: string; pass: number; fail: number; total: number }[]> = {
  '7D': [
    { name: 'Mon', pass: 92, fail: 8, total: 184 },
    { name: 'Tue', pass: 94, fail: 6, total: 188 },
    { name: 'Wed', pass: 88, fail: 12, total: 182 },
    { name: 'Thu', pass: 96, fail: 4, total: 191 },
    { name: 'Fri', pass: 94, fail: 6, total: 186 },
    { name: 'Sat', pass: 97, fail: 3, total: 190 },
    { name: 'Sun', pass: 91, fail: 9, total: 179 },
  ],
  '30D': [
    { name: 'Wk 1', pass: 91, fail: 9, total: 745 },
    { name: 'Wk 2', pass: 93, fail: 7, total: 780 },
    { name: 'Wk 3', pass: 89, fail: 11, total: 760 },
    { name: 'Wk 4', pass: 95, fail: 5, total: 798 },
  ],
  '90D': [
    { name: 'Jan', pass: 88, fail: 12, total: 3120 },
    { name: 'Feb', pass: 91, fail: 9, total: 3280 },
    { name: 'Mar', pass: 94, fail: 6, total: 3350 },
  ],
};

const modulePassRateData = [
  { module: 'Reporting', pass: 96, fail: 4, tests: 18 },
  { module: 'Notifications', pass: 94, fail: 6, tests: 22 },
  { module: 'User Mgmt', pass: 98, fail: 2, tests: 64 },
  { module: 'API Gateway', pass: 89, fail: 11, tests: 88 },
  { module: 'Portfolio', pass: 95, fail: 5, tests: 45 },
  { module: 'Login', pass: 97, fail: 3, tests: 120 },
  { module: 'Payments', pass: 91, fail: 9, tests: 210 },
];

const suiteDurationData = [
  { suite: 'Smoke', p50: 13, p90: 18, p99: 24 },
  { suite: 'Security', p50: 22, p90: 29, p99: 37 },
  { suite: 'API GW', p50: 34, p90: 44, p99: 53 },
  { suite: 'Payments', p50: 55, p90: 71, p99: 85 },
  { suite: 'Core', p50: 68, p90: 82, p99: 96 },
  { suite: 'Extended', p50: 262, p90: 291, p99: 318 },
];

const moduleRadarData = [
  { subject: 'Pass Rate', Payments: 91, Login: 97, Portfolio: 95 },
  { subject: 'Coverage', Payments: 87, Login: 95, Portfolio: 82 },
  { subject: 'Stability', Payments: 78, Login: 94, Portfolio: 91 },
  { subject: 'Performance', Payments: 84, Login: 88, Portfolio: 90 },
  { subject: 'Data Quality', Payments: 92, Login: 99, Portfolio: 88 },
];

const coverageByModule = [
  { module: 'Reporting', covered: 74, gap: 26 },
  { module: 'API Gateway', covered: 79, gap: 21 },
  { module: 'Portfolio', covered: 82, gap: 18 },
  { module: 'Notifications', covered: 88, gap: 12 },
  { module: 'Payments', covered: 87, gap: 13 },
  { module: 'User Management', covered: 91, gap: 9 },
  { module: 'Login', covered: 95, gap: 5 },
];

const flakyTests = [
  { id: 'TC_089', name: 'Wire Transfer Int', flakiness: 32, runs: 12, module: 'Payments', trend: 'up' },
  { id: 'TC_163', name: 'Dashboard Load Time', flakiness: 28, runs: 15, module: 'Dashboard', trend: 'up' },
  { id: 'TC_044', name: 'Card Validation', flakiness: 18, runs: 10, module: 'Payments', trend: 'down' },
  { id: 'TC_127', name: 'API Rate Limit', flakiness: 14, runs: 8, module: 'API Gateway', trend: 'stable' },
  { id: 'TC_156', name: 'Session Token Expiry', flakiness: 11, runs: 9, module: 'Login', trend: 'down' },
];

const envHealthData = [
  { env: 'UAT_CLUSTER_01', status: 'Degraded', uptime: '91.2%', lastCheck: '2m ago', latency: '280ms', color: 'error' as const },
  { env: 'QA_ENV_02', status: 'Healthy', uptime: '99.8%', lastCheck: '1m ago', latency: '42ms', color: 'primary' as const },
  { env: 'PRE_PROD_03', status: 'Healthy', uptime: '98.4%', lastCheck: '3m ago', latency: '115ms', color: 'primary' as const },
  { env: 'QA_ENV_04', status: 'Warning', uptime: '95.1%', lastCheck: '5m ago', latency: '190ms', color: 'tertiary' as const },
];

const failurePieData = [
  { name: 'Environment', value: 64, color: '#1d6bbf' },
  { name: 'Code Bug', value: 24, color: '#ba1a1a' },
  { name: 'Data Issue', value: 12, color: '#7965af' },
];

const envBarData = [
  { env: 'UAT', pass: 93, fail: 7, runs: 5 },
  { env: 'QA', pass: 98, fail: 2, runs: 4 },
  { env: 'Pre-Prod', pass: 89, fail: 11, runs: 3 },
];

const MOCK_HISTORY = [
  { id: 'RUN_1024', suite: 'Core Regression', env: 'UAT', duration: '1h 12m', pass: '94.2%', tests: 184, status: 'Completed' },
  { id: 'RUN_1023', suite: 'Smoke Test', env: 'QA', duration: '15m', pass: '100%', tests: 12, status: 'Completed' },
  { id: 'RUN_1022', suite: 'Extended Suite', env: 'Pre-Prod', duration: '4h 22m', pass: '88.4%', tests: 320, status: 'Completed' },
  { id: 'RUN_1021', suite: 'Payments Regression', env: 'UAT', duration: '58m', pass: '91.7%', tests: 114, status: 'Completed' },
  { id: 'RUN_1020', suite: 'Security & Auth', env: 'QA', duration: '22m', pass: '97.2%', tests: 36, status: 'Completed' },
  { id: 'RUN_1019', suite: 'API Gateway Regression', env: 'Pre-Prod', duration: '34m', pass: '89.3%', tests: 28, status: 'Completed' },
  { id: 'RUN_1018', suite: 'Core Regression', env: 'UAT', duration: '1h 08m', pass: '96.1%', tests: 184, status: 'Completed' },
  { id: 'RUN_1017', suite: 'Smoke Test', env: 'QA', duration: '13m', pass: '100%', tests: 12, status: 'Completed' },
];

const SUITE_OPTIONS = ['All', 'Core Regression', 'Smoke Test', 'Extended Suite', 'Payments Regression', 'Security & Auth', 'API Gateway Regression'];
const ENV_OPTIONS = ['All', 'UAT', 'QA', 'Pre-Prod'];

// ── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-container-lowest shadow-xl rounded-lg px-3 py-2 border border-outline-variant/10 text-[11px]">
      <p className="font-bold text-on-surface mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}{typeof p.value === 'number' && p.name !== 'Total' ? '%' : ''}</p>
      ))}
    </div>
  );
};

// ── Component ───────────────────────────────────────────────────────────────

export const Results = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');
  const [envFilter, setEnvFilter] = useState('All');
  const [suiteFilter, setSuiteFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'overview' | 'module' | 'environment'>('overview');

  const trendData = trendDataMap[timeRange];

  const filteredHistory = MOCK_HISTORY.filter(run => {
    const matchesSearch = run.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.suite.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnv = envFilter === 'All' || run.env === envFilter;
    const matchesSuite = suiteFilter === 'All' || run.suite === suiteFilter;
    return matchesSearch && matchesEnv && matchesSuite;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => { setIsExporting(false); alert('Report exported successfully.'); }, 1500);
  };

  const kpiCards = [
    { label: 'Pass Rate', value: '94.2%', sub: '+2.4% vs last week', icon: CheckCircle2, color: 'primary', up: true },
    { label: 'Total Failures', value: '12', sub: '−3 vs last week', icon: XCircle, color: 'error', up: false },
    { label: 'Avg Runtime', value: '1h 08m', sub: '−4m vs last week', icon: Clock, color: 'secondary', up: false },
    { label: 'Pass Trend', value: '+2.4%', sub: '7-day improvement', icon: TrendingUp, color: 'primary', up: true },
    { label: 'Tests Run', value: '1,284', sub: 'This week', icon: Activity, color: 'secondary', up: true },
    { label: 'Flaky Tests', value: '5', sub: '2 worsening', icon: Flame, color: 'tertiary', up: true },
    { label: 'Test Coverage', value: '87.4%', sub: '+1.2% vs baseline', icon: Target, color: 'primary', up: true },
    { label: 'SLA Compliance', value: '96.8%', sub: 'All runs within 2h SLA', icon: Shield, color: 'primary', up: true },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface">Result Collection & Aggregation</h2>
          <p className="text-sm text-secondary font-medium mt-1">Holistic view of regression outcomes, trends, and quality benchmarks.</p>
        </div>
        <div className="flex gap-2">
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

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
        {/* Time Range */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-outline mr-1">Period</span>
          {(['7D', '30D', '90D'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${timeRange === t ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-outline-variant/30" />

        {/* Environment Filter */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-outline mr-1">Env</span>
          {ENV_OPTIONS.map(env => (
            <button
              key={env}
              onClick={() => setEnvFilter(env)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${envFilter === env ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {env}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-outline-variant/30" />

        {/* Suite Filter */}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-outline shrink-0">Suite</span>
          <select
            value={suiteFilter}
            onChange={e => setSuiteFilter(e.target.value)}
            className="bg-surface-container-highest border-none rounded px-3 py-1 text-[10px] font-bold text-on-surface focus:ring-1 focus:ring-primary cursor-pointer"
          >
            {SUITE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-1 bg-surface-container-highest rounded-lg p-1">
          {(['overview', 'module', 'environment'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded text-[10px] font-bold capitalize transition-all ${viewMode === mode ? 'bg-on-surface text-surface shadow-sm' : 'text-outline hover:text-on-surface'}`}
            >
              {mode === 'overview' ? 'Overview' : mode === 'module' ? 'By Module' : 'By Env'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards — 8 cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <div className={`w-9 h-9 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${stat.up ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                {stat.sub.split(' ')[0]}
              </span>
            </div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest mt-2">{stat.label}</span>
            <span className="text-2xl font-black text-on-surface leading-none">{stat.value}</span>
            <span className="text-[10px] text-on-surface-variant">{stat.sub.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>

      {/* ── OVERVIEW MODE ──────────────────────────────────────────────────── */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Row 1: Trend + Failure Pie */}
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Execution Trend — Pass vs Fail %</h3>
                <span className="text-[10px] font-bold text-outline">{timeRange} view</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00488d" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00488d" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ba1a1a" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#ba1a1a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.4} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="pass" stroke="#00488d" strokeWidth={2.5} fill="url(#passGrad)" name="Pass %" dot={{ r: 4, fill: '#00488d' }} />
                    <Area type="monotone" dataKey="fail" stroke="#ba1a1a" strokeWidth={2.5} fill="url(#failGrad)" name="Fail %" dot={{ r: 4, fill: '#ba1a1a' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Failure Root Cause Distribution</h3>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={failurePieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {failurePieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => `${val}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {failurePieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium text-on-surface">{item.name}</span>
                    </div>
                    <span className="text-xs font-black" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-surface-container-low rounded-xl border border-outline-variant/5">
                <p className="text-[10px] font-bold text-outline uppercase mb-1">AI Summary</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Most failures linked to <span className="font-bold">UAT_CLUSTER_01</span> instability. Recommend re-provisioning.</p>
              </div>
            </section>
          </div>

          {/* Row 2: Suite Duration + Env Health */}
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-7 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Suite Execution Duration — P50 / P90 / P99 (mins)</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={suiteDurationData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.4} horizontal={false} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                    <YAxis type="category" dataKey="suite" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} width={55} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="p50" name="P50" fill="#00488d" radius={[0, 3, 3, 0]} barSize={6} fillOpacity={0.9} />
                    <Bar dataKey="p90" name="P90" fill="#6750a4" radius={[0, 3, 3, 0]} barSize={6} fillOpacity={0.8} />
                    <Bar dataKey="p99" name="P99" fill="#ba1a1a" radius={[0, 3, 3, 0]} barSize={6} fillOpacity={0.7} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Environment Health Snapshot</h3>
              <div className="space-y-3">
                {envHealthData.map((env, i) => (
                  <div key={i} className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                    env.color === 'error' ? 'bg-error/5 border-error/20' :
                    env.color === 'tertiary' ? 'bg-tertiary/5 border-tertiary/20' :
                    'bg-primary/5 border-primary/20'
                  }`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        env.color === 'error' ? 'bg-error animate-pulse' :
                        env.color === 'tertiary' ? 'bg-tertiary' : 'bg-primary'
                      }`} />
                      <span className="text-[11px] font-bold text-on-surface truncate">{env.env}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-outline font-bold">{env.latency}</span>
                      <span className="text-[10px] font-bold text-outline">{env.uptime}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                        env.color === 'error' ? 'bg-error/15 text-error' :
                        env.color === 'tertiary' ? 'bg-tertiary/15 text-tertiary' :
                        'bg-primary/15 text-primary'
                      }`}>{env.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ── BY MODULE MODE ─────────────────────────────────────────────────── */}
      {viewMode === 'module' && (
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Module Pass Rate horizontal bar */}
            <section className="col-span-7 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Module Pass Rate — Pass vs Fail %</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modulePassRateData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.4} horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                    <YAxis type="category" dataKey="module" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pass" name="Pass %" fill="#00488d" radius={[0, 2, 2, 0]} barSize={10} stackId="a" />
                    <Bar dataKey="fail" name="Fail %" fill="#ba1a1a" radius={[0, 2, 2, 0]} barSize={10} stackId="a" fillOpacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Coverage by Module */}
            <section className="col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Test Coverage by Module</h3>
              <div className="space-y-3">
                {coverageByModule.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-on-surface truncate max-w-[140px]">{item.module}</span>
                      <span className={item.covered >= 90 ? 'text-primary' : item.covered >= 80 ? 'text-tertiary' : 'text-error'}>{item.covered}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.covered >= 90 ? 'bg-primary' : item.covered >= 80 ? 'bg-tertiary' : 'bg-error'}`}
                        style={{ width: `${item.covered}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Module Quality Radar */}
            <section className="col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Module Quality Radar — Top 3 Modules</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={moduleRadarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fontSize: 9 }} />
                    <Radar name="Payments" dataKey="Payments" stroke="#ba1a1a" fill="#ba1a1a" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Login" dataKey="Login" stroke="#00488d" fill="#00488d" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Portfolio" dataKey="Portfolio" stroke="#6750a4" fill="#6750a4" fillOpacity={0.15} strokeWidth={2} />
                    <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Flaky Test Tracker */}
            <section className="col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-tertiary" />
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Flaky Test Tracker</h3>
              </div>
              <div className="space-y-2">
                {flakyTests.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-tertiary/10 flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-black text-tertiary">{t.flakiness}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-on-surface truncate">{t.name}</p>
                      <p className="text-[10px] text-outline">{t.module} · {t.runs} runs</p>
                    </div>
                    <div className="shrink-0">
                      <div className="w-16 bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${t.flakiness > 25 ? 'bg-error' : t.flakiness > 15 ? 'bg-tertiary' : 'bg-primary'}`} style={{ width: `${t.flakiness * 3}%` }} />
                      </div>
                    </div>
                    <span className={`text-[10px] font-black shrink-0 ${t.trend === 'up' ? 'text-error' : t.trend === 'down' ? 'text-primary' : 'text-outline'}`}>
                      {t.trend === 'up' ? '↑' : t.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ── BY ENVIRONMENT MODE ────────────────────────────────────────────── */}
      {viewMode === 'environment' && (
        <div className="space-y-6">
          {/* Env Health Detailed Cards */}
          <div className="grid grid-cols-4 gap-4">
            {envHealthData.map((env, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                env.color === 'error' ? 'bg-error/5 border-error/20' :
                env.color === 'tertiary' ? 'bg-tertiary/5 border-tertiary/20' :
                'bg-primary/5 border-primary/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`w-2 h-2 rounded-full ${env.color === 'error' ? 'bg-error animate-pulse' : env.color === 'tertiary' ? 'bg-tertiary' : 'bg-primary'}`} />
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    env.color === 'error' ? 'bg-error/15 text-error' :
                    env.color === 'tertiary' ? 'bg-tertiary/15 text-tertiary' :
                    'bg-primary/15 text-primary'
                  }`}>{env.status}</span>
                </div>
                <div>
                  <p className="text-xs font-black text-on-surface">{env.env}</p>
                  <p className="text-[10px] text-outline mt-0.5">Last check: {env.lastCheck}</p>
                </div>
                <div className="flex justify-between items-end pt-1 border-t border-outline-variant/10">
                  <div>
                    <p className="text-[10px] text-outline uppercase">Uptime</p>
                    <p className={`text-lg font-black ${env.color === 'error' ? 'text-error' : env.color === 'tertiary' ? 'text-tertiary' : 'text-primary'}`}>{env.uptime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-outline uppercase">Latency</p>
                    <p className="text-sm font-bold text-on-surface">{env.latency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Pass Rate by Env */}
            <section className="col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Pass / Fail Rate by Environment</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={envBarData} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.4} vertical={false} />
                    <XAxis dataKey="env" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pass" name="Pass %" fill="#00488d" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="fail" name="Fail %" fill="#ba1a1a" radius={[4, 4, 0, 0]} barSize={32} fillOpacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Runs per env */}
            <section className="col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Execution Volume by Environment</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={envBarData} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.4} vertical={false} />
                    <XAxis dataKey="env" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="runs" name="Total Runs" fill="#6750a4" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* History Table — always visible */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
            Recent Execution History
            <span className="ml-2 text-primary font-black">{filteredHistory.length}</span>
            <span className="ml-1 text-outline">/ {MOCK_HISTORY.length} runs</span>
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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
              <th className="px-6 py-3">Tests</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Pass Rate</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {filteredHistory.map((run, i) => {
              const passNum = parseFloat(run.pass);
              return (
                <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-primary font-bold">{run.id}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{run.suite}</td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{run.env}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-on-surface-variant">{run.tests}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{run.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${passNum >= 95 ? 'bg-primary' : passNum >= 90 ? 'bg-tertiary' : 'bg-error'}`} style={{ width: run.pass }} />
                      </div>
                      <span className={`font-bold ${passNum >= 95 ? 'text-primary' : passNum >= 90 ? 'text-tertiary' : 'text-error'}`}>{run.pass}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">{run.status}</span>
                  </td>
                </tr>
              );
            })}
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-outline text-xs font-medium uppercase tracking-widest">No history found matching your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

    </div>
  );
};
