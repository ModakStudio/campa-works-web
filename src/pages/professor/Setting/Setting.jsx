import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Setting.css';

export default function Setting() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [office, setOffice] = useState('');
  const [research, setResearch] = useState('');
  const [tel, setTel] = useState('');
  const [position, setPosition] = useState('');

  const professorId = localStorage.getItem('professorId');

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const response = await axios.get('/api/professors/'+professorId);
        const data = response.data;

        setName(data.user?.name||'');
        setEmail(data.user?.email||'');
        setPassword(data.password||'');
        setOffice(data.office||'');
        setResearch(data.research_field||'');
        setTel(data.tel||'');
        setPosition(data.position||'');
      }

      catch (error)
      {
        console.error('Fetch professor error:', error);
      }
    };

    fetchData();
  }, [professorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      await axios.put('/api/professors/'+professorId,
        {
          office,
          research: research,
          tel,
          position,
          ...(password && {password})
        });
      alert('정보가 성공적으로 업데이트되었습니다.');
    }

    catch (error)
    {
      console.error('Update professor error:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  return(
    <div className="Container">
      <div className="Header">
        <h1 className="page_title">설정</h1>
      </div>    
      
      <form className="setting_form" onSubmit={handleSubmit}>
        <div className="setting_form_group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            className="setting_input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled
          />
        </div>

        <div className="setting_form_group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            className="setting_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
        </div>

        <div className="setting_form_group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            className="setting_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        
        <div className="setting_form_group">
          <label htmlFor="office">연구실</label>
          <input
            type="text"
            id="office"
            className="setting_input"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />
        </div>

        <div className="setting_form_group">
          <label htmlFor="research">연구분야</label>
          <input
            type="text"
            id="research"
            className="setting_input"
            value={research}
            onChange={(e) => setResearch(e.target.value)}
          />
        </div>

        <div className="setting_form_group">
          <label htmlFor="tel">전화번호</label>
          <input
            type="text"
            id="tel"
            className="setting_input"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>

        <div className="radio_group">
          <label className="radio_label">
          <input
            type="radio"
            name="position"
            checked={position === 'Professor'}
            value="Professor"
            onChange={(e) => setPosition(e.target.value)}
          />
          교수
          </label>
          <label className="radio_label">
          <input
            type="radio"
            name="position"
            checked={position === 'V'}
            value="Assistant"
            onChange={(e) => setPosition(e.target.value)}
          />
          조교
          </label>
        </div>

        <button type="submit" className="btn submit">개인 정보 수정</button>
      </form>
    </div>
  );
}