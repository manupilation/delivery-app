import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/* State */
import { useDispatch } from 'react-redux';
import { clearProducts } from '../../../redux/features/productsSlice';
import { clearUser } from '../../../redux/features/userSlice';

/* Styles */
import Styled from './Styled';

/* Utils */
import navLinksMap from '../../../utils/navLinksMap';
import LocalStorageMethods from '../../../utils/localStorage';

export default function NavBar({ iconbar }) {
  const { pathname } = useLocation();

  // Render
  const excludeRoutes = [
    '/',
    '/login',
    '/register',
    '/lostPassword',
    '/resetPass/',
  ];

  const shouldRender = !excludeRoutes.some(route => {
    return pathname.startsWith(route);
  });

  const dispatch = useDispatch();

  // Navigation Links
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const user = LocalStorageMethods.getParsedItem('user');

    if (user) {
      setNavLinks(navLinksMap(user.name)[user.role]);
    }
  }, []);

  // Logout
  const logout = () => {
    LocalStorageMethods.deleteItem('products');
    LocalStorageMethods.deleteItem('user');

    dispatch(clearProducts());
    dispatch(clearUser());
  };

  // Conditional Styles
  const getLinkClassName = (to) => {
    const path = pathname.replace('checkout', 'products');

    if (to === path) {
      return 'Selected';
    }

    return '';
  };

  return shouldRender && (
    <Styled iconbar={ iconbar }>
      <ul>
        {
          navLinks.map(({ name, to, icon }) => (
            <li key={ name }>
              {
                iconbar ? (
                  <Link
                    to={ to }
                    className={ getLinkClassName(to) }
                  >
                    { icon() }
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={ getLinkClassName(to) }
                    onClick={
                      name === 'Logout' ? logout : () => {}
                    }
                  >
                    <Link to={ to }>{name}</Link>
                  </button>
                )
              }
            </li>
          ))
        }
      </ul>
    </Styled>
  );
}

NavBar.propTypes = {
  iconbar: PropTypes.bool,
};

NavBar.defaultProps = {
  iconbar: false,
};
