import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuthSelector } from "../../redax/slices/authSlice";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './Login.module.scss';
//
//
//
//
//
export const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Mykola Руденко',
      email: 'm.rudenko@gmail.com',
      password: '01234567'
    }, mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не вдалося зареєструватися')

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
        Створити аккаунт
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Повне ім'я"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: "Вкажіть повне ім'я" })}
          fullWidth />
        <TextField
          type='email'
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Вкажіть E-Mail" })}
          fullWidth />
        <TextField
          type='password'
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: "Вкажіть пароль" })}
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Реєстрація
        </Button>
      </form>
    </Paper>
  );
};
