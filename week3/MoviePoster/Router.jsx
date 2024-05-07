import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, PopularPage, NowPlayingPage, TopRatedPage, UpComing} from './src/pages';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PopularPage />
          }
        />
        <Route
          path='/MainPage'
          element={
            <MainPage />
          }
        />
        <Route
          path='/NowPlayingPage'
          element={
            <NowPlayingPage />
          }
        />
        <Route
          path='/TopRatedPage'
          element={
            <TopRatedPage />
          }
        />
        <Route
          path='/UpComing'
          element={
            <UpComing />
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default Router