
import { useEffect, useState } from 'react';
import { FirstPage, SecondPage, ThirdPage, FifthPage, SixthPage, LastPage } from './pages';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'react-toastify/dist/ReactToastify.css';

import './swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import FourthPage from './FourthPage';
import Check from './check';
import { Bounce, ToastContainer } from 'react-toastify';

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

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile])

  return (
    <>
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={2000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        transition={Bounce}
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        theme="colored"
        className="m-2 flex justify-center items-center text-center"
      // limit={1} // 알람 개수 제한
      />
      {(() => {
        switch (step) {
          case 0:
            return <Check setStep={setStep} setIdentifier={setIdentifier} setSmileImageUrl={setSmileImageUrl} setSadImageUrl={setSadImageUrl} setNeutralImageUrl={setNeutralImageUrl} />
          case 1:
            return <Swiper
              allowTouchMove={false}
              pagination={{
                type: 'progressbar',
              }}
              modules={[Pagination, Navigation]}
            >
              <SwiperSlide><FirstPage setNickname={setNickname} /></SwiperSlide>
              <SwiperSlide><SecondPage selectedFile={selectedFile} setPreviewUrl={setPreviewUrl} setSelectedFile={setSelectedFile} /></SwiperSlide>
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
      })()}
    </>
  );
}