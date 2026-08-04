import { useState } from 'react';
import './Professor.css';
import checkedIcon from '../../../assets/icons/check.png';
import uncheckedIcon from '../../../assets/icons/uncheck.png';

const DummyData = [
    { id: 1, number: '01', name: '김철수', lab: 'IT관 401호', position: '교수', email: 'cskim@knu.ac.kr', preferenceStatus: 'checked', assignedCourse: '' },
    { id: 2, number: '02', name: '이영희', lab: 'IT관 402호', position: '부교수', email: 'yhlee@knu.ac.kr', preferenceStatus: 'checked', assignedCourse: '' },
    { id: 3, number: '03', name: '박민준', lab: 'IT관 403호', position: '교수', email: 'mjpark@knu.ac.kr', preferenceStatus: 'checked', assignedCourse: '' },
    { id: 4, number: '04', name: '최지현', lab: 'IT관 404호', position: '조교수', email: 'jcshoi@knu.ac.kr', preferenceStatus: 'checked', assignedCourse: '' },
    { id: 5, number: '05', name: '정수연', lab: 'IT관 405호', position: '부교수', email: 'dhhahn@knu.ac.kr', preferenceStatus: 'clock', assignedCourse: '' },
];

export default function Professor() {
    const [professorList] = useState(DummyData);

    return (
        <div className="Container">
            <div className="Header">
                <div>
                    <h1 className="page_title">교수 현황</h1>
                    <p className="page_subtitle">학과 교수진 정보 및 업무 현황입니다.</p>
                </div>
            </div>

            <div className="table_container">
                <table className="professor_table">
                    <thead>
                        <tr>
                            <th style={{ width: '60px' }}>#</th>
                            <th style={{ width: '20%' }}>교수명</th>
                            <th style={{ width: '15%' }}>직급</th>
                            <th style={{ width: '25%' }}>이메일</th>
                            <th style={{ width: '15%' }}>선호도</th>
                            <th style={{ width: '20%' }}>배정 과목</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professorList.length > 0 ? (
                            professorList.map((row) => (
                                <tr key={row.id}>
                                    <td className="col_id">{row.number}</td>
                                    <td className="col_professor_info">
                                        <div className="col_name">{row.name}</div>
                                        <div className="col_lab">{row.lab}</div>
                                    </td>
                                    <td>{row.position}</td>
                                    <td>{row.email}</td>
                                    <td>
                                        <img
                                            src={row.preferenceStatus === 'checked' ? checkedIcon : uncheckedIcon}
                                            alt={row.preferenceStatus === 'checked' ? '완료' : '대기'}
                                            className="status_icon_img"/>
                                    </td>
                                    <td>{row.assignedCourse || ''}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no_data">
                                    등록된 교수 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}