import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register, 
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'yaroslav99.n@gmail.com',
      password: 'Yaroslav645868',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    dispatch(fetchAuth(values));
  }

  if(isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          { ...register('email', {required: 'Вкажіть потчу'})}
          fullWidth
      />
      <TextField 
        className={styles.field}
        label="Пароль"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        { ...register('password', {required: 'Вкажіть пaроль'})}
        fullWidth
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Увійти
      </Button>
      </form>
    </Paper>
  );
};
