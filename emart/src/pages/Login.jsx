import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
/* 이미지 */
import Logo from '../assets/images/logo/logo.svg?react'

/* 사용한 컴포넌트 모음 */
import Input from '../components/common/forms/Input.jsx'
import Button from '../components/common/forms/Button.jsx'
import Radio from '../components/common/forms/Radio.jsx'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // 'user' 또는 'admin'
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 실제 애플리케이션에서는 API 호출로 인증해야 함
    // 이 예제에서는 간단한 체크만 수행
    if (username && password) {
      const userData = {
        id: 1,
        name: username,
        role: role
      };

      login(userData);

      // 역할에 따라 적절한 페이지로 리다이렉트
      if (role === 'admin') {
        navigate('/modelManagement/aiImageManagement/view');
      } else {
        navigate('/home');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title-wrap">
          <Logo/>
          <h1>통합 관리자 로그인</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              id="userNameID"
              labelName="아이디"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <Input
              id="passwordID"
              labelName="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p>계정 유형</p>
            <div className="role-selector">
              <Radio
                name="role"
                value="user"
                optionLabel="사용자"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              <Radio
                name="role"
                value="admin"
                optionLabel="관리자"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
            </div>
          </div>
          <Button className={'rounded2 full size-md'} type="submit">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
