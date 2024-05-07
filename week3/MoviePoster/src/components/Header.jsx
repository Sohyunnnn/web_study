
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
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
`;

const Logo = styled.div`
  a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
  }
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  ul li {
    margin-right: 20px;
  }

  ul li a {
    color: white;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <>
    <header>
    <HeaderContainer>
      <Logo>
        <Link to="/">Movie App</Link>
      </Logo>
      <Nav>
        <ul>
          <li><Link to="/">회원가입</Link></li>
          <li><Link to="/popular">인기 영화</Link></li>
          <li><Link to="/now-playing">상영 중</Link></li>
          <li><Link to="/top-rated">최고 평점</Link></li>
          <li><Link to="/upcoming">개봉 예정</Link></li>
        </ul>
      </Nav>
    </HeaderContainer>
    </header>
    </>
  );
};

export default Header;
