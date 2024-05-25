import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./mypage.module.css"
import { IoArrowRedoOutline, IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { MukbtiAttribute, getMukbtiAttribute } from "../utils/handleMBTI";
import { getUserInfo } from "../apis/userInfo";
import { UserInfo } from "../SignUp/check";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface wishlistItemObj {
    thumbnail: string;
    restaurantName: string;
    address: string;
}

export default function MyPage() {

    const { data, isLoading } = useQuery<UserInfo>(
        "userInfo",
        getUserInfo,
        {
            onSuccess: (data)=>{
                setMukbtiAttribute(getMukbtiAttribute(data?.mukbti || ''));
            }
        }
    );
    let [mukbtiAttribute, setMukbtiAttribute] = useState<MukbtiAttribute | null>(null);
    let [wishItems, setWishItems] = useState<Array<wishlistItemObj>>([])

    if (isLoading) return <Loading />;

    return (
        <>
            {(data && mukbtiAttribute !== null) && <>
                <div className={styles.profile}>
                    <img src="./icons/logo-transparent.png" alt="프사" width={"100"} />
                    <div>
                        <p className="text-sm">{mukbtiAttribute.title}({data?.mukbti})</p>
                        <h2 className="text-xl">{mukbtiAttribute.taste}</h2>
                        <h3 className="text-lg">{data?.nickname}</h3>
                    </div>
                    <Link to="/signup?edit=true"><IoSettingsOutline size={'20'} className="absolute bottom-[25px] right-[25px]" /></Link>
                </div>
                <div className={styles.wishlist}>
                    <h2>위시리스트</h2>
                    {
                        wishItems.length ?
                            (wishItems?.map((item, i) => {
                                return (
                                    <div key={i} className={styles.wishItem}>
                                        <img src={item.thumbnail} alt="썸네일 이미지" />
                                        <div>
                                            <h2 className="text-lg">{item.restaurantName}</h2>
                                            <h3 className="text-sm">{item.address}</h3>
                                        </div>
                                        <IoArrowRedoOutline color="ff6c1a" size={"45"} />
                                    </div>
                                )
                            }))
                            : <div className="mx-auto my-1 text-gray-500">비어있어요!!</div>
                    }
                </div>
            </>
            }
            <NavBar />
        </>

    )
}



// useEffect(()=>{
//     setTimeout(()=>{
//         setWishItems([{
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         },
//         {
//             thumbnail: './icons/logo-transparent.png',
//             restaurantName: '가츠시',
//             address: '서울 광진구 광나루로 418',
//         }
//         ])
//     },1500)
// },[])