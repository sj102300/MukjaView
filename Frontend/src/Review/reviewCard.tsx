import { useEffect, useRef, useState } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './reviewCard.module.css'
import NavBar from "../components/NavBar";
import { TbHeart, TbHeartFilled, TbLocationShare } from "react-icons/tb";
import { useQuery } from "react-query";
import { getDetailRestaurantInfo, getRestaurantTextReview } from "../apis/restaurantsInfo";
import { UserInfo } from "../SignUp/check";
import { getUserInfo } from "../apis/userInfo";
import { useParams, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/effect-cards';
import { HiMiniTrash } from "react-icons/hi2";
import { useHandleLike } from "../apis/handleLike";
import { useDeleteComment, usePostComment } from "../apis/handleComment";

interface Comment {
    commentId: number;
    oauthIdentifier: string;
    nickname: string;
    text: string;
}

export interface DetailRestaurantInfo {
    restaurantId: number;
    restaurantName: string;
    comments: Array<Comment>;
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

export default function ReviewCard() {

    let { restaurantId } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    let [user, setUser] = useState<UserInfo>()

    useEffect(() => {
        AOS.init();
    }, [])

    const userQuery = useQuery<UserInfo>(
        "userInfo",
        getUserInfo,
        {
            onSuccess: (data)=> setUser(data)
        }
    );

    let [profileImg, setProfileImg] = useState<string>('');

    let [detailRestaurantInfo, setDetailRestaurantInfo] = useState<DetailRestaurantInfo>();

    const detailRestaurantInfoQuery = useQuery<DetailRestaurantInfo>(
        'detailRestaurantInfo',
        () => getDetailRestaurantInfo({
            restaurantId: Number(restaurantId),
            oauthIdentifier: user?.oauthIdentifier || userQuery?.data?.oauthIdentifier || ''
        }),
        {
            onSuccess: (data) => {
                setDetailRestaurantInfo(data);
                if (data.emotion === 'positive') {
                    setProfileImg(user?.smileImageUrl || `../MBTICharacters/${user?.mukbti}_smile.png`);
                }
                else if (data.emotion === 'neutral') {
                    setProfileImg(user?.neutralImageUrl || `../MBTICharacters/${user?.mukbti}_neutral.png`)
                }
                else if (data.emotion === 'negative') {
                    setProfileImg(user?.sadImageUrl || `../MBTICharacters/${user?.mukbti}_sad.png`)
                }
            }
        }
    )

    let [restaurantTextReview, setRestaurantTextReview] = useState<string>('')

    const restaurantTextReviewQuery = useQuery<string>(
        'restaurantTextReview',
        () => getRestaurantTextReview({
            restaurantId: Number(restaurantId),
            mukbti: searchParams.get('mukbti') || userQuery?.data?.mukbti || user?.mukbti || ''
        }),
        {
            onSuccess: (data)=> setRestaurantTextReview(data)
        }
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
    }, [imagesScrollDirection]);

    let commentRef = useRef<HTMLInputElement | null>(null)

    const { mutate: handleLike } = useHandleLike()

    const { mutate: postComment } = usePostComment();
    const { mutate: deleteComment } = useDeleteComment();


    return (
        <>
            <div className={styles.header}>
                <div className={styles.restaurant}>
                    <img className="w-[30%] h-[84px]" src={detailRestaurantInfo?.thumbnailPictureUrl} alt="썸네일 이미지" />
                    <div className={styles.info}>
                        <h2 className="text-xl font-bold">{detailRestaurantInfo?.restaurantName}</h2>
                        <h3 className="font-semibold">{detailRestaurantInfo?.address.substring(7)}</h3>
                        <div className={styles.tags} ref={tagsRef}>
                            {
                                detailRestaurantInfo?.tags.map(e => <div>#{e}</div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <div className="flex flex-row gap-[5px] ">
                        {/* 여기 Post 요청 끝나기를 기다리는것때문에,, 하트 바뀌는게 좀 느리다.. */}
                        <div onClick={() => {
                            handleLike({
                                like: detailRestaurantInfo?.like || false,
                                oauthIdentifier: user?.oauthIdentifier || '',
                                restaurantId: detailRestaurantInfo?.restaurantId || 0,
                            })
                        }}>
                            {
                                detailRestaurantInfo?.like ?
                                    <TbHeartFilled size={"27"} color={"ff6c1a"} />
                                    : <TbHeart size={"27"} color={"ff6c1a"} />

                            }
                        </div>
                        <TbLocationShare size={'27'} color={'ff6c1a'} />
                    </div>
                    <div className={styles.more}>다른 캐릭터의 리뷰 더보기 &gt;&gt;</div>
                </div>
            </div>

            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className={styles.swiperContainer}
                cardsEffect={{
                    perSlideOffset: 4,
                    perSlideRotate: 1.5,
                    slideShadows: false,
                }}

            >
                <SwiperSlide>
                    <div className={styles.firstCard}>
                        <div data-aos="zoom-in">도표</div>
                        <div data-aos="zoom-in">
                            <img width={'200px'} height={'200px'} data-aos="zoom-in" src={`../MBTICharacters/${detailRestaurantInfo?.fitMukbti}_smile.png`} alt="추천 먹비티아이 캐릭터" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.secondCard}>
                        <div ref={imagesRef} className={styles.images}>
                            {
                                detailRestaurantInfo?.detailedPictureList.map((e) => {
                                    return <img className="w-[120px] h-[120px] object-fill" width={"120px"} height={"120px"} src={e} alt="음식 이미지" />
                                })
                            }
                        </div>
                        <div className={styles.reviewTxt} dangerouslySetInnerHTML={{ __html: restaurantTextReview }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.thirdCard}>
                        <div className={styles.comments} >
                            {
                                detailRestaurantInfo?.comments.map((e) => {
                                    return (
                                        <div className={styles.comment}>
                                            <img src={e.nickname} alt="프사" className="w-[50px] h-[50px] rounded-full" />
                                            <p>{e?.text}</p>
                                            {
                                                e.oauthIdentifier === user?.oauthIdentifier && 
                                                <div onClick={()=>{
                                                    deleteComment({
                                                        commentId: e.commentId,
                                                        oauthIdentifier: e.oauthIdentifier,
                                                        restaurantId: detailRestaurantInfo?.restaurantId,
                                                    })
                                                }}><HiMiniTrash className="mt-2" size={'16'} color={'gray'} /></div>

                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className={styles.commentInput}>
                            <img src={profileImg} alt="프사" className="w-[50px] h-[50px] rounded-full" />
                            <input ref={commentRef} name="commentText" type="text" placeholder="댓글.." />
                            <button onClick={()=>{
                                postComment({
                                    comment: commentRef?.current?.value || '',
                                    restaurantId: detailRestaurantInfo?.restaurantId || 0,
                                    oauthIdentifier: user?.oauthIdentifier || '',
                                    profileImg: profileImg,
                                })
                            }}>게시..</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <NavBar />
        </>
    )
}