import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';

const RecipeItem = ({ name, average_rating, userid }) => {
    const editing = false;
    
	return (
        <ListItem>
            <ListItemText
                primary={name}
                secondary={null}
            />
            <ListItemText
                primary={average_rating}
                secondary={null}
            />
            <ListItemText
                primary={userid}
                secondary={null}
            />
            <ListItemSecondaryAction>
                <Button variant="contained">Edit</Button>
                <Button variant="contained">Delete</Button>
            </ListItemSecondaryAction>
        </ListItem>
	);
};

export default RecipeItem;
