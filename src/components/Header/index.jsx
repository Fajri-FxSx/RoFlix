import clsx from 'clsx';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import logo from '../../assets/logo.png';
import { headerNav, mobileWidth } from '../../constants';
import { handleScrollTop } from '../../utils';
import './Header.scss';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const searchIconRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchInputRef = useRef(null);

  const menuRef = useRef(null);
  const navBarRef = useRef(null);

  const activeIndex = useMemo(() => {
    const index = headerNav.findIndex(({ path }) => path === pathname);
    return index;
  }, [pathname]);

  const handleMobileSearchBtn = () => {
    searchBarRef.current.classList.toggle('active');

    if (searchBarRef.current.classList.contains('active')) {
      document.body.classList.add('search-bar');
      searchIconRef.current.classList.replace('bx-search', 'bx-x');
    } else {
      document.body.classList.remove('search-bar');
      searchIconRef.current.classList.replace('bx-x', 'bx-search');
    }
  };

  const handleMobileNavBar = useCallback(() => {
    menuRef.current.toggle();

    if (menuRef.current.contains) {
      document.body.classList.add('nav-bar');
      navBarRef.current.classList.add('active');
    } else {
      document.body.classList.remove('nav-bar');
      navBarRef.current.classList.remove('active');
    }
  }, []);

  const handleHideMobileMenu = () => {
    if (menuRef.current.contains) {
      document.body.classList.remove('nav-bar');
      navBarRef.current.classList.remove('active');
      menuRef.current.inactive();
    }
    return null;
  };

  const handleHideMobileSearch = () => {
    if (searchBarRef.current.classList.contains('active')) {
      document.body.classList.remove('search-bar');
      searchIconRef.current.classList.replace('bx-x', 'bx-search');
      searchBarRef.current.classList.remove('active');
    }
    searchInputRef.current.value = '';
    return null;
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      if (e.target.value.trim()) {
        handleScrollTop();
        navigate({
          pathname: 'search',
          search: createSearchParams({
            keyword: e.target.value,
          }).toString(),
        });

        e.target.blur();
      }
    }
  };
  const handleClickSearchBtn = () => {
    const { value } = searchInputRef.current;
    handleScrollTop();
    if (value.trim()) {
      navigate({
        pathname: '/search',
        search: createSearchParams({
          keyword: value,
        }).toString(),
      });
    }
    return null;
  };

  useLayoutEffect(() => {
    const handleOutMoblieDevice = () => {
      if (window.innerWidth >= mobileWidth) {
        handleHideMobileMenu();
        handleHideMobileSearch();
      }
    };
    window.addEventListener('resize', handleOutMoblieDevice);
    return () => window.removeEventListener('resize', handleOutMoblieDevice);
  });

  return (
    <header className="header">
      <div className="header__wrap container">
        <MobileMenu onClick={handleMobileNavBar} ref={menuRef} />
        <Link className="header__logo" to="/" onClick={handleScrollTop}>
          <img src={logo} alt="Logo movies" />
          RoFlix
        </Link>
        <ul className="header__nav" ref={navBarRef}>
          {headerNav.map((item, i) => (
            <li key={i}>
              <Link
                className={clsx({ active: i === activeIndex })}
                to={item.path}
                onClick={handleScrollTop}
              >
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
        <div className="header__search" ref={searchBarRef}>
          <span
            className="header__search__btn"
            onMouseDown={handleClickSearchBtn}
          >
            <i className="bx bx-search bx-sm"></i>
          </span>
          <input
            type="text"
            className="header__search__input"
            placeholder="Enter your keyword..."
            ref={searchInputRef}
            onBlur={handleHideMobileSearch}
            onKeyUp={handleSearch}
          />
        </div>
        <div className="mobile-search__btn" onClick={handleMobileSearchBtn}>
          <i className="bx bx-search bx-md" ref={searchIconRef}></i>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
