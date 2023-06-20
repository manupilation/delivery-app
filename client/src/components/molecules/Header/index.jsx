import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* Assets */
import { BsChevronLeft as BackIcon } from 'react-icons/bs';
import { Logo } from '../../../assets';

/* Children */
import { NavBar, CheckoutBtn } from '../../atoms';

/* Styles */
import Styled from './Styled';

export default function Header() {
  // Back Button
  const navigate = useNavigate();
  const goBack = -1;

  const { pathname } = useLocation();

  // Conditional Render
  const excludeRoutes = [
    '/login',
    '/register',
    '/lostPassword',
    '/resetPass/'
  ];

  const shouldRender = !excludeRoutes.some(route => {
    return pathname.startsWith(route);
  });

  // Conditional Styless
  const hideOn = [
    '/customer/products',
    '/seller/orders',
  ];

  const backDisabled = hideOn.includes(pathname);

  const extraStyles = {
    visibility: backDisabled ? 'hidden' : 'visible',
  };

  return shouldRender && (
    <Styled>
      <button
        type="button"
        className="BackButton"
        onClick={ () => navigate(goBack) }
        disabled={ backDisabled }
        style={ extraStyles }
      >
        <BackIcon className="BackIcon" />
      </button>

      <div className="Container">
        <img src={ Logo } alt="Deliveree" />
        <h1>Deliveree</h1>
      </div>

      <NavBar />

      <CheckoutBtn />
    </Styled>
  );
}
