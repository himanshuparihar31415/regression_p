import React from 'react';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Search, Filter, MoreVertical, ChevronRight, Zap, Clock, ShieldCheck } from 'lucide-react';

const MOCK_COMMITS = [
  { id: '7c8d9e0', author: 'himanshu', date: '2h ago', message: 'feat: add payment gateway regression tests', branch: 'main', status: 'Verified' },
  { id: 'a1b2c3d', author: 'sarah_qa', date: '5h ago', message: 'fix: update selectors for login page', branch: 'develop', status: 'Pending' },
  { id: 'e5f6g7h', author: 'himanshu', date: '1d ago', message: 'chore: update test data for Q1 sprint', branch: 'main', status: 'Verified' },
  { id: 'i9j0k1l', author: 'dev_team', date: '2d ago', message: 'merge: pull request #142 from feature/auth', branch: 'main', status: 'Verified' },
];

export const GitHistory = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Automation Git History</h2>
          <p className="text-sm text-secondary font-medium mt-1">Track script changes, version control, and team contributions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Fetch All</button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <GitPullRequest className="w-4 h-4" /> Create PR
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Active Branch', value: 'main', icon: GitBranch, color: 'primary' },
              { label: 'Total Commits', value: '1,240', icon: GitCommit, color: 'tertiary' },
              { label: 'Open PRs', value: '3', icon: GitPullRequest, color: 'secondary' },
              { label: 'Last Sync', value: '2m ago', icon: Clock, color: 'outline' },
            ].map((stat, i) => (
              <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
                <div className={`p-3 bg-${stat.color}/10 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{stat.label}</span>
                  <span className="text-xl font-black text-on-surface">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Commit History</h3>
              <div className="flex gap-4">
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
                  <input className="w-full bg-surface-container-low border-none rounded-full pl-9 pr-3 py-1 text-[10px] focus:ring-1 focus:ring-primary" placeholder="Search commits..." type="text"/>
                </div>
                <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                  <Filter className="w-4 h-4 text-outline" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface-container-lowest z-10">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/10 bg-surface-container-low">
                    <th className="px-6 py-3">Commit ID</th>
                    <th className="px-6 py-3">Message</th>
                    <th className="px-6 py-3">Author</th>
                    <th className="px-6 py-3">Branch</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {MOCK_COMMITS.map((commit, i) => (
                    <tr key={i} className="hover:bg-surface-container-high transition-colors border-b border-outline-variant/5 cursor-pointer group">
                      <td className="px-6 py-4 font-mono text-primary font-bold">{commit.id}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">{commit.message}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{commit.author}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">{commit.branch}</span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant font-medium">{commit.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${commit.status === 'Verified' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>{commit.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <aside className="w-80 border-l border-outline-variant/10 bg-surface-container-low flex flex-col p-6 space-y-6 shrink-0 overflow-y-auto no-scrollbar">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Branch Details</span>
            <h3 className="text-xl font-black font-headline text-on-surface">main</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Sync Status</span>
                <span className="text-sm font-black text-primary">Up to Date</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 gap-2">
                <ShieldCheck className="w-12 h-12 text-primary" />
                <p className="text-[10px] font-bold text-outline uppercase">Verified by Pipeline</p>
              </div>
            </div>

            <div className="p-4 bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-tertiary">
                <Zap className="w-4 h-4" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest">AI Commit Insight</h4>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Recent commits by <span className="font-bold">himanshu</span> have improved test coverage for the <span className="font-bold">Payments</span> module by <span className="font-bold text-tertiary">14%</span>.
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full py-3 bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-colors">
              View All Branches
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
