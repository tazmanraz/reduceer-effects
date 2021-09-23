import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect (() => {
    const storedLogin = localStorage.getItem('isLoggedIn');

    // bad practise without the useEffect because we call our useState again which results in infinite loop
    if (storedLogin === '1') {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1'); // 1 indicated logged in key-value
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn', '1')
    setIsLoggedIn(false);
  };

  return (

    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
  );
}

export default App;
