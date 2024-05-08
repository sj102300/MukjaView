
// import { useEffect, useState } from 'react';
import * as Pages from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'


export default function SignUp() {

  // let data = useState({
  //   username: ''
  // })
  // useEffect(()=>{

  // },[data])

  return (
    <div className="flex items-center justify-center">
    <Swiper
      pagination={{
        type: 'progressbar',
        // progressbarFillClass: "myprogressbar"
      }}
      modules={[Pagination, Navigation]}
    >
      <SwiperSlide><Pages.FirstPage /></SwiperSlide>
      <SwiperSlide><Pages.SecondPage /></SwiperSlide>
      <SwiperSlide><Pages.ThirdPage file={'./icons/logo-transparent.png'} /></SwiperSlide>
      <SwiperSlide><Pages.FourthPage /></SwiperSlide>
      <SwiperSlide><Pages.FifthPage /></SwiperSlide>
    </Swiper>
    </div>
  )
}
