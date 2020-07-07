import React, { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default function CategoryCheckBox({category, setChosenCategories, chosenCategories}) {
    const [isChecked, setIsChecked] = useState(false);
    
    useEffect(() => {
        if (isChecked) {
            setChosenCategories([...chosenCategories, category])
        } else {
            setChosenCategories(chosenCategories.filter((item)=> item !== category));
        }      
    },[isChecked]);
      
    const handleChange = (e) => {
        if(chosenCategories.length < 3 || !e.target.checked){
            setIsChecked(e.target.checked);
        }  
    }
  
    return (
        <FormControlLabel
        control={<Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={isChecked} onChange={handleChange} />}
        label={category}
        />
    )}