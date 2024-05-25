import { useEffect, useState } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './review.module.css'
import NavBar from "../components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { TbLocationShare } from "react-icons/tb";

export default function Review() {

    useEffect(() => {
        AOS.init();
    }, [])

    let [isFliped, setIsFliped] = useState<boolean>(false);

    const flipCard = ()=>{
        setIsFliped(!isFliped)
    }

    return (
        <>
            <Header />
            <div onClick={flipCard} className={styles.down}>
                <div className={isFliped ? styles.cardFlip: styles.card}>
                    <div className={styles.front}>
                        <p>클릭해서 리뷰 확인하기!!</p>
                        <div data-aos="zoom-in" >도표</div>
                        <div data-aos="zoom-in">추천먹BTI 캐릭터 사진 텍스트</div>
                    </div>

                    <div className={styles.back}>
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
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}


function Header() {
    return (
    <div className={styles.header}>
        <div className={styles.restaurant}>
            <img width={"90px"} className="bg-black" src="./icons/logo-transparent.png" alt="썸네일 이미지" />
            <div className={styles.info}>
                <h2 className="text-xl font-bold">가츠시</h2>
                <h3 className="font-semibold">서울 광진구 화양동 어쩌구 34-19</h3>
                <div className={styles.tags}>
                    <div>#태그</div>
                    <div>#세글자</div>
                    <div>#태그</div>
                </div>
            </div>
        </div>
        <div className={styles.icons}>
            <div className="flex flex-row gap-[5px] ">
                <GoHeartFill size={"27"} color={"red"} />
                <FaRegComment size={"27"} color={"gray"} />
                <HiOutlineShare size={'27'} color={"gray"} />
            </div>
            <TbLocationShare size={'27'} color={'gray'} />
        </div>
    </div>)
}