import '../App.css'
import React from 'react'

function InputCreate() {
  return (
    <div><b><label id="form-text" for="Question">Question</label></b><br/>
    <input type="text" id="Input-data" name="Question" placeholder="Type your poll question here" /><br/>
    </div>
  )
}

export default InputCreate