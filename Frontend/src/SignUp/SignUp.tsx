
import { useState } from 'react';
import { FirstPage, SecondPage, ThirdPage, FifthPage, SixthPage, LastPage } from './pages';

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
  smileImageUrl?: string | null;
  sadImageUrl?: string | null;
  neutralImageUrl?: string | null;
}

export function SignUp() {

  let [identifier, setIdentifier] = useState<string>('');
  let [nickname, setNickname] = useState<string>('');
  let [MBTIOrder, setMBTIOrder] = useState<string>('');
  let [isResonable, setIsResonable] = useState<boolean>(true);

  let [smileImageUrl, setSmileImageUrl] = useState<string | null>(null);
  let [sadImageUrl, setSadImageUrl] = useState<string | null>(null);
  let [neutralImageUrl, setNeutralImageUrl] = useState<string | null>(null);

  let [selectedFile, setSelectedFile] = useState<File | null>(null);
  let [previewUrl, setPreviewUrl] = useState<string>('');

  let [step, setStep] = useState<number>(0);

  switch (step) {
    case 0:
      return <Check setStep={setStep} setIdentifier={setIdentifier} />
    case 1:
      return <Swiper
        allowTouchMove={false}
        pagination={{
          type: 'progressbar',
        }}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide><FirstPage setNickname={setNickname} /></SwiperSlide>
        <SwiperSlide><SecondPage setPreviewUrl={setPreviewUrl} setSelectedFile={setSelectedFile} /></SwiperSlide>
        <SwiperSlide><ThirdPage selectedFile={selectedFile} previewUrl={previewUrl} setSelectedFile={setSelectedFile} setSmileImageUrl={setSmileImageUrl} setSadImageUrl={setSadImageUrl} setNeutralImageUrl={setNeutralImageUrl} /></SwiperSlide>
        <SwiperSlide><FourthPage setMBTIOrder={setMBTIOrder} /></SwiperSlide>
        <SwiperSlide><FifthPage setIsResonable={setIsResonable} setStep={setStep} /></SwiperSlide>
      </Swiper>
    case 2:
      return <SixthPage userInputInfo={{
        identifier: identifier,
        nickname: nickname,
        MBTIOrder: MBTIOrder,
        isReasonable: isResonable,
        smileImageUrl: smileImageUrl,
        sadImageUrl: sadImageUrl,
        neutralImageUrl: neutralImageUrl,
      }} setStep={setStep} selectedFile={selectedFile} />
    case 3:
      return <LastPage />
    default:
      null;

  }

}