import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const IndexNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',  
        textAlign: 'center',  
      }}
    >
      <Result
        icon={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/images/Pelni Logo Baru tanpa Tagline Fullcolor.png"
              alt="Logo"
              style={{
                width: '250px',
                height: 'auto',
              }}
            />
          </div>
        }
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
      />
    </div>
  );
};

export default IndexNotFound;
