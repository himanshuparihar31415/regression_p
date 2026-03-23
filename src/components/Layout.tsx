import React from 'react';
import { SideNavBar } from './SideNavBar';
import { TopNavBar } from './TopNavBar';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const location = useLocation();
  
  const getPageConfig = () => {
    const path = location.pathname;
    const tabs = [
      { label: 'Release_2026_03_Sprint_5' },
      { label: 'QA/UAT/Pre-Prod', active: true }
    ];

    switch (path) {
      case '/':
        return { title: 'Change Identification', tabs };
      case '/planning':
        return { title: 'Scope Planning', tabs };
      case '/test-management':
        return { title: 'Test Case Registration', tabs: [
          { label: 'Test Cases', active: true },
          { label: 'Tagging & Grouping' },
          { label: 'Import/Export' }
        ] };
      case '/automation':
        return { title: 'Automation Management', tabs: [
          { label: 'Scripts', active: true },
          { label: 'Executions' },
          { label: 'Git History' }
        ] };
      case '/data-prep':
        return { title: 'Data & Env Prep', tabs: [
          { label: 'Test Data', active: true },
          { label: 'Environment Readiness' },
          { label: 'Service Integrity' }
        ] };
      case '/suite-definition':
        return { title: 'Suite Assembly', tabs };
      case '/execution':
        return { title: 'Execution Dashboard', tabs: [
          { label: 'Live Monitor', active: true },
          { label: 'Configuration' },
          { label: 'History' }
        ] };
      case '/results':
        return { title: 'Execution Results', tabs };
      case '/analysis':
        return { title: 'Failure Analysis', tabs };
      case '/defects':
        return { title: 'Defect Handling', tabs };
      case '/coverage':
        return { title: 'Coverage Analysis', tabs };
      default:
        return { title: 'IntelliQA', tabs };
    }
  };

  const config = getPageConfig();

  return (
    <div className="flex min-h-screen bg-surface">
      <SideNavBar />
      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        <TopNavBar title={config.title} tabs={config.tabs} />
        <div className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
