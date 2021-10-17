import React, { useEffect, useState } from "react";
import AppRouter from 'components/Router';
import fbase, { authService, getAuth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
     authService.onAuthStateChanged((user) => {
       if(user){
         setUserObj(user);
       }
       setInit(true);
     });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
