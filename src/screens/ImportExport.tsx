import React from 'react';
import { Upload, Download, FileText, Database, ShieldCheck, AlertCircle } from 'lucide-react';

export const ImportExport = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">Import & Export</h2>
          <p className="text-sm text-secondary font-medium mt-1">Bulk manage test cases and data sets via external files.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Upload className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase tracking-widest">Import Data</h3>
          </div>
          <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-on-surface">Drop files here or click to upload</p>
              <p className="text-[10px] text-outline font-bold uppercase mt-1">Supported: .csv, .xlsx, .json</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Recent Imports</h4>
            {[
              { name: 'Q1_Regression_Suite.xlsx', date: '2h ago', status: 'Success' },
              { name: 'Payment_Module_Tests.csv', date: '1d ago', status: 'Success' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-outline" />
                  <span className="text-xs font-bold text-on-surface">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-3 text-secondary">
            <Download className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase tracking-widest">Export Data</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
              <h4 className="text-sm font-bold text-on-surface mb-2">Full Suite Export</h4>
              <p className="text-xs text-on-surface-variant mb-4">Export all test cases, mappings, and metadata for offline review.</p>
              <button className="w-full py-2 bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm hover:opacity-90 transition-opacity">
                Generate Export
              </button>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
              <h4 className="text-sm font-bold text-on-surface mb-2">Selective Export</h4>
              <p className="text-xs text-on-surface-variant mb-4">Export specific modules or filtered results.</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-md">JSON</button>
                <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-md">CSV</button>
                <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-md">Excel</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
