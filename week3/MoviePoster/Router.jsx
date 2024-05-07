import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, MainPage, PopularPage, NowPlayingPage, TopRatedPage, UpComing} from './src/pages';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
            <PopularPage />
            </Layout>
          }
        />
        <Route
          path='/popular'
          element={
            <Layout>
            <PopularPage />
            </Layout>
          }
        />
        <Route
          path='/MainPage'
          element={
            <Layout>
            <MainPage />
            </Layout>
          }
        />
        <Route
          path='/now-playing'
          element={
            <Layout>
            <NowPlayingPage />
            </Layout>
          }
        />
        <Route
          path='/top-rated'
          element={
          <Layout>
            <TopRatedPage />
            </Layout>
          }
        />
        <Route
          path='/upcoming'
          element={
            <Layout>
            <UpComing />
            </Layout>
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default Router