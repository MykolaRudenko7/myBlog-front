import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, isAuthSelector } from "../../redax/slices/authSlice";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
//
//
//
//
//
export const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'm.rudeeenko@gmail.com',
      password: '01234567'
    }, mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload) {
      return alert('Не вдалося авторизуватися')

    }
    if ('token' in data.payload) { // якщо я авторизований, зберігаю токен в лс
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) { // якщо я авторизаваний
    return <Navigate to="/" /> // перехожу на головну стр
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={styles.field} label="Полное имя" fullWidth />
      <TextField className={styles.field} label="E-Mail" fullWidth />
      <TextField className={styles.field} label="Пароль" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
