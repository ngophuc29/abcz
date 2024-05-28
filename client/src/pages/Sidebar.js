// src/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: {
        marginTop: 25, // Adjust if you have an AppBar or other content on top
    },
});

const Sidebar = ({ collections, handleCollectionChange }) => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {collections.map((collection, index) => (
                    <ListItem button key={index} onClick={() => handleCollectionChange(collection)}>
                        <ListItemText primary={collection} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
