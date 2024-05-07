
import { useSwiper } from 'swiper/react';


interface PrevNextProps {
    prev: string,
    next: string,
    goPrev?: () => void,
    goNext?: () => void
}

const PrevNext: React.FC<PrevNextProps> = ({ prev, next, goPrev, goNext }) => {


    const swiper = useSwiper();

    const handlePrev = goPrev || (() => swiper.slidePrev());
    const handleNext = goNext || (() => swiper.slideNext());

    return (
        <div className="text-[#ff6c1a] absolute bottom-0 w-full h-[40px] p-1 flex flex-row justify-between items-center text-lg">
            <div onClick={handlePrev} className={"flex flex-row justify-center items-center " + (prev ? "" : "invisible")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                {prev}
            </div>
            <div onClick={handleNext} className={"flex flex-row justify-center items-center " + (next ? "" : "invisible")}>
                {next}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    )
}

export default PrevNext;