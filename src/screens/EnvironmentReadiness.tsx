import React from 'react';
import { ShieldCheck, Server, Activity, Globe, Cpu, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export const EnvironmentReadiness = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface">Environment Readiness Check</h2>
          <p className="text-sm text-secondary font-medium mt-1">Real-time system integrity and infrastructure health validation.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Re-Scan
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm">Proceed to Execution</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'System Health', value: 'Healthy', icon: ShieldCheck, color: 'primary' },
          { label: 'CPU Usage', value: '24%', icon: Cpu, color: 'secondary' },
          { label: 'Latency', value: '42ms', icon: Activity, color: 'tertiary' },
          { label: 'Active Nodes', value: '12/12', icon: Globe, color: 'primary' },
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
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Service Integrity Status</h3>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-bold">ALL SERVICES UP</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Auth Service', status: 'Operational', version: 'v2.4.1', health: 100 },
              { name: 'Payment Gateway', status: 'Operational', version: 'v1.1.0', health: 98 },
              { name: 'Ledger Engine', status: 'Operational', version: 'v4.0.2', health: 100 },
              { name: 'Notification Hub', status: 'Degraded', version: 'v1.2.0', health: 74, warning: true },
            ].map((service, i) => (
              <div key={i} className="flex items-center gap-6 p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors">
                <div className={service.warning ? "w-2 h-2 rounded-full bg-error animate-pulse" : "w-2 h-2 rounded-full bg-primary"}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-on-surface">{service.name}</span>
                    <span className="text-[10px] font-mono text-outline">{service.version}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className={service.warning ? "bg-error h-full" : "bg-primary h-full"} style={{ width: `${service.health}%` }}></div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={service.warning ? "text-[10px] font-bold text-error uppercase" : "text-[10px] font-bold text-primary uppercase"}>
                    {service.status}
                  </span>
                  <p className="text-[10px] text-outline font-bold">{service.health}% Health</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
              <Server className="w-4 h-4" /> Infrastructure Log
            </h3>
            <div className="space-y-4">
              {[
                { time: '14:22:01', msg: 'Database connection pool optimized', type: 'info' },
                { time: '14:20:45', msg: 'Redis cache cleared for UAT', type: 'success' },
                { time: '14:18:12', msg: 'High memory usage on Node-04', type: 'warning' },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-[11px] leading-tight">
                  <span className="font-mono text-outline shrink-0">{log.time}</span>
                  <p className="text-on-surface-variant font-medium">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-2xl p-6">
            <div className="flex items-center gap-2 text-tertiary mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest">Readiness Alert</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              <span className="font-bold text-tertiary">Notification Hub</span> is showing increased latency. This may impact time-sensitive regression scripts.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest rounded-md">Auto-Scale</button>
              <button className="flex-1 py-2 border border-tertiary text-tertiary text-[10px] font-bold uppercase tracking-widest rounded-md">Ignore</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
