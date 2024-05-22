
import { useEffect, useRef, useState } from 'react';
import * as Pages from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import './swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import FourthPage from './FourthPage';

export default function SignUp() {



  return (
    <Swiper
      allowTouchMove={false}
      pagination={{
        type: 'progressbar',
      }}
      modules={[Pagination, Navigation]}
    >
      <SwiperSlide><Pages.FirstPage /></SwiperSlide>
      <SwiperSlide><Pages.SecondPage /></SwiperSlide>
      <SwiperSlide><Pages.ThirdPage file={'./icons/logo-transparent.png'} /></SwiperSlide>
      <SwiperSlide><FourthPage /></SwiperSlide>
      <SwiperSlide><Pages.FifthPage /></SwiperSlide>
    </Swiper>
  )
}





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



// let testURL = "http://mukjaview.kro.kr:8081/api/v1/user/name"


// useEffect(() => {
//   console.log('hello');
//   fetch("http://mukjaview.kro.kr:8081/api/v1/user/name", {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((result) => {
//     return result.json();
//   }).then((response) => {
//     console.log(response);
//   });
// }, [])