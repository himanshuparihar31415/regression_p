import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Server, Database, Globe, RefreshCcw, Search, Filter, MoreVertical, ChevronRight, Zap, Clock, ShieldCheck as ShieldIcon } from 'lucide-react';

const MOCK_SERVICES = [
  { name: 'Auth Service', status: 'Healthy', latency: '45ms', uptime: '99.99%', lastCheck: '2m ago', type: 'Internal' },
  { name: 'Payment Gateway', status: 'Degraded', latency: '240ms', uptime: '98.5%', lastCheck: '5m ago', type: 'External' },
  { name: 'User Profile API', status: 'Healthy', latency: '32ms', uptime: '99.95%', lastCheck: '1m ago', type: 'Internal' },
  { name: 'Notification Service', status: 'Healthy', latency: '12ms', uptime: '100%', lastCheck: '10m ago', type: 'Internal' },
  { name: 'Inventory DB', status: 'Healthy', latency: '8ms', uptime: '99.99%', lastCheck: '30s ago', type: 'Database' },
];

export const ServiceIntegrity = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Service Integrity</h2>
          <p className="text-sm text-secondary font-medium mt-1">Monitor health, latency, and connectivity of dependent services.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Refresh All</button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <RefreshCcw className="w-4 h-4" /> Run Health Check
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Overall Health', value: '94%', icon: Activity, color: 'primary' },
          { label: 'Active Services', value: '12/14', icon: Server, color: 'tertiary' },
          { label: 'Avg Latency', value: '68ms', icon: Clock, color: 'secondary' },
          { label: 'Incidents', value: '1', icon: ShieldAlert, color: 'error' },
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
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Service Inventory</h3>
          <div className="flex gap-4">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              <input className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" placeholder="Search services..." type="text"/>
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
                <th className="px-6 py-3">Service Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Latency</th>
                <th className="px-6 py-3">Uptime</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Last Check</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {MOCK_SERVICES.map((service, i) => (
                <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 group">
                  <td className="px-6 py-4 font-bold text-on-surface flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-outline" />
                    {service.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 w-fit ${service.status === 'Healthy' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                      {service.status === 'Healthy' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{service.latency}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{service.uptime}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">{service.type}</span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{service.lastCheck}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-surface-container-highest rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-outline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest">Real-time Traffic</h3>
          </div>
          <div className="h-48 flex items-end gap-1 px-2">
            {[40, 60, 45, 80, 55, 90, 70, 40, 60, 45, 80, 55, 90, 70, 40, 60, 45, 80, 55, 90, 70, 40, 60, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-outline uppercase px-2">
            <span>12:00 PM</span>
            <span>Now</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
          <div className="flex items-center gap-2 text-secondary">
            <ShieldIcon className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest">Integrity Alerts</h3>
          </div>
          <div className="space-y-3">
            {[
              { message: 'Payment Gateway latency exceeded 200ms threshold.', time: '5m ago', type: 'Warning' },
              { message: 'Auth Service successfully recovered from minor outage.', time: '12m ago', type: 'Info' },
              { message: 'Inventory DB connection pool reached 85% capacity.', time: '1h ago', type: 'Warning' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/5">
                <div className={`p-1.5 rounded-lg ${alert.type === 'Warning' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                  {alert.type === 'Warning' ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">{alert.message}</p>
                  <span className="text-[10px] text-outline font-medium">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
