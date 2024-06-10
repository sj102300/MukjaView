import axios from "axios";
import { useMutation, useQueryClient } from 'react-query';

interface PostCommentProps{
    comment: string;
    oauthIdentifier: string;
    restaurantId: number;
}

const postComment = ({ comment, oauthIdentifier, restaurantId }: PostCommentProps)=>{

    return axios.post(`https://mukjaview.kro.kr/api/v1/${restaurantId}/comment`, {
        comment: comment,
        oauthIdentifier: oauthIdentifier,
    })

}

export const usePostComment = () =>{
    const QueryClient = useQueryClient();
    return useMutation(postComment, {
        onSuccess: () =>{
            QueryClient.invalidateQueries('detailRestaurantInfo')
        }
    })
}

interface DeleteCommentProps{
    commentId: number;
    oauthIdentifier:string;
    restaurantId: number;
}

const deleteComment = ({ commentId, oauthIdentifier, restaurantId }: DeleteCommentProps)=>{

    return axios.delete(`https://mukjaview.kro.kr/api/v1/${restaurantId}/comment`, {
        data: {
            oauthIdentifier: oauthIdentifier,
            commentId: commentId
        }
    })
}

export const useDeleteComment = ()=>{
    const QueryClient = useQueryClient();
    return useMutation(deleteComment, {
        onSuccess: ()=>{
            QueryClient.invalidateQueries('detailRestaurantInfo')
        }
    })
}