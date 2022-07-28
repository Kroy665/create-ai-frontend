import React, { useState, useEffect } from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import axios from 'axios';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('create-ai-token');

    var config = {
      method: 'get',
      url: 'http://localhost:1337/api/users/me',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUserData(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });



    if (token) {
      setIsLoggedIn(true);
    }
  }, [])


  return (

    <div className="App">

      <Header userData={userData} setUserData={setUserData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? <Home userData={userData} setUserData={setUserData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Login userData={userData} setUserData={setUserData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Footer />
    </div>
  );
}

export default App;
