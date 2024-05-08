
import { useEffect, useState } from 'react';
import * as Pages from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'


export default function SignUp() {

  let data = useState({
    username: ''
  })

  useEffect(()=>{

    // const cookies = document.cookie;
    // if(!cookies){
    //   window.location.href = "https://mukjaview.kro.kr/oauth2/authorization/google"
    // }
    // else{
    //   console.log(cookies);
    // }
    
    console.log('hello');
    fetch("https://mukjaview.kro.kr/api/v1/user/name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result)=>{
      return result.json();
    }).then((response)=>{
      console.log(response);
    });
  },[])

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
