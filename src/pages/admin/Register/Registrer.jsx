import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register()
{
    const [formData, setFormData] = 
    useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '교수'
    });

    const navigate = useNavigate();

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData((prev) =>({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) =>
        {
            e.preventDefault()
            if (formData.password !== formData.confirmPassword)
                {
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }
            console.log('회원가입 시도:', formData);
            alert('회원가입이 완료되었습니다.');
            navigate('/login')
        };

    return(
    <div className="registerCard">
        <h2 className="registerTitle">회원가입</h2>
        <p className="registerSubtitle">서비스 이용을 위해 회원 정보를 입력해 주세요.</p>

        <form onSubmit={handleSubmit}>
            <div className="registerFormGroup">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    required>
                </input>
            </div>

            <div className="registerFormGroup">
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="아이디를 입력하세요"
                    value={formData.username}
                    onChange={handleChange}
                    required>
                </input>
            </div>

            <div className="registerFormGroup">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    required>
                </input>
            </div>

            <div className="registerFormGroup">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="비밀번호를 재입력하세요"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required>
                </input>
            </div>

            <div className="roleGroup">
                <label className="roleRadio">
                <input
                    type="radio"
                    name="role"
                    value="교수"
                    checked={formData.role === '교수'}
                    onChange={handleChange}>
                </input>
                <span>교수</span>
            </label>
            <label className="roleRadio">
                <input
                    type="radio"
                    name="role"
                    value="조교"
                    checked={formData.role === '조교'}
                    onChange={handleChange}>
                </input>
                <span>조교</span>
                </label>
            </div>

            <button type="submit" className="btn btnRegister">
                회원가입
            </button>
        </form>
    </div>
  );
}