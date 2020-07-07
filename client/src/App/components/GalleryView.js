import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DescriptionModal from './DescriptionModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function GalleryView({appData}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <h1>Here are some apps we think you'll like!</h1>
      <GridList cellHeight={300} col={3} className={classes.gridList}>
        {appData.map((app) => (
          <GridListTile key={app.name}>
            <img src={app.icon} alt={app.name} />
            <GridListTileBar
              title={app.name}
              subtitle={<span>{app.category}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${app.title}`} className={classes.icon}> 
                  <DescriptionModal app={app}/>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
  }
