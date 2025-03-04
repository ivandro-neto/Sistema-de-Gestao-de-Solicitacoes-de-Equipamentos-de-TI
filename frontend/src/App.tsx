import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/(public)/Login';
import HomePage from './pages/(public)/Home';
import UserManagement from './pages/(admin)/UserManagementPage';
import Dashboard from './pages/(admin)/DashboardPage';
import DashboardUser from './pages/(users)/DashboardPage';
import DashboardTechnician from './pages/(techs)/DashboardPage';
import RequestsList from './pages/(default)/RequestListPage';
import RequestsListTechs from './pages/(techs)/RequestListPage';
import RequestsListUser from './pages/(users)/RequestListPage';
import TechnicianPanel from './pages/(techs)/TechnicianPanel';
import StatusUpdate from './pages/(techs)/StatusUpdate';
import RequestDetails from './pages/(default)/RequestDetailsPage';
import ReportDetail from './pages/(admin)/ReportsStatistics';
import ReportsStatistics from './pages/(admin)/ReportsStatistics';
import InventoryList from './pages/(techs)/InventoryListPage';
import InventoryVerification from './pages/(techs)/InventoryVerification';
import InventoryListAdmin from './pages/(admin)/InventoryListPage';
import Inbox from './pages/Inbox';
import ReceiptsPage from './pages/(users)/ReceiptsPage';
import ManualAssignmentPage from './pages/(admin)/ManualAssignPage';
import AssignmentsListPage from './pages/(admin)/AssignmentListPage';
import ReplenishmentOrdersPage from './pages/(admin)/ReplenishmentOrdersPage/ReplenishmentOrdersPage';
import ProfileSettingsPage from './pages/(default)/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin routes */}
        <Route element={<UserManagement/>} path='/admin/user/managment'/>
        <Route element={<Dashboard/>} path='/admin/dashboard'/>
        <Route element={<RequestsList/>} path='/admin/requests'/>
        <Route element={<ReportsStatistics/>} path='/admin/reports'/>
        <Route element={<InventoryListAdmin/>} path='/admin/inventory'/>
        <Route element={<ManualAssignmentPage/>} path='/admin/tech/assigns'/>
        <Route element={<AssignmentsListPage/>} path='/admin/assigns'/>
        <Route element={<InventoryVerification/>} path='/admin/inventory/check'/>
        <Route element={<ReplenishmentOrdersPage/>} path='/admin/replenishment'/>
        <Route element={<ProfileSettingsPage/>} path='/admin/profile'/>

        {/* Comercial */}
        <Route element={<ReplenishmentOrdersPage/>} path='/comer/replenishment'/>
        <Route element={<InventoryListAdmin/>} path='/comer/inventory'/>
        <Route element={<InventoryVerification/>} path='/comer/inventory/check'/>
        <Route element={<ProfileSettingsPage/>} path='/comer/profile'/>

        {/* techs routes */}
        <Route element={<DashboardTechnician/>} path='/tech/dashboard'/>
        <Route element={<RequestsListTechs/>} path='/tech/requests'/>
        <Route element={<TechnicianPanel/>} path='/tech/panel'/>
        <Route element={<InventoryList/>} path='/tech/inventory'/>
        <Route element={<InventoryVerification/>} path='/tech/inventory/check'/>
        <Route element={<ProfileSettingsPage/>} path='/tech/profile'/>
        {/* user routes */}
        <Route element={<DashboardUser/>} path='/user/dashboard'/>
        <Route element={<RequestsListUser/>} path='/user/requests'/>
        <Route element={<ReceiptsPage/>} path='/user/reciepts'/>
        <Route element={<ProfileSettingsPage/>} path='/user/profile'/>

        <Route element={<Inbox/>} path='/inbox'/>

        {/* dynamic */}
        <Route element={<RequestDetails/>} path='/request/:id'/>
        <Route element={<ReportDetail/>} path='/reports/:id'/>
        <Route element={<StatusUpdate/>} path='/tech/status-update/:id'/>

        {/* public routes */}
        <Route element={<LoginPage/>} path='/login'/>
        <Route element={<HomePage/>} path='/'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
