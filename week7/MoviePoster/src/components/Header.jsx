import { useState,  useEffect} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

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
    cursor: pointer;
  }

  ul li a.active {
    color: #F7D600; /* 현재 경로에 있을 때 색상 변경 */
  }
`;

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  
  return (
    <HeaderContainer>
      <Logo>
        <NavLink to="/">Movie App</NavLink>
      </Logo>
      <Nav>
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
    </HeaderContainer>
  );
};

export default Header;
