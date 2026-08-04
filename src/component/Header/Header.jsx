import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header className="mainHeader">
            <Link to="/dashboard" className="logoArea">
                <img src="/campa_works_logo-remove.png" alt="로고" className="logoIcon" />
                <div className="logoText">
                    <h1 className="Title">컴퓨터학부 통합업무시스템</h1>
                    <span className="Year">2025-2026학년도</span>
                </div>
            </Link>
        </header>
    );
}