/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChangeSignal } from './screens/ChangeSignal';
import { ScopePlanning } from './screens/ScopePlanning';
import { TestCaseRegistration } from './screens/TestCaseRegistration';
import { AutomationManagement } from './screens/AutomationManagement';
import { TestDataPlanning } from './screens/TestDataPlanning';
import { SuiteAssembly } from './screens/SuiteAssembly';
import { ExecutionDashboard } from './screens/ExecutionDashboard';
import { Results } from './screens/Results';
import { FailureAnalysis } from './screens/FailureAnalysis';
import { DefectHandling } from './screens/DefectHandling';
import { TaggingGrouping } from './screens/TaggingGrouping';
import { CoverageAnalysis } from './screens/CoverageAnalysis';
import { EnvironmentReadiness } from './screens/EnvironmentReadiness';
import { ExecutionConfig } from './screens/ExecutionConfig';
import { ImportExport } from './screens/ImportExport';
import { GitHistory } from './screens/GitHistory';
import { ServiceIntegrity } from './screens/ServiceIntegrity';
import { ExecutionHistory } from './screens/ExecutionHistory';

import { SignalProvider } from './context/SignalContext';

export default function App() {
  return (
    <SignalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ChangeSignal />} />
            <Route path="planning" element={<ScopePlanning />} />
            <Route path="test-management" element={<TestCaseRegistration />} />
            <Route path="tagging" element={<TaggingGrouping />} />
            <Route path="import-export" element={<ImportExport />} />
            <Route path="automation" element={<AutomationManagement />} />
            <Route path="git-history" element={<GitHistory />} />
            <Route path="data-prep" element={<TestDataPlanning />} />
            <Route path="readiness" element={<EnvironmentReadiness />} />
            <Route path="service-integrity" element={<ServiceIntegrity />} />
            <Route path="suite-definition" element={<SuiteAssembly />} />
            <Route path="execution" element={<ExecutionDashboard />} />
            <Route path="config" element={<ExecutionConfig />} />
            <Route path="history" element={<ExecutionHistory />} />
            <Route path="results" element={<Results />} />
            <Route path="analysis" element={<FailureAnalysis />} />
            <Route path="defects" element={<DefectHandling />} />
            <Route path="coverage" element={<CoverageAnalysis />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SignalProvider>
  );
}
