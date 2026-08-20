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

const menuItems = {
  ADMIN: [
    { name: '대시보드', path: '/dashboard', icon: dashboardIcon },
    { name: '과목 배정 관리', path: '/assignments', icon: assignmentIcon },
    { name: '시설 관리', path: '/facility', icon: facilityIcon },
    { name: '과목 관리', path: '/mastercourse', icon: courseIcon },
  //{ name: '전공 관리', path: '/majors', icon: majorIcon },
    { name: '강의실 관리', path: '/lectureroom', icon: classroomIcon },
    { name: '시간표 관리', path: '/schedules', icon: scheduleIcon },
    { name: '출장 신청 관리', path: '/business-trips', icon: businessTripIcon },
    { name: '교수 현황', path: '/professor', icon: professorIcon },
  ],
  PROFESSOR: [
    { name: '대시보드', path: '/professor/dashboard', icon: dashboardIcon },
    { name: '과목 선호도 제출', path: '/professor/assignments', icon: majorIcon },
    { name: '내 배정 결과', path: '/professor/assignments', icon: assignmentIcon },
    { name: '강의 시간표', path: '/professor/schedules', icon: scheduleIcon },
    { name: '출장 신청', path: '/professor/business-trips', icon: businessTripIcon },
    { name: '설정', path: '/professor/setting', icon: professorIcon },
  ]
};

export default function Sidebar({ userRole }) {
  const items = menuItems[userRole] || menuItems.ADMIN;

  return (
    <aside className="sidebar">
      <nav className="sidebarNav">
        {items.map((item) =>
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