import { Suspense, useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import styles from "./map.module.css"
import { MdMyLocation, MdRefresh } from "react-icons/md";
import { FaMapPin } from "react-icons/fa6";


import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, Marker } from 'react-naver-maps';
import { renderToString } from "react-dom/server";
import { PreviewRestaurant, PreviewRestaurantProps } from "../components/previewRestaurant";
import { Link, useNavigate } from "react-router-dom";


interface LocationType {
  isAvailable?: boolean;
  latitude: number;
  longitude: number;
}

export default function Map() {

  const navermaps = useNavermaps();

  let navigate = useNavigate();

  //기본: 세종대학교 대양AI센터
  let [myLocation, setMyLocation] = useState<LocationType>({
    isAvailable: false,
    latitude: 37.5509199,
    longitude: 127.0738487
  } || null);

  let [previewRestaurant, setPreviewRestaurant] = useState<LocationType>({
    isAvailable: false,
    latitude: 37.5509199,
    longitude: 127.0738487
  })

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          isAvailable: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }

  const refreshRestaurants = () => {
    console.log('식당정보 재요청');
  }

  // 현재 위치 받아오기
  useEffect(() => {
    getMyLocation();
  }, []);

  const mapRef = useRef<naver.maps.Map | null>(null);

  // useEffect(() => {
  //     const map = mapRef?.current;

  //     const bounds: naver.maps.PointBounds = map.getBounds();
  //         console.log(bounds.minX())
  //         console.log(bounds.minY());
  //         console.log(bounds.maxX())
  //         console.log(bounds.maxY());

  //     // const handleIdle = () => {

        
  //     // };

  //     // navermaps.Event.addListener(map, 'idle', handleIdle);

  //     // return () => {
  //     //   navermaps.Event.removeListener(map, 'idle', handleIdle);
  //     // };
  //   }
  // }, [mapRef]);


  let restaurantOne: PreviewRestaurantProps = {
    id: 'test',
    thumbnailPictureUrl: './icons/logo-transparent.png',
    restaurantName: '60계 치킨',
    address: '서울 광진구 화양동 45-99',
    tags: ['치킨', '양념치킨', '맛있다']
  }

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.searchBar}><Search /></div>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={(e) => setPreviewRestaurant({...previewRestaurant, isAvailable: false})}
        >

          <NaverMap
            defaultZoom={17}
            defaultMapTypeId={navermaps.MapTypeId.NORMAL}
            center={new navermaps.LatLng(myLocation.latitude, myLocation.longitude)}
          >
            {
              myLocation.isAvailable && <Marker
                position={new navermaps.LatLng(myLocation.latitude, myLocation.longitude)}
                icon={{
                  content: renderToString(<FaMapPin size={25} color="#1D5D9B" />),
                }}
              />

            }

            {
              //previewRestaurant.isAvailable
              myLocation.isAvailable &&
                <Marker
                  onClick={()=>navigate(`/review/${restaurantOne.id}`)}
                  position={new navermaps.LatLng(previewRestaurant.latitude, previewRestaurant.longitude)}
                  icon={{
                    content: renderToString(
                      <PreviewRestaurant
                        id={restaurantOne.id}
                        thumbnailPictureUrl={restaurantOne.thumbnailPictureUrl}
                        restaurantName={restaurantOne.restaurantName}
                        address={restaurantOne.address}
                        tags={restaurantOne.tags}
                      />
                    ),
                  }}
                />
            }

          </NaverMap>
        </MapDiv>
        <div onClick={getMyLocation} className={styles.myLocation}><MdMyLocation size={"30"} color={"grey"} /></div>
        <div onClick={refreshRestaurants} className={styles.refresh}><MdRefresh size={"30"} color={"grey"} /></div>
      </div>
      <NavBar />
    </>
  )
}
