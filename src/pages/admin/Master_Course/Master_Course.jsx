import { useState, useEffect } from 'react';
import './Master_Course.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

export default function Course() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
                const response = await axios.get('/api/master-courses');
                setCourseList(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);


    const filteredCourses = courseList.filter(
        (course) => course.name?.toLowerCase().includes(searchTerm.toLowerCase()) || course.course_code?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDownloadTemplate = () => {
        const templateData = [
            {
                '과목코드': '예시 과목코드',
                '과목명': '예시 과목명',
                '학점': '예시 학점',
                '이론': '예시 이론',
                '실습': '예시 실습',
                '대학/대학원': '대학 or 대학원'
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(templateData);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 15 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '과목등록양식');
        XLSX.writeFile(workbook, '과목_등록_기본_양식.xlsx');
    };



    return (
        <div className="Container">
            <div className="Header">
                <div>
                    <h1 className="page_title">과목 관리</h1>
                    <p className="page_subtitle">학기별 개설 과목의 상세 정보를 설정하고 관리하는 페이지입니다.</p>
                </div>

                <div className="button_group">
                    <button className="btn" onClick={handleDownloadTemplate}>
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
                        <th>이론</th>
                        <th>실습</th>
                        <th>대학/대학원</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course) => (
                        <tr key={course.id}>
                            <td className="col_id">{course.id}</td>
                            <td className="col_name">{course.name}</td>
                            <td>{course.course_code}</td>
                            <td>{course.credit}</td>
                            <td>{course.lecture}</td>
                            <td>{course.practice}</td>
                            <td>{course.course_type}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}