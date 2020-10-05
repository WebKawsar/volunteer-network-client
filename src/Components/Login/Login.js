import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import "./Login.css";
import googleImage from "../../volunteer-network-resources/logos/google.png";
import logo from "../../volunteer-network-resources/logos/Group 1329.png";
import { googleSignIn, initializeFirebaseFramework } from '../../Firebase/FirebaseManager';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F8FAFC"
    },
    top: {
        textAlign: "center",
        margin: "50px 0"
    },
    bottom: {
        textAlign: "center",
        margin: "auto",
        height: "75vh"
    },
    google: {
        display: "flex",
        alignItems: "center",
        border: "2px solid lightgrey",
        cursor: "pointer",
        borderRadius: "30px",
        height: "51px",
        margin: "40px 0 15px"
    },
    image: {
        width: "40px",
        padding: "5px"
    },
    text: {
        textAlign: "center",
        width: "100%",
        margin: "0"
    },
    paper: {
        padding: "100px 80px",
    },
    logo: {
        width: "202px"
    }

}));




const Login = () => {

    const classes = useStyles();

    initializeFirebaseFramework();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleGoogleSignIn = () => {
        
        googleSignIn()
        .then(response => {

            if(response.success && response.email){

                const googleSignInUser = {...loggedInUser, ...response};
                setLoggedInUser(googleSignInUser);
                history.replace(from);
                
              }
              else{
        
                const googleSignInError = {...loggedInUser, ...response};
                setLoggedInUser(googleSignInError);  
            }

        })

    }
    
    return (
        
            <Box className={classes.root}>
                <Container>
                    <Grid container>
                        <Grid className={classes.top} item xs={12}>
                            <Link to="/home"><img className={classes.logo} src={logo} alt=""/></Link>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid className={classes.bottom} item md={6} xs={12}>
                            <Paper className={classes.paper}>
                                <h3>Login With</h3>
                                <Box onClick={handleGoogleSignIn} className={classes.google}>
                                    <img className={classes.image} src={googleImage} alt=""/>
                                    <p className={classes.text}>Continue with Google</p>
                                </Box>
                                <span className="">Don't have an account? Create an account</span> 
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        
    );
};

export default Login;