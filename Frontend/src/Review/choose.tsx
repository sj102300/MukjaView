import NavBar from "../components/NavBar";
import styles from './choose.module.css'
import { Mukbtis } from "../utils/handleMBTI";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";


export default function Choose() {

    let { restaurantId } = useParams();

    return (
        <>
        <div className={styles.container}>
            <h1>어떤 캐릭터의 리뷰가 궁금하신가요?</h1>
            {
                Mukbtis.map((e)=>{
                    return (
                    <Link to={`/review/${restaurantId}?mukbti=${e.name}`}>
                        <div className={styles.list}>
                            <img width={"70px"} height={"70px"} src={e.neutralImageUrl} alt="캐릭터 프사" />
                            <div>
                                <p className="text-sm">{e.title}({e.name})</p>
                                <h3 className="text-lg mt-1">{e.taste}</h3>
                            </div>
                            <IoIosArrowForward size={'40'} color={"ff6c1a"}/>
                        </div>
                    </Link>
                    )
                })
            }
        </div>
            <NavBar />
        </>
    )
}