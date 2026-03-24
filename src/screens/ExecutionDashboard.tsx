import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Activity, CheckCircle2, XCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const MOCK_RESULTS = [
  { id: 'TC_045', name: 'Payment via Card', status: 'Passed', time: '12s', thread: 'T-01' },
  { id: 'TC_089', name: 'Wire Transfer Int', status: 'Failed', time: '45s', thread: 'T-04', error: 'Timeout: Element not visible' },
  { id: 'TC_001', name: 'Login Valid User', status: 'Passed', time: '8s', thread: 'T-02' },
  { id: 'TC_112', name: 'Portfolio Rebalance', status: 'Passed', time: '1m 2s', thread: 'T-08' },
];

export const ExecutionDashboard = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(64);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-primary animate-pulse' : 'bg-outline'}`}></div>
          <div>
            <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Regression Execution Live</h2>
            <p className="text-sm text-secondary font-medium mt-1">Real-time monitoring of active regression suite performance.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 bg-surface-container-high rounded-md hover:bg-surface-container-highest transition-colors"
          >
            {isRunning ? <Pause className="w-5 h-5 text-on-surface" /> : <Play className="w-5 h-5 text-primary fill-current" />}
          </button>
          <button 
            onClick={() => { setIsRunning(false); setProgress(0); }}
            className="p-2 bg-surface-container-high rounded-md hover:bg-surface-container-highest transition-colors"
          >
            <Square className="w-5 h-5 text-error" />
          </button>
          <div className="w-px bg-outline-variant/20 mx-2"></div>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm">View Full Logs</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Total Progress', value: `${progress}%`, icon: Activity, color: 'primary' },
              { label: 'Passed', value: '112', icon: CheckCircle2, color: 'primary' },
              { label: 'Failed', value: '4', icon: XCircle, color: 'error' },
              { label: 'Time Elapsed', value: '42m 12s', icon: Clock, color: 'secondary' },
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

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Threads</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">12 THREADS ACTIVE</span>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Thread {i + 1}</span>
                    <div className="flex gap-1">
                      <div className={`w-1 h-1 rounded-full bg-primary ${isRunning ? 'animate-bounce' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                      <div className={`w-1 h-1 rounded-full bg-primary ${isRunning ? 'animate-bounce' : ''}`} style={{ animationDelay: `${i * 0.1 + 0.1}s` }}></div>
                      <div className={`w-1 h-1 rounded-full bg-primary ${isRunning ? 'animate-bounce' : ''}`} style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">TC</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-on-surface truncate">TC_04{i + 1}_payment_flow</p>
                      <p className="text-[10px] text-outline font-bold">Executing Step 4/8</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[45%]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Live Result Stream</h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-0.5 rounded">4 FAILURES</span>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <tbody className="text-[11px]">
                  {MOCK_RESULTS.map((result, i) => (
                    <React.Fragment key={i}>
                      <tr className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5">
                        <td className="px-6 py-3 font-mono text-primary font-bold">{result.id}</td>
                        <td className="px-6 py-3 font-bold text-on-surface">{result.name}</td>
                        <td className="px-6 py-3">
                          <span className={result.status === 'Passed' ? 'text-primary font-bold' : 'text-error font-bold'}>{result.status}</span>
                        </td>
                        <td className="px-6 py-3 text-outline">{result.time}</td>
                        <td className="px-6 py-3 text-outline font-mono">{result.thread}</td>
                      </tr>
                      {result.status === 'Failed' && (
                        <tr className="bg-error/5">
                          <td colSpan={5} className="px-6 py-2 text-[10px] font-mono text-error italic">
                            {result.error}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <aside className="w-80 border-l border-outline-variant/10 bg-surface-container-low flex flex-col p-6 space-y-6 shrink-0">
          <div className="flex items-center gap-2 text-tertiary">
            <TrendingUp className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest">AI Performance Audit</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-tertiary/5 rounded-xl border border-tertiary/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-tertiary" />
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Anomaly Detected</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">Thread T-04 is showing 3x higher latency than baseline. Investigating network congestion...</p>
            </div>
            <div className="p-4 bg-white/40 rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-tertiary" />
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tight">Auto-Triage</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">AI has already classified 3/4 failures as <span className="font-bold">Environment Issues</span>. No code changes required.</p>
              <button className="mt-3 text-[10px] font-bold text-tertiary uppercase tracking-widest hover:underline">View Triage Report</button>
            </div>
          </div>
          <div className="mt-auto p-5 bg-on-surface text-surface rounded-2xl flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Estimated Completion</span>
              <span className="text-2xl font-black">14:52 PM</span>
            </div>
            <div className="w-full bg-surface/20 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
