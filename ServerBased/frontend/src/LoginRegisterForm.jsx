import React, { useState } from 'react';
const BASE_URL = "https://auth-1ozd-megh-shah-08s-projects.vercel.app";
const LoginRegisterForm = () => {

  const register =async () => {
    //sends a request to the server for register
    const response = await fetch(BASE_URL+"/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    })
    const data = await response.json();
    alert(data["message"])
    
  } 
  const login =async () => {
    //sends a request to the server for register
    const response = await fetch(BASE_URL+"/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })
    const data = await response.json(); 
    alert(data["message"])
  } 
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages
  const [error, setError] = useState('');

  // State for form toggle (whether to show login or registration form)
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login form validation
      if (!email || !password) {
        setError('Both fields are required!');
        return;
      }
      login();
    } else {
      // Registration form validation
      if (!name || !email || !password) {
        setError('All fields are required!');
        return;
      }
      register();
    }

    // Reset the form after successful submission
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={styles.input}
              required 
            />
          </div>
        )}
        
        <div style={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <button type="submit" style={styles.submitButton} >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button 
        style={styles.toggleButton} 
        onClick={() => {
          setIsLogin(!isLogin); 
          setError(''); 
        }}
      >
        {isLogin ? 'Don’t have an account? Register here' : 'Already have an account? Login here'}
      </button>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

// Basic styling for the form
const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  toggleButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    color: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
};

export default LoginRegisterForm;
