
import styles from './pages.module.css';
import PrevNext from '../components/PrevNext';
import { useSwiper } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { UserInputInfo } from './SignUp';
import { useQuery } from 'react-query';
import { initUserInfo } from '../apis/userInfo';
import axios from 'axios';

interface FirstPageProps {
    setNickname: (nickname: string) => void;
}

export function FirstPage({ setNickname }: FirstPageProps) {

    const swiper = useSwiper();
    let nameRef = useRef<HTMLInputElement>(null);

    const goNext = () => {
        if (!nameRef.current?.value) {
            nameRef.current?.focus();
        }
        else {
            swiper.slideNext();
            setNickname(nameRef.current?.value || '');
        }
    }

    return (
        <article className={styles.container}>
            <h3 className="text-2xl font-bold">닉네임을 입력해주세요.</h3>
            <input ref={nameRef} type="text" className={styles.nicknameinput} placeholder="닉네임.." />
            <PrevNext prev={""} next={"다음"} goNext={goNext} />
        </article>
    )
}

interface SecondPageProps {
    setSelectedFile: (file: File) => void;
    setPreviewUrl: (url: string) => void
}

export function SecondPage({ setSelectedFile, setPreviewUrl }: SecondPageProps) {

    const swiper = useSwiper();

    const goNext = () => {
        swiper.slideNext();
        swiper.slideNext();
    }

    let fileRef = useRef<HTMLInputElement>(null);

    const handleFileOpen = () => fileRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            setSelectedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                let url = reader.result?.toString() || ''
                setPreviewUrl(url);
            };
            swiper.slideNext();
        }
    };

    return (
        <article className={styles.container}>
            <h3 className="text-2xl font-bold w-4/5 break-keep">본인 얼굴이 나온 셀카를 업로드 해주세요.</h3>
            <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />
            <button className={styles.photoinput} onClick={handleFileOpen}>
                사진 선택..
            </button>
            <PrevNext prev={""} next={"건너뛰기"} goNext={goNext} />
        </article>
    )
}

interface ThirdPageProps {
    selectedFile: File | null;
    previewUrl: string;
    setSelectedFile: (tmp: null)=>void;
    setSmileImageUrl: (smileImageUrl: string)=>void;
    setSadImageUrl: (sadImageUrl: string)=>void;
    setNeutralImageUrl: (neutralImageURl: string)=>void;
}

export function ThirdPage({ selectedFile, previewUrl, setSelectedFile, setSmileImageUrl, setNeutralImageUrl, setSadImageUrl }: ThirdPageProps) {

    const swiper = useSwiper();

    const createImages = () => {
        if (selectedFile !== null) {
          let formData = new FormData();
          formData.append('image', selectedFile);
    
          axios.post('https://mukjaview.kro.kr/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
          })
            .then((response) => {
              console.log(response.data);
              if(response.data) {
                setSmileImageUrl(response.data[0]);
                setNeutralImageUrl(response.data[1]);
                setSadImageUrl(response.data[2]);
              }
              else{
                setSelectedFile(null);
              }
            }).catch((error)=>{
                if(error.response.status === 400){
                    console.log('셀카가 아닙니다!')
                } else if(error.response.status === 500){
                    console.log("카툰화 처리에 실패했습니다.")
                }
                else{
                    console.log('알수없는 에러입니다!')
                }
                setSelectedFile(null);
            })
        }
      }

    const goNext = ()=>{
        swiper.slideNext();
        createImages();
    }

    return (
        <article className={styles.container}>
            <img src={previewUrl} alt="셀카 사진" width='200' />
            <PrevNext prev={"재선택"} next={"다음"} goNext={goNext}/>
        </article>
    )
}

interface FifthPageProps {
    setIsResonable: (isResonable: boolean) => void;
    setStep: (step: number) => void
}

export function FifthPage({ setIsResonable, setStep }: FifthPageProps) {

    const submitSignUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        if (target.id === 'R') {
            setIsResonable(true);
        } else if (target.id === 'F') {
            setIsResonable(false);
        }
        setStep(2);
    }


    return (
        <article className={styles.container}>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">마지막입니다!</h3>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">나는</h3>
            <div className={styles.binaryInput}>
                <div id="R" onClick={submitSignUp}>비싸더라도 좋은 품질의 음식과 서비스를 원한다.</div>
                <p className="text-3xl m-auto">vs</p>
                <div id="F" onClick={submitSignUp}>합리적인 가격의 음식과 서비스를 원한다.</div>
            </div>
            <PrevNext prev={"이전"} next={""} />
        </article>
    )
}

interface SixthPageProps {
    userInputInfo: UserInputInfo;
    setStep: (step: number) => void
    selectedFile: File | null;
}

export function SixthPage({ userInputInfo, setStep, selectedFile }: SixthPageProps) {
    
    const { data, isError, error } = useQuery(
        "userInfo",
        () => {
            initUserInfo(userInputInfo)
        },
        {
            enabled: (selectedFile === null) || !!(selectedFile && userInputInfo.smileImageUrl && userInputInfo.sadImageUrl && userInputInfo.neutralImageUrl),
            onSuccess: () => setStep(3)
        }
    );



    return (
        <article className={styles.container}>
            <h3 className="text-3xl m-8 font-bold w-9/10 break-keep">내 먹BTI 분석중..</h3>
            <Oval
                visible={true}
                height="300"
                width="300"
                color="#ff6c1a"
                secondaryColor='ff914d'
                ariaLabel="oval-loading"
                strokeWidth='1'
                strokeWidthSecondary='1'
            />
        </article>
    )
}

export function LastPage() {

    let navigator = useNavigate();

    return (
        <article className={styles.container}>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">분석 완료!</h3>
            <div className={styles.result}>
                <div onClick={() => {
                    navigator('/mypage')
                }} >내 먹BTI 확인하기 &gt;&gt;</div>
                <div onClick={() => {
                    navigator('/map')
                }}>맛집 찾으러 가기 &gt;&gt;</div>
            </div>
        </article>
    )

}