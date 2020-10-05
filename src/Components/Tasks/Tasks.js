import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    image: {

        width: "220px",
        float: "left",
        marginRight: "18px"
    },
    paper: {
        overflow: "hidden",
        padding: "20px 20px",
        position: "relative"
    },
    cancel: {
        padding: "8px 40px",
        border: "none",
        borderRadius: "5px",
        position: "absolute",
        right: "20px",
        bottom: "20px"
    },
    item: {
        padding: "20px"
    }


}))

const Tasks = (props) => {
    
    const classes = useStyles()
    const {_id, library, date, img} = props.activity;
    const handleClick = (id) => {

        fetch(`http://localhost:8080/deleteTask/${id}`, {
            method: "DELETE"
        })
        .then(data => {

            alert("You have successfully cancel event");
            props.handleDelete()
        })

    }

    return (
        
            <Grid item md={6} className={classes.item}>
                <Paper className={classes.paper}>
                    <img className={classes.image} src={`http://localhost:8080/${img}`} alt=""/>
                    <h3>{library}</h3>
                    <h5>{date}</h5>
                    <button onClick={() => handleClick(_id)} className={classes.cancel}>Cancel</button>
                </Paper>
            </Grid>
         
    );
};

export default Tasks;