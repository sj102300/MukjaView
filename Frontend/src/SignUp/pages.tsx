
import styles from './SignUp.module.css';
import PrevNext from '../components/PrevNext';

let goPrev = () => void {
    /* 뒤로 가는 코드 */
}

let goNext = (e?: React.MouseEvent<HTMLDivElement> | undefined) => void {
    /* 앞으로 가는 코드 */
}

export function FirstPage() {

    return (
        <article className={styles.container}>
            <h3 className="text-2xl font-bold">닉네임을 입력해주세요.</h3>
            <input type="text" className={styles.nicknameinput} placeholder="닉네임.." />
            <PrevNext prev={""} next={"다음"} goNext={goNext} goPrev={goPrev} />
        </article>
    )
}

export function SecondPage() {

    return (
        <article className={styles.container}>
            <h3 className="text-2xl font-bold w-4/5 break-keep">본인 얼굴이 나온 셀카를 업로드 해주세요.</h3>
            <button className={styles.photoinput} onClick={() => { }}>
                {/* <input type="file" /> */}
                사진 선택..
            </button>
            <PrevNext prev={"이전"} next={"건너뛰기"} goNext={goNext} goPrev={goPrev} />
        </article>
    )
}

export function ThirdPage() {

    return (
        <article className={styles.container}>
            <img src="./icons/logo-transparent.png" alt="셀카 사진" width='200' />
            <PrevNext prev={"이전"} next={"다음"} goNext={goNext} goPrev={goPrev} />
        </article>
    )
}

export function FourthPage() {

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
            <PrevNext prev={"이전"} next={"다음"} goNext={goNext} goPrev={goPrev} />
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
            <PrevNext prev={"이전"} next={"다음"} goNext={goNext} goPrev={goPrev} />
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