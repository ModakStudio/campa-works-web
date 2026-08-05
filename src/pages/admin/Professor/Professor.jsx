import { useState, useEffect } from 'react';
import './Professor.css';
import checkedIcon from '../../../assets/icons/check.png';
import axios from 'axios';

const formatPosition = (position) => {
    switch (position) {
        case 'PROFESSOR':
            return '전임 교수';
        case 'INVITED_PROFESSOR':
            return '초빙 교수';
        case 'CONCURRENT':
            return '겸임 교수';
        case 'VISITING_PROFESSOR':
            return '방문 교수';
        case 'EMERITUS':
            return '명예 교수';
        default:
            return position || '오류';
    }
};

export default function Professor() {
    const [professorList, setProfessorList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await axios.get('/api/professors');
                setProfessorList(response.data);
            } catch (error) {
                console.error('Error fetching professors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []);

    if (loading) {
        return <div className="Container">로딩 중...</div>;
    }

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
                            <th style={{ width: '25%' }}>교수명</th>
                            <th style={{ width: '20%' }}>직급</th>
                            <th style={{ width: '35%' }}>이메일</th>
                            <th style={{ width: '20%' }}>선호도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professorList.length > 0 ? (
                            professorList.map((row, index) => (
                                <tr key={row.id}>
                                    <td className="col_id">{String(index + 1).padStart(2, '0')}</td>
                                    <td className="col_professor_info">
                                        <div className="col_name">{row.user?.name}</div>
                                        <div className="col_lab">{row.office}</div>
                                    </td>
                                    <td>{formatPosition(row.position)}</td>
                                    <td>{row.user?.email}</td>
                                    <td>
                                        <img
                                            src={checkedIcon}
                                            alt="완료"
                                            className="status_icon_img"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no_data">
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