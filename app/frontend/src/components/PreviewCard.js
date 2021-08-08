import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';
var capitalize = require('capitalize')
import Rating from '@material-ui/lab/Rating';
import { Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: 10,
    flex: "0 0 23.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "15%%"
  },
  media: {
    height: 140,
  },
});

const PreviewCard = ({recipe}) => {
  const classes = useStyles();

  const genDescription = (recipe) => {
    if (recipe.description){
      return recipe.description.length > 70 ? recipe.description.slice(0, 70) + '...' : recipe.description
    }
    return ""
  }
  return (
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/recipe/${recipe.recipe_id}`}>
          <CardMedia
            className={classes.media}
            image={recipe.img_url}
            title={recipe.recipe_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {capitalize.words(recipe.recipe_name)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" maxLength={70}>
              {genDescription(recipe)}
            </Typography>
            <Rating name="read-only" value={recipe.avg_rating}  precision={0.25} readOnly />
          </CardContent>
        </CardActionArea>
      </Card>
  );
}

export default PreviewCard