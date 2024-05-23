import axios, { AxiosError } from "axios"
import { UserInputInfo } from "../SignUp/SignUp"
import { useQuery } from "react-query"



export const getUserInfo = () => {
  return axios.get('https://mukjaview.kro.kr/api/v1/user/info')
    .then((response) => response.data)
}

export const initUserInfo = (userInputInfo: UserInputInfo) => {
  let mukbti = userInputInfo.MBTIOrder + '-' + (userInputInfo.isReasonable ? 'R' : 'F')
  axios.patch(`https://mukjaview.kro.kr/api/v1/users/${userInputInfo.identifier}/info`, {
      nickname: userInputInfo.nickname,
      mukbti: mukbti,
      init: true,
      smilePictureUrl: userInputInfo.smileImageUrl || null,
      sadPictureUrl: userInputInfo.sadImageUrl || null,
      neutralPictureUrl: userInputInfo.neutralImageUrl || null
    }
  ).then((response) => {
    // response.data
    return {
      oauthIdentifier: userInputInfo.identifier,
      nickname: userInputInfo.nickname,
      mukbti: mukbti,
      init: true,
      smilePictureUrl: userInputInfo.smileImageUrl || null,
      sadPictureUrl: userInputInfo.sadImageUrl || null,
      neutralPictureUrl: userInputInfo.neutralImageUrl || null
    }
  })
}

// export const useInitUserInfo = (userInputInfo: UserInputInfo, onSuccess: ()=>void) => {
//   return useQuery(
//     "userInfo",
//     () => initUserInfo(userInputInfo),
//     {
//       onSuccess: onSuccess,
//     }
//   )
// }
