import { Route, Routes } from 'react-router-dom';
import './App.css'
import { SignUp } from './SignUp/SignUp';
import Intro from './Intro/Intro';
import MyPage from './Mypage/mypage';
import List from './List/list';
import { Map } from './Map/Map';
import { NavermapsProvider } from 'react-naver-maps';
import { Suspense } from 'react';
import Loading from './components/Loading';
import ReviewCard from './Review/reviewCard';
import { ReactQueryDevtools } from 'react-query/devtools'


function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/signup"} element={<SignUp />} />

        <Route path={"/mypage"} element={<MyPage />} />

        <Route path={"/list"} element={<List />} />

        <Route path={"/map"} element={
          <Suspense fallback={<Loading />}>
            <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_KEY}>
              <Map />
            </NavermapsProvider>
          </Suspense>
        } />

        <Route path={"/review/:restaurantId"} element={<ReviewCard />} />
      </Routes>
      <ReactQueryDevtools />
    </>
  )
}

export default App;
