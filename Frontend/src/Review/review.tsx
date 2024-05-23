import { useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css";

export default function Review(){

    useEffect(()=>{
        AOS.init();
    },[])


    return(
        <div>
            <p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">2</p>
            <p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">1</p>
            <p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">3</p>
            <p className="w-full h-[300px] bg-slate-600 m-10" data-aos="fade-up">4</p>
        </div>
    )
}