import { Container, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Header from '../Components/Header/Header';
import Tasks from '../Components/Tasks/Tasks';




const MyTasks = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [deleteTask, setDeleteTask] = useState(false);

    const [task, setTask] = useState([]);
    useEffect(() => {

        fetch(`http://localhost:8080/volunteer/myTasks?email=${loggedInUser.email}`)
        .then(response => response.json())
        .then(data => setTask(data))


    }, [deleteTask])

    const handleDelete = () => {

        setDeleteTask(!deleteTask)
    }

 

    return (
        <>
            <Header></Header>
            <Container>
                <Grid container>
                    {
                        task.map(activity => <Tasks handleDelete={handleDelete} key={activity._id} activity={activity}></Tasks>)
                    }
               </Grid>
        </Container>
        </>
    );
};

export default MyTasks;