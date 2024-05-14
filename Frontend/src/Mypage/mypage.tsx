import { useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./mypage.module.css"
import { IoArrowRedoOutline } from "react-icons/io5";


interface wishlistItemObj {
    thumbnail: string;
    restaurantName: string;
    address: string;
}

export default function MyPage() {

    let [wishItems, setWishItems] = useState<Array<wishlistItemObj>>([{
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    },
    {
        thumbnail: './icons/logo-transparent.png',
        restaurantName: '가츠시',
        address: '서울 광진구 광나루로 418',
    }
    ])


    return (
        <>
            <div className={styles.profile}>
                <img src="./icons/logo-transparent.png" alt="프사" width={"100"} />
                <div>
                    <p className="text-sm">미식 우선의 분위기 감상가(FSM - F)</p>
                    <h2 className="text-xl">새콤한 라즈베리 맛</h2>
                    <h3 className="text-lg">맛도리 헌터</h3>
                </div>
            </div>
            <div className={styles.wishlist}>
                <h2>위시리스트</h2>
                {
                    wishItems.map((item, i) => {

                        return (
                            <div className={styles.wishItem}>
                                <img src={item.thumbnail} alt="썸네일 이미지" />
                                <div>
                                    <h2 className="text-lg">{item.restaurantName}</h2>
                                    <h3 className="text-sm">{item.address}</h3>
                                </div>
                                < IoArrowRedoOutline color="ff6c1a" size={"45"} />
                            </div>
                        )
                    })
                }
            </div>
            <NavBar />
        </>

    )
}