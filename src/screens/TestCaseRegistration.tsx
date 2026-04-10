import React, { useState } from 'react';
import { FileUp, Plus, Search, Filter, MoreVertical, X, ListOrdered, CheckCircle2, Edit3, Link as LinkIcon, FolderTree, Tag } from 'lucide-react';

const MOCK_TEST_CASES = [
  {
    id: 'TC_001',
    name: 'Login Valid User',
    description: 'Verify that a user can successfully log in with valid credentials.',
    module: 'Login',
    feature: 'Authentication',
    type: 'UI',
    priority: 'High',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-101', 'US-45'],
    steps: ['Navigate to login page', 'Enter valid credentials', 'Click login'],
    expected: 'User is redirected to dashboard'
  },
  {
    id: 'TC_045',
    name: 'Payment via Card',
    description: 'Validate end-to-end card payment processing through the checkout gateway.',
    module: 'Payments',
    feature: 'Checkout',
    type: 'API',
    priority: 'High',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-205', 'CR-12'],
    steps: ['Initialize payment session via REST endpoint `/v1/checkout`', 'Submit encrypted payload with valid test card credentials'],
    expected: 'System confirms card authorization and triggers balance update in ledger service within 200ms latency window.'
  },
  {
    id: 'TC_078',
    name: 'Portfolio View',
    description: 'Ensure the portfolio summary displays correct asset allocation and values.',
    module: 'Portfolio',
    feature: 'Dashboard',
    type: 'UI',
    priority: 'Medium',
    status: 'Candidate',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-302'],
    steps: ['Login to application', 'Navigate to portfolio section'],
    expected: 'Portfolio data is displayed correctly'
  },
  {
    id: 'TC_012',
    name: 'Logout User',
    description: 'Verify session termination and redirection upon logout.',
    module: 'Login',
    feature: 'Authentication',
    type: 'UI',
    priority: 'Low',
    status: 'Deprecated',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-102'],
    steps: ['Click logout button'],
    expected: 'User is redirected to login page'
  },
  {
    id: 'TC_089',
    name: 'Wire Transfer Int',
    description: 'Validate wire transfer initiation and settlement across internal accounts.',
    module: 'Payments',
    feature: 'Wire Transfer',
    type: 'Integration',
    priority: 'High',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-210', 'CR-18'],
    steps: ['Authenticate with test account', 'Navigate to wire transfer section', 'Enter recipient and amount', 'Confirm transfer via OTP'],
    expected: 'Transfer is initiated and deducted from source balance within 5 seconds.'
  },
  {
    id: 'TC_103',
    name: 'MFA Enrollment',
    description: 'Verify that users can enroll in multi-factor authentication successfully.',
    module: 'User Management',
    feature: 'Security',
    type: 'UI',
    priority: 'High',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-115', 'US-88'],
    steps: ['Login to account settings', 'Navigate to security section', 'Select MFA method (TOTP)', 'Scan QR code and verify'],
    expected: 'MFA is activated and confirmation email sent to user.'
  },
  {
    id: 'TC_112',
    name: 'Portfolio Rebalance',
    description: 'Verify that portfolio rebalancing correctly redistributes assets per target allocation.',
    module: 'Portfolio',
    feature: 'Rebalancing',
    type: 'Functional',
    priority: 'Medium',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-310', 'US-102'],
    steps: ['Login and navigate to portfolio', 'Click "Rebalance" action', 'Confirm target allocations'],
    expected: 'Assets reallocated to match target percentages within 0.5% tolerance.'
  },
  {
    id: 'TC_127',
    name: 'API Rate Limit',
    description: 'Verify that the API gateway enforces rate limits and returns 429 on breach.',
    module: 'API Gateway',
    feature: 'Rate Limiting',
    type: 'API',
    priority: 'High',
    status: 'Under Review',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-401', 'CR-25'],
    steps: ['Send 100 requests within 60 seconds to `/v1/payments`', 'Send the 101st request'],
    expected: 'API returns HTTP 429 Too Many Requests with Retry-After header.'
  },
  {
    id: 'TC_134',
    name: 'Notification Email',
    description: 'Ensure transactional notification emails are dispatched on payment completion.',
    module: 'Notifications',
    feature: 'Email Alerts',
    type: 'Functional',
    priority: 'Medium',
    status: 'Active',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-512', 'US-76'],
    steps: ['Complete a card payment', 'Check registered email inbox within 30 seconds'],
    expected: 'Payment confirmation email received with correct transaction details.'
  },
  {
    id: 'TC_148',
    name: 'Report Export PDF',
    description: 'Validate that the reporting module exports accurate PDF statements.',
    module: 'Reporting',
    feature: 'PDF Export',
    type: 'UI',
    priority: 'Low',
    status: 'Candidate',
    project: 'Retail App v1.0',
    linkedRequirements: ['REQ-605'],
    steps: ['Navigate to reporting section', 'Select date range', 'Click Export as PDF'],
    expected: 'PDF downloaded contains correct transaction data for selected period.'
  },
];

export const TestCaseRegistration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedTestCase, setSelectedTestCase] = useState(MOCK_TEST_CASES[1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [editingCase, setEditingCase] = useState<any>(null);

  const modules = ['All', 'Login', 'Payments', 'Portfolio', 'User Management', 'API Gateway', 'Notifications', 'Reporting'];
  const statuses = ['Active', 'Deprecated', 'Candidate', 'Under Review'];
  const types = ['Functional', 'UI', 'API', 'Integration'];
  const priorities = ['High', 'Medium', 'Low'];

  const filteredTestCases = MOCK_TEST_CASES.filter(tc => {
    const matchesSearch = tc.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === 'All' || tc.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  const handleCreate = () => {
    setEditingCase({
      id: `TC_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: '',
      description: '',
      module: 'Login' as string,
      feature: '',
      type: 'UI',
      priority: 'Medium',
      status: 'Candidate',
      project: 'Retail App v1.0',
      linkedRequirements: [],
      steps: [''],
      expected: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (tc: any) => {
    setEditingCase({ ...tc });
    setIsModalOpen(true);
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      alert('Test cases imported and normalized to standard template.');
    }, 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Test case saved to repository.');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-8 py-6 flex justify-between items-end shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-wider">Project Context</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Retail App v1.0 / Release Q1</span>
          </div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Test Case Registration</h2>
          <p className="text-sm text-secondary mt-1">Manage and architect precision-focused quality validation scenarios.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleImport}
            disabled={isImporting}
            className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors disabled:opacity-50"
          >
            <FileUp className="w-4 h-4" /> {isImporting ? 'Normalizing...' : 'Import Test Cases'}
          </button>
          <button 
            onClick={handleCreate}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-sm active:opacity-90"
          >
            <Plus className="w-4 h-4" /> Create Test Case
          </button>
        </div>
      </div>

      <div className="flex-1 flex px-8 pb-8 gap-6 overflow-hidden">
        <aside className="w-56 flex flex-col gap-4 shrink-0">
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-secondary px-2">Modules</h3>
            <div className="space-y-1">
              {modules.map(module => (
                <button 
                  key={module}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm flex justify-between items-center group ${selectedModule === module ? 'bg-white text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                >
                  {module}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedModule === module ? 'bg-primary/10 text-primary' : 'opacity-40'}`}>
                    {module === 'All' ? MOCK_TEST_CASES.length : MOCK_TEST_CASES.filter(tc => tc.module === module).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-tertiary mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Suggestion</span>
            </div>
            <p className="text-[11px] leading-relaxed text-tertiary/80">Coverage in <span className="font-bold">Payments</span> is 14% below baseline. Recommend adding 3 API validation scenarios.</p>
          </div>
        </aside>

        <section className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 flex flex-col min-w-0">
          <div className="p-4 border-b border-outline-variant/15 flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary" 
                placeholder="Filter cases by ID or Name..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-outline cursor-pointer hover:text-primary" />
              <MoreVertical className="w-4 h-4 text-outline cursor-pointer hover:text-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-lowest z-10">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-secondary border-b border-outline-variant/15">
                  <th className="px-4 py-3">Test ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Module</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filteredTestCases.map((tc) => (
                  <tr 
                    key={tc.id} 
                    onClick={() => setSelectedTestCase(tc)}
                    className={`group hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/5 ${selectedTestCase.id === tc.id ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-4 py-3 font-mono text-primary font-semibold">{tc.id}</td>
                    <td className="px-4 py-3 font-medium">{tc.name}</td>
                    <td className="px-4 py-3 text-secondary">{tc.module}</td>
                    <td className="px-4 py-3">
                      <span className="bg-surface-container-highest px-2 py-0.5 rounded text-[10px]">{tc.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={tc.priority === 'High' ? 'text-error' : 'text-secondary'}>{tc.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-sm font-semibold text-[10px]">{tc.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="w-80 flex flex-col gap-6 overflow-hidden shrink-0">
          <div className="bg-indigo-50/80 backdrop-blur-xl border border-indigo-400/20 rounded-xl p-5 flex flex-col h-full shadow-2xl shadow-indigo-500/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Detail View</span>
                <h3 className="text-lg font-extrabold font-headline text-on-surface">{selectedTestCase.id}</h3>
              </div>
              <button className="text-secondary hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto no-scrollbar space-y-6">
              <section>
                <h4 className="text-[10px] font-bold uppercase text-secondary mb-1 flex items-center gap-1">
                  Description
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{selectedTestCase.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-secondary mb-1">Feature</h4>
                    <p className="text-xs font-medium">{selectedTestCase.feature}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-secondary mb-1">Project</h4>
                    <p className="text-xs font-medium">{selectedTestCase.project}</p>
                  </div>
                </div>

                <h4 className="text-[10px] font-bold uppercase text-secondary mb-2 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" /> Linked Requirements
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTestCase.linkedRequirements.map(req => (
                    <span key={req} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">{req}</span>
                  ))}
                </div>

                <h4 className="text-[10px] font-bold uppercase text-secondary mb-3 flex items-center gap-1">
                  <ListOrdered className="w-3 h-3" /> Steps
                </h4>
                <div className="space-y-3">
                  {selectedTestCase.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 text-xs leading-relaxed">
                      <span className="text-primary font-bold">{(i + 1).toString().padStart(2, '0')}</span>
                      <p className="text-on-surface-variant">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase text-secondary mb-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Expected Result
                </h4>
                <div className="bg-white/50 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-xs text-on-surface-variant leading-relaxed">{selectedTestCase.expected}</p>
                </div>
              </section>
            </div>
            <div className="mt-auto pt-6 border-t border-indigo-200/50">
              <button 
                onClick={() => handleEdit(selectedTestCase)}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-2.5 rounded-lg text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit Case Logic
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && editingCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-outline-variant/15 flex justify-between items-center">
              <h3 className="text-lg font-bold font-headline">{editingCase.id ? `Edit Test Case: ${editingCase.id}` : 'Create New Test Case'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Title / Name</label>
                  <input 
                    type="text" 
                    required
                    value={editingCase.name}
                    onChange={(e) => setEditingCase({ ...editingCase, name: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                    placeholder="e.g., Verify successful login"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Description</label>
                  <textarea 
                    rows={3}
                    value={editingCase.description}
                    onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Concise description of the test scenario..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Module</label>
                  <select 
                    value={editingCase.module}
                    onChange={(e) => setEditingCase({ ...editingCase, module: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                  >
                    {modules.filter(m => m !== 'All').map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Feature</label>
                  <input 
                    type="text" 
                    value={editingCase.feature}
                    onChange={(e) => setEditingCase({ ...editingCase, feature: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                    placeholder="e.g., Authentication"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Type</label>
                  <select 
                    value={editingCase.type}
                    onChange={(e) => setEditingCase({ ...editingCase, type: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                  >
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Priority</label>
                  <select 
                    value={editingCase.priority}
                    onChange={(e) => setEditingCase({ ...editingCase, priority: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                  >
                    {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Status</label>
                  <select 
                    value={editingCase.status}
                    onChange={(e) => setEditingCase({ ...editingCase, status: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Project Context</label>
                  <input 
                    type="text" 
                    value={editingCase.project}
                    onChange={(e) => setEditingCase({ ...editingCase, project: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                    placeholder="Retail App v1.0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5 flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" /> Linked Requirements / Stories
                  </label>
                  <input 
                    type="text" 
                    value={editingCase.linkedRequirements.join(', ')}
                    onChange={(e) => setEditingCase({ ...editingCase, linkedRequirements: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                    placeholder="e.g., REQ-101, US-45"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-secondary uppercase mb-1.5">Expected Result</label>
                  <textarea 
                    rows={2}
                    value={editingCase.expected}
                    onChange={(e) => setEditingCase({ ...editingCase, expected: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary resize-none"
                    placeholder="What is the expected outcome?"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/15">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg text-sm font-bold text-secondary hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-2 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  Save to Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

