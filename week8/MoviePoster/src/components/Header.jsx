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
    display: ${props => (props.open ? 'flex' : 'none')};
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
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Login
              </NavLink>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                Signup
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/popular" className={({ isActive }) => (isActive ? 'active' : '')}>
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/now-playing" className={({ isActive }) => (isActive ? 'active' : '')}>
              Now Playing
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-rated" className={({ isActive }) => (isActive ? 'active' : '')}>
              Top Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" className={({ isActive }) => (isActive ? 'active' : '')}>
              Upcoming
            </NavLink>
          </li>
        </ul>
      </Nav>
      <Hamburger onClick={toggleMenu}>
        <HamburgerImg src={HamburgerIcon} alt="Menu" />
      </Hamburger>
    </HeaderContainer>
  );
};

export default Header;
