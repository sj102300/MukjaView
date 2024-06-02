import axios from "axios"
import { useMutation, useQueryClient } from "react-query";
import { DetailRestaurantInfo } from "../Review/reviewCard";

interface LikeProps{
    like: boolean;
    oauthIdentifier: string;
    restaurantId: number;
}

const handleLike = ({ like, oauthIdentifier, restaurantId }: LikeProps)=>{

    if(like){
        return axios.post(`https://mukjaview.kro.kr/api/v1/${restaurantId}/like`, {
            like:false,
            oauthIdentifier: oauthIdentifier
        })
    }
    else{ 
        return axios.post(`https://mukjaview.kro.kr/api/v1/${restaurantId}/like`, {
        like: true,
        oauthIdentifier: oauthIdentifier
    })
    }
}

export const useHandleLike = () => {
    const queryClient = useQueryClient()
    return useMutation(handleLike, {
      onSuccess: () => {
        // queryClient.invalidateQueries('detailRestaurantInfo')
        queryClient.setQueryData<DetailRestaurantInfo | undefined>('detailRestaurantInfo', (oldData) => {
            if (!oldData) {
                return undefined;
              }
            return {
              ...oldData,
              like: !(oldData.like)
            }
          })
      },
    })
  }


//   export const useHandleLike = () => {
//     const queryClient = useQueryClient()
//     return useMutation(handleLike, {
//         onMutate: async (newInfo) => {
//             await queryClient.cancelQueries("detailRestaurantInfo");
//             const previousProductData = queryClient.getQueryData<DetailRestaurantInfo | undefined>("detailRestaurantInfo");
//             queryClient.setQueryData<DetailRestaurantInfo | undefined>("get-product", (oldData) => {
//                 if(!oldData){
//                     return undefined;
//                 }
//               return {
//                 ...oldData,
//                 like: !(oldData.like)
//               };
//             });
//             return {
//               previousProductData,
//             };
//           },
//     })
//   }


