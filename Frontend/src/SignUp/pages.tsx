
import styles from './pages.module.css';
import PrevNext from '../components/PrevNext';
import { useSwiper } from 'swiper/react';
import { useRef } from 'react';

// type userProps{
//     user: string,
//     setUser: 
// }

export function FirstPage() {


    const swiper = useSwiper();

    let nameRef = useRef<HTMLInputElement>(null);

    const goNext = () => {
        if (nameRef.current?.value === ''){
            nameRef.current?.focus();
        }
        else{
            console.log(nameRef.current?.value);
            swiper.slideNext();
        }
    }

    return (
        <article className={styles.container}>
            <h3 className="text-2xl font-bold">닉네임을 입력해주세요.</h3>
            <input ref={nameRef} type="text" className={styles.nicknameinput} placeholder="닉네임.."/>
            <PrevNext prev={""} next={"다음"} goNext={goNext}/>
        </article>
    )
}

export function SecondPage() {

    const swiper = useSwiper();

    const goNext = () => {
        swiper.slideNext();
        swiper.slideNext();
    }

    let fileRef = useRef<HTMLInputElement>(null);

    const handleFileOpen = () => fileRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log(file);
            // setSelectedFile(file);
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
            <PrevNext prev={"이전"} next={"건너뛰기"} goNext={goNext} />
        </article>
    )
}

export function ThirdPage({file}: {file: string}) {

    //상태관리 라이브러리 뭐쓸지 정해서 넣으면 됨

    return (
        <article className={styles.container}>
            <img src={file} alt="셀카 사진" width='200' />
            <PrevNext prev={"재선택"} next={"다음"} />
        </article>
    )
}

export function FourthPage() {

    // https://velog.io/@gnoeyah/react-draggable-DragDrop-%EA%B5%AC%ED%98%84

    // const swiper = useSwiper();
    // const goPrev = () => {
    //     swiper.slidePrev();
    //     swiper.slidePrev();
    // }

    // const flaverRef = useRef<HTMLDivElement>(null);
    // const moodRef = useRef<HTMLDivElement>(null);
    // const serviceRef = useRef<HTMLDivElement>(null);

    return (
        <article className={styles.container}>
            <h3 className="text-lg font-bold w-9/10 break-keep">식당을 선택할 때 맛, 분위기, 서비스가 중요한 순서대로 배치해주세요.</h3>
            <div className={styles.elementList}>
                <div>맛</div>
                <div>분위기</div>
                <div>서비스</div>
            </div>
            <div className={styles.orderList}>
                <div>
                    <p>1순위</p>
                    <div className={styles.tempPlace}>맛</div>
                </div>
                <div>
                    <p>2순위</p>
                    <div className={styles.tempPlace}></div>
                </div>
                <div>
                    <p>3순위</p>
                    <div className={styles.tempPlace}></div>
                </div>
            </div>
            <PrevNext prev={"이전"} next={"다음"} />
        </article>
    )
}

export function FifthPage() {

    return (
        <article className={styles.container}>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">마지막입니다!</h3>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">나는</h3>
            <div className={styles.binaryInput}>
                <div>비싸더라도 좋은 품질의 음식과 서비스를 원한다.</div>
                <p className="text-3xl m-auto">vs</p>
                <div>합리적인 가격의 음식과 서비스를 원한다.</div>
            </div>
            <PrevNext prev={"이전"} next={"제출"} />
        </article>
    )
}
export function SixthPage() {

    return (
        <article className={styles.container}>
            <h3 className="text-3xl m-8 font-bold w-9/10 break-keep">내 먹BTI 분석중..</h3>
            <div className={styles.loadingCircle}></div>
        </article>
    )
}

export function LastPage() {

    return (
        <article className={styles.container}>
            <h3 className="text-2xl m-2 font-bold w-9/10 break-keep">분석 완료!</h3>
            <div className={styles.result}>
                <div>내 먹BTI 확인하기 &gt;&gt;</div>
                <div>맛집 찾으러 가기 &gt;&gt;</div>
            </div>
        </article>
    )

}