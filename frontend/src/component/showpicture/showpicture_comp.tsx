import React, { useState } from 'react';
import { Image } from 'antd';

const ShowComp: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <span
        style={{
          cursor: 'pointer',
          color: 'gray',
          textDecoration: 'underline', 
          fontSize: '13px', 
        }}
        onClick={() => setVisible(true)}
      >
        Show
      </span>
      <Image
        width={200}
        style={{ display: 'none' }}
        src="/images/company.png"
        preview={{
          visible,
          src: '/images/company.png',
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export default ShowComp;
