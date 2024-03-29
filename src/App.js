import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/actions/user_action';

function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(setUser(user));
        navigate('/');
      } else {
        // User is signed out
        // ...
        dispatch(clearUser());
        navigate('/login');
      }
    });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  }

  return (
    <Routes>
      <Route exact path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
