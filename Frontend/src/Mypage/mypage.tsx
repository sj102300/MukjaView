import NavBar from "../components/NavBar";
import styles from "./mypage.module.css"
import { IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { MukbtiAttribute, getMukbtiAttribute } from "../utils/handleMBTI";
import { getUserInfo, getWishItems } from "../apis/userInfo";
import { UserInfo } from "../SignUp/check";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { RestaurantsInfo } from "../Map/Map";
import { IoIosArrowForward } from "react-icons/io";


export default function MyPage() {

    const user = useQuery<UserInfo>(
        "userInfo",
        getUserInfo,
    );

    const mukbtiAttribute = useQuery<MukbtiAttribute>(
        "mukbtiAttribute",
        () => getMukbtiAttribute(user.data?.mukbti || '')
    )

    const wishItems = useQuery<Array<RestaurantsInfo>>(
        'wishItems',
        () => getWishItems(user?.data?.oauthIdentifier || '')
    )


    if (user.isLoading) return <Loading />;

    return (
        <>
            {(user.data && mukbtiAttribute !== null) && <>
                <div className={styles.profile}>
                    <img src={user?.data?.smileImageUrl || mukbtiAttribute?.data?.smileImageUrl} alt="프사" width={"100"} />
                    <div>
                        <p className="text-sm">{mukbtiAttribute.data?.title}({user.data?.mukbti})</p>
                        <h2 className="text-xl">{mukbtiAttribute.data?.taste}</h2>
                        <h3 className="text-lg">{user.data?.nickname}</h3>
                    </div>
                    <Link to="/signup?edit=true"><IoSettingsOutline size={'20'} className="absolute bottom-[25px] right-[25px]" /></Link>
                </div>
                <div className={styles.wishlist}>
                    <h2>위시리스트</h2>
                    {
                        wishItems?.data?.length ?
                            (wishItems?.data?.map((item, i) => {
                                return (
                                    <Link to={`/review/${item.restaurantId}`}>
                                        <div key={i} className={styles.wishItem}>
                                            <img src={item.thumbnailPictureUrl +`&v=${Math.random() * 100 / 10}`} alt="썸네일 이미지" />
                                            <div>
                                                <h2 className="text-lg">{item.restaurantName}</h2>
                                                <h3 className="text-sm">{item.address}</h3>
                                            </div>
                                            <IoIosArrowForward color="ff6c1a" size={"45"} />
                                        </div>
                                    </Link>
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