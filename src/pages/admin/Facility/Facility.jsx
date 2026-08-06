import { useState, useRef,useEffect } from 'react';
import './Facility.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';


export default function Facility() {
    const [facilityList, setFacilityList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
    const fetchFacilities = async () => {
          try {
              const response = await axios.get('/api/facilities');
              setFacilityList(response.data);
          } catch (error) {
              console.error('Error fetching facilities:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchFacilities();
    }, []);

    const filteredData = facilityList.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || item.description?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDownloadTemplate = () => {
        const templateData = [
            {
                '명칭': '예시 시설명',
                '상세 설명': '예시 상세 설명',
            },
        ];

        const worksheet = XLSX.utils.json_to_sheet(templateData);

        worksheet['!cols'] = [{ wch: 25 },{ wch: 40 }];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '시설등록양식');
        XLSX.writeFile(workbook, '시설_등록_기본_양식.xlsx');
    };

    const handleBulkInserClick = () => {
        if (fileInputRef.current) {
                fileInputRef.current.click();
        }
    };

    const handleFileChange = async(e) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader  = new FileReader();
        reader.onload = async (event) => {
          try{
              const data = new Uint8Array(event.target.result);
              const workbook = XLSX.read(data, { type: 'array' });
              const firstSheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[firstSheetName];
              const jsonData = XLSX.utils.sheet_to_json(worksheet);

              const errors = [];
              const isEmpty = (val) => val === undefined || val === null || String(val).trim() === '';
              for (let i = 0; i < jsonData.length; i++) {
                  const row = jsonData[i];
                  const rownum = i + 2;
                  if (isEmpty(row['명칭']))
                        errors.push("엑셀 "+ rownum +"행 명칭");
                  if (isEmpty(row['상세 설명']))
                        errors.push("엑셀 "+ rownum +"행 상세 설명");
                }

                if (errors.length > 0)
                  {
                    alert("다음 항목의 값들이 비어있습니다. 채워주세요.\n- " + errors.join("\n- "));
                    return;
                  }

              const trans = jsonData.map((row) =>
                    axios.post('/api/facilities',
                      {
                        name: row['명칭'] || '',
                        description: row['상세 설명'] || '',
                      })
                );

              await Promise.all(trans);

                alert("엑셀 등록 성공 "+ trans.length+"건 처리 완료");
                const refreshed = await axios.get('/api/facilities');
                setFacilityList(refreshed.data);
            } catch (error) {
                console.error('엑셀 등록 실패:', error);
                alert('엑셀 등록 실패 ' + (error.response?.data?.detail || '통신 오류'));
            } finally {
                e.target.value = '';
            }
        };
        reader.readAsArrayBuffer(file);
    };

  if (loading)
      {
        return <div className="Container">로딩 중...</div>;
      }
      
  return (
    <div className="Container">
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls" onChange={handleFileChange} />
        <div className="Header">
            <div>
              <h1 className="page_title">시설 관리</h1>
              <p className="page_subtitle">수업 배정에 필요한 학과 내 시설 리스트입니다.</p>
            </div>

            <div className="button_group">
                <button className="btn" onClick={handleDownloadTemplate}>
                  <img src={downloadIcon} alt="다운로드 아이콘" className="btn_icon_img" />
                  기본 양식 다운로드
                </button>
                <button type="button" className="btn" onClick={handleBulkInserClick}>
                  <span className="btn_icon">+</span>
                  시설 다중 등록
                </button>
                <button type="button" className="btn">
                  <span className="btn_icon">+</span>
                  시설 등록
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
              onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>

          <div className="table_container">
            <table className="facility_table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th style={{ width: '35%' }}>명칭</th>
                  <th>상세 설명</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id || index}>
                      <td className="col_id">{String(index + 1).padStart(2, '0')}</td>
                      <td className="col_name">{row.name}</td>
                      <td className="col_description">{row.description || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no_data">
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