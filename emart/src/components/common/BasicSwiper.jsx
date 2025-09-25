import {useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BasicSwiper = ({ slides = [],navigation=false, pagination = false, ...props }) => {
  return (
    <div className="swiper-box">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={slides.length > 1 && pagination ? { clickable: true } : false}
        navigation={navigation ? true : false}
        {...props}
        style={{ width: '100%' }}
      >
        {slides.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="swiper-img-box">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  controls
                  style={{ width: '100%' }}
                />
              ) : (
                <img src={item.src} alt={item.alt || `slide-${idx}`} style={{ height: '100%' }} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BasicSwiper;
