import React, {useState, useEffect} from 'react';
import CategoryCheckBox from './CategoryCheckBox';

export default function CategoriesView({setInterests}) {
  const [categories, setCategories]= useState([]);
  const [chosenCategories, setChosenCategories]= useState([]);

  useEffect(() => {
    const getCategories = () => {
    fetch('/api/categories')
    .then(res => res.json())
    .then(list => {
      setCategories(list)})
    }
    getCategories();
  },[]);

  useEffect(() => {
    setInterests(chosenCategories);
  },[chosenCategories]);

  return (
    <div>
      {categories.map((category) => (
        <CategoryCheckBox category={category} setChosenCategories={setChosenCategories} chosenCategories={chosenCategories} />
      ))}
    </div>
  );
}
