import { Box, Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Header.css";

import logo from "../../volunteer-network-resources/logos/Group 1329.png";
import { initializeFirebaseFramework } from '../../Firebase/FirebaseManager';

import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {

    
    initializeFirebaseFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    // if(location.pathname === "/home" || location.pathname === "/"){
    //     console.log("milse");
    // }



    const handleLogOut = () => {
      
        firebase.auth().signOut()
        .then(() => {

            setLoggedInUser({});
            history.replace(from)
          })
          .catch(error => {

            console.log(error);
          });

    }



    return (
        <Container>
            <Box className="header-section">
            <Box className="row header">
                <Box className="col-md-6 d-flex align-items-center">
                    <Box className="logo-section">
                        <Link to="/home"><img src={logo} alt=""/></Link>
                    </Box>
                    
                </Box>
                <Box className="col-md-6">
                    <Box className="main-menu">
                        <ul className="navigation">
                            
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/home">Donation</Link></li>
                            <li><Link to="/home">Events</Link></li>
                            <li><Link className="admin" to="/admin/event">Admin</Link></li>
                            {
                                
                            }
                            {
                                loggedInUser.email ? <li><Link onClick={handleLogOut}  className="login" to="/logout">Logout</Link></li> : <li><Link className="login" to="/login">Login</Link></li>
                            }
                            
                        </ul>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Container>
    );
};

export default Header;