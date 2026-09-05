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
  const [quotas, setQuotas] = useState([]);
  const [firstQuota, setFirstQuota] = useState('');
  const [secondQuota, setSecondQuota] = useState('');

  const professorId = sessionStorage.getItem('professorId');

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const Profres = await axios.get('/api/professors/'+professorId);
        const Quotares = await axios.get('/api/professor-quotas?professor_id='+professorId);
        const data = Profres.data;
        const quotasData = Quotares.data;

        setName(data.user?.username||'');
        setEmail(data.user?.email||'');
        setPassword(data.password||'');
        setOffice(data.office||'');
        setResearch(data.research_field||'');
        setTel(data.tel||'');
        setQuotas(quotasData);
        const Q1 = quotasData.find((q) => q.semester?.id === 1)?.quota_value ?? 0;
        const Q2 = quotasData.find((q) => q.semester?.id === 2)?.quota_value ?? 0;

        setFirstQuota(Q1);
        setSecondQuota(Q2);

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

      const firstQuotaData = quotas.find((q) => q.semester?.id === 1);
      const secondQuotaData = quotas.find((q) => q.semester?.id === 2);

      await axios.patch('/api/professor-quotas/'+firstQuotaData?.id, 
        {
          quota_value: firstQuota,
        });

      await axios.patch('/api/professor-quotas/'+secondQuotaData?.id,
        {
          quota_value: secondQuota,
        });

      alert('정보가 성공적으로 업데이트되었습니다.');
      setIsEdit(false);
      setPassword('');

      setInitialData((prev) => ({...prev, office, research_field: research, tel, firstQuota, secondQuota}));
    }

    catch (error)
    {
      console.error('Update professor error:', error);
      console.error('서버 응답:', error.response?.data);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    if(initialData)
    {
      setOffice(initialData.office||'');
      setResearch(initialData.research_field||'');
      setTel(initialData.tel||'');
      setFirstQuota(initialData.firstQuota || '');
      setSecondQuota(initialData.secondQuota || '');
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

        <div className="setting_form_group">
            <label>담당 시수</label>
            <div className="quota_container">
                <div className="quota_input_group">
                    <span className="quota_label">1학기 - </span>
                    <input
                        type="number"
                        className="setting_input quota_input"
                        value={firstQuota}
                        onChange={(e) => setFirstQuota(Number(e.target.value))}
                        disabled={!isEdit}
                    />
                </div>
                <div className="quota_input_group">
                    <span className="quota_label">2학기 -</span>
                    <input
                        type="number"
                        className="setting_input quota_input"
                        value={secondQuota}
                        onChange={(e) => setSecondQuota(Number(e.target.value))}
                        disabled={!isEdit}
                    />
                </div>
            </div>
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