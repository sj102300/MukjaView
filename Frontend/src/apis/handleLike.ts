import axios from "axios"
import { useMutation, useQueryClient } from "react-query";
import { DetailRestaurantInfo } from "../Review/reviewCard";
import { UserInfo } from "../SignUp/check";

interface LikeProps {
  like: boolean;
  oauthIdentifier: string;
  restaurantId: number;
}

const handleLike = ({ like, oauthIdentifier, restaurantId }: LikeProps) => {

  if (like) {
    return axios.post(`https://mukjaview.kro.kr/api/v1/${restaurantId}/like`, {
      like: false,
      oauthIdentifier: oauthIdentifier
    })
  }
  else {
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
      let user = queryClient.getQueryData<UserInfo>('userInfo');
      queryClient.setQueryData<DetailRestaurantInfo | undefined>(['detailRestaurantInfo', user?.oauthIdentifier], (oldData) => {
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
