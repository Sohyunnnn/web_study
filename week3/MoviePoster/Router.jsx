import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './src/pages/Home';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage />
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default Router