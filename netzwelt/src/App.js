import {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Error from './pages/Error';
import AppNavBar from './components/AppNavBar';
import './App.css';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
});

// Function for clearing the localStorage to logout the user.
const unsetUser = () => {
  localStorage.clear();
}

  useEffect(() => {

      fetch(`http://localhost:4000/users/details`, {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          // Set the user states values with the user details upon successful login.
          if (typeof data._id !== "undefined") {

            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            });

          // Else set the user states to the initial values
          } else {

            setUser({
              id: null,
              isAdmin: null
            });

          }

        })

        }, []); 

useEffect(() =>{
  console.log(user);
  console.log(localStorage);
}, [user])


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavBar/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="*" element={<Error />} />
                </Routes>
          
      </Router>
    </UserProvider>
  );
}

export default App;
