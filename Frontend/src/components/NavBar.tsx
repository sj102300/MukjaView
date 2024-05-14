import { MdMap } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



//navbar height - 68px;

export default function NavBar() {

    let navigator = useNavigate();
    let iconBox = "flex flex-col items-center";

    return (
        <nav className="w-full flex flex-row justify-around fixed left-0 bottom-0 p-[4px] items-center bg-white">
            <div onClick={() => { navigator('/map'); }} className={iconBox}>
                <MdMap color="ff6c1a" size={"30"} />
                <p className="text-xs">리뷰 보기</p>
            </div>
            <img onClick={() => { navigator('/'); }} src="./icons/logo-notext.png" alt="로고 이미지" width={'60'}  />
            <div onClick={() => { navigator('/mypage'); }} className={iconBox}>
                <IoPersonCircleOutline color="ff6c1a" size={"30"} />
                <p className="text-xs">마이 페이지</p>
            </div>
        </nav>
    );
}
