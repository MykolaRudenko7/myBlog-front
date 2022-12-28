import React from "react";
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, isAuthSelector } from "../../redax/slices/authSlice";

import styles from "./Login.module.scss";
//
//
//
//
//
//
export const Login = () => {
  const dispatch = useDispatch();
  // const isAuth = Boolean(useSelector(state => state.auth.data))
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
        Вхід в обліковий запис
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type='email'
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Вкажіть пошту" })}
          fullWidth
        />
        <TextField
          type='password'
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.email?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: "Вкажіть пароль" })}
          fullWidth />

        <Button type='submit' size="large" variant="contained" fullWidth>
          Вхід
        </Button>
      </form>
    </Paper>
  );
};
