import React from 'react';
import { NavLink } from 'react-router-dom';

interface LogoProps {
  logoUrl: string;
  title: string;
}

export default function Logo({ logoUrl, title }: LogoProps): React.ReactElement {
  return (
    <NavLink className="logo" to="/">
      <img className="logo__img" src={logoUrl} alt={title} />
      <h2 className="logo__title h2 text-center">{title}</h2>
    </NavLink>
  );
}
