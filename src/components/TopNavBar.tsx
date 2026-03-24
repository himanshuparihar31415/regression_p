import React from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

interface TopNavBarProps {
  title: string;
  subtitle?: string;
  tabs?: { label: string; path: string }[];
}

export const TopNavBar = ({ title, subtitle, tabs }: TopNavBarProps) => {
  return (
    <header className="bg-surface-container-low border-b border-outline-variant/10 flex justify-between items-center w-full px-6 h-14 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <span className="text-lg font-extrabold text-primary font-headline">{title}</span>
        {tabs && (
          <div className="flex gap-4 font-headline font-bold text-sm tracking-tight">
            {tabs.map((tab, i) => (
              <NavLink
                key={i}
                to={tab.path}
                className={({ isActive }) => cn(
                  "pb-1 transition-colors",
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-secondary hover:text-primary"
                )}
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="text-secondary hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-secondary hover:text-primary transition-colors">
          <UserCircle className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
