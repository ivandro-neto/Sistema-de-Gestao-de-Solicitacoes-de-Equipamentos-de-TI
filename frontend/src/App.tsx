import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/(public)/Login';
import RegisterPage from './pages/(public)/Register';
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
import ReportsList from './pages/(admin)/ReportList';
import ReportDetail from './pages/(admin)/ReportsStatistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin routes */}
        <Route element={<UserManagement/>} path='admin/user/managment'/>
        <Route element={<Dashboard/>} path='admin/dashboard'/>
        <Route element={<RequestsList/>} path='admin/requests'/>
        <Route element={<ReportsList/>} path='admin/reports'/>

        {/* techs routes */}
        <Route element={<DashboardTechnician/>} path='tech/dashboard'/>
        <Route element={<RequestsListTechs/>} path='tech/requests'/>
        <Route element={<TechnicianPanel/>} path='tech/panel'/>
        {/* user routes */}
        <Route element={<DashboardUser/>} path='user/dashboard'/>
        <Route element={<RequestsListUser/>} path='user/requests'/>

        {/* dynamic */}
        <Route element={<RequestDetails/>} path='request/:id'/>
        <Route element={<ReportDetail/>} path='reports/:id'/>
        <Route element={<StatusUpdate/>} path='tech/status-update/:id'/>

        {/* public routes */}
        <Route element={<LoginPage/>} path='login'/>
        <Route element={<RegisterPage/>} path='register'/>
        <Route element={<HomePage/>} path='/'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
