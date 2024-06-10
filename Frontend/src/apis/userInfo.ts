import axios, { AxiosError } from "axios"
import { UserInputInfo } from "../SignUp/SignUp"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { UserInfo } from "../SignUp/check";



export const getUserInfo = () => {
  return axios.get('https://mukjaview.kro.kr/api/v1/user/info')
  .then(response => response.data);
}

export const initUserInfo = (userInputInfo: UserInputInfo) => {
  let mukbti = userInputInfo.MBTIOrder + '-' + (userInputInfo.isReasonable ? 'R' : 'F')
  return axios.patch(`https://mukjaview.kro.kr/api/v1/users/${userInputInfo.identifier}/info`, {
      nickname: userInputInfo.nickname,
      mukbti: mukbti,
      init: true,
      smilePictureUrl: userInputInfo.smileImageUrl || null,
      sadPictureUrl: userInputInfo.sadImageUrl || null,
      neutralPictureUrl: userInputInfo.neutralImageUrl || null
    }
  );
  // .then((response) => {
  //   // response.data
  //   return {
  //     oauthIdentifier: userInputInfo.identifier,
  //     nickname: userInputInfo.nickname,
  //     mukbti: mukbti,
  //     init: true,
  //     smilePictureUrl: userInputInfo.smileImageUrl || null,
  //     sadPictureUrl: userInputInfo.sadImageUrl || null,
  //     neutralPictureUrl: userInputInfo.neutralImageUrl || null
  //   }
  // })
}

export const getWishItems = (oauthIdentifier: string)=>{
  return axios.get(`https://mukjaview.kro.kr/api/v1/${oauthIdentifier}/like_list`)
  .then(response => response.data);
}

// export const useInitUserInfo = () => {
//   const queryClient = useQueryClient()
//   return useMutation(initUserInfo, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('userInfo');
//     },
//   })
// }
