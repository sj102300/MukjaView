import { Link, useNavigate } from "react-router-dom";

export interface PreviewRestaurantProps {
    id?: string;
    thumbnailPictureUrl: string;
    restaurantName: string;
    address: string;
    tags: Array<string>;
}


export function PreviewRestaurant({ thumbnailPictureUrl, restaurantName, address, tags }: PreviewRestaurantProps) {

    return (
        <div className="flex flex-col w-[160px] h-full items-start bg-white rounded-xl p-[10px] shadow-[0_0_4px_gray]">
            <img className="mb-[3px] w-[140px] bg-black rounded h-[120px]" src={thumbnailPictureUrl} alt="썸네일 이미지" />
            <h2 className="font-bold text-sm">{restaurantName}</h2>
            <h3 className="text-[11px]">{address}</h3>
            <div className="mt-[3px] flex flex-row w-full gap-[3px] flex-wrap">{
                tags.map(e =>
                    <p className="text-[9px] bg-[#ff6c1a] border-[#ff6c1a] px-1 rounded-lg border border-solid">#{e}</p>
                )
            }
            </div>
        </div>
    )

}