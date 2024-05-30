import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { IoIosArrowForward } from "react-icons/io";


import styles from "./list.module.css"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { RestaurantsInfo } from "../Map/Map";
import { getRestaurantsInfobyCoord, getRestaurantsInfobyList } from "../apis/restaurantsInfo";
import { Link, useNavigate } from "react-router-dom";

interface RestaurantsItemObj {
    thumbnail: string;
    name: string;
    address: string;
}


export default function List() {

    let [searchOption, setSearchOption] = useState<string>();
    let [searchValue, setSearchValue] = useState<string>();

    const restaurantsByList = useQuery<Array<RestaurantsInfo>>(
        "restaurantsInfoByList",
        getRestaurantsInfobyList,
        {
            onSuccess: (data) => {
                console.log(data);
            },
        }
    );

    let navigate = useNavigate();

    return (
        <>
            <div className={styles.searchBar}><Search setSearchOption={setSearchOption} setSearchValue={setSearchValue} /></div>
            <div className="mb-[58px]">
                {
                    restaurantsByList?.data?.map((item, i) => {
                        return (
                            <div onClick={() => navigate(`/review/${item.restaurantId}`)} key={i} className={styles.listItem}>
                                <img src={item.thumbnailPictureUrl} alt="썸네일 이미지" />
                                <div>
                                    <h2 className="text-lg">{item.restaurantName}</h2>
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