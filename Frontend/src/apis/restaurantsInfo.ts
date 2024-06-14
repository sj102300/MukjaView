import axios from "axios"

export const getRestaurantsInfobyCoord = (mapRef: React.MutableRefObject<naver.maps.Map | null>)=>{

    let bound = getLatLngBounds(mapRef)

    return axios.get('https://mukjaview.kro.kr/api/v1/restaurants/by-coordinates',{
        params: {
            page:0,
            min_lat: bound?.min_lat,
            max_lat: bound?.max_lat,
            min_long: bound?.min_long,
            max_long: bound?.max_long,
            is_sort: false,
        }
    })
    .then(response => response.data);
}

export const getLatLngBounds = (mapRef: React.MutableRefObject<naver.maps.Map | null>) => {
  let bound = {
    min_lat: 0,
    max_lat: 0,
    min_long: 0,
    max_long: 0
  }
    if (mapRef?.current) {
      let bounds = mapRef.current.getBounds();
      if (bounds instanceof naver.maps.LatLngBounds) {
        let sw = bounds.getSW();
        let ne = bounds.getNE();
        bound = {
          min_lat: sw.y,
          max_lat: ne.y,
          min_long: sw.x,
          max_long: ne.x
        }
      }
    }
    return bound;
  }

  export const getRestaurantsInfobyTag = (tag: string)=>{
    return axios.get('https://mukjaview.kro.kr/api/v1/restaurants/by-tag',{
        params: {
            page:0,
            tag: tag,
            is_sort: false,
        }
    })
    .then(response => response.data);
  }

  export const getRestaurantsInfobyKeyword = (name: string)=>{
    return axios.get('https://mukjaview.kro.kr/api/v1/restaurants/by-keyword',{
        params: {
            page:0,
            name: name,
            is_sort: false,
        }
    })
    .then(response => response.data);
  }


  interface getDetailRestaurantInfoProps {
    restaurantId: number;
    oauthIdentifier: string;
  }

  export const getDetailRestaurantInfo = ({ restaurantId, oauthIdentifier} : getDetailRestaurantInfoProps)=>{
    return axios.get(`https://mukjaview.kro.kr/api/v1/restaurant/${restaurantId}/info`,{
      params:{
        oauthIdentifier: oauthIdentifier
      }
    }).then(response => response.data);
  }

  export const getRestaurantsInfobyList = (page: number)=>{
    return axios.get('https://mukjaview.kro.kr/api/v1/restaurants/by-coordinates',{
      params: {
          page: page,
          min_lat: 33.1059,
          max_lat: 38.6230,
          min_long: 125.8879,
          max_long: 129.5848,
          is_sort: true,
      }
  })
  .then(response => response.data);
  }

  interface restaurantTextReview {
    restaurantId: number;
    mukbti: string;
  }

  export const getRestaurantTextReview = ({ restaurantId, mukbti }: restaurantTextReview) =>{
    return axios.get(`https://mukjaview.kro.kr/api/v1/restaurant/${restaurantId}/review`,{
      params: {
          mukbti: mukbti
      }
  })
  .then(response => response.data);
  }