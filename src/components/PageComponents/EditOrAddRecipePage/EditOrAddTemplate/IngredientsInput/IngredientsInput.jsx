import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function IngredientsInput({index, recipeIngredient, handleIngredientChange}) {
  const dispatch = useDispatch()
  const unitsOfMeasurement = useSelector(store => store.recipes.unitsOfMeasurement)
  const allIngredients = useSelector(store => store.recipes.allIngredients)
  const {quantity, units, ingredient: selectedIngredient, method} = recipeIngredient
  const [showUnitInput, setShowUnitInput] = useState(units === 'other')
  const [showIngredientInput, setShowIngredientInput] = useState(selectedIngredient === 'other')

  useEffect(() => {
    dispatch({type: 'FETCH_UNITS_OF_MEASUREMENT'});
    dispatch({type: 'FETCH_ALL_INGREDIENTS'});
  }, [])

  const handleUnitSelectChange = (value) => {
    handleIngredientChange(index, 'units', value);
    setShowUnitInput(value === 'other');
  };
  const handleOtherUnitInput = (e) => {
    handleIngredientChange(index, 'units', e.target.value)
  }

  const handleIngredientSelectChange = (value) => {
    handleIngredientChange(index, 'ingredient', value);
    setShowIngredientInput(true)
  }
  const handleOtherIngredientInput = (e) => {
    handleIngredientChange(index, 'ingredient', e.target.value)
  }

  if (unitsOfMeasurement != undefined) {
    return (
      <div>
        <input
          type='number'
          placeholder='Quantity'
          min='0'
          value={quantity}
          onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
        />
        <select
          name='units-select'
          id='units-select'
          value={units}
          onChange={e => handleUnitSelectChange(e.target.value)}
        >
          <option value=''>--Please select the units--</option>
          <option value='' disabled>Mass</option>
          {unitsOfMeasurement.map(unit => {
            if (unit.conversion_category === 'mass') {
              return (
                <option key={unit.id} value={unit.id}>{unit.unit}</option>
              )
            }
          })}
          <option value='' disabled>Volume</option>
          {unitsOfMeasurement.map(unit => {
            if (unit.conversion_category === 'volume') {
              return (
                <option key={unit.id} value={unit.id}>{unit.unit}</option>
              )
            }
          })}
          <option value='' disabled>Other</option>
          {unitsOfMeasurement.map(unit => {
            if (unit.conversion_category === 'other') {
              return (
                <option key={unit.id} value={unit.id}>{unit.unit}</option>
              )
            }
          })}
          <option value='' disabled>New Unit</option>
          <option value='' disabled>Other</option>
          <option value='other'>Create New Ingredient</option>
        </select>
        {showUnitInput && (
          <input
            value={units}
            onChange={handleOtherUnitInput}
            placeholder='Enter other unit'
          />
        )}
        <select
          value={selectedIngredient}
          onchange={e => handleIngredientSelectChange(e.target.value)}
        >
          <option value=''>--Please select the Ingredient--</option>
          <option value='other'>Create New Unit</option>
        </select>
        {showIngredientInput && (
          <input
            value={selectedIngredient}
            onChange={handleOtherIngredientInput}
            placeholder='Enter new ingredient'
          />
        )}
        <input
          type='text'
          placeholder='prepared method'
          value={method}
          onChange={e => handleIngredientChange(index, 'method', e.target.value)}
        />
      </div>
    )
  }
}