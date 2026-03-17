import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Tasks from './pages/Tasks';
import Approvals from './pages/Approvals';
import Metrics from './pages/Metrics';
import Automations from './pages/Automations';
import Operations from './pages/Operations';
import Settings from './pages/Settings';
import CommandPalette from './components/CommandPalette';

export default function App() {
  return (
    <>
      <CommandPalette />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="metrics" element={<Metrics />} />
          <Route path="automations" element={<Automations />} />
          <Route path="operations" element={<Operations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
