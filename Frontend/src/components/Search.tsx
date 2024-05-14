import { IoSearch } from "react-icons/io5";

export default function Search(){

    //border-1 rounded 
    let searchbar = "w-full grid grid-cols-[30px_70px_auto_50px] items-center gap-[5px]"

    return(
        <div className={searchbar} >
            <IoSearch size={"30"}/>
            <select className="focus:outline-none w-[70px] text-center">
                <option>가게명</option>
                <option>태그</option>
            </select>
            <input className="focus:outline-none" placeholder="검색하기.."/>
            <button>찾기</button>
        </div>
    )
}