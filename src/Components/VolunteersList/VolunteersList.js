import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../App';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import TableRow from './TableRow';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    }
  
  }));


const VolunteersList = () => {

    const [deleteVolunteer, setDeleteVolunteer] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    useEffect(() => {

        fetch("http://localhost:8080/admin/volunteers")
        .then(response => response.json())
        .then(data => setVolunteers(data))

    }, [deleteVolunteer])


    const handleDelete = () => {

        setDeleteVolunteer(!deleteVolunteer)
    }

    const classes = useStyles();
    return (
        <div>
            <AdminDashboard>
                <Paper className={classes.paper}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registating date</th>
                                <th>Volunteers list</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                volunteers.map(volunteer => <TableRow handleDelete={handleDelete} key={volunteer._id} volunteer={volunteer}></TableRow>)
                            }
                        </tbody>
                    </Table>
                </Paper>
            </AdminDashboard>
        </div>
    );
};



export default VolunteersList;



