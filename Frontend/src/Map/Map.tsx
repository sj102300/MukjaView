import { Suspense, useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import styles from "./map.module.css"
import { MdMyLocation, MdRefresh } from "react-icons/md";
import { FaMapPin } from "react-icons/fa6";


import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, Marker } from 'react-naver-maps';
import { renderToString } from "react-dom/server";
import { PreviewRestaurant } from "../components/previewRestaurant";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getRestaurantsInfo } from "../apis/restaurantsInfo";
import { UserInfo } from "../SignUp/check";
import { getUserInfo } from "../apis/userInfo";
import { MukbtiAttribute, getMukbtiAttribute } from "../utils/handleMBTI";


interface LocationType {
  isAvailable?: boolean;
  latitude: number;
  longitude: number;
}

interface RestaurantsInfo {
  restaurantId: number;
  restaurantName: string;
  tags: Array<string>;
  address: string;
  latitude: number;
  longitude: number;
  thumbnailPictureUrl: string;
  emotion?: string;
}

export interface PreviewRestaurantInfo {
  isAvailable: boolean;
  latitude: number;
  longitude: number;
  restaurantId: number,
  restaurantName: string;
  tags: Array<string>;
  address: string;
  thumbnailPictureUrl: string;
  emotion: string;
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

  let [previewRestaurant, setPreviewRestaurant] = useState<PreviewRestaurantInfo>({
    isAvailable: false,
    restaurantId: 0,
    latitude: 0,
    longitude: 0,
    restaurantName: '',
    tags: [],
    address: '',
    thumbnailPictureUrl: '',
    emotion: ''
  })

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          isAvailable: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        mapRef.current?.setCenter(new navermaps.LatLng(position.coords.latitude, position.coords.longitude))
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }

  // 현재 위치 받아오기
  useEffect(() => {
    getMyLocation();
  }, []);

  const mapRef = useRef<naver.maps.Map | null>(null);

  const user = useQuery<UserInfo>(
    "userInfo",
    getUserInfo,
  );

  const mukbtiAttribute = useQuery<MukbtiAttribute>(
    "mukbtiAttribute",
    () => getMukbtiAttribute(user.data?.mukbti || '')
  )

  const restaurants = useQuery<Array<RestaurantsInfo>>(
    "restaurantsInfo",
    () => getRestaurantsInfo(mapRef || null),
    {
      onSuccess: (data) => {
        console.log(data)
      },
      select: (data) => {
        return data?.map(e => {
          let updatedEmotion: string | undefined;
          if (e.emotion === 'positive') {
            updatedEmotion = user.data?.smileImageUrl || mukbtiAttribute.data?.smileImageUrl;
          } else if (e.emotion === 'negative') {
            updatedEmotion = user.data?.sadImageUrl || mukbtiAttribute.data?.sadImageUrl;
          } else if (e.emotion === 'neutral') {
            updatedEmotion = user.data?.neutralImageUrl || mukbtiAttribute.data?.neutralImageUrl;
          } else {
            updatedEmotion = e.emotion;
          }
          return {
            ...e,
            emotion: updatedEmotion
          };
        })
      },
    }
  );

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.searchBar}><Search /></div>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={(e) => setPreviewRestaurant({ ...previewRestaurant, isAvailable: false })}
        >
          <NaverMap
            ref={mapRef}
            defaultZoom={17}
            defaultMapTypeId={navermaps.MapTypeId.NORMAL}
            defaultCenter={new navermaps.LatLng(myLocation.latitude, myLocation.longitude)}
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
              restaurants?.data?.map((e) => {
                return (
                  <Marker
                    onClick={(event: naver.maps.PointerEvent) => {
                      event.pointerEvent.stopPropagation();
                      setPreviewRestaurant({
                        isAvailable: true,
                        restaurantId: e.restaurantId,
                        latitude: e.latitude,
                        longitude: e.longitude,
                        restaurantName: e.restaurantName,
                        tags: e.tags,
                        address: e.address,
                        thumbnailPictureUrl: e.thumbnailPictureUrl,
                        emotion: e.emotion || ''
                      })
                    }}
                    position={new navermaps.LatLng(e.latitude, e.longitude)}
                    icon={{
                      content: `<img width="50" className=${styles.faceMapMarker} src="${e.emotion}"  />`,
                      anchor: new naver.maps.Point(25, 25)
                    }}
                  />
                )
              })
            }
            {
              previewRestaurant.isAvailable &&
              <Marker
                onClick={() => navigate(`/review/${previewRestaurant.restaurantId}`)}
                position={new navermaps.LatLng(previewRestaurant.latitude, previewRestaurant.longitude)}
                icon={{
                  content: renderToString(
                    <PreviewRestaurant
                      id={previewRestaurant.restaurantId}
                      thumbnailPictureUrl={previewRestaurant.thumbnailPictureUrl}
                      restaurantName={previewRestaurant.restaurantName}
                      address={previewRestaurant.address}
                      tags={previewRestaurant.tags}
                    />),
                  anchor: new naver.maps.Point(80, 80)
                }}
              />
            }

          </NaverMap>
        </MapDiv>
        <button onClick={getMyLocation} className={styles.myLocation}><MdMyLocation size={"30"} color={"grey"} /></button>
        <button onClick={() => restaurants?.refetch} className={styles.refresh}><MdRefresh size={"30"} color={"grey"} /></button>
      </div>
      <NavBar />
    </>
  )
}
