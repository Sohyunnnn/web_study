import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position='absolute'
  top='0';
  padding: 20px;
  box-sizing: border-box;
  padding: 20px;
`;

const Info = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const footer = () => {
  return (
    <footer>
      <FooterContainer>
      <p>MoviePoster Inc. All rights reserved.</p>
      <Info>
      <p>Park Sohyun</p>
      <a href='https://github.com/Sohyunnnn' target='_blank'>github</a>
      </Info>
      </FooterContainer>
    </footer>
  )
}

export default footer