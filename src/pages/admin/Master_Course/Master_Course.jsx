import { useState, useEffect, useRef } from 'react';
import './Master_Course.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

export default function Course() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

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
                '대학/대학원': '대학 or 대학원',
                'is_core': 'Y or '
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(templateData);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 15 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '과목등록양식');
        XLSX.writeFile(workbook, '과목_등록_기본_양식.xlsx');
    };

    const handleBulkInsertClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rawJsonData = XLSX.utils.sheet_to_json(worksheet);

                const jsonData = rawJsonData.filter((row) => 
                    !(
                        row['과목코드'] === '예시 과목코드' && 
                        row['과목명'] === '예시 과목명' && 
                        row['학점'] === '예시 학점' && 
                        row['이론'] === '예시 이론' && 
                        row['실습'] === '예시 실습' && 
                        row['대학/대학원'] === '대학 or 대학원'
                    )
                );
                if (jsonData.length === 0) {
                    alert('엑셀 파일이 비어있습니다. 확인 후 다시 시도해주세요.');
                    return;
                }

                const errors = [];
                const isEmpty = (val) => val === undefined || val === null || String(val).trim() === '';
                for (let i = 0; i < jsonData.length; i++){
                    const row = jsonData[i];
                    const rownum = i + 2;
                    if (isEmpty(row['과목코드']))
                        errors.push("엑셀 "+ rownum +"행 과목코드");
                    if (isEmpty(row['과목명']))
                        errors.push("엑셀 "+ rownum +"행 과목명");
                    if (isEmpty(row['학점']))
                        errors.push("엑셀 "+ rownum +"행 학점");
                    if (isEmpty(row['이론']))
                        errors.push("엑셀 "+ rownum +"행 이론");
                    if (isEmpty(row['실습']))
                        errors.push("엑셀 "+ rownum +"행 실습");
                }

                if (errors.length > 0)
                    {
                        alert("다음 항목의 값들이 비어있습니다. 채워주세요.\n- " + errors.join("\n- "));
                        return;
                    }

                const trans = jsonData.map((row) => {
                    const rawType = row['대학/대학원'] || '';
                    const courseType = rawType.includes('대학원') ? 'GRADUATE' : 'UNDERGRADUATE';
                    const isCoreValue = String(row['is_core'] || '').trim().toUpperCase() === 'Y';

                    return axios.post('/api/master-courses', {
                        course_code: (row['과목코드'] || ''),
                        name: (row['과목명'] || ''),
                        credit: (row['학점']) || 0,
                        lecture: (row['이론']) || 0,
                        practice: (row['실습']) || 0,
                        course_type: courseType,
                        is_core: isCoreValue,
                    })
                });

                const connected =await Promise.allSettled(trans);
                const SuccessCnt = connected.filter(result => result.status === 'fulfilled').length;
                const FailCnt = connected.filter(result => result.status === 'rejected').length;
                
                if (FailCnt > 0) {
                    alert("엑셀 등록 성공 " + SuccessCnt + "건, 실패 " + FailCnt + "건 (중복된 과목 코드)");
                } else {
                    alert("엑셀 등록 성공 " + SuccessCnt + "건 처리 완료");
                }

                const refreshed = await axios.get('/api/master-courses');
                setCourseList(refreshed.data);
            } catch (error) {
                console.error('엑셀 등록 실패:', error);
                alert('엑셀 등록 실패 ' + (error.response?.data?.detail || '통신 오류'));
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = '';
    };

    if (loading) 
        {
            return <div className="Container">로딩 중...</div>;
        }

    return (
        <div className="Container">
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".xlsx, .xls" />
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
                    <button type="button" className="btn" onClick={handleBulkInsertClick}>
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
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "25%" }}>과목명</th>
                        <th style={{ width: "10%" }}>과목코드</th>
                        <th style={{ width: "5%" }}>학점</th>
                        <th style={{width: "5%"}}>이론</th>
                        <th style={{ width: "5%" }}>실습</th>
                        <th style={{ width: "10%" }}>대학/대학원</th>
                        <th style={{ width: "5%" }}>코어과목</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course, index) => (
                        <tr key={course.id || index}>
                            <td className="col_id">{String(index + 1).padStart(3, '0')}</td>
                            <td className="col_name">{course.name}</td>
                            <td className="bcourse_code">{course.course_code || '-'}</td>
                            <td>{course.credit ?? 0}</td>
                            <td>{course.lecture ?? 0}</td>
                            <td>{course.practice ?? 0}</td>
                            <td>{course.course_type === 'GRADUATE' ? '대학원' : course.course_type === 'UNDERGRADUATE' ? '대학' : '-'}</td>
                            <td style={{color: 'green'}}>{course.is_core ? '✔' : ' '}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}