import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { useAuthContext } from '../context/AuthContext';

const links = [
  { path: '/', text: 'Home' },
  { path: 'about', text: 'About' },
  { path: 'profile', text: 'Profile' },
  { path: 'login', text: 'Login' },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarOpen && ref.current && !ref.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [navbarOpen]);

  return (
    <>
      <nav ref={ref} className="navbar">
        <button
          type="button"
          className="toggle"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <MdClose style={{ width: '32px', height: '32px' }} />
          ) : (
            <FiMenu style={{ width: '32px', height: '32px' }} />
          )}
        </button>
        <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
          {links.map((link) => {
            if (link.path === 'login') {
              if (!user) {
                return (
                  <li key={link.text}>
                    <NavLink to={link.path}>{link.text}</NavLink>
                  </li>
                );
              }
              return null;
            } if (link.path === 'profile') {
              if (user) {
                return (
                  <li key={link.text}>
                    <NavLink to={link.path} onClick={() => setNavbarOpen(false)}>
                      {link.text}
                    </NavLink>
                  </li>
                );
              }
              return null;
            }
            return (
              <li key={link.text}>
                <NavLink to={link.path}>{link.text}</NavLink>
              </li>
            );
          })}
          {!user && (
            <li className="log-in">
              <span>Log in to edit to-dos</span>
            </li>
          )}
        </ul>
      </nav>

      {user && (
        <div className="logout">
          <p>{user}</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
