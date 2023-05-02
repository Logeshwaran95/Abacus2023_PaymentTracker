import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './LoginForm.module.css';
import env from "react-dotenv";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // alert(`${process.env.CSEA_EMAIL}`)
    
    if(`${process.env.REACT_APP_API_URL}` === username && `${process.env.REACT_APP_API_KEY}` === password){
      navigate('/admin');
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid username or password!!',
      });
    }

  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
