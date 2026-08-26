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
  const [position, setPosition] = useState('PROFESSOR');
  const [isEdit, setIsEdit] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const professorId = sessionStorage.getItem('professorId');

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

        if(data.position) setPosition(data.position);
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

    if(!isEdit)
    {
      setIsEdit(true);
      return;
    }

    try
    {
      await axios.patch('/api/professors/'+professorId,
        {
          office,
          research_field: research,
          tel,
          position,
          ...(password && {password})
        });
      alert('정보가 성공적으로 업데이트되었습니다.');
      setIsEdit(false);
      setPassword('');

      setInitialData((prev) => ({...prev, office, research_field: research, tel}));
    }

    catch (error)
    {
      console.error('Update professor error:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    if(initialData)
    {
      setOffice(initialData.office||'');
      setResearch(initialData.research_field||'');
      setTel(initialData.tel||'');
    }
    setPassword('');
    setIsEdit(false);
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
            value={isEdit ? password : '********'}
            onChange={(e) => setPassword(e.target.value)}

            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
          />
        </div>

        <div className="radio_group">
          <label className="radio_label">
          <input
            type="radio"
            name="position"
            checked={position === 'PROFESSOR'}
            value="PROFESSOR"
            onChange={(e) => setPosition(e.target.value)}
            disabled={!isEdit}
          />
          교수
          </label>
          <label className="radio_label">
          <input
            type="radio"
            name="position"
            checked={position === 'ASSISTANT'}
            value="ASSISTANT"
            onChange={(e) => setPosition(e.target.value)}
            disabled={!isEdit}
          />
          조교
          </label>
        </div>
        <div className='setting_btn_group'>
          <button type="submit" className={"setting_btn_submit" + (isEdit ? " edit":"")}>
            {isEdit?'정보 저장하기':'개인 정보 수정'}</button>
          {isEdit  && (<button type="button" className="setting_btn_cancel" onClick={handleCancel}>
            취소
          </button>)}
        </div>
      </form>
    </div>
  );
}