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
  
`;

const Banner = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    getInfo(token)
      .then(data => {
        setUserName(data.name); 
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);
  



  return (
      <BannerContainer>
         {isLoading ? 'Loading...' : `Welcome to ${userName}`}
      </BannerContainer>
  )
}

export default Banner