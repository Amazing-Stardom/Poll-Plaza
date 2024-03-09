import '../App.css'
import React from 'react'

function InputTag() {
  return (
    <div><b><label id="form-text" for="Answer">Comma separated tags</label></b><br/>
    <input type="text" placeholder="Tag1, Tag2, Tag3" id="Input-data" name="Tag" /><br/></div>
  )
}

export default InputTag