import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from 'react-hook-form';

import styles from "./Login.module.scss";
//
//
//
//
//
//
export const Login = () => {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    email: '',
    password: ''
  },
    {})

  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Вкажіть пошту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('password', { required: "Вкажіть пароль" })}
          fullWidth />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
