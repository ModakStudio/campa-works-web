import { useState } from 'react';
import './Classroom.css';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

const Courses = [
  { id: '01', name: '자료구조', code: 'COME0331', credits: '3-3-0', capacity: 70, facility: '2층' },
  { id: '02', name: '알고리즘', code: 'COME0320', credits: '3-2-2', capacity: 70, facility: '3층' },
  { id: '03', name: '컴퓨터구조', code: 'COMP0411', credits: '3-3-0', capacity: 140, facility: '1층' },
  { id: '04', name: '운영체제', code: 'COME0312', credits: '3-3-0', capacity: 140, facility: '1층' },
  { id: '05', name: '이산수학', code: 'COME0331', credits: '3-3-0', capacity: 60, facility: '2층' },
  { id: '06', name: '기계학습', code: 'COMP00720', credits: '3-3-0', capacity: 40, facility: '3층' },
  { id: '07', name: '인공지능', code: 'COMP0324', credits: '3-3-0', capacity: 20, facility: '2층' },
  { id: '08', name: '프로그래밍기초', code: 'COMP0204', credits: '3-2-2', capacity: 40, facility: '3층,컴퓨터' },
  { id: '09', name: '데이터베이스', code: 'COMP0322', credits: '3-2-2', capacity: 70, facility: '3층' },
  { id: '10', name: '소프트웨어공학', code: 'EECS0312', credits: '3-3-0', capacity: 40, facility: '2층' },
];

export default function Classroom() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = Courses.filter(
    (course) => course.name.includes(searchTerm) || course.code.includes(searchTerm));

    return (
        <div className="Container">
            <div className="Header">
                <div>
                    <h1 className="page_title">과목 관리</h1>
                    <p className="page_subtitle">학기별 개설 과목의 상세 정보를 설정하고 관리하는 페이지입니다.</p>
                </div>

                <div className="button_group">
                    <button className="btn">
                        <img src={downloadIcon} alt="다운로드 아이콘" className="btn_icon_img" />
                        기본 양식 다운로드
                    </button>
                    <button className="btn">
                        <span className="btn_icon">+</span>
                        과목 다중 등록
                    </button>
                    <button className="btn">
                        <span className="btn_icon">+</span>
                        과목 등록
                    </button>
                </div>
            </div>

            <div className="search_container">
                <img src={searchIcon} alt="검색 아이콘" className="search_icon_img" />
                <input 
                    type="text" className="search_input" placeholder="검색어를 입력해주세요." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>

            <div className="table_container">
                <table className="course_table">
                <thead>
                    <tr>
                        <th style={{ width: "60px" }}>#</th>
                        <th>과목명</th>
                        <th>과목코드</th>
                        <th>학점</th>
                        <th>인원수</th>
                        <th>시설</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course) => (
                        <tr key={course.id}>
                            <td className="col_id">{course.id}</td>
                            <td className="col_name">{course.name}</td>
                            <td>{course.code}</td>
                            <td>{course.credits}</td>
                            <td>{course.capacity}</td>
                            <td>{course.facility}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}