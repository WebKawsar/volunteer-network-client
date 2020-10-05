import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  item: {
      padding: "20px 20px"
  },
  content: {
      textAlign: "center",
      height: "100px",
      fontSize: "30px"
  }

});


const Home = (props) => {
    const classes = useStyles();

    const {_id, eventTitle, img} = props.event;
    const history = useHistory();
    const handleClick = (id) => {
        history.push(`/register/volunteer/${id}`)
    }

    return (

            <Grid className={classes.item} item md={3} sm={6} xs={12}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            onClick={() => handleClick(_id)}
                            alt="Contemplative Reptile"
                            image={`http://localhost:8080/${img}`}
                            title="Contemplative Reptile"
                        />
                        <CardContent className={classes.content} bgcolor="primary.main">
                            <Typography onClick={() => handleClick(_id)} gutterBottom variant="h5" component="h2">
                                {eventTitle}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            
    );
};

export default Home;