import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { IoIosArrowForward } from "react-icons/io";
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "./list.module.css";
import { useEffect, useState } from "react";
import { RestaurantsInfo } from "../Map/Map";
import { getRestaurantsInfobyKeyword, getRestaurantsInfobyList, getRestaurantsInfobyTag } from "../apis/restaurantsInfo";
import { useNavigate } from "react-router-dom";
import BigThumbnail from "../components/bigThumbnail";

export default function List() {
    let [randomVariable, setRandomVariable] = useState<number>(0);

    useEffect(() => {
        setRandomVariable(Math.random());
    }, []);

    let [searchOption, setSearchOption] = useState<'tag' | 'keyword'>('keyword');
    let [searchValue, setSearchValue] = useState<string>('');

    let [restaurants, setRestaurants] = useState<Array<RestaurantsInfo>>([]);
    let [hasMore, setHasMore] = useState<boolean>(true);
    let [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchInitialData = async () => {
            const data = await getRestaurantsInfobyList(page);
            setRestaurants(data);
        };
        fetchInitialData();
        setPage(1);
    }, [])

    const fetchMoreData = async () => {
        let data = await getRestaurantsInfobyList(page)

        if (data.length === 0) {
            setHasMore(false);
        } else {
            setPage(page + 1);
            setRestaurants((prevRestaurants) => [...prevRestaurants, ...data]);
        }
    };

    const searchStart = async () => {
        setHasMore(false);
        let data;
        if (searchOption === 'tag') {
            data = await getRestaurantsInfobyTag(searchValue);
        } else {
            data = await getRestaurantsInfobyKeyword(searchValue);
        }

        if (data.length === 0) {
            setHasMore(false);
            setRestaurants([])
        } else {
            setRestaurants(data);
        }
    };

    let navigate = useNavigate();

    let [bigThumbnail, setBigThumbnail] = useState<string>('');

    const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
        return (
            <img
                onClick={(e) => {
                    e.stopPropagation();
                    setBigThumbnail(src);
                }}
                src={src}
                alt={alt}
                loading="lazy"
            />
        );
    };

    return (
        <>
            <div className={styles.searchBar}>
                <Search searchStart={searchStart} setSearchOption={setSearchOption} setSearchValue={setSearchValue} />
            </div>
            <div className="mb-[58px]">
                <InfiniteScroll
                    dataLength={restaurants.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h3 className="text-center mt-1">로딩중 ...</h3>}
                >
                    {
                        searchValue !== '' && restaurants.length === 0 ?
                            <h3 className="text-center mt-1">검색결과가 없습니다!</h3>
                            : restaurants.map((item, i) => (
                                <div onClick={() => navigate(`/review/${item.restaurantId}`)} key={i} className={styles.listItem}>
                                    <LazyImage src={item.thumbnailPictureUrl + `&v=${randomVariable}`} alt="썸네일 이미지" />
                                    <div>
                                        <h2 className="text-lg">{item.restaurantName}</h2>
                                        <h3 className="text-sm">{item.address}</h3>
                                    </div>
                                    <IoIosArrowForward color="ff6c1a" size={"45"} />
                                </div>
                            ))
                    }
                </InfiniteScroll>
                {
                    bigThumbnail && <BigThumbnail bigThumbnail={bigThumbnail} setBigThumbnail={setBigThumbnail} />
                }
            </div>
            <NavBar />
        </>
    );
}
