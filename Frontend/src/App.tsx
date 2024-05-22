import { Route, Routes } from 'react-router-dom';
import './App.css'
import { SignUp } from './SignUp/SignUp';
import Intro from './Intro/Intro';
import MyPage from './Mypage/mypage';
import List from './List/list';
import Map from './Map/Map';
import { NavermapsProvider } from 'react-naver-maps';
import { Suspense } from 'react';
import Loading from './components/Loading';
import Review from './Review/review';
import UserInitCheck from './SignUp/check';

function App() {

  return (
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
      
      <Route path={"/review"} element={<Review />} />
    </Routes>
  )
}

export default App;
