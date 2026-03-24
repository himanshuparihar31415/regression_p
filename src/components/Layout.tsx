import React from 'react';
import { SideNavBar } from './SideNavBar';
import { TopNavBar } from './TopNavBar';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const location = useLocation();
  
  const getPageConfig = () => {
    const path = location.pathname;
    const releaseTabs = [
      { label: 'Release_2026_03_Sprint_5', path: '#' },
      { label: 'QA/UAT/Pre-Prod', path: '#' }
    ];

    if (path === '/test-management' || path === '/tagging' || path === '/import-export') {
      return { 
        title: 'Test Management', 
        tabs: [
          { label: 'Test Cases', path: '/test-management' },
          { label: 'Tagging & Grouping', path: '/tagging' },
          { label: 'Import/Export', path: '/import-export' }
        ] 
      };
    }

    if (path === '/automation' || path === '/git-history') {
      return { 
        title: 'Automation Management', 
        tabs: [
          { label: 'Scripts', path: '/automation' },
          { label: 'Executions', path: '/execution' },
          { label: 'Git History', path: '/git-history' }
        ] 
      };
    }

    if (path === '/data-prep' || path === '/readiness' || path === '/service-integrity') {
      return { 
        title: 'Data & Env Prep', 
        tabs: [
          { label: 'Test Data', path: '/data-prep' },
          { label: 'Environment Readiness', path: '/readiness' },
          { label: 'Service Integrity', path: '/service-integrity' }
        ] 
      };
    }

    if (path === '/execution' || path === '/config' || path === '/history') {
      return { 
        title: 'Execution Dashboard', 
        tabs: [
          { label: 'Live Monitor', path: '/execution' },
          { label: 'Configuration', path: '/config' },
          { label: 'History', path: '/history' }
        ] 
      };
    }

    switch (path) {
      case '/':
        return { title: 'Change Signal', tabs: releaseTabs };
      case '/planning':
        return { title: 'Scope Planning', tabs: releaseTabs };
      case '/suite-definition':
        return { title: 'Suite Assembly', tabs: releaseTabs };
      case '/results':
        return { title: 'Execution Results', tabs: releaseTabs };
      case '/analysis':
        return { title: 'Failure Analysis', tabs: releaseTabs };
      case '/defects':
        return { title: 'Defect Handling', tabs: releaseTabs };
      case '/coverage':
        return { title: 'Coverage Analysis', tabs: releaseTabs };
      default:
        return { title: 'IntelliQA', tabs: releaseTabs };
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
