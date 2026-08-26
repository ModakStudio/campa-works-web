import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './pages/Login/Login';
import Register from './pages/admin/Register/Registrer';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import Layout from './component/Layout/Layout';
import DashboardDetail from './pages/admin/DashboardDetail/DashboardDetail';
import MasterCourse from './pages/admin/Master_Course/Master_Course';
import Lectureroom from './pages/admin/Lectureroom/Lectureroom';
import Facility from './pages/admin/Facility/Facility';
import Professor from './pages/admin/Professor/Professor';
import Setting from './pages/professor/Setting/Setting';
//import Header from './component/Header/Header';
//import Sidebar from './component/Sidebar/sidebar';



function App() {
  const userRole = sessionStorage.getItem('userRole') || 'PROFESSOR';
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout userRole={userRole} />}>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/:professorId" element={<DashboardDetail/>}/>
            <Route path="/mastercourse" element={<MasterCourse/>}/>
            <Route path="/lectureroom" element={<Lectureroom/>}/>
            <Route path="/facility" element={<Facility/>}/>
            <Route path="/professor" element={<Professor/>}/>

            <Route path="/professor/setting" element={<Setting/>}/>
            {/* <Route path="/Header" element={<Header/>}/> */}
            {/*<Route path="/sidebar" element={<Sidebar/>}/>*/}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;