import { Suspense, useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import styles from "./map.module.css"
import { MdMyLocation, MdRefresh } from "react-icons/md";
import { FaMapPin } from "react-icons/fa6";


import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, Marker } from 'react-naver-maps';
import { renderToString } from "react-dom/server";


interface LocationType {
  isAvailable?: boolean;
  latitude: number;
  longitude: number;
}

export default function Map() {

  const navermaps = useNavermaps();

  //기본: 세종대학교 대양AI센터
  let [myLocation, setMyLocation] = useState<LocationType>({
    isAvailable: false,
    latitude: 37.5509199,
    longitude: 127.0738487
  } || null)

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

  const refreshRestaurants = ()=>{
    console.log('식당정보 재요청');
  }

  // 현재 위치 받아오기
  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.searchBar}><Search /></div>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
          }}>

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
          </NaverMap>
        </MapDiv>
        <div onClick={getMyLocation} className={styles.myLocation}><MdMyLocation size={"30"} color={"grey"} /></div>
        <div onClick={refreshRestaurants} className={styles.refresh}><MdRefresh size={"30"} color={"grey"} /></div>
      </div>
      <NavBar />
    </>
  )
}
