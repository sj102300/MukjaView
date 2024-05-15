import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { IoIosArrowForward } from "react-icons/io";


import styles from "./list.module.css"
import { useEffect, useState } from "react";

interface RestaurantsItemObj{
    thumbnail: string;
    name: string;
    address: string;
}


export default function List() {

    let [restaurants, setRestaurants] = useState<Array<RestaurantsItemObj>>([] || null)

    useEffect(()=>{
        setTimeout(()=>{
            setRestaurants([{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },{
                thumbnail: './icons/logo-transparent.png',
                name: '가츠시',
                address: '서울 광진구 광나루로 418',
            },])
        },3000)
    },[])

    return (
        <>
            <div className={styles.searchBar}><Search /></div>
            <div className="mb-[58px]">
            {
                    restaurants?.map((item, i) => {

                        return (
                            <div key={i} className={styles.listItem}>
                                <img src={item.thumbnail} alt="썸네일 이미지" />
                                <div>
                                    <h2 className="text-lg">{item.name}</h2>
                                    <h3 className="text-sm">{item.address}</h3>
                                </div>
                                <IoIosArrowForward color="ff6c1a" size={"45"} />
                            </div>
                        )
                    })
                }
            </div>
            <NavBar />
        </>
    )
}