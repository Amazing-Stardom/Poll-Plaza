import '../App.css'
import React from 'react'


function InputOptions() {
  return (
    <div><b><label id="form-text"for="Answer">Answer Options </label></b><br/>
    <input type="text" placeholder="Option 1" id="Input-data" name="Option 1" /><br/>
    <input type="text" id="Input-data" name="Option 2" placeholder="Option 2" /><br/>
    </div>
  )
}

export default InputOptions