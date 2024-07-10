import { useEffect, useRef, useState } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './review.module.css'
import NavBar from "../components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { useQuery } from "react-query";
import { getDetailRestaurantInfo, getRestaurantTextReview } from "../apis/restaurantsInfo";
import { UserInfo } from "../SignUp/check";
import { getUserInfo } from "../apis/userInfo";
import { useParams, useSearchParams } from "react-router-dom";

interface DetailRestaurantInfo {
    restaurantId: number,
    restaurantName: string;
    tags: Array<string>;
    detailedPictureList: Array<string>;
    address: string;
    thumbnailPictureUrl: string;
    emotion: string;
    flavorValue: number;
    moodValue: number;
    serviceValue: number;
    reasonable: boolean;
    fitMukbti: string;
    like: boolean;
}

export default function Review() {

    let { restaurantId } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        AOS.init();
    }, [])

    let [isFliped, setIsFliped] = useState<boolean>(false);

    const flipCard = () => {
        setIsFliped(!isFliped)
    }

    const user = useQuery<UserInfo>(
        "userInfo",
        getUserInfo,
    );

    const detailRestaurantInfo = useQuery<DetailRestaurantInfo>(
        'detailRestaurantInfo',
        () => getDetailRestaurantInfo({
            restaurantId: Number(restaurantId),
            oauthIdentifier: user?.data?.oauthIdentifier || ''
        })
    )

    const restaurantTextReview = useQuery<string>(
        'restaurantTextReview',
        () => getRestaurantTextReview({
            restaurantId: Number(restaurantId),
            mukbti: searchParams.get('mukbti') ||  user?.data?.mukbti || ''
        })
    )

    let tagsRef = useRef<HTMLDivElement | null>(null)
    let [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right'); // 스크롤 방향 상태

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (tagsRef.current) {
                if (scrollDirection === 'right') {
                    tagsRef.current.scrollLeft += 1;
                    // 오른쪽 끝에 도달하면 왼쪽 방향으로 스크롤 방향 변경
                    if (tagsRef.current.scrollLeft >= (tagsRef.current.scrollWidth - tagsRef.current.clientWidth)) {
                        setScrollDirection('left');
                    }
                } else {
                    tagsRef.current.scrollLeft -= 1;
                    // 왼쪽 끝에 도달하면 오른쪽 방향으로 스크롤 방향 변경
                    if (tagsRef.current.scrollLeft === 0) {
                        setScrollDirection('right');
                    }
                }
            }
        }, 50); // 이동 간격을 조절하여 스크롤 속도 조절 가능
     return () => clearInterval(intervalId);
    }, [scrollDirection]);

    let imagesRef = useRef<HTMLDivElement | null>(null)
    let [imagesScrollDirection, setImagesScrollDirection] = useState<'left' | 'right'>('right'); // 스크롤 방향 상태

    useEffect(() => {
        if(isFliped){
            const intervalId = setInterval(() => {
                if (imagesRef.current) {
                    if (imagesScrollDirection === 'right') {
                        imagesRef.current.scrollLeft += 1;
                        // 오른쪽 끝에 도달하면 왼쪽 방향으로 스크롤 방향 변경
                        if (imagesRef.current.scrollLeft >= (imagesRef.current.scrollWidth - imagesRef.current.clientWidth)) {
                            setImagesScrollDirection('left');
                        }
                    } else {
                        imagesRef.current.scrollLeft -= 1;
                        // 왼쪽 끝에 도달하면 오른쪽 방향으로 스크롤 방향 변경
                        if (imagesRef.current.scrollLeft === 0) {
                            setImagesScrollDirection('right');
                        }
                    }
                }
            }, 50); // 이동 간격을 조절하여 스크롤 속도 조절 가능
         return () => clearInterval(intervalId);
        }
        else{
            if(imagesRef.current){
                imagesRef.current.scrollLeft = 0;
                setImagesScrollDirection('right');
            }
        }
    }, [imagesScrollDirection, isFliped]);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.restaurant}>
                    <img className="w-[30%] h-[84px]" src={detailRestaurantInfo?.data?.thumbnailPictureUrl} alt="썸네일 이미지" />
                    <div className={styles.info}>
                        <h2 className="text-xl font-bold">{detailRestaurantInfo?.data?.restaurantName}</h2>
                        <h3 className="font-semibold">{detailRestaurantInfo?.data?.address.substring(3)}</h3>
                        <div className={styles.tags} ref={tagsRef}>
                            {
                                detailRestaurantInfo?.data?.tags.map(e => <div>#{e}</div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <div className="flex flex-row gap-[5px] ">
                        <GoHeartFill size={"27"} color={"ff6c1a"} />
                        <FaRegComment size={"27"} color={"ff6c1a"} />
                        <TbLocationShare size={'27'} color={'ff6c1a'} />
                    </div>
                    <div className={styles.more}>다른 캐릭터의 리뷰 더보기 &gt;&gt;</div>
                </div>
            </div>
            <div onClick={flipCard} className={styles.down}>
                <div className={isFliped ? styles.cardFlip : styles.card}>
                    <div className={styles.front}>
                        <p>클릭해서 리뷰 확인하기!!</p>
                        <div data-aos="zoom-in">도표</div>
                        <div data-aos="zoom-in">
                            {/* <img src={`./MBTICharacters/${detailRestaurantInfo?.data?.fitMukbti}_smile.png`} /> */}
                            <img data-aos="zoom-in" src={"./MBTICharacters/SFM-F_smile.png"} alt="추천 먹비티아이 캐릭터"/>
                        </div>
                    </div>

                    <div className={styles.back}>
                        <div ref={imagesRef} className={styles.images}>
                            {
                                detailRestaurantInfo?.data?.detailedPictureList.map((e) => {
                                    return <img className="w-[120px] h-[120px] object-fill" width={"120px"} height={"120px"} src={e} alt="음식 이미지" />
                                })
                            }
                        </div>
                        <div className={styles.reviewTxt} dangerouslySetInnerHTML={{ __html: restaurantTextReview?.data || ''}} />
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}