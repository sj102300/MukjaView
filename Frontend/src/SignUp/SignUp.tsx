
import { useEffect, useRef, useState } from 'react';
import * as Pages from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import FourthPage from './FourthPage';

export default function SignUp() {

  return (
    <Swiper
      allowTouchMove={false}
      pagination={{
        type: 'progressbar',
        // progressbarFillClass: "myprogressbar"
      }}
      modules={[Pagination, Navigation]}
      className="flex items-center justify-center"
    >
      <SwiperSlide><Pages.FirstPage /></SwiperSlide>
      <SwiperSlide><Pages.SecondPage /></SwiperSlide>
      <SwiperSlide><Pages.ThirdPage file={'./icons/logo-transparent.png'} /></SwiperSlide>
      <SwiperSlide><FourthPage /></SwiperSlide>
      <SwiperSlide><Pages.FifthPage /></SwiperSlide>
    </Swiper>
  )
}


// console.log('hello');
// fetch("https://mukjaview.kro.kr/api/v1/user/name", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// }).then((result)=>{
//   return result.json();
// }).then((response)=>{
//   console.log(response);
// });



// useEffect(()=>{
//   fetch('/api/v1/user/name', {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((response) => { console.log(response)})
//   .then((response)=>{
//     console.log(response);
//   })
// },[])