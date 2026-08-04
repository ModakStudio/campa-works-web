import { NavLink } from 'react-router-dom';
import './sidebar.css';

import dashboardIcon from '../../assets/icons/dashboard.png';
import assignmentIcon from '../../assets/icons/assignment.png';
import facilityIcon from '../../assets/icons/facility.png';
import courseIcon from '../../assets/icons/course.png';
import majorIcon from '../../assets/icons/major.png';
import classroomIcon from '../../assets/icons/classroom.png';
import scheduleIcon from '../../assets/icons/schedule.png';
import businessTripIcon from '../../assets/icons/business-trip.png';
import professorIcon from '../../assets/icons/professor.png';

const menuItems = 
[
  { name: '대시보드', path: '/dashboard', icon: dashboardIcon },
  { name: '과목 배정 관리', path: '/assignments', icon: assignmentIcon },
  { name: '시설 관리', path: '/facility', icon: facilityIcon },
  { name: '과목 관리', path: '/course', icon: courseIcon },
  //{ name: '전공 관리', path: '/majors', icon: majorIcon },
  { name: '강의실 관리', path: '/lectureroom', icon: classroomIcon },
  { name: '시간표 관리', path: '/schedules', icon: scheduleIcon },
  { name: '출장 신청 관리', path: '/business-trips', icon: businessTripIcon },
  { name: '교수 현황', path: '/professor', icon: professorIcon },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebarNav">
        {menuItems.map((item) =>
        (
            <NavLink
                key={item.name}
                to={item.path}
                className=
                {({ isActive }) =>  isActive ? 'sidebarLink active' : 'sidebarLink'}
            >

            <img
                src={item.icon}
                alt={`${item.name} 아이콘`}
                className="sidebarIcon"
            />
            <span>{item.name}</span>
            </NavLink>
        ))}
      </nav>
    </aside>
  );
}