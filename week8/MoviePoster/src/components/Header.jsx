import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HamburgerIcon from '../assets/hamburger.png';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative; /* 추가: 위치 지정 */
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
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: absolute; /* 추가: 절대 위치 지정 */
    top: 100%; /* 추가: 헤더 아래에 위치 */
    left: 0;
    background-color: rgba(0, 0, 0, 0.9); /* 추가: 투명도 조정 */
    display: ${props => (props.open ? 'flex' : 'none')};
    padding: 10px; /* 추가: 내부 패딩 */
    box-sizing: border-box;
    z-index: 100; /* 추가: 다른 요소들보다 위에 배치 */
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    @media (max-width: 700px) {
      flex-direction: column;
      width: 100%;
    }
  }

  ul li {
    margin-right: 20px;
    @media (max-width: 700px) {
      margin: 10px 0;
    }
  }

  ul li:hover {
    transform: scale(1.1);
  }

  ul li a {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }

  ul li a.active {
    color: #F7D600;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  @media (max-width: 700px) {
    display: block;
  }
`;

const HamburgerImg = styled.img`
  width: 24px;
  height: 24px;
`;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 99; /* 헤더보다 아래에 위치 */
//   display: ${props => (props.open ? 'block' : 'none')};
// `;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo>
        <NavLink to="/">Movie App</NavLink>
      </Logo>
      <Nav open={menuOpen}>
        <ul>
          <li>
            {isLoggedIn ? (
              <a onClick={handleLogout}>Logout</a>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
              Login
            </NavLink>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
                Signup
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/popular" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/now-playing" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}> 
              Now Playing
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-rated" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
              Top Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
              Upcoming
            </NavLink>
          </li>
        </ul>
      </Nav>
      <Hamburger onClick={toggleMenu}>
        <HamburgerImg src={HamburgerIcon} alt="Menu" />
      </Hamburger>
      {/* <Overlay open={menuOpen} onClick={toggleMenu} /> */}
    </HeaderContainer>
  );
};

export default Header;
