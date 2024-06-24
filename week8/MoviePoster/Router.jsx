import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, MainPage, PopularPage, NowPlayingPage, TopRatedPage, UpComing, DetailPage, NotFoundPage, SignupPage ,LoginPage} from './src/pages';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
            <MainPage />
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
        <Route
          path='/movie/:id'
          element={
            <Layout>
            <DetailPage />
            </Layout>
          }
        />
        <Route
          path='/signup'
          element={
            <Layout>
            <SignupPage />
            </Layout>
          }
        />
        <Route
          path='/login'
          element={
            <Layout>
            <LoginPage />
            </Layout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        {/* React Router v6에서는 모든 경로와 일치하지 않을 때 보여줄 컴포넌트를 설정하려면, <Route>에 path="*"를 명시 */}

        
      </Routes>
    </BrowserRouter>
  )
}

export default Router