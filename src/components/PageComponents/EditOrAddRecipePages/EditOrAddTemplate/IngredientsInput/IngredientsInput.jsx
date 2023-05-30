import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export default function IngredientsInput({ index, recipeIngredient, handleIngredientChange, handleDeleteLine }) {
  const dispatch = useDispatch();
  const unitsOfMeasurement = useSelector(store => store.recipes.unitsOfMeasurement);
  const allIngredients = useSelector(store => store.recipes.allIngredients);
  const { quantity, unit, ingredient, recipeIngredientId, method, unitId, forWhichPart } = recipeIngredient;
  const [showUnitInput, setShowUnitInput] = useState(unit === 'other');
  const [showIngredientInput, setShowIngredientInput] = useState(ingredient === 'other');

  useEffect(() => {
    dispatch({ type: 'FETCH_UNITS_OF_MEASUREMENT' });
    dispatch({ type: 'FETCH_ALL_INGREDIENTS' });
  }, []);

  const handleUnitSelectChange = (e) => {
    const selectedId = e.target.value;
    if(selectedId !== 'other') {
      let conversion_category, unitName;
      unitsOfMeasurement.map(unit => {
        if (unit.id == selectedId) {
          console.log(unit.conversion_category);
          conversion_category = unit.conversion_category
          unitName = unit.unit
          console.log('conversion_category:', conversion_category);
        }
      })
      const selectedUnit = {id: selectedId, unit: unitName, conversion_category: conversion_category} 
      console.log('selectedUnit:', selectedUnit);
      handleIngredientChange(index, 'units', selectedUnit);
    }
    else {
      // Every new unit of measurement will be created with a conversion
      // category of 'other' and the id and unit will be the entered value
      const selectedUnit = {id: selectedId, unit:selectedId, conversion_category: 'other'} 
      console.log('selectedUnit:', selectedUnit);
      handleIngredientChange(index, 'units', selectedUnit);
      setShowUnitInput(selectedId === 'other');
    }
  };
  const handleOtherUnitInput = (e) => {
    const selectedId = e.target.value;
    if(selectedId) {
      // Every new unit of measurement will be created with a conversion
      // category of 'other' and the id and unit will be the entered value
      const selectedUnit = {id: selectedId, unit: selectedId, conversion_category: 'other'}
      console.log('selectedUnit:', selectedUnit);
      handleIngredientChange(index, 'units', selectedUnit);
    }

  };
  const handleIngredientSelectChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      let foodCategory;
      allIngredients.map(i => {
        if (i.id === selectedId) {
          foodCategory = i.foodCategory
        }
      })
      const selectedIngredient = {id:selectedId, foodCategory: foodCategory}
      console.log('selectedIngredient:', selectedIngredient);
      handleIngredientChange(index, 'ingredient', selectedIngredient);
      setShowIngredientInput(selectedId === 'other');
    }
  };
  const handleOtherIngredientInput = (e) => {
    const selectedId = e.target.value;
      const selectedIngredient = {id: selectedId, foodCategory: foodCategory}
      console.log('selectedIngredient:', selectedIngredient);
      handleIngredientChange(index, 'ingredient', e.target.value);
  };

  if (
    unitsOfMeasurement.length > 0 &&
    allIngredients && allIngredients.foodCategories &&
    allIngredients.foodCategories.length > 0
  ) {
    return (
      <tr>
        <td>
          <input
            type='number'
            placeholder='Quantity'
            min='0'
            value={quantity}
            onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
          />
        </td>
        <td>
          <select
            name='units-select'
            id='units-select'
            value={unitId}
            onChange={e => handleUnitSelectChange(e)}
          >
            <option value=''>--Please select the units--</option>
            <option value='' disabled>MASS</option>
            {unitsOfMeasurement.map(unit => {
              if (unit.conversion_category === 'mass') {
                return (
                  <option key={unit.id} value={`${unit.id}`}>{unit.unit}</option>
                );
              }
              return null;
            })}
            <option value='' disabled>VOLUME</option>
            {unitsOfMeasurement.map(unit => {
              if (unit.conversion_category === 'volume') {
                return (
                  <option key={unit.id} value={unit.id}>{unit.unit}</option>
                );
              }
              return null;
            })}
            <option value='' disabled>OTHER</option>
            {unitsOfMeasurement.map(unit => {
              if (unit.conversion_category === 'other') {
                return (
                  <option key={unit.id} value={unit.id}>{unit.unit}</option>
                );
              }
              return null;
            })}
            <option value='' disabled>NEW UNIT</option>
            <option value='other'>Create New Ingredient</option>
          </select>
          {showUnitInput && (
            <input
              value={unitId}
              onChange={handleOtherUnitInput}
              placeholder='Enter other unit'
            />
          )}
        </td>
        <td>
          <select
            value={recipeIngredientId}
            onChange={e => handleIngredientSelectChange(e)}
          >
            <option value=''>--Please select the Ingredient--</option>
            {allIngredients.foodCategories.map(category => {
              const capitalizedCategory = category.name.toUpperCase();
              return (
                <React.Fragment key={category.id}>
                  <option key={category.id} disabled>{capitalizedCategory}</option>
                  {allIngredients.ingredients.map(i => {
                    if (i.foodCategory === category.name) {
                      return (
                        <option key={i.id} value={i.id}>{i.name}</option>
                      );
                    }
                    return null;
                  })}
                </React.Fragment>
              );
            })}
            <option value='' disabled>NEW INGREDIENT</option>
            <option value='other'>Create New Unit</option>
          </select>
          {showIngredientInput && (
            <input
              value={ingredient}
              onChange={handleOtherIngredientInput}
              placeholder='Enter new ingredient'
            />
          )}
        </td>
        <td>
          <input
            type='text'
            placeholder='Prepared method?'
            value={method}
            onChange={e => handleIngredientChange(index, 'method', e.target.value)}
          />
        </td>
        <td>
          <input
            type='text'
            placeholder='Part of meal?'
            value={forWhichPart}
            onChange={(e) => handleIngredientChange(index, "forWhichPart", e.target.value)}
          />
        </td>
        <td>
          <button onClick={() => handleDeleteLine(index)}>❌</button>
        </td>
      </tr>
    );
  }
  return <tr></tr>;
}