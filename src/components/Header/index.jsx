import Button from '@mui/material/Button';
import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector, logout } from "../../redax/slices/authSlice";



import Container from '@mui/material/Container';
import styles from './Header.module.scss';
//
//
//
//
//
//
export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)

  const onClickLogout = () => {
    if (window.confirm('Ви дійсно хочете вийти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>BLOG &#128521;</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написати статтю</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
