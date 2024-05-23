import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { getUserInfo } from "../apis/userInfo";

interface CheckProps {
  setStep: (step: number)=>void;
  setIdentifier: (identifier: string)=>void;
}

export interface UserInfo {
  mukbti?: string;
  oauthIdentifier: string;
  email?: string;
  realname?: string;
  nickname: string;
  neutralImageUrl?: string;
  smileImageUrl?: string;
  sadImageUrl?: string;
  init: boolean;
}

export default function Check({ setStep, setIdentifier }: CheckProps){

    let navigate = useNavigate();

    const { data, isError, error, isLoading } = useQuery<UserInfo, AxiosError>(
      "userInfo",
      getUserInfo,
      {
        onSuccess: (userInfo)=>{
          if (userInfo.init) {
            navigate('/mypage');
          } else {
            setIdentifier(userInfo.oauthIdentifier);
            setStep(1);
          }
        }
      }
    );

    if (isLoading) return <Loading />
    if (isError) return <div>Error발생 {error.message}</div>

    return null;
}