import {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";


export default function Login() 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) =>
    {
            e.preventDefault();
            try
            {
                const response = await axios.get('/api/users');
                const users = response.data;
                const user = users.find((user) => user.email === email);

                if(!user)
                {
                    alert('존재하지 않는 계정입니다.\n회원가입을 진행해주세요');
                    return;
                }

                sessionStorage.setItem('userRole', user.role);
                

                if (user.role === 'ADMIN')
                    navigate('/dashboard');
                else if (user.role === 'PROFESSOR')
                    {
                        const Profdata=await axios.get('/api/professors');
                        const ProInfo=Profdata.data.find((p)=>p.user?.id === user.id);
                        sessionStorage.setItem('professorId', ProInfo.id);

                        if(ProInfo)
                        {
                            sessionStorage.setItem('professorId', ProInfo.id);
                            navigate('/professor/setting');
                        }
                    }

            }
            
            catch (error)
                {
                    console.error('Login error:', error);
                }
    };

    return(
        <div className="loginCard">
            <h2 className="loginTitle">로그인</h2>
            <p className="loginSubtitle">시스템 계정으로 로그인하세요</p>

            <form onSubmit={handleSubmit}>
                <div className="loginFormGroup">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                </div>

                <div className="loginFormGroup">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                </div>
                <button type="submit" className="btn btnLogin">로그인</button>
                <button type="button" className="btn btnRegister"
                onClick={()=>navigate('/register')}>회원가입</button>
            </form>
        </div>
    )

}

