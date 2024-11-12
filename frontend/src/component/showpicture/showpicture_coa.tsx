import React, { useState } from 'react';
import { Image } from 'antd';

const ShowCoa: React.FC = () => {
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
        src="/images/coa.png"
        preview={{
          visible,
          src: '/images/coa.png',
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export default ShowCoa;
