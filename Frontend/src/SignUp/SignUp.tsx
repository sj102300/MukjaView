
import { useEffect, useRef, useState } from 'react';
import {FirstPage, SecondPage, ThirdPage, FifthPage, SixthPage, LastPage}from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import './swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import FourthPage from './FourthPage';
import Check from './check';

export interface UserInputInfo {
  identifier: string;
  nickname: string;
  MBTIOrder: string;
  isReasonable: boolean;
  smileImageUrl?: string;
  sadImageUrl?: string;
  neutralImageUrl?: string;
}

export function SignUp() {

  let [identifier, setIdentifier] = useState<string>('');
  let [nickname, setNickname] = useState<string>('');
  let [MBTIOrder, setMBTIOrder] = useState<string>('');
  let [isResonable, setIsResonable] = useState<boolean>(true);

  let [step, setStep] = useState<number>(0);

  switch (step){
    case 0:
      return <Check setStep={setStep} setIdentifier={setIdentifier}/>
    case 1:
      return <Swiper
          allowTouchMove={false}
          pagination={{
            type: 'progressbar',
          }}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide><FirstPage setNickname={setNickname} /></SwiperSlide>
          <SwiperSlide><SecondPage /></SwiperSlide>
          <SwiperSlide><ThirdPage file={'./icons/logo-transparent.png'} /></SwiperSlide>
          <SwiperSlide><FourthPage setMBTIOrder={setMBTIOrder} /></SwiperSlide>
          <SwiperSlide><FifthPage setIsResonable={setIsResonable} setStep={setStep} /></SwiperSlide>
        </Swiper>
    case 2:
      return <SixthPage userInputInfo={{
        identifier: identifier,
        nickname: nickname,
        MBTIOrder: MBTIOrder,
        isReasonable: isResonable
      }} setStep={setStep} />
    case 3:
      return <LastPage />
    default:
      null;

  }

}