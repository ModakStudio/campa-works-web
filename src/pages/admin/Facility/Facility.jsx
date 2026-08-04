import { useState } from 'react';
import './Facility.css';
import downloadIcon from '../../../assets/icons/down.png';
import searchIcon from '../../../assets/icons/sear.png';

const DummyData = [
    { id: 1, number: '01', name: '1층', description: '-' },
    { id: 2, number: '02', name: '2층', description: '-' },
    { id: 3, number: '03', name: '3층', description: '-' },
    { id: 4, number: '04', name: '컴퓨터', description: '기자재 컴퓨터' },
];

export default function Facility() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = DummyData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="Container">
            <div className="Header">
                <div>
                    <h1 className="page_title">시설 관리</h1>
                    <p className="page_subtitle">수업 배정에 필요한 학과 내 시설 리스트입니다.</p>
                </div>

                <div className="button_group">
                    <button className="btn">
                        <img src={downloadIcon} alt="다운로드 아이콘" className="btn_icon_img" />
                        기본 양식 다운로드
                    </button>
                    <button className="btn">
                        <span className="btn_icon">+</span>
                        시설 다중 등록
                    </button>
                    <button className="btn">
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                            filteredData.map((row) => (
                                <tr key={row.id}>
                                    <td className="col_id">{row.number}</td>
                                    <td className="col_name">{row.name}</td>
                                    <td className="col_description">{row.description}</td>
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