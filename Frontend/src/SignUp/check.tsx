import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useQuery } from "react-query";

interface CheckProps {
  setStep: (step: number)=>void
}

export default function Check({ setStep }: CheckProps){

    let navigate = useNavigate();

      // Queries
  // const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })

  useEffect(() => {
    fetch("https://mukjaview.kro.kr/api/v1/user/info", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      return result.json();
    }).then((response) => {
      console.log(response);
      if (response.init){
        navigate('/mypage');
      }
      else{
        setStep(1);
      }
    })
  }, [])

    return <Loading />;
}