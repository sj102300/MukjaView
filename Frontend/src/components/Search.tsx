import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";

interface searchProps{
    setSearchOption: (searchOption: string)=>void;
    setSearchValue: (searchValue: string)=>void;
}

export default function Search({ setSearchOption, setSearchValue }: searchProps){

    let searchbar = "text-sm w-full grid grid-cols-[25px_65px_auto_40px] items-center gap-[5px]"

    const searchStart = () =>{ 
        
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>)=>{
        setSearchOption(e?.target?.value || '')
    }

    return(
        <div className={searchbar} >
            <IoSearch size={"25"}/>
            <select onChange={handleSelect} className="focus:outline-none text-center bg-white">
                <option value="keyword">가게명</option>
                <option value="tag">태그</option>
            </select>
            <input className="focus:outline-none w-full" placeholder="검색하기.."/>
            <button onClick={searchStart} className="w-10">찾기</button>
        </div>
    )
}