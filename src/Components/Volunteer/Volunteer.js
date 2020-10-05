import { Box, Container, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../volunteer-network-resources/logos/Group 1329.png";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';
import { Link, useHistory, useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F8FAFC"
    },
    top: {
        textAlign: "center",
        margin: "50px 0"
    },
    bottom: {
        margin: "auto"
    },
    google: {
        display: "flex",
        alignItems: "center",
        border: "2px solid lightgrey",
        cursor: "pointer",
        borderRadius: "30px",
        height: "51px",
    },
    image: {
        width: "40px",
        padding: "5px"
    },
    text: {
        textAlign: "center",
        width: "100%"
    },
    paper: {
        padding: theme.spacing(5)
    },
    logo: {
        width: "202px"
    },
    helperText: {
        color: "red"
    },
    submit: {
        backgroundColor: "#3F90FC",
        width: "100%",
        marginTop: "30px",
        padding: "13px 0",
        color: "white",
        border: "none",
        borderRadius: "4px"
    },
    form: {
        marginTop: "40px"
    }

}));



const Volunteer = () => {

    const history = useHistory();
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();

    const [chooseTask, setChooseTask] = useState({});
    useEffect(() => {

        fetch(`http://localhost:8080/register/volunteer/${id}`)
        .then(response => response.json())
        .then(data => setChooseTask(data))

    }, [])

    const onSubmit = data => {
        
        const newData = data;
        newData.img = chooseTask.img;

        fetch("http://localhost:8080/addVolunteerActivity", {

            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data){
                history.push("/volunteer/myTasks")
            }
        })
        
    }

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const classes = useStyles();

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
                            <h3>Register as a Volunteer</h3>
                            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    inputRef={register({ 
                                        required: "Name is required"
                                    })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    type="text"
                                    label="Full Name"
                                    defaultValue={loggedInUser.name}
                                    name="name"
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                    helperText={errors.name && errors.name.message}
                                />


                                <TextField
                                    inputRef={register({ 
                                        required: "Email is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Please provide a valid email address"
                                        }
                                    })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    type="email"
                                    defaultValue={loggedInUser.email}
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}

                                    helperText={errors.email && errors.email.message}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        inputRef={register({ 
                                            required: "Date is required"
                                        })}
                                        margin="normal"
                                        id="date"
                                        name="date"
                                        format="dd-MMM-yyyy"
                                        fullWidth
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                        helperText={errors.date && errors.date.message}
                                    />
                                </MuiPickersUtilsProvider>

                                <TextField
                                    inputRef={register({ 
                                        required: "Description is required"
                                    })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    type="text"
                                    label="Description"
                                    name="description"
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                    helperText={errors.description && errors.description.message}
                                />

                                
                               {
                                chooseTask.eventTitle && 
                                <TextField
                                   inputRef={register({ 
                                       required: "Organize books library is required"
                                   })}
                                   variant="outlined"
                                   margin="normal"
                                   fullWidth
                                   id="name"
                                   type="text"
                                   defaultValue={chooseTask.eventTitle}
                                   label="Organize books at the library"
                                   name="library"
                                   FormHelperTextProps={{
                                       className: classes.helperText
                                   }}
                                   helperText={errors.library && errors.library.message}
                               />
                               }
                                
                                <input className={classes.submit} type="submit" value="Registration"/>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Volunteer;