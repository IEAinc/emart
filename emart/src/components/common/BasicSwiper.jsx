import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BasicSwiper = ({slides = [], ... props}) => {
  return (
    <div className="swiper-box">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        {...props}
        onSlideChange={(swiper) => console.log('slide index:', swiper.activeIndex)}
        onSwiper={(swiper) => console.log('swiper instance', swiper)}
        style={{ width: '100%', height: 300 }}
      >
        {slides.map((item,idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="swiper-img-box">
                <img src={item.src} alt={item.alt} />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}
export default BasicSwiper;