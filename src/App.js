import Container from "@mui/material/Container";
import React from "react";
import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../src/redax/slices/authSlice';


import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { fetchAuthMe } from "./redax/slices/authSlice";
//
//
//
//
//
//
function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)

  React.useEffect(() => { //при першому завантаженні перевіряю чи я авторизований
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
