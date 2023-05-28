import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function IngredientsInput() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_UNITS_OF_MEASUREMENT'});
  }, [])

  const [unitsInput, setUnitsInput] = useState('')
  const [toggleUnitsInput, setToggleUnitsInput] = useState(false)
  const unitsOfMeasurement = useSelector(store => store.unitsOfMeasurement)

  const handleUnitsSelect = (e) => {
    let selectedUnits = e.target.value
    console.log('value of units-select:', selectedUnits);
    if (selectedUnits === 'other') {
      setToggleUnitsInput(true)
    }
    else {
      setToggleUnitsInput(false)
    }
  }
  const otherUnits = () => {
    if (toggleUnitsInput){
      return (
        <input
          type='text'
          placeholder='Enter new unit of measurement'
          value={unitsInput}
          onChange = {e => setUnitsInput(e.target.value)}
        />
      )
    }
  }

  return (
    <>
      <input type='number' placeholder='Quantity' />
      <label htmlFor='units-select'>Select a unit</label>
      <select name='units-select' id='units-select' onChange={handleUnitsSelect}>
        <option value=''>--Please select the units--</option>
        {/* {unitsOfMeasurement.map(unit => {
          <option key={unit.id} value={unit.id}>{unit.unit}</option>
        })} */}
        <option value='other'>Other</option>
      </select>
      {otherUnits()}
    </>
  )
}