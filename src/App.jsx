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
//import Header from './component/Header/Header';
//import Sidebar from './component/Sidebar/sidebar';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
          <Route path="/dashboard/:professorId" element={<Layout><DashboardDetail/></Layout>}/>
          <Route path="/mastercourse" element={<Layout><MasterCourse/></Layout>}/>
          <Route path="/lectureroom" element={<Layout><Lectureroom/></Layout>}/>
          <Route path="/facility" element={<Layout><Facility/></Layout>}/>
          <Route path="/professor" element={<Layout><Professor/></Layout>}/>
          {/* <Route path="/Header" element={<Header/>}/> */}
          {/*<Route path="/sidebar" element={<Sidebar/>}/>*/}

      </Routes>
    </BrowserRouter>
  );
}

export default App;