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

import { Link } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AddIcon from '@material-ui/icons/Add';
import logo from "../../volunteer-network-resources/logos/Group 1329.png";
import { Box } from '@material-ui/core';


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    height: "60px",
},
appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#E5E5E5",
    color: "black",
    border: "none"
},



}));




const AdminDashboard = (props) => {

    const classes = useStyles();

    return (
        
            <Box className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Volunteer register list
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
                    
                    {
                        props.children
                    }
                    
                </main>
            </Box>

    );
};

export default AdminDashboard;