import { Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './SignUp/SignUp';
import Intro from './Intro/Intro';
import { LastPage, SixthPage } from './SignUp/pages';
import MyPage from './Mypage/mypage';
import List from './List/list';
import Map from './Map/Map';
import { NavermapsProvider } from 'react-naver-maps';

function App() {

  return (
    <Routes>
      <Route path={"/"} element={<Intro />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path={"/signup/loading"} element={<SixthPage />} />
      <Route path={"/signup/end"} element={<LastPage />} />

      <Route path={"/mypage"} element={<MyPage />} />

      <Route path={"/list"} element={<List />} />
      <Route path={"/map"} element={
        <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_KEY}>
          <Map />
        </NavermapsProvider>
      } />

    </Routes>
  )
}

export default App;
