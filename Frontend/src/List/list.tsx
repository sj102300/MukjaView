import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { IoIosArrowForward } from "react-icons/io";


import styles from "./list.module.css"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { RestaurantsInfo } from "../Map/Map";
import { getRestaurantsInfobyKeyword, getRestaurantsInfobyList, getRestaurantsInfobyTag } from "../apis/restaurantsInfo";
import { useNavigate } from "react-router-dom";

interface RestaurantsItemObj {
    thumbnail: string;
    name: string;
    address: string;
}

export default function List() {


    let [randomVariable, setRandomVariable] = useState<number>(0);

    useEffect(()=>{
        // setRandomVariable(Math.random());
    },[])

    let [searchOption, setSearchOption] = useState<'tag' | 'keyword'>('keyword');
    let [searchValue, setSearchValue] = useState<string>('');

    let [restaurants, setRestaurants] = useState<Array<RestaurantsInfo>>();

    const restaurantsByList = useQuery<Array<RestaurantsInfo>>(
        "restaurantsInfoByList",
        getRestaurantsInfobyList,
        {
            onSuccess: (data) => {
                setRestaurants(data);
            },
        }
    );

    const restaurantsByTag = useQuery<Array<RestaurantsInfo>>(
        "restaurantsInfoByTag",
        () => getRestaurantsInfobyTag(searchValue),
        {
            enabled: false,
            onSuccess: (data) => {
                setRestaurants(data);
            }
        }
    );

    const restaurantsByKeyword = useQuery<Array<RestaurantsInfo>>(
        "restaurantsInfoByKeyword",
        () => getRestaurantsInfobyKeyword(searchValue),
        {
            enabled: false,
            onSuccess: (data) => {
                setRestaurants(data);
            }
        }
    );


    const searchStart = () => {
        if (searchOption === 'tag') {
            restaurantsByTag.refetch();
        }
        else {
            restaurantsByKeyword.refetch();
        }
    }
    let navigate = useNavigate();

    return (
        <>
            <div className={styles.searchBar}><Search searchStart={searchStart} setSearchOption={setSearchOption} setSearchValue={setSearchValue} /></div>
            <div className="mb-[58px]">
                {
                    restaurants?.map((item, i) => {
                        return (
                            <div onClick={() => navigate(`/review/${item.restaurantId}`)} key={i} className={styles.listItem}>
                                <img src={item.thumbnailPictureUrl +`&v=${randomVariable}`} alt="썸네일 이미지" />
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