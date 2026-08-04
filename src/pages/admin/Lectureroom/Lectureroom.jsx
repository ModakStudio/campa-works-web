import { useState } from 'react';
import './Lectureroom.css';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

const DummyData = [
  { id: 1, number: '01', name: 'B101', capacity: 150, location: '1층' },
  { id: 2, number: '02', name: 'B102', capacity: 150, location: '1층' },
  { id: 3, number: '03', name: '224', capacity: 60, location: '2층' },
  { id: 4, number: '04', name: '245', capacity: 60, location: '2층' },
  { id: 5, number: '05', name: '248', capacity: 60, location: '2층' },
  { id: 6, number: '08', name: '309', capacity: 60, location: '3층,컴퓨터' },
  { id: 7, number: '10', name: '342', capacity: 60, location: '3층' },
  { id: 8, number: '07', name: '348', capacity: 60, location: '3층' },
  { id: 9, number: '06', name: '351', capacity: 60, location: '3층' },
  { id: 10, number: '09', name: '355', capacity: 60, location: '3층' },
];

export default function Lectureroom() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = DummyData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.includes(searchTerm));

  return (
    <div className="Container">
      <div className="Header">
        <div>
          <h1 className="page_title">강의실 관리</h1>
          <p className="page_subtitle">수업 배정에 필요한 학과 내 시설 리스트입니다.</p>
        </div>

        <div className="button_group">
          <button className="btn">
            <img src={downloadIcon} alt="다운로드 아이콘" className="btn_icon_img" />
            기본 양식 다운로드
          </button>
          <button className="btn">
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
              <th>명칭</th>
              <th>수용인원</th>
              <th>시설</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id}>
                  <td className="col_id">{row.number}</td>
                  <td className="col_name">{row.name}</td>
                  <td>{row.capacity}</td>
                  <td>{row.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no_data">
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