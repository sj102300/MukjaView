import axios from "axios"

export const getRestaurantsInfo = (mapRef: React.MutableRefObject<naver.maps.Map | null>)=>{

    let bound = getLatLngBounds(mapRef)

    return axios.get('https://mukjaview.kro.kr/api/v1/restaurants/by-coordinates',{
        params: {
            page:0,
            min_lat: bound?.min_lat,
            max_lat: bound?.max_lat,
            min_long: bound?.min_long,
            max_long: bound?.max_long,
        }
    })
    .then(response => response.data);
}

const getLatLngBounds = (mapRef: React.MutableRefObject<naver.maps.Map | null>) => {
    if (mapRef?.current) {
      let bounds = mapRef.current.getBounds();
      if (bounds instanceof naver.maps.LatLngBounds) {
        let sw = bounds.getSW();
        let ne = bounds.getNE();
        let bound = {
          min_lat: sw.y,
          max_lat: ne.y,
          min_long: sw.x,
          max_long: ne.x
        }
        return bound;
      }
    }
  }