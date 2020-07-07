import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
    root: { 
      textAlign: 'center',
    },
    paper: { 
      borderRadius: 15,
      alignItems: 'center',
    },
    btn:{
      background: 'content-box',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px #325EA5', 
    } 
    })
  );

export default function DescriptionModal({app}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.btn} variant="outlined" color="primary" onClick={handleClickOpen}>
        Info
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ root: classes.root,paper: classes.paper }}
      >
        <DialogTitle id="alert-dialog-slide-title">{app.name} | {app.category} | {app.min_age}+ | Rating {app.rating}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {app.description.replace(/<[^>]+>/g, '')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=> window.open(app.url, "_blank")}>Install</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
