import styled from 'styled-components';

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
  return (
    <div>
      <BannerContainer>
      Welcome to Movie App
      </BannerContainer>
    </div>
  )
}

export default Banner