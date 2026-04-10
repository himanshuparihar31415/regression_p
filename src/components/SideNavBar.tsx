import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Bolt, 
  CalendarDays, 
  ClipboardCheck, 
  Settings2, 
  Database, 
  Layers, 
  PlayCircle, 
  BarChart3, 
  SearchCode, 
  Bug, 
  Settings, 
  HelpCircle,
  FileCode2
} from 'lucide-react';
import { cn } from '../lib/utils';

import { useSignal } from '../context/SignalContext';

const navItems = [
  { icon: Bolt, label: 'Change Signal', path: '/' },
  { icon: CalendarDays, label: 'Planning', path: '/planning', requiresSignal: true },
  { icon: ClipboardCheck, label: 'Test Management', path: '/test-management' },
  { icon: Settings2, label: 'Automation Management', path: '/automation' },
  { icon: Database, label: 'Data & Env Prep', path: '/data-prep' },
  { icon: Layers, label: 'Suite Definition', path: '/suite-definition' },
  { icon: PlayCircle, label: 'Execution', path: '/execution' },
  { icon: BarChart3, label: 'Results', path: '/results' },
  { icon: SearchCode, label: 'Analysis', path: '/analysis' },
  { icon: Bug, label: 'Defect Handling', path: '/defects' },
];

export const SideNavBar = () => {
  const location = useLocation();
  const { isSignalDetected } = useSignal();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-surface-container-low border-r border-outline-variant/10 z-40">
      <div className="flex flex-col h-full py-6 px-4">
        <div className="mb-8 px-1">
          <svg width="196" height="52" viewBox="0 0 196 52" xmlns="http://www.w3.org/2000/svg">
            {/* Circle background */}
            <circle cx="26" cy="26" r="23" fill="#EEF4FF" />

            {/* Magnifying glass lens */}
            <circle cx="22" cy="22" r="9" fill="none" stroke="#1e3a8a" strokeWidth="2.4" />
            {/* Handle */}
            <line x1="28.4" y1="28.4" x2="35" y2="35" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" />
            {/* Checkmark inside lens */}
            <polyline points="16.5,22 20,25.5 27,16.5" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Orange dot — top left */}
            <circle cx="14" cy="13" r="2.8" fill="#f97316" />
            {/* Blue dot — top right */}
            <circle cx="29" cy="11.5" r="2.2" fill="#60a5fa" />

            {/* "brAIn spark" */}
            <text x="56" y="24" fontFamily="'Arial Black', Arial, sans-serif" fontSize="15" fontWeight="900">
              <tspan fill="#0f172a">br</tspan>
              <tspan fill="#f97316">AI</tspan>
              <tspan fill="#0f172a">n spark</tspan>
            </text>

            {/* Divider line */}
            <line x1="56" y1="29" x2="194" y2="29" stroke="#e2e8f0" strokeWidth="0.8" />

            {/* "intelli QA" */}
            <text x="57" y="42" fontFamily="Arial, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="2">
              <tspan fill="#1d4ed8">intelli</tspan>
              <tspan fill="#f97316"> QA</tspan>
            </text>
          </svg>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isDisabled = item.requiresSignal && !isSignalDetected;
            
            return (
              <NavLink
                key={item.path}
                to={isDisabled ? "#" : item.path}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                    alert('Please detect a Change Signal first to enable Planning.');
                  }
                }}
                className={({ isActive }) => {
                  // Custom active logic for sub-routes
                  const isSubRouteActive = 
                    (item.path === '/test-management' && ['/test-management', '/tagging', '/import-export'].includes(location.pathname)) ||
                    (item.path === '/automation' && ['/automation', '/git-history'].includes(location.pathname)) ||
                    (item.path === '/data-prep' && ['/data-prep', '/readiness', '/service-integrity'].includes(location.pathname)) ||
                    (item.path === '/execution' && ['/execution', '/config', '/history'].includes(location.pathname));

                  return cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
                    (isActive || isSubRouteActive)
                      ? "bg-surface-container-lowest text-primary font-bold shadow-sm translate-x-1" 
                      : "text-secondary hover:bg-surface-container-high",
                    isDisabled && "opacity-40 cursor-not-allowed grayscale"
                  );
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/10 flex flex-col gap-1">
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
              isActive ? "text-primary font-bold" : "text-secondary hover:bg-surface-container-high"
            )}
          >
            <Settings className="w-4 h-4" />
            Settings
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
              isActive ? "text-primary font-bold" : "text-secondary hover:bg-surface-container-high"
            )}
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
