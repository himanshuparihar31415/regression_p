import React from 'react';
import { NavLink } from 'react-router-dom';
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

const navItems = [
  { icon: Bolt, label: 'Change Trigger', path: '/' },
  { icon: CalendarDays, label: 'Planning', path: '/planning' },
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
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-surface-container-low border-r border-outline-variant/10 z-40">
      <div className="flex flex-col h-full py-6 px-4">
        <div className="mb-8 px-2">
          <div className="font-headline font-black text-primary uppercase tracking-widest text-lg">IntelliQA</div>
          <div className="text-[10px] text-secondary font-bold tracking-tight">Precision Architect</div>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
                isActive 
                  ? "bg-surface-container-lowest text-primary font-bold shadow-sm translate-x-1" 
                  : "text-secondary hover:bg-surface-container-high"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
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
