import React from 'react';



const TableRow = (props) => {
    const {_id, name, email, library, date} = props.volunteer;

    const handleVolunter = (id) => {

        fetch(`http://localhost:8080/deleteVolunteer/${id}`, {
            method: "DELETE"
        })
        .then(data => {


            alert("You have successfully Delete Volunteer");
            props.handleDelete()
        })

    }

    return (
            <tr>
                <td>#</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td>{library}</td>
                <td>
                    <button onClick={() => handleVolunter(_id)}>Delete</button>
                </td>
            </tr>
    );
};

export default TableRow;