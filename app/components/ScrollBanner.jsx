import React from 'react';
import { Carousel } from 'antd';
const images = [
  '/game/clash.jpg',
  '/game/cs.png',
  '/game/dota.png',
  '/game/xbox.png',
];
const ScrollBanner = () => (
  <Carousel autoplay>
    {images.map((src, idx) => (
      <div key={idx} style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
        <img
          src={src}
          alt={`banner-${idx}`}
          style={{ maxHeight: 160, maxWidth: '100%', objectFit: 'cover', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
        />
      </div>
    ))}
  </Carousel>
);
export default ScrollBanner;