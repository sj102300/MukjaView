import { useNavigate } from "react-router-dom"


export default function Intro(){

    let navigator = useNavigate()

    return(
        <div>
            <button onClick={()=>{
                navigator('/signup')
            }}>
                회원가입 ㄱㄱ
            </button>
        </div>
    )
}