import styled from 'styled-components';
import { getInfo } from '../../api/getInfo';
import { useEffect, useState } from 'react';

const BannerContainer = styled.div`
  background-color: black;
  color: white;
  display:center;
  justify-content:center;
  align-items:center;
  height:300px;
  width: 100%;
  font-size: 55px;
  text-align: center;
  display: flex;
  margin-bottom: 30px;
  font-weight: bold;
  @media (max-width: 390px) {
      font-size: 30px;
    }
  
  
`;

const Banner = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getInfo(token)
        .then(data => {
          setUserName(data.name);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);
  



  return (
    <BannerContainer>
      {isLoggedIn ? (isLoading ? 'Loading...' : `Welcome to ${userName}`) : 'Welcome to Movie App'}
    </BannerContainer>
  )
}

export default Banner