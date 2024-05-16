import { Oval } from "react-loader-spinner";


export default function Loading(){

    return(
        <div className="w-full h-[100dvh] flex justify-center items-center">
            <Oval
                    visible={true}
                    height="300"
                    width="300"
                    color="#ff6c1a"
                    secondaryColor='ff914d'
                    ariaLabel="oval-loading"
                    strokeWidth='1'
                    strokeWidthSecondary='1'
                />
        </div>
    )
}