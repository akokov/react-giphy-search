import React from 'react';
import {withRouter} from 'react-router-dom';

const NavItem = withRouter(({match, location, history, to, children}) => {
  const onClick = (event) => {
    history.push(to)
  };
  const isActive = location.pathname === to;
  return (
    <a
      className={isActive ? 'active' : 'inactive'}
      onClick={onClick}>{children}</a>
  );
});

export default NavItem;
