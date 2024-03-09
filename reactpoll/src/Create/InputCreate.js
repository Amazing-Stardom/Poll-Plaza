import '../App.css'
import React from 'react'
import InputQuestion from './InputQuestion.js'
import InputOptions from './InputOptions.js'
import AddOption from './AddOption.js'
import InputTag from './InputTags.js'
import CreteButton from './CreteButton.js'
function InputCreate() {
  return (
    <div id="Form" class ="Form" >
        <InputQuestion />
        <InputOptions />
        <AddOption />
        <InputTag />
        <CreteButton />
    </div>
  )
}

export default InputCreate