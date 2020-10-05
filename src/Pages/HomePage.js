import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import Home from '../Components/Home/Home';


const useStyles = makeStyles((theme) => ({
    intro: {
        textAlign: "center",
        textTransform: "uppercase",
        padding: "40px 0 60px",
        fontWeight: "bold"
    },
    input: {
        padding: "10px 20px",
        width: "350px",
        border: "2px solid lightgrey",
        borderRight: "0",
        borderRadius: "5px 0 0 5px",
        marginTop: "25px"
    },
    submit: {
        padding: "10px 35px",
        border: "2px solid lightgrey",
        borderRadius: "0 5px 5px 0",
        backgroundColor: "#3F90FC",
        color: "white"
    },
    section: {
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('https://i.ibb.co/68ggDDs/Mask-Group.png')",
        backgroundSize: "100% 100%",
    }

}))



const HomePage = () => {
    const classes = useStyles();

    const [events, setEvents] = useState([]);
    useEffect(() => {

        fetch("http://localhost:8080/events")
        .then(response => response.json())
        .then(data => setEvents(data))

    }, [])

    return (
        <Box className="home">
            <Box className={classes.section}>
                <Header></Header>
                <Box className={classes.intro}>
                    <h1>i grow by helping people in need</h1>
                    <input className={classes.input} type="text" name="" id="" placeholder="Search..."/>
                    <input className={classes.submit} type="submit" value="Search"/>
                </Box>
            </Box>
            <Container>
                <Grid container>
                    {
                        events.map(event => <Home key={event._id} event={event}></Home>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;