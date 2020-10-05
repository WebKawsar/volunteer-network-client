import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import logo from "../volunteer-network-resources/logos/Group 1329.png";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const drawerWidth = 260;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#E5E5E5",
    color: "black",
    border: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
      height: "60px",
  },
  label: {
      display: "block",
      fontWeight: "bold"
  },
  input: {
      padding: "8px 8px",
      display: "block",
      width: "100%",
      borderRadius: "4px",
      marginBottom: "20px",
      border: "2px solid lightgrey",
  },
  date: {
      width: "100%",
      margin: "5px 0 20px"
  },
  left: {
      padding: theme.spacing(2)
  },
  right: {
    padding: theme.spacing(2)
  },
  paper: {
      padding: theme.spacing(2),
      overflow: "hidden"
  },
  helperText: {
      color: "red"
  },
  submit: {
      float: "right",
      padding: "10px 40px",
      backgroundColor: "#3F90FC",
      color: "white",
      borderRadius: "5px",
      border: "none"
  },
  error: {
      color: "red",
      margin: "15px 0",
      display: "block"
  }


}));


const AdminAddEvent = () => {

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        const formData = new FormData()
        const js = JSON.stringify(data)
        formData.append("data", js)
        formData.append("image", data.image[0])

        fetch('http://localhost:8080/addEvent', {
            method: 'POST',
            body: formData,

        })
        .then(response => response.json())
        .then(data => {

            alert("Successfully added volunteer event")
            document.getElementById("eventTitle").value = "";
            document.getElementById("description").value = "";
            document.getElementById("image").value = "";
            
        })

    }
        

    return (

            <Container>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Add event
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <Link to="/home"><img className={classes.logo} src={logo} alt=""/></Link>
                        <List>
                            <Link className={classes.link} to="/admin/volunteers">
                                <ListItem button key="Volunteer register list">
                                    <ListItemIcon><PeopleAltOutlinedIcon /></ListItemIcon>
                                    <ListItemText primary="Volunteer register list" />
                                </ListItem>
                            </Link>

                            <Link className={classes.link} to="/admin/event">
                                <ListItem button key="Add Event">
                                    <ListItemIcon><AddIcon /></ListItemIcon>
                                    <ListItemText primary="Add Event" />
                                    
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Paper className={classes.paper}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid className={classes.left} item md={6} xs={12}>

                                        <label className={classes.label} htmlFor="eventTitle">Event Title</label>
                                        <input ref={register({ required: "Event title is required"})} className={classes.input} type="text" name="eventTitle" id="eventTitle" placeholder="Enter title"/>
                                        {
                                            errors.eventTitle && <span className={classes.error}>{errors.eventTitle.message}</span>
                                        }

                                        <label className={classes.label} htmlFor="description">Description</label>
                                        <textarea ref={register({ required: "Description is required"})}  className={classes.input} name="description" id="description" cols="61" rows="5" placeholder="Enter description"></textarea>
                                        {
                                            errors.description && <span className={classes.error}>{errors.description.message}</span>
                                        }
                                    
                                    </Grid>
                                    <Grid className={classes.right} item md={6} xs={12}>
                                        
                                        <label htmlFor="date">Event Date</label>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                className={classes.date}
                                                inputRef={register({ required: "Date is required"})} 
                                                id="date"
                                                name="date"
                                                format="dd-MMM-yyyy"
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
                                        <label className={classes.label} htmlFor="banner">Banner</label>
                                        <input ref={register} type="file" name="image" id="banner"/>
                                    </Grid>
                                </Grid>
                                <input className={classes.submit} type="submit" value="Submit"/>
                            </form>
                        </Paper>
                    </main>
                </div>
            </Container>
    );
};

export default AdminAddEvent;