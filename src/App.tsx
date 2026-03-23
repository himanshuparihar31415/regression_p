/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChangeIdentification } from './screens/ChangeIdentification';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChangeIdentification />} />
          <Route path="planning" element={<ScopePlanning />} />
          <Route path="test-management" element={<TestCaseRegistration />} />
          <Route path="automation" element={<AutomationManagement />} />
          <Route path="data-prep" element={<TestDataPlanning />} />
          <Route path="suite-definition" element={<SuiteAssembly />} />
          <Route path="execution" element={<ExecutionDashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="analysis" element={<FailureAnalysis />} />
          <Route path="defects" element={<DefectHandling />} />
          <Route path="tagging" element={<TaggingGrouping />} />
          <Route path="coverage" element={<CoverageAnalysis />} />
          <Route path="readiness" element={<EnvironmentReadiness />} />
          <Route path="config" element={<ExecutionConfig />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
