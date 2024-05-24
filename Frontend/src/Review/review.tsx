import { useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './review.module.css'
import NavBar from "../components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { FaComment } from "react-icons/fa6";

export default function Review() {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
        <div className={styles.container}>
            {/* <img src="./icons/logo-transparent.png" alt="썸네일 이미지" /> */}
            <h2 className="text-2xl font-bold">가츠시</h2>
            <h3 className="text-lg font-semibold">서울 광진구 화양동 어쩌구 34-19</h3>
            <div className={styles.tags}>
                <div>#태그</div>
                <div>#세글자</div>
                <div>#태그</div>
            </div>
            <div className={styles.chart}>
                <div>도표</div>
                <div>추천먹BTI 캐릭터 사진 텍스트</div>
            </div>
            <div className={styles.images}>
                <img src="./icons/logo-transparent.png" alt="썸네일 이미지" />
                <img src="./icons/logo-transparent.png" alt="썸네일 이미지" />
                <img src="./icons/logo-transparent.png" alt="썸네일 이미지" />
                <img src="./icons/logo-transparent.png" alt="썸네일 이미지" />
                <img src="./icons/logo-transparent.png" alt="썸네일 이미지" />
            </div>
            <div className={styles.reviewTxt}>
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요! 채식을 선호하는 저에게도 딱 맞는 달콤한 선택이었어요. 카공하기에도 조용하고 좋습니다. 하지만, 약간의 쉰내가 나는 점과 서비스가 더 나아졌으면 하는 바람이 있습니다. 그래도 맛과 위치를 고려하면 다시 방문할 의향 100%입니다!'
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요!
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요! 채식을 선호하는 저에게도 딱 맞는 달콤한 선택이었어요. 카공하기에도 조용하고 좋습니다. 하지만, 약간의 쉰내가 나는 점과 서비스가 더 나아졌으면 하는 바람이 있습니다. 그래도 맛과 위치를 고려하면 다시 방문할 의향 100%입니다!'
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요!
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요! 채식을 선호하는 저에게도 딱 맞는 달콤한 선택이었어요. 카공하기에도 조용하고 좋습니다. 하지만, 약간의 쉰내가 나는 점과 서비스가 더 나아졌으면 하는 바람이 있습니다. 그래도 맛과 위치를 고려하면 다시 방문할 의향 100%입니다!'
                '이디야커피 건대역점에 들렀습니다. 매장 바로 앞이 1번 출구라 접근성 최고예요! 넛츠 크림 라떼가 정말 달달하고 맛있었습니다. 진짜 에너지 충전 제대로 했네요. 😊 아메리카노도 신맛이 없어서 좋았어요. 여기 생딸기 허니리코타 프렌치토스트는 꼭 먹어봐야 할 메뉴에요!
            </div>
            <div className={styles.comment}><FaComment size={"30"} color={"ff914c"} /></div>
            <div className={styles.heart}><GoHeartFill size={"30"} color={"red"} /></div>

        </div>
        <NavBar />
        </>
    )
}

/**
<p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">2</p>
<p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">1</p>
<p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">3</p>
<p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">4</p>
 */