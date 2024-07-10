import { MdMap } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoList } from "react-icons/io5";

import { useNavigate } from "react-router-dom";



//navbar height - 54px;

export default function NavBar() {

    let navigator = useNavigate();
    let iconBox = "flex flex-col items-center";

    return (
        <nav className="w-[100%] flex flex-row justify-around fixed left-0 bottom-0 p-[6px] items-center bg-white">
             <div onClick={() => { navigator('/list'); }} className={iconBox}>
                <IoList color="ff6c1a" size={"30"} />
                <p className="text-xs text-gray-700">목록 보기</p>
            </div>
            <div onClick={() => { navigator('/map'); }} className={iconBox}>
                <MdMap color="ff6c1a" size={"30"} />
                <p className="text-xs text-gray-700">지도 보기</p>
            </div>
           
            <div onClick={() => { navigator('/mypage'); }} className={iconBox}>
                <IoPersonCircleOutline color="ff6c1a" size={"30"} />
                <p className="text-xs text-gray-700">마이 페이지</p>
            </div>
        </nav>
    );
}


            {/* <img onClick={() => { navigator('/'); }} src="./icons/logo-notext.png" alt="로고 이미지" width={'60'}  /> */}
