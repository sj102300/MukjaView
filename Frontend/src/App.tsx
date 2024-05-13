import { Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './SignUp/SignUp';
import Intro from './Intro/Intro';
import { LastPage, SixthPage } from './SignUp/pages';

function App() {

  return (
    <Routes>
      <Route path={"/"} element={<Intro />}/>
      <Route path={"/signup"} element={<SignUp />}/>
      <Route path={"/signup/loading"} element={<SixthPage />}/>
      <Route path={"/signup/end"} element={<LastPage />}/>
    </Routes>
  )
}

export default App;
