import { useState, useEffect, useRef } from 'react';
import './Lectureroom.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

export default function Lectureroom() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('/api/classrooms');
                setRoomList(response.data);
            } catch (error) {
                console.error('Error fetching lecture rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const filteredData = roomList.filter(
        (item) =>
          item.building?.toLowerCase().includes(searchTerm.toLowerCase()) || item.room?.includes(searchTerm));

    const handleDownloadTemplate = () => {
        const templateData = [
            {
                '건물':'예시 건물명',
                '강의실명':'예시 강의실명',
                '수용인원':'예시 수용인원',
                '사용 여부' : '가능 or 불가'
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(templateData);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 10 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '강의실등록양식');
        XLSX.writeFile(workbook, '강의실_등록_기본_양식.xlsx');
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
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = XLSX.utils.sheet_to_json(worksheet);

              const errors = [];
              for(let i = 0; i < jsonData.length; i++) {
                  const row = jsonData[i];
                  const rownum = i + 2;
                  if(!row['건물'] || row['건물'].trim()=== '')
                      errors.push("엑셀 "+ rownum +"행 건물명");
                  if(!row['강의실명'] || row['강의실명'].trim()=== '')
                      errors.push("엑셀 "+ rownum +"행 강의실명");
                  if(!row['수용인원'] || String(row['수용인원']).trim()=== '')
                      errors.push("엑셀 "+ rownum +"행 수용인원");
                }

                if(errors.length > 0)
                  {
                      alert("다음 항목의 값들이 비어있습니다. 채워주세요.\n- " + errors.join("\n- "));
                      return;
                  }

              const trans = jsonData.map((row) => {
                  const rawStatus = row['사용 여부'] || '';
                  const isAvailable = rawStatus.includes('불가') ? false : true;

                  return axios.post('/api/classrooms', {
                      building: (row['건물'] || ''),
                      room: (row['강의실명'] || ''),
                      capacity: (row['수용인원']) || 0,
                      is_available: isAvailable,
                  });
              });

              await Promise.all(trans);

              alert("엑셀 등록 성공 " + trans.length + "건 처리 완료");
              const refreshed = await axios.get('/api/classrooms');
              setRoomList(refreshed.data);
          } catch (error) {
              console.error('Error processing Excel file:', error);
              alert("엑셀 등록 실패 " + (error.response?.data?.detail || "통신 오류"));
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
            <h1 className="page_title">강의실 관리</h1>
            <p className="page_subtitle">수업 배정에 필요한 학과 내 시설 리스트입니다.</p>
          </div>

          <div className="button_group">
            <button className="btn" onClick={handleDownloadTemplate}>
              <img src={downloadIcon} alt="다운로드 아이콘" className="btn_icon_img" />
              기본 양식 다운로드
            </button>
            <button className="btn" onClick={handleBulkInsertClick}>
              <span className="btn_icon">+</span>
              강의실 다중 등록
            </button>
            <button className="btn">
              <span className="btn_icon">+</span>
              강의실 등록
            </button>
          </div>
        </div>

        <div className="search_container">
          <img src={searchIcon} alt="검색 아이콘" className="search_icon_img" />
          <input
            type="text"
            className="search_input"
            placeholder="검색어를 입력해주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table_container">
          <table className="lectureroom_table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>건물명</th>
                <th>강의실</th>
                <th>수용인원</th>
                <th>사용 여부</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                    <tr key={row.id || index}>
                      <td className="col_id">{String(index + 1).padStart(2, '0')}</td>
                      <td>{row.building || '-'}</td>
                      <td className="col_name">{row.room || '-'}</td>
                      <td>{row.capacity ?? 0}명</td>
                      <td>{row.is_available ? '가능' : '불가능'}</td>
                    </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no_data">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }