
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

  ul li:hover {
    transform: scale(1.1); /* 호버 시 크기를 1.1배로 확대 */
  }

  ul li a {
    color: white;
    text-decoration: none;
  }

  
`;

const NavLink = styled(Link)`
  &.clicked {
    color: #F7D600;
        ;
  }
`;



const Header = () => {

  const [popularClicked, setPopularClicked] = useState(false);
  const [nowPlayingClicked, setNowPlayingClicked] = useState(false);
  const [topRatedClicked, setTopRatedClicked] = useState(false);
  const [upcomingClicked, setUpcomingClicked] = useState(false);
  



  const handlePopularClick = () => {
    setPopularClicked(true);
    setNowPlayingClicked(false);
    setTopRatedClicked(false);
    setUpcomingClicked(false);
  };
  
  const handleNowPlayingClick = () => {
    setPopularClicked(false);
    setNowPlayingClicked(true);
    setTopRatedClicked(false);
    setUpcomingClicked(false);
  };
  
  const handleTopRatedClick = () => {
    setPopularClicked(false);
    setNowPlayingClicked(false);
    setTopRatedClicked(true);
    setUpcomingClicked(false);
  };
  
  const handleUpcomingClick = () => {
    setPopularClicked(false);
    setNowPlayingClicked(false);
    setTopRatedClicked(false);
    setUpcomingClicked(true);
  };
  


  return (
    <>
    <header>
    <HeaderContainer>
      <Logo>
        <Link to="/">Movie App</Link>
      </Logo>
      <Nav>
        <ul>
            <li><Link to="/signup">
             Signup
            </Link></li>
            <li><NavLink to="/popular" onClick={handlePopularClick} className={popularClicked ? 'clicked' : ''}>Popular</NavLink></li>
<li><NavLink to="/now-playing" onClick={handleNowPlayingClick} className={nowPlayingClicked ? 'clicked' : ''}>Now Playing</NavLink></li>
<li><NavLink to="/top-rated" onClick={handleTopRatedClick} className={topRatedClicked ? 'clicked' : ''}>Top Rated</NavLink></li>
<li><NavLink to="/upcoming" onClick={handleUpcomingClick} className={upcomingClicked ? 'clicked' : ''}>Upcoming</NavLink></li>

        </ul>
      </Nav>
    </HeaderContainer>
    </header>
    </>
  );
};

export default Header;
