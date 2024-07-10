import { useEffect, useState } from "react";

interface bigThumbnailProps {
    bigThumbnail: string;
    setBigThumbnail: (tmp: '')=>void;
}

export default function BigThumbnail({ bigThumbnail, setBigThumbnail }: bigThumbnailProps) {

    let [randomVariable, setRandomVariable] = useState<number>(0);

    useEffect(() => {
        setRandomVariable(Math.random())
    }, [])

    return (
        <div onClick={(e)=>{
            e.stopPropagation();
            setBigThumbnail('')
            }} className="fixed w-[100dvw] h-[100dvh] bg-zinc-700/50 flex justify-center items-center top-0 left-0 z-[1000]">
            <img width={"280px"} height={"280px"} src={bigThumbnail + `&v=${randomVariable}`} alt="썸네일 이미지 크게보기" />
        </div>
    )

}