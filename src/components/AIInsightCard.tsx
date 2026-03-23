import React from 'react';
import { Sparkles, AlertTriangle, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface AIInsightCardProps {
  title: string;
  description: string;
  type?: 'warning' | 'info' | 'success';
  actionLabel?: string;
  onAction?: () => void;
}

export const AIInsightCard = ({ title, description, type = 'info', actionLabel, onAction }: AIInsightCardProps) => {
  const icons = {
    warning: AlertTriangle,
    info: Sparkles,
    success: Zap,
  };
  const Icon = icons[type];

  return (
    <div className="bg-tertiary/5 backdrop-blur-xl border-l-4 border-tertiary rounded-lg p-4 shadow-sm group hover:bg-tertiary/10 transition-colors">
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-tertiary mt-0.5" />
        <div>
          <p className="text-[11px] font-bold text-tertiary uppercase tracking-tight mb-1">{title}</p>
          <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{description}</p>
          {actionLabel && (
            <button 
              onClick={onAction}
              className="mt-3 text-[10px] font-bold text-tertiary hover:underline uppercase tracking-wider flex items-center gap-1"
            >
              {actionLabel}
              <span className="text-xs">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
