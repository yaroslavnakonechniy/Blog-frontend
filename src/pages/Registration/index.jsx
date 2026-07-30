import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import styles from './Login.module.scss';

export const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  const {
    register, 
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'YaroslaV',
      email: 'qwerty1@gmail.com',
      password: 'qwerty12345',
    },
    mode: 'onChange',
  });

  const onSubmit =  async(values) => {
    const data = await dispatch(fetchRegister(values));
    
    if(!data.payload) {
      return alert("Не вдалося авторизуватися!");
    }
    
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
    
  if(isAuth) {
    return <Navigate to="/" />
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field} 
          label="Повне імя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          { ...register('fullName', {required: 'Вкажіть Повне імя'})} 
          fullWidth />
        <TextField 
          className={styles.field} 
          label="E-Mail" 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          { ...register('email', {required: 'Вкажіть потчу'})}
          fullWidth />
        <TextField 
          className={styles.field} 
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          { ...register('password', {required: 'Вкажіть пароль'})} 
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зареєструватися
        </Button>
      </form>
    </Paper>
  );
};
