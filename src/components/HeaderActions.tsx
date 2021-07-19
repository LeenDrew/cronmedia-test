import React, { useEffect, useCallback, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface HeaderActionsProps {
  headerRef: React.RefObject<HTMLElement>;
}

export default function HeaderActions({ headerRef }: HeaderActionsProps): React.ReactElement {
  const location = useLocation();

  const phoneNumber = '+7 (926) 433-14-16';

  const [isReplyShow, setIsReplyShow] = useState<boolean>(false);
  const scrollHandler = useCallback(() => {
    if (headerRef.current && window.pageYOffset > headerRef.current.offsetHeight) {
      setIsReplyShow(true);
    } else {
      setIsReplyShow(false);
    }
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  if (location.pathname === '/') {
    return (
      <div className="header__actions actions">
        <a
          className="actions__phone phone text text-center"
          href={`tel:${phoneNumber.replace(/[- )(]/g, '')}`}
        >
          <span className="phone__text">{phoneNumber}</span>
          <span className=" phone__icon _icon-call h2" />
        </a>
        <NavLink
          className={`actions__reply fixed text text-center ${isReplyShow ? '' : 'hide'}`}
          to="/request"
        >
          заполнить анкету
        </NavLink>
      </div>
    );
  }

  return (
    <div className="header__actions actions">
      <NavLink
        className="actions__close _icon-close text"
        to="/"
        aria-label="Вернуться на главную"
      />
    </div>
  );
}
