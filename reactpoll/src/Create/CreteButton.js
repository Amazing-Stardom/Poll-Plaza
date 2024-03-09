import '../App.css'
import React from 'react'
import { Link } from 'react-router-dom';
function CreteButton() {
  return (
    <div><Link to="/"><button class="add-option">
        Create Poll
    </button></Link><br/></div>
  )
}

export default CreteButton