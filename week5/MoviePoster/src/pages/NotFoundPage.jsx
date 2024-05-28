import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


  const MainButton= styled.button`
    margin-top: 20px;
  `;
  

const NotFoundPage = () => {

  const navigate= useNavigate();

  const handleCLick= () =>{
    navigate('/');
  }

  return (
    <main>
      <div>
      <h1>Not Found</h1>
      <p>An unexpected error occurred.</p>
      <MainButton onClick={handleCLick}>Go to the main page</MainButton>
      </div>
    </main>
  )
}

export default NotFoundPage