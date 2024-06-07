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
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/effect-cards';
import { HiMiniTrash } from "react-icons/hi2";
import { useHandleLike } from "../apis/handleLike";
import { useDeleteComment, usePostComment } from "../apis/handleComment";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MukbtiAttribute, getMukbtiAttribute } from "../utils/handleMBTI";

interface Comment {
    commentId: number;
    oauthIdentifier: string;
    nickname: string;
    text: string;
    imgUrl: string;
    emotion: string;
    userMukbti: string;
}

interface Review {
    review: string;
    emotion: string;
    flavorValue: number;
    moodValue: number;
    serviceValue: number;
    reasonable: boolean;
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

interface ChartData {
    name: string;
    value: number;
}

interface MukbtiIntro {
    text: string;
    imgUrl: string;
    name: string;
    taste: string;
    title: string;
}

export default function ReviewCard() {

    let { restaurantId } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    let [chartData, setChartData] = useState<Array<ChartData>>();

    let [randomVariable, setRandomVariable] = useState<number>(0);

    useEffect(() => {
        setRandomVariable(Math.random());
        AOS.init();
    }, [])

    const user = useQuery<UserInfo>(
        "userInfo",
        getUserInfo,
    );

    let [profileImg, setProfileImg] = useState<string>('');
    let [fitMukbti, setFitMukbti] = useState<MukbtiAttribute>();

    const detailRestaurantInfo = useQuery<DetailRestaurantInfo>(
        ['detailRestaurantInfo', user?.data?.oauthIdentifier],
        () => getDetailRestaurantInfo({
            restaurantId: Number(restaurantId),
            oauthIdentifier: user?.data?.oauthIdentifier || ''
        }),
        {
            enabled: !!user,
            onSuccess: (data) => {
                if (data.emotion === 'positive') {
                    setProfileImg(user?.data?.smileImageUrl || `/MBTICharacters/${user?.data?.mukbti}_smile.png`);
                }
                else if (data.emotion === 'neutral') {
                    setProfileImg(user?.data?.neutralImageUrl || `/MBTICharacters/${user?.data?.mukbti}_neutral.png`)
                }
                else if (data.emotion === 'negative') {
                    setProfileImg(user?.data?.sadImageUrl || `/MBTICharacters/${user?.data?.mukbti}_sad.png`)
                }
                setFitMukbti(getMukbtiAttribute(data.fitMukbti))
            }
        }
    )

    let [mukbtiIntro, setMukbtiIntro] = useState<MukbtiIntro>()

    const restaurantTextReview = useQuery<Review>(
        ['restaurantTextReview', searchParams.get('mukbti') || user?.data?.mukbti],
        () => getRestaurantTextReview({
            restaurantId: Number(restaurantId),
            mukbti: searchParams.get('mukbti') || user?.data?.mukbti || ''
        }),
        {
            enabled: !!user,
            onSuccess: (data) => {
                setChartData([
                    { name: '맛', value: Math.round(data.flavorValue * 1000) / 1000 },
                    { name: '서비스', value: Math.round(data.serviceValue * 1000) / 1000 },
                    { name: '분위기', value: Math.round(data.moodValue * 1000) / 1000 },
                ])
                let tmp = getMukbtiAttribute(searchParams.get('mukbti') || '')
                if (tmp) {
                    if (data.emotion === 'positive') {
                        setMukbtiIntro({
                            text: "이 먹BTI와는 궁합이 좋은 식당이군요!",
                            imgUrl: tmp.smileImageUrl,
                            name: tmp.name,
                            taste: tmp.taste,
                            title: tmp.title
                        })
                    } else if (data.emotion === 'negative') {
                        setMukbtiIntro({
                            text: "이 먹BTI와는 어울리지 않는 식당이네요 ㅠ.ㅠ",
                            imgUrl: getMukbtiAttribute(searchParams.get('mukbti') || '').sadImageUrl,
                            name: tmp.name,
                            taste: tmp.taste,
                            title: tmp.title
                        })
                    }
                    else if (data.emotion === 'neutral') {
                        setMukbtiIntro({
                            text: "이 먹BTI에게는 중립적인 식당입니다!",
                            imgUrl: getMukbtiAttribute(searchParams.get('mukbti') || '').neutralImageUrl,
                            name: tmp.name,
                            taste: tmp.taste,
                            title: tmp.title
                        })
                    }
                }

            }
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
                    <img className="w-[115px] h-[84px]" src={detailRestaurantInfo?.data?.thumbnailPictureUrl + `&v=${randomVariable}`} alt="썸네일 이미지" />
                    <div className={styles.info}>
                        <h2 className="text-xl font-bold">{detailRestaurantInfo?.data?.restaurantName}</h2>
                        <h3 className="font-semibold">{detailRestaurantInfo?.data?.address.substring(7)}</h3>
                        <div className={styles.tags} ref={tagsRef}>
                            {
                                detailRestaurantInfo?.data?.tags.map(e => <div>#{e}</div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <div className="flex flex-row gap-[5px] ">
                        <div onClick={() => {
                            handleLike({
                                like: detailRestaurantInfo?.data?.like || false,
                                oauthIdentifier: user?.data?.oauthIdentifier || '',
                                restaurantId: detailRestaurantInfo?.data?.restaurantId || 0,
                            })
                        }}>
                            {
                                detailRestaurantInfo?.data?.like ?
                                    <TbHeartFilled size={"27"} color={"ff6c1a"} />
                                    : <TbHeart size={"27"} color={"ff6c1a"} />
                            }
                        </div>
                    </div>
                    <Link to={`/review/${restaurantId}/choose`}><div className={styles.more}>다른 캐릭터의 리뷰 더보기 &gt;&gt;</div></Link>
                </div>
            </div>

            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className={styles.swiperContainer}
                cardsEffect={{
                    perSlideOffset: 3,
                    perSlideRotate: 1.5,
                    slideShadows: false,
                }}
            >
                <SwiperSlide>
                    <div className={styles.firstCard}>
                        <div data-aos="zoom-in" className={styles.fitMukbti}>
                            {
                                searchParams.get('mukbti') ?
                                    <>
                                        <p className="w-4/5 text-center break-keep text-lg font-semibold">{mukbtiIntro?.text}</p>
                                        <img width={'200px'} height={'200px'} data-aos="zoom-in" src={mukbtiIntro?.imgUrl} alt="추천 먹비티아이 캐릭터" />
                                        <p >{mukbtiIntro?.title}({mukbtiIntro?.name})</p>
                                        <h3 className="text-xl font-semibold">{mukbtiIntro?.taste}</h3>
                                    </>
                                    :
                                    <>
                                        <p className="text-lg font-semibold">이 먹BTI에게 가장 추천합니다!</p>
                                        <img width={'200px'} height={'200px'} data-aos="zoom-in" src={`/MBTICharacters/${detailRestaurantInfo?.data?.fitMukbti}_smile.png`} alt="추천 먹비티아이 캐릭터" />
                                        <p >{fitMukbti?.title}({fitMukbti?.name})</p>
                                        <h3 className="text-xl font-semibold">{fitMukbti?.taste}</h3>
                                    </>

                            }
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.firstCard}>
                        {
                            chartData ?
                                <>
                                    <p className="text-lg font-semibold">수치는 다음과 같습니다!</p>
                                    <ResponsiveContainer className="relative left-[-7%]" data-aos="zoom-in" width={"80%"} height={"50%"}>
                                        <BarChart
                                            data={chartData}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <ReferenceLine y={0} stroke="#000" />
                                            <Bar dataKey="value" fill={
                                                restaurantTextReview.data?.reasonable ? '#82ca9d' : '#ff7979'
                                            } />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {
                                        restaurantTextReview.data?.reasonable ?
                                            <p className="">이 식당은 대체로 가성비가 좋은 편이군요!</p>
                                            : <p className="text-center">이 식당은 가격만큼의 퀄리티를 <br /> 보장하는 편이군요!</p>
                                    }
                                </>
                                : <div data-aos="zoom-in">도표</div>
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.secondCard}>
                        <div ref={imagesRef} className={styles.images}>
                            {
                                detailRestaurantInfo?.data?.detailedPictureList.map((e) => {
                                    return <img className="w-[120px] h-[120px] object-fill" width={"120px"} height={"120px"} src={e + `&v=${randomVariable}`} alt="음식 이미지" />
                                })
                            }
                        </div>
                        <div className={styles.reviewTxt} dangerouslySetInnerHTML={{ __html: restaurantTextReview?.data?.review || ''}} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.thirdCard}>
                        <div className={styles.comments} >
                            {
                                detailRestaurantInfo?.data?.comments.map((e) => {
                                    let imgUrl = e.imgUrl;
                                    if (!imgUrl) {
                                        if (e.emotion === 'positive') {
                                            imgUrl = `/MBTICharacters/${e.userMukbti}_smile.png`
                                        } else if (e.emotion === 'negative') {
                                            imgUrl = `/MBTICharacters/${e.userMukbti}_sad.png`
                                        }
                                        else if (e.emotion === 'neutral') {
                                            imgUrl = `/MBTICharacters/${e.userMukbti}_neutral.png`
                                        }
                                    }
                                    return (
                                        <div className={styles.comment}>
                                            <img src={imgUrl} alt="프사" className="w-[50px] h-[50px] rounded-full" />
                                            <p>{e?.text}</p>
                                            {
                                                e.oauthIdentifier === user?.data?.oauthIdentifier &&
                                                <div onClick={() => {
                                                    deleteComment({
                                                        commentId: e.commentId,
                                                        oauthIdentifier: e.oauthIdentifier,
                                                        restaurantId: detailRestaurantInfo?.data?.restaurantId,
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
                            <button onClick={() => {
                                postComment({
                                    comment: commentRef?.current?.value || '',
                                    restaurantId: detailRestaurantInfo?.data?.restaurantId || 0,
                                    oauthIdentifier: user?.data?.oauthIdentifier || '',
                                })
                                if (commentRef.current) {
                                    commentRef.current.value = '';
                                }
                            }}>게시..</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <NavBar />
        </>
    )
}