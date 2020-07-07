import React, {useState, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import './LoginDialog.css';

import mainImg from '../assets/3593987.jpg';
import GridView from './CategoriesView';
import RatingStars from './RatingStars';
import { isValid } from '../utils/formValidations';

import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: { 
    textAlign: 'center',
  },
  paper: { 
    borderRadius: 15,
    alignItems: 'center',
  },
  btn:{
    background: 'linear-gradient(to right, #A670A9, #5972AE)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #325EA5', 
  } 
  })
);

export default function LoginDialog({setLoggedIn}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('female');
  const [rating, setRating] = useState(2);
  const [interests, setInterests] = useState([]);
  const [age, setAge] = useState(0);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setView(view-1);
  };

  const handleNext = () => {
    if (view === 0) {
      isValid(name,email,birthDate) && setView(view+1);
      calculateAge();
    } else {
      setView(view+1);
    } 
  }

  const calculateAge = () => {
    const today = new Date();
    const dob = new Date(birthDate);
    setAge(today.getFullYear() - dob.getFullYear()) ;
  }
  const handleDone = () => {
    if(interests.length < 3) {alert('you must choose 3')}
    else{
      axios.post('/api/login', {
        name: name,
        email: email,
        age: age,
        gender: gender,
        rating: rating,
        interests: interests
      })
      setLoggedIn(true);
      setOpen(false);     
    }
  }

  const getRegisterView = () => {
    return(<Fragment>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          defaultValue={email}
          onChange={(e)=>setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          defaultValue={name}
          onChange={(e)=> setName(e.target.value)}
          fullWidth
          required
        />
         <TextField 
          autoFocus
          margin="dense"
          id="date"
          label="Birthday"
          type="date"
          defaultValue={birthDate}
          onChange={(e)=> setBirthDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
          />
         </Fragment>)
  }

  const getWelcomeView = () => {
    return(
      <Fragment>
        <DialogContentText>
        Welcome <span className="user-name">{name}</span>
      </DialogContentText>
        Your answers to the next few questions will help us find the right apps for you.
      </Fragment>)
  }

  const getGenderView = () => {
    return(
      <Fragment>
        <DialogContentText>
        How do you identify?
      </DialogContentText>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(e)=>setGender(e.target.value)}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Fragment>)
  }

  const getMinimalRatingView = () => {
    return(
      <Fragment>
        <DialogContentText>
        Minimum rating of apps
        </DialogContentText>
        <RatingStars rating={rating} setRating={setRating}></RatingStars>
      </Fragment>)
  }

  const getCategoriesView = () => {
    return(
      <Fragment>
           <DialogContentText>
           Last step! Pick {3-interests.length} categories that interest you.
           </DialogContentText>
          <GridView setInterests={setInterests}/>
       </Fragment>)
  }

  const getDialogContentByView = () => {
    switch(view){
      case 0:
        return getRegisterView()
      case 1:
        return getWelcomeView();
      case 2: 
        return getGenderView();
      case 3: 
        return getMinimalRatingView();
      case 4:
        return getCategoriesView();      
    }
  }

  return(
    <div>
      <Button variant="outlined" className={classes.btn} onClick={handleClickOpen}>
      Let's Start
      </Button>
      <Dialog classes={{ root: classes.root,paper: classes.paper }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          IronApps - Find the perfect apps for you.
        </DialogTitle>
        <img className="main-img" src={mainImg}></img>
        <DialogContent>
          {getDialogContentByView()}
        </DialogContent>
        <DialogActions>
          {(view !== 0) && <Button onClick={handleBack} color="primary"> Back</Button>}
          {(view !== 4) ? 
          <Button onClick={handleNext} color="primary"> Continue </Button> : 
          <Button onClick={handleDone} color="primary"> Done </Button> }  
        </DialogActions>
      </Dialog>
    </div>
  );
}
