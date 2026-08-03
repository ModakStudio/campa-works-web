import './Dashboard.css';

import autoAssignIcon from '../../../assets/icons/assignment.png'; 
import autoScheduleIcon from '../../../assets/icons/schedule.png'; 
import checkIcon from '../../../assets/icons/check.png'; 
import uncheckIcon from '../../../assets/icons/uncheck.png';
import { useNavigate } from 'react-router-dom';

const professorlist=
[
    {id: 1, name: "김철수", role: "교수", isSubmitted:true},
    {id: 2, name: "이영희", role: "부교수", isSubmitted:true},
    {id: 3, name: "박민준", role: "교수", isSubmitted:true},
    {id: 4, name: "최지헌", role: "조교수", isSubmitted:true},
    {id: 5, name: "정수연", role: "교수", isSubmitted:false},
];

export default function Dashboard() {

    const navigate=useNavigate();
    const handleNameClick = (professorId) => {
        navigate(`/dashboard/${professorId}`);
    };

    return (
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <h1 className="dashboardTitle">대시보드</h1>
                <p className="dashboardSubtitle">2025-2026학년도 2학기 현황</p>
            </header>

        <div className="statCardsGrid">
            <div className="statCard">
                <span className="statTitle">전체 교수</span>
                <div className="statValue">6<span className="statUnit">명</span></div>
            </div>

            <div className="statCard">
                <span className="statTitle">선호도 제출</span>
                <div className="statValue">5/6<span className="statUnit">명</span></div>
            </div>

            <div className="statCard">
                <span className="statTitle">배정 현황</span>
                <div className="statValue">미진행</div>
            </div>

            <div className="statCard">
                <span className="statTitle">검토중 출장</span>
                <div className="statValue">2<span className="statUnit">건</span></div>
            </div>
        </div>

        <div className="sectionLabel">빠른 실행</div>
        <div className="quickActions">
            <div className="quickActionCard">
                <div className="quickActionHeader">
                    <img src={autoAssignIcon} alt="과목 자동 배정 아이콘" className="actionIcon" />
                    <span>과목 자동 배정</span>
                </div>
                <div className="quickActionDesc">
                    5/6명 제출 완료 - 전원 제출 후 실행 가능
                </div>
            </div>

            <div className="quickActionCard">
                <div className="quickActionHeader">
                    <img src={autoScheduleIcon} alt="시간표 자동 생성 아이콘" className="actionIcon" />
                    <span>시간표 자동 생성</span>
                </div>
                <div className="quickActionDesc">
                    과목 배정 완료 후 실행 가능합니다.
                </div>
            </div>
        </div>

        <div className="sectionLabel">선호도 제출 현황</div>
        <div className="statusListContainer">
         {professorlist.map((prof) => (
            <div key={prof.id} className="statusItem">
                <div className="userInfo">
                    <span className="userName" onClick={()=>handleNameClick(prof.id)} style={{cursor:'pointer'}}>{prof.name}</span>
                    <span className="userRole">{prof.role}</span>
                </div>

                {prof.isSubmitted ?
                (
                    <div className="statusBadge submitted">
                        <img src={checkIcon} alt="제출 완료" className="statusIcon" />
                        <span>제출 완료</span>
                    </div>
                ) : (
                    <div className="statusBadge pending">
                        <img src={uncheckIcon} alt="미제출" className="statusIcon" />
                        <span>미제출</span>
                    </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
} 
