import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import logo from '../assets/img/logo.svg';
import HeaderActions from './HeaderActions';

export default function Header(): React.ReactElement {
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header className="header" ref={headerRef}>
      <div className={`header__wrapper ${location.pathname === '/form' ? 'form-page' : ''}`}>
        <div className="header__container container">
          <Logo logoUrl={logo} title="гросс маркет" />
          <HeaderActions headerRef={headerRef} />
        </div>
      </div>
    </header>
  );
}
