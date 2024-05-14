import NavBar from "../components/NavBar";
import Search from "../components/Search";
import styles from "./map.module.css"


import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps'

export default function Map() {


    const navermaps = useNavermaps()

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
                        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                        defaultZoom={15}
                    >
                        <Marker
                            defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
                        />
                    </NaverMap>
                </MapDiv>

            </div>
            <NavBar />
        </>
    )
}


